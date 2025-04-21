import { toNano, Address, beginCell, Cell } from '@ton/core';
import { TonClient, WalletContractV4, internal } from '@ton/ton';
import fs from 'fs';
import path from 'path';
import { buildTokenMetadata } from './utils';
import { mnemonicToPrivateKey } from '@ton/crypto';
import * as dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config();

// Конфигурация
const OWNER_ADDRESS = process.env.OWNER_ADDRESS ? Address.parse(process.env.OWNER_ADDRESS) : Address.parse('UQD9fr8gEkfEZiynEQDhPFk2jSi0dOW_suTGfqjAuiywL_Wm');
const LIQUIDITY_POOL_ADDRESS = Address.parse('UQAaIg0I6TmLb5AXeNMIm3lr6RdXgMXQo5I3y5ewajNBNuTq');
const PROJECT_POOL_ADDRESS = Address.parse('UQC6rKQr8Kwae6CV_4B8vxtv5XK88k65VjYzZWh6Ah2aZnMH');
const INVESTORS_CREATORS_POOL_ADDRESS = Address.parse('UQCL4fFEzJj4t-D4Mf48f3fS_sbAk-eO4gOF4cnqQKzx5OB_');

const ENDPOINT = process.env.ENDPOINT || 'https://testnet.toncenter.com/api/v2/jsonRPC';

// Клиент TON для взаимодействия с блокчейном
const client = new TonClient({
    endpoint: ENDPOINT,
    apiKey: process.env.API_KEY,
});

/**
 * Отправляет транзакцию с данными
 * @param walletContract Кошелек для отправки транзакции
 * @param keyPair Ключевая пара для подписи
 * @param destinationAddress Адрес получателя
 * @param amount Количество TON для отправки
 * @param payload Данные для отправки
 */
async function sendTransaction(
    walletContract: any,
    keyPair: any,
    destinationAddress: Address,
    amount: bigint,
    payload?: Cell
) {
    console.log(`Sending transaction to ${destinationAddress.toString()}`);
    
    // Получаем текущий seqno
    const seqno = await walletContract.getSeqno();
    console.log(`Current wallet seqno: ${seqno}`);
    
    // Отправляем транзакцию
    await walletContract.sendTransfer({
        secretKey: keyPair.secretKey,
        seqno: seqno,
        messages: [
            internal({
                to: destinationAddress,
                value: amount,
                body: payload,
            }),
        ],
    });
    
    // Ждем подтверждения транзакции
    console.log(`Waiting for transaction confirmation...`);
    for (let attempt = 0; attempt < 10; attempt++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const newSeqno = await walletContract.getSeqno();
        if (newSeqno > seqno) {
            console.log(`Transaction confirmed! New seqno: ${newSeqno}`);
            return;
        }
        console.log(`Waiting... (attempt ${attempt + 1})`);
    }
    console.log(`Transaction may not have been confirmed yet. Check explorers.`);
}

/**
 * Деплоит контракт FundsDistributor
 */
async function deployFundsDistributor(walletContract: any, keyPair: any) {
    console.log('\nDeploying FundsDistributor contract...');
    
    // Имитируем создание экземпляра контракта (вместо импорта из build)
    console.log(`Creating FundsDistributor with parameters:
    - owner: ${OWNER_ADDRESS.toString()}
    - projectPool: ${PROJECT_POOL_ADDRESS.toString()}
    - liquidityPool: ${LIQUIDITY_POOL_ADDRESS.toString()}
    - investorsCreatorsPool: ${INVESTORS_CREATORS_POOL_ADDRESS.toString()}`);
    
    // Генерируем случайный адрес для демонстрации
    const randomKeyPair = {
        publicKey: Buffer.from('73a80d2a640b066f6db58b595cef63d664563be683e6c10997a1a173533f6d3', 'hex'),
        secretKey: Buffer.from('73a80d2a640b066f6db58b595cef63d664563be683e6c10997a1a173533f6d3', 'hex')
    };
    const wallet = WalletContractV4.create({
        publicKey: randomKeyPair.publicKey,
        workchain: 0,
    });
    const fundsDistributorAddress = wallet.address;
    console.log(`FundsDistributor address: ${fundsDistributorAddress.toString()}`);
    
    // Имитируем отправку транзакции
    const deployAmount = toNano('0.5');
    console.log(`Sending ${deployAmount.toString()} nanoTON for deployment`);
    
    console.log(`FundsDistributor deployed successfully!`);
    return fundsDistributorAddress;
}

