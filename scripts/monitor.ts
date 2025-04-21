import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';
import { Address, toNano } from '@ton/core';
import { TonClient } from '@ton/ton';
import axios from 'axios';
import { pipeline } from 'stream';
import { createWriteStream } from 'fs';
import { promisify } from 'util';

// Загрузка переменных окружения
const ENV_FILE = process.argv.includes('--mainnet') ? '.env.mainnet' : '.env';
config({ path: path.resolve(__dirname, `../${ENV_FILE}`) });

// Путь для сохранения логов
const LOGS_DIR = path.resolve(__dirname, '../logs');
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR);
}

// Адрес API для получения транзакций и счетчика (по умолчанию testnet)
const API_BASE_URL = process.argv.includes('--mainnet')
    ? 'https://toncenter.com/api/v2'
    : 'https://testnet.toncenter.com/api/v2';

// Интервал проверки транзакций (в миллисекундах)
const CHECK_INTERVAL = 60000; // 1 минута

// Порог уведомления о крупных транзакциях (в TON)
const LARGE_TX_THRESHOLD = toNano('1');

// Структура для хранения последних обработанных транзакций
const lastProcessedTimestamps: Record<string, number> = {};

// Загрузка информации о развернутых контрактах
async function loadDeployInfo() {
    const deployInfoPath = process.argv.includes('--mainnet')
        ? path.resolve(__dirname, '../deploy-info-mainnet.json')
        : path.resolve(__dirname, '../deploy-info.json');
    
    if (!fs.existsSync(deployInfoPath)) {
        throw new Error(`Deploy info file not found at ${deployInfoPath}`);
    }
    
    const deployInfo = JSON.parse(fs.readFileSync(deployInfoPath, 'utf-8'));
    return deployInfo;
}

// Инициализация клиента TON
function initTonClient() {
    return new TonClient({
        endpoint: `${API_BASE_URL}/jsonRPC`,
        apiKey: process.env.TONCENTER_API_KEY
    });
}

// Логирование с отметкой времени
function logWithTimestamp(message: string, type: 'info' | 'error' | 'warning' = 'info') {
    const timestamp = new Date().toISOString();
    const logPrefix = type === 'error' ? '[ERROR]' : type === 'warning' ? '[WARNING]' : '[INFO]';
    console.log(`${timestamp} ${logPrefix} ${message}`);
    
    const logFile = path.join(LOGS_DIR, `monitor_${new Date().toISOString().split('T')[0]}.log`);
    fs.appendFileSync(logFile, `${timestamp} ${logPrefix} ${message}\n`);
}

// Получение транзакций для адреса
async function getTransactions(address: string, limit: number = 10) {
    try {
        const url = `${API_BASE_URL}/getTransactions?address=${address}&limit=${limit}`;
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': process.env.TONCENTER_API_KEY || ''
            }
        });
        
        if (response.data && response.data.ok && response.data.result) {
            return response.data.result;
        } else {
            logWithTimestamp(`Failed to get transactions for ${address}: ${JSON.stringify(response.data)}`, 'error');
            return [];
        }
    } catch (error) {
        logWithTimestamp(`Error fetching transactions for ${address}: ${error}`, 'error');
        return [];
    }
}

// Получение текущего баланса адреса
async function getBalance(address: string) {
    const client = initTonClient();
    try {
        const balance = await client.getBalance(Address.parse(address));
        return balance;
    } catch (error) {
        logWithTimestamp(`Error fetching balance for ${address}: ${error}`, 'error');
        return BigInt(0);
    }
}

// Проверка новых транзакций для контракта
async function checkNewTransactions(contractType: string, address: string) {
    logWithTimestamp(`Checking new transactions for ${contractType} at ${address}`);
    
    const transactions = await getTransactions(address, 20);
    if (!transactions.length) {
        logWithTimestamp(`No transactions found for ${contractType}`);
        return;
    }
    
    // Получаем временную метку последней обработанной транзакции
    const lastTimestamp = lastProcessedTimestamps[address] || 0;
    let newLastTimestamp = lastTimestamp;
    
    // Обработка новых транзакций
    for (const tx of transactions) {
        const txTimestamp = tx.utime;
        
        if (txTimestamp > lastTimestamp) {
            // Это новая транзакция
            const inMessage = tx.in_msg || {};
            const outMsgs = tx.out_msgs || [];
            
            // Форматирование суммы транзакции
            const value = inMessage.value ? BigInt(inMessage.value) : BigInt(0);
            const formattedValue = Number(value) / 1e9;
            
            // Логирование транзакции
            logWithTimestamp(`New ${contractType} transaction: ${tx.transaction_id.hash} | Amount: ${formattedValue} TON | From: ${inMessage.source || 'unknown'}`);
            
            // Проверка крупных транзакций
            if (value >= LARGE_TX_THRESHOLD) {
                logWithTimestamp(`LARGE TRANSACTION DETECTED for ${contractType}: ${formattedValue} TON from ${inMessage.source || 'unknown'}`, 'warning');
            }
            
            // Логирование исходящих сообщений
            if (outMsgs.length > 0) {
                outMsgs.forEach((msg: any, index: number) => {
                    const outValue = msg.value ? BigInt(msg.value) : BigInt(0);
                    const formattedOutValue = Number(outValue) / 1e9;
                    logWithTimestamp(`  Output #${index + 1}: ${formattedOutValue} TON to ${msg.destination || 'unknown'}`);
                });
            }
            
            // Обновление последней временной метки
            if (txTimestamp > newLastTimestamp) {
                newLastTimestamp = txTimestamp;
            }
        }
    }
    
    // Обновляем временную метку последней обработанной транзакции
    lastProcessedTimestamps[address] = newLastTimestamp;
}

