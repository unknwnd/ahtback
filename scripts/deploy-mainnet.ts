import { config } from 'dotenv';
import path from 'path';
import { Address, beginCell, toNano } from '@ton/core';
import { TonClient, WalletContractV4 } from '@ton/ton';
import { mnemonicToPrivateKey } from '@ton/crypto';
import { AnimalHelperToken } from '../build/AnimalHelperToken/tact_AnimalHelperToken';
import { FundsDistributor } from '../build/FundsDistributor/tact_FundsDistributor';
import fs from 'fs';

// Загрузка переменных окружения из .env.mainnet
config({ path: path.resolve(__dirname, '../.env.mainnet') });

// Путь для сохранения информации о деплое
const DEPLOY_INFO_PATH = path.resolve(__dirname, '../deploy-info-mainnet.json');

// Проверка опции --dry-run
const isDryRun = process.argv.includes('--dry-run');

/**
 * Конфигурация для деплоя контрактов
 */
const DEPLOY_CONFIG = {
    // Адрес владельца контрактов
    ownerAddress: process.env.OWNER_ADDRESS || '',
    // Общий запас токенов
    totalSupply: BigInt(process.env.JETTON_TOTAL_SUPPLY || '1000000000000'),
    // Адреса благотворительных организаций и их доли
    charities: [
        {
            address: process.env.CHARITY_1_ADDRESS || '',
            percentage: parseInt(process.env.CHARITY_1_PERCENTAGE || '30')
        },
        {
            address: process.env.CHARITY_2_ADDRESS || '',
            percentage: parseInt(process.env.CHARITY_2_PERCENTAGE || '30')
        },
        {
            address: process.env.CHARITY_3_ADDRESS || '',
            percentage: parseInt(process.env.CHARITY_3_PERCENTAGE || '40')
        }
    ],
    // URL для метаданных токена
    contentUrl: 'https://raw.githubusercontent.com/ton-community/ton-docs/main/docs/develop/dapps/defi/examples/data/jetton-content.json',
    // Сумма для деплоя каждого контракта
    deployAmount: toNano('0.5')
};

/**
 * Валидация конфигурации перед деплоем
 */
function validateConfig() {
    // Проверка наличия мнемонической фразы
    if (!process.env.MNEMONIC) {
        throw new Error('MNEMONIC not set in .env.mainnet');
    }

    // Проверка наличия адреса владельца
    if (!DEPLOY_CONFIG.ownerAddress) {
        throw new Error('OWNER_ADDRESS not set in .env.mainnet');
    }

    // Проверка адресов благотворительных организаций
    for (let i = 0; i < DEPLOY_CONFIG.charities.length; i++) {
        if (!DEPLOY_CONFIG.charities[i].address) {
            throw new Error(`CHARITY_${i+1}_ADDRESS not set in .env.mainnet`);
        }
    }

    // Проверка суммы процентов
    const totalPercentage = DEPLOY_CONFIG.charities.reduce((sum, charity) => sum + charity.percentage, 0);
    if (totalPercentage !== 100) {
        throw new Error(`Total percentage must be 100%, got ${totalPercentage}%`);
    }

    console.log('Configuration validated successfully');
}

/**
 * Сохранение информации о деплое
 */
function saveDeployInfo(info: any) {
    fs.writeFileSync(
        DEPLOY_INFO_PATH,
        JSON.stringify(info, null, 2)
    );
    console.log(`Deploy info saved to ${DEPLOY_INFO_PATH}`);
}

/**
 * Отправка транзакции для деплоя
 */
async function sendDeployTransaction(client: TonClient, wallet: WalletContractV4, recipient: Address, amount: bigint, payload: any = null) {
    // Получение текущего номера последовательности кошелька
    const seqno = await wallet.getSeqno();
    
    // Проверка баланса кошелька
    const walletBalance = await client.getBalance(wallet.address);
    const requiredBalance = amount + toNano('0.1'); // Добавляем немного для комиссии
    
    if (walletBalance < requiredBalance) {
        throw new Error(`Insufficient wallet balance: ${walletBalance} TON, required ${requiredBalance} TON`);
    }
    
    console.log(`Sending ${amount} TON to ${recipient.toString()}`);
    
    if (isDryRun) {
        console.log(`[DRY RUN] Would send transaction from ${wallet.address.toString()} to ${recipient.toString()} with amount ${amount} TON`);
        return true;
    }
    
    // Отправка транзакции
    await wallet.sendTransfer({
        secretKey: await getSecretKey(),
        seqno,
        to: recipient,
        value: amount,
        bounce: false,
        payload: payload
    });
    
    // Ожидание изменения номера последовательности (подтверждение транзакции)
    console.log(`Waiting for transaction confirmation...`);
    let currentSeqno = seqno;
    let attempts = 0;
    const maxAttempts = 20;
    
    while (currentSeqno === seqno && attempts < maxAttempts) {
        await sleep(3000);
        attempts++;
        console.log(`Waiting... (attempt ${attempts}/${maxAttempts})`);
        currentSeqno = await wallet.getSeqno();
    }
    
    if (currentSeqno === seqno) {
        throw new Error(`Transaction not confirmed after ${maxAttempts} attempts`);
    }
    
    console.log(`Transaction confirmed! New seqno: ${currentSeqno}`);
    return true;
}