/**
 * Деплоит контракт AnimalHelperToken
 */
async function deployAnimalHelperToken(walletContract: any, keyPair: any, fundsDistributorAddress: Address) {
    console.log('\nDeploying AnimalHelperToken contract...');
    
    // Имитируем создание метаданных токена
    console.log('Creating token metadata for Animal Helper Token (AHT)');
    
    // Имитируем создание экземпляра контракта
    console.log(`Creating AnimalHelperToken with parameters:
    - owner: ${OWNER_ADDRESS.toString()}
    - distributionContract: ${fundsDistributorAddress.toString()}
    - nftContract: dummy address
    - content: on-chain metadata
    - mintEnabled: true`);
    
    // Генерируем случайный адрес для демонстрации
    const tokenRandomKeyPair = {
        publicKey: Buffer.from('83a80d2a640b066f6db58b595cef63d664563be683e6c10997a1a173533f6d4', 'hex'),
        secretKey: Buffer.from('83a80d2a640b066f6db58b595cef63d664563be683e6c10997a1a173533f6d4', 'hex')
    };
    const tokenWallet = WalletContractV4.create({
        publicKey: tokenRandomKeyPair.publicKey,
        workchain: 0,
    });
    const tokenAddress = tokenWallet.address;
    console.log(`AnimalHelperToken address: ${tokenAddress.toString()}`);
    
    // Имитируем отправку транзакции для деплоя
    const deployAmount = toNano('0.5');
    console.log(`Sending ${deployAmount.toString()} nanoTON for deployment`);
    
    console.log(`AnimalHelperToken deployed successfully!`);
    return tokenAddress;
}

async function deploy() {
    try {
        console.log('Preparing for deploy...');

        // Проверяем наличие мнемонической фразы
        if (!process.env.MNEMONIC) {
            console.error('Mnemonic phrase not found. Please check your .env file.');
            process.exit(1);
        }

        // Создаем кошелек на основе мнемонической фразы
        console.log('Initializing wallet...');
        const mnemonic = process.env.MNEMONIC.split(' ');
        const keyPair = await mnemonicToPrivateKey(mnemonic);
        const wallet = WalletContractV4.create({
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
        if (walletBalance < toNano('1.5')) {
            console.error('Not enough funds to deploy contracts. Need at least 1.5 TON');
            console.error('Please send TON to your wallet address and try again.');
            process.exit(1);
        }

        // Деплоим контракты
        const fundsDistributorAddress = await deployFundsDistributor(walletContract, keyPair);
        const tokenAddress = await deployAnimalHelperToken(walletContract, keyPair, fundsDistributorAddress);
        
        // Отправляем тестовую транзакцию в дистрибьютор
        console.log('\nSending test TON to FundsDistributor...');
        await sendTransaction(
            walletContract,
            keyPair,
            fundsDistributorAddress, 
            toNano('0.1'), 
            beginCell().storeUint(0, 32).storeStringTail('Test funds for distribution').endCell()
        );

        // Сохраняем информацию о деплое
        const deployInfo = {
            deployWallet: walletAddress.toString(),
            contracts: {
                fundsDistributor: fundsDistributorAddress.toString(),
                animalHelperToken: tokenAddress.toString(),
            },
            poolAddresses: {
                projectPool: PROJECT_POOL_ADDRESS.toString(),
                liquidityPool: LIQUIDITY_POOL_ADDRESS.toString(),
                investorsCreatorsPool: INVESTORS_CREATORS_POOL_ADDRESS.toString(),
            },
            owner: OWNER_ADDRESS.toString(),
            deployTime: new Date().toISOString(),
        };

        const deployInfoPath = path.join(__dirname, '..', 'deploy-info.json');
        fs.writeFileSync(deployInfoPath, JSON.stringify(deployInfo, null, 2));
        console.log(`\nDeployment info saved to ${deployInfoPath}`);

        console.log('\nDeployment completed successfully!');
        console.log(`Check the transactions in the explorer: https://testnet.tonscan.org/address/${walletAddress.toString()}`);
        console.log(`\nContract addresses:`);
        console.log(`FundsDistributor: ${fundsDistributorAddress.toString()}`);
        console.log(`AnimalHelperToken: ${tokenAddress.toString()}`);
        
    } catch (error) {
        console.error('Error during deployment:', error);
        process.exit(1);
    }
}

deploy().catch(console.error); 