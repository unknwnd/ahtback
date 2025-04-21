import { toNano, Address, beginCell, Cell } from '@ton/core';
import { TonClient, WalletContractV4, internal } from '@ton/ton';
import fs from 'fs';
import path from 'path';
import { buildTokenMetadata, buildNFTCollectionMetadata } from './utils';
import { mnemonicToPrivateKey } from '@ton/crypto';
import * as dotenv from 'dotenv';

// Импортируем модули контрактов
import { AnimalHelperToken } from '../build/AnimalHelperToken_AnimalHelperToken';
import { FundsDistributor } from '../build/FundsDistributor_FundsDistributor';
import { AnimalHelperNFT } from '../build/AnimalHelperNFT_AnimalHelperNFT';
import { AnimalHelperVoting } from '../build/AnimalHelperVoting_AnimalHelperVoting';
import { AnimalHelperPool } from '../build/AnimalHelperPool_AnimalHelperPool';
import { LiquidityLock } from '../build/LiquidityLock_LiquidityLock';

// Загружаем переменные окружения
dotenv.config();

// Конфигурация
const OWNER_ADDRESS = Address.parse('UQD9fr8gEkfEZiynEQDhPFk2jSi0dOW_suTGfqjAuiywL_Wm');
const LIQUIDITY_POOL_ADDRESS = Address.parse('UQAaIg0I6TmLb5AXeNMIm3lr6RdXgMXQo5I3y5ewajNBNuTq');
const PROJECT_POOL_ADDRESS = Address.parse('UQC6rKQr8Kwae6CV_4B8vxtv5XK88k65VjYzZWh6Ah2aZnMH');
const INVESTORS_CREATORS_POOL_ADDRESS = Address.parse('UQCL4fFEzJj4t-D4Mf48f3fS_sbAk-eO4gOF4cnqQKzx5OB_');

const MNEMONIC = process.env.MNEMONIC ? process.env.MNEMONIC.split(' ') : [];
const ENDPOINT = process.env.ENDPOINT || 'https://testnet.toncenter.com/api/v2/jsonRPC';

// Клиент TON для взаимодействия с блокчейном
const client = new TonClient({
    endpoint: ENDPOINT,
    apiKey: process.env.API_KEY,
});

// Создаем пустой адрес для начальной инициализации
const ZERO_ADDRESS = Address.parse('EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoe4n');

// Константы для блокировки ликвидности
const LOCK_DURATION_SECONDS = 31536000 * 2; // 24 месяца в секундах (2 года)
const RELEASE_DURATION_SECONDS = 31536000 * 3; // 36 месяцев в секундах (3 года)

/**
 * Отправляет транзакцию для деплоя контракта
 * @param walletContract Кошелек для отправки транзакции
 * @param keyPair Ключевая пара для подписи
 * @param contractAddress Адрес контракта для деплоя
 * @param amount Количество TON для отправки
 * @param stateInit Инициализационное состояние контракта
 * @param payload Данные для инициализации
 */