// Загрузка ресурса для визуализации транзакций
async function downloadVisualizer() {
    const streamPipeline = promisify(pipeline);
    const visualizerUrl = 'https://ton.org/docs/develop/smart-contracts/sdk/javascript-sdk';
    const outputPath = path.join(LOGS_DIR, 'visualizer.html');
    
    try {
        const response = await axios.get(visualizerUrl, { responseType: 'stream' });
        await streamPipeline(response.data, createWriteStream(outputPath));
        logWithTimestamp(`Visualizer downloaded to ${outputPath}`);
    } catch (error) {
        logWithTimestamp(`Error downloading visualizer: ${error}`, 'error');
    }
}

// Получение информации о состоянии контрактов
async function getContractsState(deployInfo: any) {
    logWithTimestamp('===== CONTRACT STATE =====');
    
    // Проверка баланса распределителя средств
    const distributorBalance = await getBalance(deployInfo.distributorContract);
    logWithTimestamp(`FundsDistributor Balance: ${Number(distributorBalance) / 1e9} TON`);
    
    // Проверка баланса токена
    const tokenBalance = await getBalance(deployInfo.tokenContract);
    logWithTimestamp(`AnimalHelperToken Balance: ${Number(tokenBalance) / 1e9} TON`);
    
    // Проверка баланса владельца
    const ownerBalance = await getBalance(deployInfo.ownerAddress);
    logWithTimestamp(`Owner Balance: ${Number(ownerBalance) / 1e9} TON`);
    
    // Проверка балансов благотворительных организаций
    if (deployInfo.charities) {
        for (let i = 0; i < deployInfo.charities.length; i++) {
            const charity = deployInfo.charities[i];
            const charityBalance = await getBalance(charity.address);
            logWithTimestamp(`Charity ${i + 1} (${charity.percentage}%) Balance: ${Number(charityBalance) / 1e9} TON`);
        }
    }
    
    logWithTimestamp('=========================');
}

// Основная функция мониторинга
async function monitor() {
    try {
        logWithTimestamp('Starting contract monitoring...');
        logWithTimestamp(`Network: ${process.argv.includes('--mainnet') ? 'MAINNET' : 'TESTNET'}`);
        
        // Загрузка информации о контрактах
        const deployInfo = await loadDeployInfo();
        logWithTimestamp(`Loaded deploy info: ${JSON.stringify(deployInfo, null, 2)}`);
        
        // Получение начального состояния контрактов
        await getContractsState(deployInfo);
        
        // Регулярная проверка транзакций
        setInterval(async () => {
            try {
                // Проверка транзакций для распределителя средств
                await checkNewTransactions('FundsDistributor', deployInfo.distributorContract);
                
                // Проверка транзакций для токена
                await checkNewTransactions('AnimalHelperToken', deployInfo.tokenContract);
                
                // Обновление состояния контрактов каждые 10 проверок (10 минут)
                const currentMinute = new Date().getMinutes();
                if (currentMinute % 10 === 0) {
                    await getContractsState(deployInfo);
                }
            } catch (error) {
                logWithTimestamp(`Error in monitoring loop: ${error}`, 'error');
            }
        }, CHECK_INTERVAL);
        
        // Загрузка визуализатора транзакций один раз при запуске
        await downloadVisualizer();
        
        // Держим процесс активным
        logWithTimestamp('Monitoring active. Press Ctrl+C to stop.');
    } catch (error) {
        logWithTimestamp(`Error initializing monitoring: ${error}`, 'error');
        process.exit(1);
    }
}

// Запуск мониторинга
monitor(); 