import { toNano, Address, beginCell, Cell } from '@ton/core';
import { TonClient, WalletContractV4, internal } from '@ton/ton';
import fs from 'fs';
import path from 'path';
import { buildTokenMetadata } from './utils';
import { mnemonicToPrivateKey } from '@ton/crypto';
import * as dotenv from 'dotenv';

// Импортируем модули контрактов
import { AnimalHelperToken } from '../build/AnimalHelperToken_AnimalHelperToken';
import { FundsDistributor } from '../build/FundsDistributor_FundsDistributor';
import { AnimalHelperVoting } from '../build/AnimalHelperVoting_AnimalHelperVoting';
import { AnimalHelperPool } from '../build/AnimalHelperPool_AnimalHelperPool';
import { LiquidityLock } from '../build/LiquidityLock_LiquidityLock';
import { TeamVesting } from '../build/TeamVesting_TeamVesting';
import { TokenSale } from '../build/TokenSale_TokenSale';
import { JettonWallet } from '../build/JettonWallet_JettonWallet';

// Загружаем переменные окружения
dotenv.config();

// --- Конфигурация ---
const OWNER_ADDRESS = Address.parse(process.env.OWNER_ADDRESS || 'UQD9fr8gEkfEZiynEQDhPFk2jSi0dOW_suTGfqjAuiywL_Wm');
const TEAM_ADDRESS = Address.parse(process.env.TEAM_ADDRESS || 'UQCL4fFEzJj4t-D4Mf48f3fS_sbAk-eO4gOF4cnqQKzx5OB_');
const LIQUIDITY_POOL_ADDRESS = Address.parse(process.env.LIQUIDITY_POOL_ADDRESS || 'UQAaIg0I6TmLb5AXeNMIm3lr6RdXgMXQo5I3y5ewajNBNuTq');
const PROJECT_POOL_ADDRESS = Address.parse(process.env.PROJECT_POOL_ADDRESS || 'UQC6rKQr8Kwae6CV_4B8vxtv5XK88k65VjYzZWh6Ah2aZnMH');
const INVESTORS_CREATORS_POOL_ADDRESS = Address.parse(process.env.INVESTORS_CREATORS_POOL_ADDRESS || 'UQCL4fFEzJj4t-D4Mf48f3fS_sbAk-eO4gOF4cnqQKzx5OB_');

const MNEMONIC = (process.env.MNEMONIC || '').split(' ');
const ENDPOINT = process.env.ENDPOINT || 'https://testnet.toncenter.com/api/v2/jsonRPC';

const client = new TonClient({
    endpoint: ENDPOINT,
    apiKey: process.env.API_KEY,
});

// Константы
const LOCK_DURATION_SECONDS = 31536000 * 2; // 24 месяца в секундах (2 года)
const TEAM_CLIFF_SECONDS = 31536000;      // 1 год клифф
const TEAM_VESTING_SECONDS = 31536000 * 2; // 2 года вестинг после клиффа
const TOKEN_SALE_RATE = 100000n;           // 1 TON = 100,000 токенов (используем BigInt)
const TOTAL_SUPPLY = 1_000_000_000_000_000n; // 1 квадриллион токенов (в минимальных единицах)

async function waitSeqno(walletContract: any, currentSeqno: number) {
    for (let attempt = 0; attempt < 15; attempt++) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const newSeqno = await walletContract.getSeqno();
        if (newSeqno > currentSeqno) {
            console.log(`Transaction confirmed! New seqno: ${newSeqno}`);
            return;
        }
        console.log(`Waiting for seqno to change... (attempt ${attempt + 1})`);
    }
    throw new Error('Transaction confirmation timed out.');
}

