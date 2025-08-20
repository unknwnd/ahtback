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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const crypto_1 = require("@ton/crypto");
const dotenv = __importStar(require("dotenv"));
// Импортируем модули контрактов
const AnimalHelperToken_AnimalHelperToken_1 = require("../build/AnimalHelperToken_AnimalHelperToken");
const FundsDistributor_FundsDistributor_1 = require("../build/FundsDistributor_FundsDistributor");
const AnimalHelperVoting_AnimalHelperVoting_1 = require("../build/AnimalHelperVoting_AnimalHelperVoting");
const AnimalHelperPool_AnimalHelperPool_1 = require("../build/AnimalHelperPool_AnimalHelperPool");
const LiquidityLock_LiquidityLock_1 = require("../build/LiquidityLock_LiquidityLock");
const TeamVesting_TeamVesting_1 = require("../build/TeamVesting_TeamVesting");
const TokenSale_TokenSale_1 = require("../build/TokenSale_TokenSale");
// Загружаем переменные окружения
dotenv.config();
// --- Конфигурация ---
const OWNER_ADDRESS = core_1.Address.parse(process.env.OWNER_ADDRESS || 'UQD9fr8gEkfEZiynEQDhPFk2jSi0dOW_suTGfqjAuiywL_Wm');
const TEAM_ADDRESS = core_1.Address.parse(process.env.TEAM_ADDRESS || 'UQCL4fFEzJj4t-D4Mf48f3fS_sbAk-eO4gOF4cnqQKzx5OB_');
const LIQUIDITY_POOL_ADDRESS = core_1.Address.parse(process.env.LIQUIDITY_POOL_ADDRESS || 'UQAaIg0I6TmLb5AXeNMIm3lr6RdXgMXQo5I3y5ewajNBNuTq');
const PROJECT_POOL_ADDRESS = core_1.Address.parse(process.env.PROJECT_POOL_ADDRESS || 'UQC6rKQr8Kwae6CV_4B8vxtv5XK88k65VjYzZWh6Ah2aZnMH');
const INVESTORS_CREATORS_POOL_ADDRESS = core_1.Address.parse(process.env.INVESTORS_CREATORS_POOL_ADDRESS || 'UQCL4fFEzJj4t-D4Mf48f3fS_sbAk-eO4gOF4cnqQKzx5OB_');
const MNEMONIC = (process.env.MNEMONIC || '').split(' ');
const ENDPOINT = process.env.ENDPOINT || 'https://testnet.toncenter.com/api/v2/jsonRPC';
const client = new ton_1.TonClient({
    endpoint: ENDPOINT,
    apiKey: process.env.API_KEY,
});
// Константы
const LOCK_DURATION_SECONDS = 31536000 * 2; // 24 месяца в секундах (2 года)
const TEAM_CLIFF_SECONDS = 31536000; // 1 год клифф
const TEAM_VESTING_SECONDS = 31536000 * 2; // 2 года вестинг после клиффа
const TOKEN_SALE_RATE = 100000n; // 1 TON = 100,000 токенов (используем BigInt)
const TOTAL_SUPPLY = 1000000000000000n; // 1 квадриллион токенов (в минимальных единицах)
async function waitSeqno(walletContract, currentSeqno) {
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
async function deployContract(walletContract, keyPair, contractName, contract, value, payload) {
    console.log(`\n--- Deploying ${contractName} ---`);
    const seqno = await walletContract.getSeqno();
    await walletContract.sendTransfer({
        secretKey: keyPair.secretKey,
        seqno: seqno,
        messages: [
            (0, ton_1.internal)({
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
async function sendMessage(walletContract, keyPair, to, value, body) {
    const seqno = await walletContract.getSeqno();
    await walletContract.sendTransfer({
        secretKey: keyPair.secretKey,
        seqno: seqno,
        messages: [(0, ton_1.internal)({ to, value, body, })],
    });
    await waitSeqno(walletContract, seqno);
}
async function main() {
    console.log('--- Starting full deployment script ---');
    if (!process.env.MNEMONIC) {
        throw new Error('MNEMONIC environment variable is not set!');
    }
    const keyPair = await (0, crypto_1.mnemonicToPrivateKey)(MNEMONIC);
    const wallet = ton_1.WalletContractV4.create({ publicKey: keyPair.publicKey, workchain: 0 });
    const walletContract = client.open(wallet);
    console.log(`Deployer wallet address: ${walletContract.address}`);
    const balance = await client.getBalance(walletContract.address);
    console.log(`Wallet balance: ${Number(balance) / 1e9} TON`);
    if (balance < (0, core_1.toNano)('5')) {
        throw new Error('Insufficient balance. Need at least 5 TON for full deployment.');
    }
    // --- 1. Инициализация всех контрактов ---
    console.log('\n--- Initializing contracts ---');
    // Код кошелька Jetton
    const walletCodeBuffer = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'build', 'JettonWallet_JettonWallet.code.boc'));
    const walletCode = core_1.Cell.fromBoc(walletCodeBuffer)[0];
    const tempAddress = OWNER_ADDRESS; // Используем как временную заглушку
    // Инициализируем контракты, которые не имеют зависимостей или чьи зависимости уже известны
    const liquidityLock = await LiquidityLock_LiquidityLock_1.LiquidityLock.fromInit(OWNER_ADDRESS, LIQUIDITY_POOL_ADDRESS, BigInt(LOCK_DURATION_SECONDS));
    const animalHelperPool = await AnimalHelperPool_AnimalHelperPool_1.AnimalHelperPool.fromInit(OWNER_ADDRESS, tempAddress);
    const animalHelperVoting = await AnimalHelperVoting_AnimalHelperVoting_1.AnimalHelperVoting.fromInit(OWNER_ADDRESS, tempAddress, animalHelperPool.address);
    // Теперь FundsDistributor, у которого много зависимостей
    const fundsDistributor = await FundsDistributor_FundsDistributor_1.FundsDistributor.fromInit(OWNER_ADDRESS, LIQUIDITY_POOL_ADDRESS, liquidityLock.address, animalHelperPool.address, PROJECT_POOL_ADDRESS, INVESTORS_CREATORS_POOL_ADDRESS);
    const teamVesting = await TeamVesting_TeamVesting_1.TeamVesting.fromInit(OWNER_ADDRESS, TEAM_ADDRESS, tempAddress, BigInt(TEAM_CLIFF_SECONDS), BigInt(TEAM_VESTING_SECONDS));
    const tokenSale = await TokenSale_TokenSale_1.TokenSale.fromInit(OWNER_ADDRESS, tempAddress, tempAddress, fundsDistributor.address, TOKEN_SALE_RATE);
    // Наконец, главный контракт токена, который знает адреса TeamVesting и TokenSale
    const tokenMetadata = (0, utils_1.buildTokenMetadata)();
    const tokenContract = await AnimalHelperToken_AnimalHelperToken_1.AnimalHelperToken.fromInit(OWNER_ADDRESS, tokenMetadata, walletCode, teamVesting.address, tokenSale.address);
    // --- 2. Деплоим все контракты ---
    await deployContract(walletContract, keyPair, 'LiquidityLock', liquidityLock, (0, core_1.toNano)('0.1'));
    await deployContract(walletContract, keyPair, 'AnimalHelperPool', animalHelperPool, (0, core_1.toNano)('0.1'));
    await deployContract(walletContract, keyPair, 'AnimalHelperVoting', animalHelperVoting, (0, core_1.toNano)('0.1'));
    await deployContract(walletContract, keyPair, 'FundsDistributor', fundsDistributor, (0, core_1.toNano)('0.1'));
    await deployContract(walletContract, keyPair, 'TeamVesting', teamVesting, (0, core_1.toNano)('0.1'));
    await deployContract(walletContract, keyPair, 'TokenSale', tokenSale, (0, core_1.toNano)('0.1'));
    // Деплой основного токена БЕЗ минтинга
    await deployContract(walletContract, keyPair, 'AnimalHelperToken', tokenContract, (0, core_1.toNano)('0.2'));
    // --- 3. Настройка адресов ---
    console.log('\n--- Configuring contracts ---');
    // Функция для создания сообщения для обновления адреса
    const createSetAddressPayload = (op_code, address) => {
        return (0, core_1.beginCell)()
            .storeUint(op_code, 32)
            .storeUint(0, 64) // query_id
            .storeAddress(address)
            .endCell();
    };
    // Обновляем адреса
    console.log('Updating addresses...');
    await sendMessage(walletContract, keyPair, animalHelperPool.address, (0, core_1.toNano)('0.05'), createSetAddressPayload(0x6a6048d0, animalHelperVoting.address)); // set_voting_address
    await sendMessage(walletContract, keyPair, animalHelperVoting.address, (0, core_1.toNano)('0.05'), createSetAddressPayload(0x2d5e2193, tokenContract.address)); // set_jetton_address
    await sendMessage(walletContract, keyPair, teamVesting.address, (0, core_1.toNano)('0.05'), createSetAddressPayload(0x2d5e2193, tokenContract.address)); // set_jetton_address
    await sendMessage(walletContract, keyPair, tokenSale.address, (0, core_1.toNano)('0.05'), createSetAddressPayload(0x2d5e2193, tokenContract.address)); // set_jetton_address
    // Открываем контракт токена через клиент, чтобы использовать его геттеры
    const openedTokenContract = client.open(AnimalHelperToken_AnimalHelperToken_1.AnimalHelperToken.fromAddress(tokenContract.address));
    // Получаем адрес jetton-кошелька контракта TokenSale с помощью нового геттера
    const tokenSaleJettonWallet = await openedTokenContract.getGetWalletAddress(tokenSale.address);
    console.log(`TokenSale's future Jetton Wallet: ${tokenSaleJettonWallet}`);
    await sendMessage(walletContract, keyPair, tokenSale.address, (0, core_1.toNano)('0.05'), createSetAddressPayload(0x454d8f28, tokenSaleJettonWallet)); // set_jetton_wallet_address
    // --- 4. Выполняем начальный минтинг ---
    console.log('\n--- Performing initial minting ---');
    // Отправляем команду на начальный минтинг
    const mintPayload = (0, core_1.beginCell)()
        .storeUint(0, 32) // op_code для текстового сообщения
        .storeStringTail("mint_initial")
        .endCell();
    await sendMessage(walletContract, keyPair, tokenContract.address, (0, core_1.toNano)('0.3'), mintPayload);
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