/**
 * Получение секретного ключа из мнемонической фразы
 */
async function getSecretKey() {
    if (!process.env.MNEMONIC) {
        throw new Error('MNEMONIC not set in .env.mainnet');
    }
    
    const mnemonicArray = process.env.MNEMONIC.split(' ');
    const keyPair = await mnemonicToPrivateKey(mnemonicArray);
    return keyPair.secretKey;
}

/**
 * Функция задержки
 */
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Создание контента для токена в формате Cell
 */
function createTokenContent() {
    const content = beginCell()
        .storeBuffer(Buffer.from(DEPLOY_CONFIG.contentUrl))
        .endCell();
    return content;
}

/**
 * Основная функция деплоя
 */
async function deploy() {
    // Валидация конфигурации
    validateConfig();
    
    console.log('Starting mainnet deployment...');
    if (isDryRun) {
        console.log('Running in DRY RUN mode - no transactions will be sent');
    } else {
        console.log('Running in LIVE mode - real transactions will be sent');
        console.log('\x1b[31m%s\x1b[0m', 'WARNING: This will deploy contracts to the MAIN NETWORK!');
        console.log('\x1b[31m%s\x1b[0m', 'Press Ctrl+C within 5 seconds to abort');
        await sleep(5000);
    }
    
    // Инициализация клиента TON
    const client = new TonClient({
        endpoint: 'https://toncenter.com/api/v2/jsonRPC',
        apiKey: process.env.TONCENTER_API_KEY
    });
    
    // Инициализация кошелька
    const secretKey = await getSecretKey();
    const wallet = WalletContractV4.create({
        publicKey: (await mnemonicToPrivateKey(process.env.MNEMONIC!.split(' '))).publicKey,
        workchain: 0
    });
    
    console.log(`Wallet address: ${wallet.address.toString()}`);
    
    // Проверка баланса кошелька
    const walletBalance = await client.getBalance(wallet.address);
    console.log(`Wallet balance: ${walletBalance} TON`);
    
    const requiredBalance = DEPLOY_CONFIG.deployAmount * 2n + toNano('0.5');
    if (walletBalance < requiredBalance) {
        throw new Error(`Insufficient wallet balance. Required at least ${requiredBalance} TON for deployment`);
    }
    
    // Создание и деплой контракта распределения средств
    console.log('\nDeploying FundsDistributor contract...');
    const fundsDistributor = FundsDistributor.createFromConfig({
        owner: Address.parse(DEPLOY_CONFIG.ownerAddress),
        charity1: Address.parse(DEPLOY_CONFIG.charities[0].address),
        charity1Percentage: DEPLOY_CONFIG.charities[0].percentage,
        charity2: Address.parse(DEPLOY_CONFIG.charities[1].address),
        charity2Percentage: DEPLOY_CONFIG.charities[1].percentage,
        charity3: Address.parse(DEPLOY_CONFIG.charities[2].address),
        charity3Percentage: DEPLOY_CONFIG.charities[2].percentage
    }, createTokenContent());
    
    const fundsDistributorAddress = fundsDistributor.address;
    console.log(`FundsDistributor address: ${fundsDistributorAddress.toString()}`);
    
    // Отправка транзакции для деплоя распределителя средств
    await sendDeployTransaction(client, wallet, fundsDistributorAddress, DEPLOY_CONFIG.deployAmount);
    
    // Создание и деплой контракта токена
    console.log('\nDeploying AnimalHelperToken contract...');
    const animalHelperToken = AnimalHelperToken.createFromConfig({
        owner: Address.parse(DEPLOY_CONFIG.ownerAddress),
        distributionContract: fundsDistributorAddress,
        nftContract: fundsDistributorAddress, // Временно используем тот же адрес
        totalSupply: DEPLOY_CONFIG.totalSupply,
        mintable: true,
        content: createTokenContent()
    }, createTokenContent());
    
    const tokenAddress = animalHelperToken.address;
    console.log(`AnimalHelperToken address: ${tokenAddress.toString()}`);
    
    // Отправка транзакции для деплоя токена
    await sendDeployTransaction(client, wallet, tokenAddress, DEPLOY_CONFIG.deployAmount);
    
    // Сохранение информации о деплое
    saveDeployInfo({
        network: 'mainnet',
        timestamp: new Date().toISOString(),
        deployerWallet: wallet.address.toString(),
        distributorContract: fundsDistributorAddress.toString(),
        tokenContract: tokenAddress.toString(),
        ownerAddress: DEPLOY_CONFIG.ownerAddress,
        charities: DEPLOY_CONFIG.charities
    });
    
    console.log('\nDeployment completed successfully');
    console.log('Next steps:');
    console.log('1. Verify contracts on TON Explorer (https://tonscan.org)');
    console.log('2. Update web UI with new contract addresses');
    console.log('3. Run initial tests on the main network');
}

// Запуск деплоя
deploy().catch(e => {
    console.error(e);
    process.exit(1);
}); 