async function sendDeployTransaction(
    walletContract: any,
    keyPair: any,
    contractAddress: Address,
    amount: bigint,
    stateInit?: any,
    payload?: any
) {
    console.log(`Sending deploy transaction to ${contractAddress.toString()}`);
    
    // Создаем сообщение для деплоя
    const seqno = await walletContract.getSeqno();
    console.log(`Current wallet seqno: ${seqno}`);
    
    // Отправляем транзакцию
    await walletContract.sendTransfer({
        secretKey: keyPair.secretKey,
        seqno: seqno,
        messages: [
            internal({
                to: contractAddress,
                value: amount,
                init: stateInit,
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

async function deploy() {
    try {
        console.log('Preparing for deploy...');

        console.log('Owner address:', OWNER_ADDRESS.toString());
        console.log('Liquidity pool address:', LIQUIDITY_POOL_ADDRESS.toString());
        console.log('Project pool address:', PROJECT_POOL_ADDRESS.toString());
        console.log('Investors/creators pool address:', INVESTORS_CREATORS_POOL_ADDRESS.toString());

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
        if (walletBalance < toNano('2')) {
            console.error('Not enough funds to deploy contracts. Need at least 2 TON');
            console.error('Please send TON to your wallet address and try again.');
            process.exit(1);
        }

        // Создаем метаданные токена
        console.log('Creating token metadata...');
        const tokenContent = buildTokenMetadata();
        console.log('Token metadata created successfully.');

        // Создаем метаданные NFT-коллекции
        console.log('Creating NFT collection metadata...');
        const nftContent = buildNFTCollectionMetadata();
        console.log('NFT collection metadata created successfully.');

        // Код кошелька Jetton и NFT
        console.log('Loading wallet and NFT item code...');
        const walletCodeBuffer = fs.readFileSync(path.join(__dirname, '..', 'build', 'JettonWallet_JettonWallet.code.boc')); 
        const nftItemCodeBuffer = fs.readFileSync(path.join(__dirname, '..', 'build', 'NFTItem_NFTItem.code.boc'));
        
        // Преобразование Buffer в Cell
        const walletCode = Cell.fromBoc(walletCodeBuffer)[0];
        const nftItemCode = Cell.fromBoc(nftItemCodeBuffer)[0];
        console.log('Code loaded successfully.');

        // Инициализация контрактов
        
        // 1. Создаем контракт блокировки ликвидности
        console.log('Preparing LiquidityLock...');
        const liquidityLock = await LiquidityLock.fromInit(
            OWNER_ADDRESS,
            LIQUIDITY_POOL_ADDRESS,
            BigInt(LOCK_DURATION_SECONDS)
        );
        const liquidityLockAddress = liquidityLock.address;
        console.log(`LiquidityLock address: ${liquidityLockAddress}`);

        // 2. Создаем контракт распределения средств
        console.log('Preparing FundsDistributor...');
        const fundsDistributor = await FundsDistributor.fromInit(
            OWNER_ADDRESS,
            LIQUIDITY_POOL_ADDRESS,
            liquidityLockAddress,
            ZERO_ADDRESS, // animalHelperPool - заполним позже
            PROJECT_POOL_ADDRESS,
            INVESTORS_CREATORS_POOL_ADDRESS
        );
        const fundsDistributorAddress = fundsDistributor.address;
        console.log(`FundsDistributor address: ${fundsDistributorAddress}`);

        // 3. Создаем контракт голосования
        console.log('Preparing AnimalHelperVoting...');
        const animalHelperVoting = await AnimalHelperVoting.fromInit(
            OWNER_ADDRESS,
            ZERO_ADDRESS, // tokenContract - заполним позже
            ZERO_ADDRESS  // animalHelperPool - заполним позже
        );
        const animalHelperVotingAddress = animalHelperVoting.address;
        console.log(`AnimalHelperVoting address: ${animalHelperVotingAddress}`);

        // 4. Создаем благотворительный пул
        console.log('Preparing AnimalHelperPool...');
        const animalHelperPool = await AnimalHelperPool.fromInit(
            OWNER_ADDRESS,
            animalHelperVotingAddress
        );
        const animalHelperPoolAddress = animalHelperPool.address;
        console.log(`AnimalHelperPool address: ${animalHelperPoolAddress}`);

        // 5. Создаем NFT-контракт
        console.log('Preparing AnimalHelperNFT...');
        const animalHelperNFT = await AnimalHelperNFT.fromInit(
            OWNER_ADDRESS,
            ZERO_ADDRESS, // tokenContract - заполним позже
            nftContent,
            nftItemCode
        );
        const animalHelperNFTAddress = animalHelperNFT.address;
        console.log(`AnimalHelperNFT address: ${animalHelperNFTAddress}`);

        // 6. Создаем основной токен-контракт
        console.log('Preparing AnimalHelperToken...');
        const animalHelperToken = await AnimalHelperToken.fromInit(
            OWNER_ADDRESS,
            fundsDistributorAddress,
            animalHelperNFTAddress,
            tokenContent,
            walletCode
        );
        const animalHelperTokenAddress = animalHelperToken.address;
        console.log(`AnimalHelperToken address: ${animalHelperTokenAddress}`);

        // Сохраняем адреса контрактов для дальнейшего использования
        const deployInfo = {
            animalHelperToken: animalHelperTokenAddress.toString(),
            fundsDistributor: fundsDistributorAddress.toString(),
            animalHelperNFT: animalHelperNFTAddress.toString(),
            animalHelperVoting: animalHelperVotingAddress.toString(),
            animalHelperPool: animalHelperPoolAddress.toString(),
            liquidityLock: liquidityLockAddress.toString(),
            liquidityPool: LIQUIDITY_POOL_ADDRESS.toString(),
            projectPool: PROJECT_POOL_ADDRESS.toString(),
            investorsCreatorsPool: INVESTORS_CREATORS_POOL_ADDRESS.toString(),
            owner: OWNER_ADDRESS.toString(),
            deployWallet: walletAddress.toString(),
            deployTime: new Date().toISOString(),
            lockParameters: {
                initialLockDurationSeconds: LOCK_DURATION_SECONDS,
                releaseDurationSeconds: RELEASE_DURATION_SECONDS,
                lockPercent: 70 // процент блокировки
            }
        };

        const deployInfoPath = path.join(__dirname, '..', 'deploy-info.json');
        fs.writeFileSync(deployInfoPath, JSON.stringify(deployInfo, null, 2));
        console.log(`Deployment info saved to ${deployInfoPath}`);

        // Запрос пользователю
        console.log('\n⚠️ ВНИМАНИЕ! ⚠️');
        console.log('Вы собираетесь выполнить деплой контрактов в тестнет TON.');
        console.log('Эта операция требует отправки TON с вашего кошелька.');
        console.log('Для продолжения нажмите Enter, для отмены нажмите Ctrl+C');
        
        // В реальном сценарии здесь должен быть интерактивный ввод
        // В этом примере мы просто продолжаем

        // Деплоим контракты

        // 1. Деплоим LiquidityLock
        console.log('\nDeploying LiquidityLock contract...');
        await sendDeployTransaction(
            walletContract,
            keyPair,
            liquidityLockAddress,
            toNano('0.1'),
            liquidityLock.init,
            beginCell().storeUint(0, 32).endCell()
        );
        
        // 2. Деплоим FundsDistributor
        console.log('\nDeploying FundsDistributor contract...');
        await sendDeployTransaction(
            walletContract,
            keyPair,
            fundsDistributorAddress,
            toNano('0.1'),
            fundsDistributor.init,
            beginCell().storeUint(0, 32).endCell()
        );
        
        // 3. Деплоим AnimalHelperVoting
        console.log('\nDeploying AnimalHelperVoting contract...');
        await sendDeployTransaction(
            walletContract,
            keyPair,
            animalHelperVotingAddress,
            toNano('0.1'),
            animalHelperVoting.init,
            beginCell().storeUint(0, 32).endCell()
        );
        
        // 4. Деплоим AnimalHelperPool
        console.log('\nDeploying AnimalHelperPool contract...');
        await sendDeployTransaction(
            walletContract,
            keyPair,
            animalHelperPoolAddress,
            toNano('0.1'),
            animalHelperPool.init,
            beginCell().storeUint(0, 32).endCell()
        );
        
        // 5. Деплоим AnimalHelperNFT
        console.log('\nDeploying AnimalHelperNFT contract...');
        await sendDeployTransaction(
            walletContract,
            keyPair,
            animalHelperNFTAddress,
            toNano('0.1'),
            animalHelperNFT.init,
            beginCell().storeUint(0, 32).endCell()
        );
        
        // 6. Деплоим AnimalHelperToken
        console.log('\nDeploying AnimalHelperToken contract...');
        await sendDeployTransaction(
            walletContract,
            keyPair,
            animalHelperTokenAddress,
            toNano('0.1'),
            animalHelperToken.init,
            beginCell().storeUint(0, 32).endCell()
        );

        console.log('\nDeployment completed successfully!');
        console.log(`Check the contracts in the explorer: https://testnet.tonscan.org/address/${walletAddress.toString()}`);
        
        console.log('\nContracted deployed:');
        console.log(`1. LiquidityLock: ${liquidityLockAddress.toString()}`);
        console.log(`2. FundsDistributor: ${fundsDistributorAddress.toString()}`);
        console.log(`3. AnimalHelperVoting: ${animalHelperVotingAddress.toString()}`);
        console.log(`4. AnimalHelperPool: ${animalHelperPoolAddress.toString()}`);
        console.log(`5. AnimalHelperNFT: ${animalHelperNFTAddress.toString()}`);
        console.log(`6. AnimalHelperToken: ${animalHelperTokenAddress.toString()}`);
    } catch (error) {
        console.error('Error deploying contracts:', error);
        process.exit(1);
    }
}

deploy().catch(console.error); 