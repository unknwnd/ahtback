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
// Загружаем переменные окружения из .env.mainnet
dotenv.config({ path: path_1.default.resolve(__dirname, '../.env.mainnet') });
// --- КОНФИГУРАЦИЯ МАЙННЕТ ---
const NETWORK = process.env.NETWORK;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const TEAM_ADDRESS = process.env.TEAM_ADDRESS;
const LIQUIDITY_POOL_ADDRESS = process.env.LIQUIDITY_POOL_ADDRESS;
const PROJECT_POOL_ADDRESS = process.env.PROJECT_POOL_ADDRESS;
const INVESTORS_CREATORS_POOL_ADDRESS = process.env.INVESTORS_CREATORS_POOL_ADDRESS;
const MNEMONIC = process.env.MNEMONIC;
const ENDPOINT = process.env.ENDPOINT || 'https://toncenter.com/api/v2/jsonRPC';
// Проверка переменных окружения
function validateEnvironmentVariables() {
    const required = [
        'NETWORK', 'OWNER_ADDRESS', 'TEAM_ADDRESS', 'LIQUIDITY_POOL_ADDRESS',
        'PROJECT_POOL_ADDRESS', 'INVESTORS_CREATORS_POOL_ADDRESS', 'MNEMONIC'
    ];
    for (const varName of required) {
        if (!process.env[varName]) {
            throw new Error(`❌ Missing required environment variable: ${varName}`);
        }
    }
    if (NETWORK !== 'mainnet') {
        throw new Error(`❌ Expected NETWORK=mainnet, got: ${NETWORK}`);
    }
    if (!ENDPOINT?.includes('toncenter.com')) {
        throw new Error(`❌ Expected mainnet endpoint, got: ${ENDPOINT}`);
    }
    console.log('✅ Environment variables validated');
}
const client = new ton_1.TonClient({
    endpoint: ENDPOINT,
    apiKey: process.env.API_KEY,
});
// Константы (2 года блокировки)
const LOCK_DURATION_SECONDS = 31536000 * 2; // 24 месяца
const TEAM_CLIFF_SECONDS = 31536000; // 1 год клифф
const TEAM_VESTING_SECONDS = 31536000 * 2; // 2 года вестинг
const TOKEN_SALE_RATE = BigInt(process.env.TOKEN_SALE_RATE || '100000'); // 1 TON = 100,000 токенов
const TOTAL_SUPPLY = BigInt(process.env.JETTON_TOTAL_SUPPLY || '1000000000000000'); // 1 квадриллион
async function waitSeqno(walletContract, currentSeqno) {
    for (let attempt = 0; attempt < 20; attempt++) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        const newSeqno = await walletContract.getSeqno();
        if (newSeqno > currentSeqno) {
            console.log(`✅ Transaction confirmed! New seqno: ${newSeqno}`);
            return;
        }
        console.log(`⏳ Waiting for seqno to change... (attempt ${attempt + 1}/20)`);
    }
    throw new Error('❌ Transaction confirmation timed out.');
}
async function deployContract(walletContract, keyPair, contractName, contract, value, payload, dryRun = false) {
    console.log(`\n--- ${dryRun ? 'DRY RUN' : 'Deploying'} ${contractName} ---`);
    console.log(`Address: ${contract.address}`);
    console.log(`Value: ${Number(value) / 1e9} TON`);
    if (dryRun) {
        console.log('🟡 DRY RUN - не отправляем транзакцию');
        return;
    }
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
    console.log(`✅ ${contractName} deployed at: ${contract.address}`);
}
async function sendMessage(walletContract, keyPair, to, value, body, description = 'Message', dryRun = false) {
    console.log(`\n--- ${dryRun ? 'DRY RUN' : 'Sending'} ${description} ---`);
    console.log(`To: ${to}`);
    console.log(`Value: ${Number(value) / 1e9} TON`);
    if (dryRun) {
        console.log('🟡 DRY RUN - не отправляем сообщение');
        return;
    }
    const seqno = await walletContract.getSeqno();
    await walletContract.sendTransfer({
        secretKey: keyPair.secretKey,
        seqno: seqno,
        messages: [(0, ton_1.internal)({ to, value, body, })],
    });
    await waitSeqno(walletContract, seqno);
    console.log(`✅ ${description} sent successfully`);
}
async function main() {
    console.log('🚀 --- MAINNET DEPLOYMENT SCRIPT ---');
    // Проверяем аргументы командной строки
    const isDryRun = process.argv.includes('--dry-run');
    if (isDryRun) {
        console.log('🟡 RUNNING IN DRY-RUN MODE - NO TRANSACTIONS WILL BE SENT');
    }
    // Валидация переменных окружения
    validateEnvironmentVariables();
    if (!MNEMONIC) {
        throw new Error('❌ MNEMONIC не установлен в .env.mainnet');
    }
    const keyPair = await (0, crypto_1.mnemonicToPrivateKey)(MNEMONIC.split(' '));
    const wallet = ton_1.WalletContractV4.create({ publicKey: keyPair.publicKey, workchain: 0 });
    const walletContract = client.open(wallet);
    console.log(`📱 Deployer wallet address: ${walletContract.address}`);
    const balance = await client.getBalance(walletContract.address);
    console.log(`💰 Wallet balance: ${Number(balance) / 1e9} TON`);
    const requiredBalance = (0, core_1.toNano)('10'); // Увеличиваем минимум для майннета
    if (balance < requiredBalance) {
        throw new Error(`❌ Insufficient balance. Need at least ${Number(requiredBalance) / 1e9} TON for mainnet deployment.`);
    }
    // --- 1. Инициализация всех контрактов ---
    console.log('\n--- 📋 Initializing contracts ---');
    // Код кошелька Jetton
    const walletCodeBuffer = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'build', 'JettonWallet_JettonWallet.code.boc'));
    const walletCode = core_1.Cell.fromBoc(walletCodeBuffer)[0];
    const ownerAddr = core_1.Address.parse(OWNER_ADDRESS);
    const teamAddr = core_1.Address.parse(TEAM_ADDRESS);
    const liquidityPoolAddr = core_1.Address.parse(LIQUIDITY_POOL_ADDRESS);
    const projectPoolAddr = core_1.Address.parse(PROJECT_POOL_ADDRESS);
    const investorsCreatorsPoolAddr = core_1.Address.parse(INVESTORS_CREATORS_POOL_ADDRESS);
    // Инициализируем контракты
    const liquidityLock = await LiquidityLock_LiquidityLock_1.LiquidityLock.fromInit(ownerAddr, liquidityPoolAddr, BigInt(LOCK_DURATION_SECONDS));
    const animalHelperPool = await AnimalHelperPool_AnimalHelperPool_1.AnimalHelperPool.fromInit(ownerAddr, ownerAddr);
    const animalHelperVoting = await AnimalHelperVoting_AnimalHelperVoting_1.AnimalHelperVoting.fromInit(ownerAddr, ownerAddr, animalHelperPool.address);
    const fundsDistributor = await FundsDistributor_FundsDistributor_1.FundsDistributor.fromInit(ownerAddr, liquidityPoolAddr, liquidityLock.address, animalHelperPool.address, projectPoolAddr, investorsCreatorsPoolAddr);
    const teamVesting = await TeamVesting_TeamVesting_1.TeamVesting.fromInit(ownerAddr, teamAddr, ownerAddr, BigInt(TEAM_CLIFF_SECONDS), BigInt(TEAM_VESTING_SECONDS));
    const tokenSale = await TokenSale_TokenSale_1.TokenSale.fromInit(ownerAddr, ownerAddr, ownerAddr, fundsDistributor.address, TOKEN_SALE_RATE);
    // Главный контракт токена
    const tokenMetadata = (0, utils_1.buildTokenMetadata)();
    const tokenContract = await AnimalHelperToken_AnimalHelperToken_1.AnimalHelperToken.fromInit(ownerAddr, tokenMetadata, walletCode, teamVesting.address, tokenSale.address);
    // Показываем все адреса контрактов
    console.log('\n📝 Contracts to be deployed:');
    console.log(`- AnimalHelperToken: ${tokenContract.address}`);
    console.log(`- TeamVesting: ${teamVesting.address}`);
    console.log(`- TokenSale: ${tokenSale.address}`);
    console.log(`- FundsDistributor: ${fundsDistributor.address}`);
    console.log(`- AnimalHelperPool: ${animalHelperPool.address}`);
    console.log(`- AnimalHelperVoting: ${animalHelperVoting.address}`);
    console.log(`- LiquidityLock: ${liquidityLock.address}`);
    // Расчет общей стоимости деплоя
    const totalCost = (0, core_1.toNano)('0.1') * 6n + (0, core_1.toNano)('0.2') + (0, core_1.toNano)('0.3'); // 6 контрактов по 0.1 + токен 0.2 + минтинг 0.3
    console.log(`💸 Estimated total deployment cost: ${Number(totalCost) / 1e9} TON`);
    if (!isDryRun) {
        console.log('\n⚠️  ВНИМАНИЕ: Это деплой в МАЙННЕТ!');
        console.log('⚠️  Убедитесь, что все параметры корректны!');
        console.log('⚠️  Продолжение через 10 секунд...');
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
    // --- 2. Деплоим все контракты ---
    await deployContract(walletContract, keyPair, 'LiquidityLock', liquidityLock, (0, core_1.toNano)('0.1'), undefined, isDryRun);
    await deployContract(walletContract, keyPair, 'AnimalHelperPool', animalHelperPool, (0, core_1.toNano)('0.1'), undefined, isDryRun);
    await deployContract(walletContract, keyPair, 'AnimalHelperVoting', animalHelperVoting, (0, core_1.toNano)('0.1'), undefined, isDryRun);
    await deployContract(walletContract, keyPair, 'FundsDistributor', fundsDistributor, (0, core_1.toNano)('0.1'), undefined, isDryRun);
    await deployContract(walletContract, keyPair, 'TeamVesting', teamVesting, (0, core_1.toNano)('0.1'), undefined, isDryRun);
    await deployContract(walletContract, keyPair, 'TokenSale', tokenSale, (0, core_1.toNano)('0.1'), undefined, isDryRun);
    await deployContract(walletContract, keyPair, 'AnimalHelperToken', tokenContract, (0, core_1.toNano)('0.2'), undefined, isDryRun);
    if (!isDryRun) {
        // --- 3. Настройка адресов ---
        console.log('\n--- ⚙️  Configuring contracts ---');
        const createSetAddressPayload = (op_code, address) => {
            return (0, core_1.beginCell)()
                .storeUint(op_code, 32)
                .storeUint(0, 64)
                .storeAddress(address)
                .endCell();
        };
        await sendMessage(walletContract, keyPair, animalHelperPool.address, (0, core_1.toNano)('0.05'), createSetAddressPayload(0x6a6048d0, animalHelperVoting.address), 'Set voting address');
        await sendMessage(walletContract, keyPair, animalHelperVoting.address, (0, core_1.toNano)('0.05'), createSetAddressPayload(0x2d5e2193, tokenContract.address), 'Set jetton address (voting)');
        await sendMessage(walletContract, keyPair, teamVesting.address, (0, core_1.toNano)('0.05'), createSetAddressPayload(0x2d5e2193, tokenContract.address), 'Set jetton address (vesting)');
        await sendMessage(walletContract, keyPair, tokenSale.address, (0, core_1.toNano)('0.05'), createSetAddressPayload(0x2d5e2193, tokenContract.address), 'Set jetton address (sale)');
        const openedTokenContract = client.open(AnimalHelperToken_AnimalHelperToken_1.AnimalHelperToken.fromAddress(tokenContract.address));
        const tokenSaleJettonWallet = await openedTokenContract.getGetWalletAddress(tokenSale.address);
        await sendMessage(walletContract, keyPair, tokenSale.address, (0, core_1.toNano)('0.05'), createSetAddressPayload(0x454d8f28, tokenSaleJettonWallet), 'Set jetton wallet address');
        // --- 4. Выполняем начальный минтинг ---
        console.log('\n--- 🪙 Performing initial minting ---');
        const mintPayload = (0, core_1.beginCell)()
            .storeUint(0, 32)
            .storeStringTail("mint_initial")
            .endCell();
        await sendMessage(walletContract, keyPair, tokenContract.address, (0, core_1.toNano)('0.3'), mintPayload, 'Initial minting');
        const ownerJettonWalletAddress = await openedTokenContract.getGetWalletAddress(ownerAddr);
        console.log('\n🎉 === MAINNET DEPLOYMENT COMPLETED SUCCESSFULLY! ===');
        console.log('📋 Deployed contract addresses:');
        console.log(`- AnimalHelperToken: ${tokenContract.address}`);
        console.log(`- TeamVesting: ${teamVesting.address}`);
        console.log(`- TokenSale: ${tokenSale.address}`);
        console.log(`- FundsDistributor: ${fundsDistributor.address}`);
        console.log(`- AnimalHelperPool: ${animalHelperPool.address}`);
        console.log(`- AnimalHelperVoting: ${animalHelperVoting.address}`);
        console.log(`- LiquidityLock: ${liquidityLock.address}`);
        console.log(`- Owner's Jetton Wallet: ${ownerJettonWalletAddress}`);
        console.log('\n⚠️  СОХРАНИТЕ ЭТИ АДРЕСА - ОНИ ПОНАДОБЯТСЯ ДЛЯ ФРОНТЕНДА!');
    }
    else {
        console.log('\n🟡 DRY RUN COMPLETED - NO ACTUAL DEPLOYMENT WAS PERFORMED');
        console.log('📋 Run without --dry-run to perform actual deployment');
    }
}
main().catch(e => {
    console.error('❌ Deployment failed:', e);
    process.exit(1);
});
