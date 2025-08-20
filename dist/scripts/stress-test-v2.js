"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const ton_1 = require("@ton/ton");
const crypto_1 = require("@ton/crypto");
const dotenv = __importStar(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Загружаем переменные окружения
dotenv.config();
// Количество транзакций для стресс-теста
const NUM_TRANSACTIONS = 5;
const TRANSACTION_AMOUNT = (0, core_1.toNano)('0.05');
// Задержка между транзакциями (мс)
const DELAY_BETWEEN_TXS = 3000;
// Загружаем информацию о деплое
const loadDeployInfo = () => {
    const deployInfoPath = path_1.default.join(__dirname, '..', 'deploy-info.json');
    if (!fs_1.default.existsSync(deployInfoPath)) {
        throw new Error('Deploy info file not found. Please run deploy-simple.ts first.');
    }
    return JSON.parse(fs_1.default.readFileSync(deployInfoPath, 'utf8'));
};
// Функция задержки
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
/**
 * Отправляет транзакцию с данными
 * @param walletContract Кошелек для отправки транзакции
 * @param keyPair Ключевая пара для подписи
 * @param destinationAddress Адрес получателя
 * @param amount Количество TON для отправки
 * @param payload Данные для отправки
 */
async function sendTransaction(walletContract, keyPair, destinationAddress, amount, payload) {
    console.log(`Sending transaction to ${destinationAddress.toString()}`);
    // Получаем текущий seqno
    const seqno = await walletContract.getSeqno();
    console.log(`Current wallet seqno: ${seqno}`);
    // Отправляем транзакцию
    await walletContract.sendTransfer({
        secretKey: keyPair.secretKey,
        seqno: seqno,
        messages: [
            (0, ton_1.internal)({
                to: destinationAddress,
                value: amount,
                body: payload,
            }),
        ],
    });
    // Ждем подтверждения транзакции
    console.log(`Waiting for transaction confirmation...`);
    for (let attempt = 0; attempt < 10; attempt++) {
        await sleep(2000);
        const newSeqno = await walletContract.getSeqno();
        if (newSeqno > seqno) {
            console.log(`Transaction confirmed! New seqno: ${newSeqno}`);
            return true;
        }
        console.log(`Waiting... (attempt ${attempt + 1})`);
    }
    console.log(`Transaction may not have been confirmed. Check explorers.`);
    return false;
}
// Проведение стресс-теста для FundsDistributor
async function stressTestFundsDistributor(walletContract, keyPair, fundsDistributorAddress) {
    console.log('\n=== Стресс-тест контракта FundsDistributor ===');
    // Статистика
    let successCount = 0;
    let failCount = 0;
    const startTime = Date.now();
    // Отправляем серию транзакций
    for (let i = 0; i < NUM_TRANSACTIONS; i++) {
        console.log(`\nОтправка транзакции ${i + 1}/${NUM_TRANSACTIONS}...`);
        try {
            // Создаем сообщение для отправки
            const payload = (0, core_1.beginCell)()
                .storeUint(0, 32)
                .storeStringTail(`Стресс-тест: транзакция ${i + 1}`)
                .endCell();
            const success = await sendTransaction(walletContract, keyPair, fundsDistributorAddress, TRANSACTION_AMOUNT, payload);
            if (success) {
                successCount++;
            }
            else {
                failCount++;
            }
        }
        catch (error) {
            console.error(`Ошибка при отправке транзакции:`, error);
            failCount++;
        }
        // Пауза между транзакциями
        if (i < NUM_TRANSACTIONS - 1) {
            console.log(`Ожидание ${DELAY_BETWEEN_TXS / 1000} секунд перед следующей транзакцией...`);
            await sleep(DELAY_BETWEEN_TXS);
        }
    }
    // Статистика теста
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    console.log('\n=== Результаты стресс-теста FundsDistributor ===');
    console.log(`Всего транзакций: ${NUM_TRANSACTIONS}`);
    console.log(`Успешно: ${successCount}`);
    console.log(`Неудачно: ${failCount}`);
    console.log(`Общее время: ${duration.toFixed(2)} секунд`);
    console.log(`Средняя скорость: ${(successCount / duration).toFixed(2)} транзакций в секунду`);
    return { successCount, failCount, duration };
}
// Проведение стресс-теста для AnimalHelperToken
async function stressTestAnimalHelperToken(walletContract, keyPair, tokenAddress) {
    console.log('\n=== Стресс-тест контракта AnimalHelperToken ===');
    // Статистика
    let successCount = 0;
    let failCount = 0;
    const startTime = Date.now();
    // Отправляем серию транзакций
    for (let i = 0; i < NUM_TRANSACTIONS; i++) {
        console.log(`\nОтправка транзакции ${i + 1}/${NUM_TRANSACTIONS} для покупки токенов...`);
        try {
            // Создаем сообщение для покупки токенов (BuyTokensMessage)
            const buyTokensBody = (0, core_1.beginCell)()
                .storeUint(0, 32) // op для BuyTokensMessage
                .storeUint(Math.floor(Math.random() * 1000000000), 64) // queryId
                .endCell();
            const success = await sendTransaction(walletContract, keyPair, tokenAddress, TRANSACTION_AMOUNT, buyTokensBody);
            if (success) {
                successCount++;
            }
            else {
                failCount++;
            }
        }
        catch (error) {
            console.error(`Ошибка при отправке транзакции:`, error);
            failCount++;
        }
        // Пауза между транзакциями
        if (i < NUM_TRANSACTIONS - 1) {
            console.log(`Ожидание ${DELAY_BETWEEN_TXS / 1000} секунд перед следующей транзакцией...`);
            await sleep(DELAY_BETWEEN_TXS);
        }
    }
    // Статистика теста
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    console.log('\n=== Результаты стресс-теста AnimalHelperToken ===');
    console.log(`Всего транзакций: ${NUM_TRANSACTIONS}`);
    console.log(`Успешно: ${successCount}`);
    console.log(`Неудачно: ${failCount}`);
    console.log(`Общее время: ${duration.toFixed(2)} секунд`);
    console.log(`Средняя скорость: ${(successCount / duration).toFixed(2)} транзакций в секунду`);
    return { successCount, failCount, duration };
}
// Главная функция
async function main() {
    try {
        console.log('=== Начало стресс-тестирования контрактов ===');
        // Проверяем наличие мнемонической фразы
        if (!process.env.MNEMONIC) {
            console.error('Mnemonic phrase not found. Please check your .env file.');
            process.exit(1);
        }
        // Загружаем информацию о деплое
        const deployInfo = loadDeployInfo();
        console.log('Deploy info loaded successfully.');
        // Настраиваем клиент TON
        const ENDPOINT = process.env.ENDPOINT || 'https://testnet.toncenter.com/api/v2/jsonRPC';
        const client = new ton_1.TonClient({
            endpoint: ENDPOINT,
            apiKey: process.env.API_KEY,
        });
        // Создаем кошелек на основе мнемонической фразы
        console.log('Initializing wallet...');
        const mnemonic = process.env.MNEMONIC.split(' ');
        const keyPair = await (0, crypto_1.mnemonicToPrivateKey)(mnemonic);
        const wallet = ton_1.WalletContractV4.create({
            publicKey: keyPair.publicKey,
            workchain: 0,
        });
        const walletContract = client.open(wallet);
        const walletAddress = walletContract.address;
        console.log(`Wallet address: ${walletAddress.toString()}`);
        // Проверяем баланс кошелька
        const walletBalance = await client.getBalance(walletAddress);
        console.log(`Wallet balance: ${walletBalance} nanoTON (${Number(walletBalance) / 1e9} TON)`);
        // Проверка, что у кошелька достаточно средств
        const requiredBalance = TRANSACTION_AMOUNT * BigInt(NUM_TRANSACTIONS * 2) + (0, core_1.toNano)('0.5'); // Для обоих тестов + запас
        if (walletBalance < requiredBalance) {
            console.error(`Not enough funds for stress test. Need at least ${Number(requiredBalance) / 1e9} TON`);
            console.error('Please send TON to your wallet address and try again.');
            process.exit(1);
        }
        // Адреса контрактов
        const fundsDistributorAddress = core_1.Address.parse(deployInfo.contracts.fundsDistributor);
        const tokenAddress = core_1.Address.parse(deployInfo.contracts.animalHelperToken);
        console.log(`FundsDistributor address: ${fundsDistributorAddress.toString()}`);
        console.log(`AnimalHelperToken address: ${tokenAddress.toString()}`);
        // Проводим стресс-тесты
        const fdResults = await stressTestFundsDistributor(walletContract, keyPair, fundsDistributorAddress);
        const tokenResults = await stressTestAnimalHelperToken(walletContract, keyPair, tokenAddress);
        // Общие результаты
        console.log('\n=== Общие результаты стресс-тестов ===');
        console.log(`Всего транзакций: ${NUM_TRANSACTIONS * 2}`);
        console.log(`Всего успешно: ${fdResults.successCount + tokenResults.successCount}`);
        console.log(`Всего неудачно: ${fdResults.failCount + tokenResults.failCount}`);
        console.log(`Общее время: ${(fdResults.duration + tokenResults.duration).toFixed(2)} секунд`);
        console.log('\nСтресс-тестирование завершено.');
    }
    catch (error) {
        console.error('Ошибка при выполнении стресс-тестов:', error);
        process.exit(1);
    }
}
// Запускаем тесты
main();