async function deployContract(
    walletContract: any,
    keyPair: any,
    contractName: string,
    contract: any,
    value: bigint,
    payload?: Cell
) {
    console.log(`\n--- Deploying ${contractName} ---`);
    const seqno = await walletContract.getSeqno();

    await walletContract.sendTransfer({
        secretKey: keyPair.secretKey,
        seqno: seqno,
        messages: [
            internal({
                to: contract.address,
                value: value,
                init: contract.init,
                body: payload,
            }),
        ],
    });

    await waitSeqno(walletContract, seqno);
    console.log(`${contractName} deployed at: ${contract.address}`);
}

async function sendMessage(
    walletContract: any,
    keyPair: any,
    to: Address,
    value: bigint,
    body: Cell
) {
    const seqno = await walletContract.getSeqno();
    await walletContract.sendTransfer({
        secretKey: keyPair.secretKey,
        seqno: seqno,
        messages: [ internal({ to, value, body, }) ],
    });
    await waitSeqno(walletContract, seqno);
}

async function main() {
    console.log('--- Starting full deployment script ---');
    if (!process.env.MNEMONIC) {
        throw new Error('MNEMONIC environment variable is not set!');
    }

    const keyPair = await mnemonicToPrivateKey(MNEMONIC);
    const wallet = WalletContractV4.create({ publicKey: keyPair.publicKey, workchain: 0 });
    const walletContract = client.open(wallet);
    console.log(`Deployer wallet address: ${walletContract.address}`);

    const balance = await client.getBalance(walletContract.address);
    console.log(`Wallet balance: ${Number(balance) / 1e9} TON`);
    if (balance < toNano('5')) {
        throw new Error('Insufficient balance. Need at least 5 TON for full deployment.');
    }

    // --- 1. Инициализация всех контрактов ---
    console.log('\n--- Initializing contracts ---');
    
    // Код кошелька Jetton
    const walletCodeBuffer = fs.readFileSync(path.join(__dirname, '..', 'build', 'JettonWallet_JettonWallet.code.boc'));
    const walletCode = Cell.fromBoc(walletCodeBuffer)[0];

    const tempAddress = OWNER_ADDRESS; // Используем как временную заглушку

    // Инициализируем контракты, которые не имеют зависимостей или чьи зависимости уже известны
    const liquidityLock = await LiquidityLock.fromInit(OWNER_ADDRESS, LIQUIDITY_POOL_ADDRESS, BigInt(LOCK_DURATION_SECONDS));
    const animalHelperPool = await AnimalHelperPool.fromInit(OWNER_ADDRESS, tempAddress);
    const animalHelperVoting = await AnimalHelperVoting.fromInit(OWNER_ADDRESS, tempAddress, animalHelperPool.address);
    
    // Теперь FundsDistributor, у которого много зависимостей
    const fundsDistributor = await FundsDistributor.fromInit(
        OWNER_ADDRESS,
        LIQUIDITY_POOL_ADDRESS,
        liquidityLock.address,
        animalHelperPool.address,
        PROJECT_POOL_ADDRESS,
        INVESTORS_CREATORS_POOL_ADDRESS
    );

    const teamVesting = await TeamVesting.fromInit(OWNER_ADDRESS, TEAM_ADDRESS, tempAddress, BigInt(TEAM_CLIFF_SECONDS), BigInt(TEAM_VESTING_SECONDS));
    const tokenSale = await TokenSale.fromInit(OWNER_ADDRESS, tempAddress, tempAddress, fundsDistributor.address, TOKEN_SALE_RATE);

    // Наконец, главный контракт токена, который знает адреса TeamVesting и TokenSale
    const tokenMetadata = buildTokenMetadata();
    const tokenContract = await AnimalHelperToken.fromInit(
        OWNER_ADDRESS,
        tokenMetadata,
        walletCode,
        teamVesting.address,
        tokenSale.address
    );

    // --- 2. Деплоим все контракты ---
    await deployContract(walletContract, keyPair, 'LiquidityLock', liquidityLock, toNano('0.1'));
    await deployContract(walletContract, keyPair, 'AnimalHelperPool', animalHelperPool, toNano('0.1'));
    await deployContract(walletContract, keyPair, 'AnimalHelperVoting', animalHelperVoting, toNano('0.1'));
    await deployContract(walletContract, keyPair, 'FundsDistributor', fundsDistributor, toNano('0.1'));
    await deployContract(walletContract, keyPair, 'TeamVesting', teamVesting, toNano('0.1'));
    await deployContract(walletContract, keyPair, 'TokenSale', tokenSale, toNano('0.1'));

    // Деплой основного токена БЕЗ минтинга
    await deployContract(walletContract, keyPair, 'AnimalHelperToken', tokenContract, toNano('0.2'));

    // --- 3. Настройка адресов ---
    console.log('\n--- Configuring contracts ---');
    
    // Функция для создания сообщения для обновления адреса
    const createSetAddressPayload = (op_code: number, address: Address) => {
        return beginCell()
            .storeUint(op_code, 32)
            .storeUint(0, 64) // query_id
            .storeAddress(address)
            .endCell();
    };

    // Обновляем адреса
    console.log('Updating addresses...');
    await sendMessage(walletContract, keyPair, animalHelperPool.address, toNano('0.05'), createSetAddressPayload(0x6a6048d0, animalHelperVoting.address)); // set_voting_address
    await sendMessage(walletContract, keyPair, animalHelperVoting.address, toNano('0.05'), createSetAddressPayload(0x2d5e2193, tokenContract.address)); // set_jetton_address
    await sendMessage(walletContract, keyPair, teamVesting.address, toNano('0.05'), createSetAddressPayload(0x2d5e2193, tokenContract.address)); // set_jetton_address
    await sendMessage(walletContract, keyPair, tokenSale.address, toNano('0.05'), createSetAddressPayload(0x2d5e2193, tokenContract.address)); // set_jetton_address
    
    // Открываем контракт токена через клиент, чтобы использовать его геттеры
    const openedTokenContract = client.open(AnimalHelperToken.fromAddress(tokenContract.address));

    // Получаем адрес jetton-кошелька контракта TokenSale с помощью нового геттера
    const tokenSaleJettonWallet = await openedTokenContract.getGetWalletAddress(tokenSale.address);
    console.log(`TokenSale's future Jetton Wallet: ${tokenSaleJettonWallet}`);
    await sendMessage(walletContract, keyPair, tokenSale.address, toNano('0.05'), createSetAddressPayload(0x454d8f28, tokenSaleJettonWallet)); // set_jetton_wallet_address

    // --- 4. Выполняем начальный минтинг ---
    console.log('\n--- Performing initial minting ---');
    
    // Отправляем команду на начальный минтинг
    const mintPayload = beginCell()
        .storeUint(0, 32) // op_code для текстового сообщения
        .storeStringTail("mint_initial")
        .endCell();
    await sendMessage(walletContract, keyPair, tokenContract.address, toNano('0.3'), mintPayload);

    console.log('\n--- ✅ Full deployment finished successfully! ---');
    console.log('Deployed contract addresses:');
    console.log(`- AnimalHelperToken: ${tokenContract.address}`);
    console.log(`- TeamVesting: ${teamVesting.address}`);
    console.log(`- TokenSale: ${tokenSale.address}`);
    console.log(`- FundsDistributor: ${fundsDistributor.address}`);
    console.log(`- AnimalHelperPool: ${animalHelperPool.address}`);
    console.log(`- AnimalHelperVoting: ${animalHelperVoting.address}`);
    console.log(`- LiquidityLock: ${liquidityLock.address}`);

    // Получаем адрес jetton-кошелька владельца
    const ownerJettonWalletAddress = await openedTokenContract.getGetWalletAddress(OWNER_ADDRESS);
    console.log(`- Owner's Jetton Wallet: ${ownerJettonWalletAddress}`);
}

main().catch(e => {
    console.error('Deployment failed:', e);
    process.exit(1);
}); 