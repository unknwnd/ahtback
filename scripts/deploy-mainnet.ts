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

// Загружаем переменные окружения из .env.mainnet
dotenv.config({ path: path.resolve(__dirname, '../.env.mainnet') });

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

const client = new TonClient({
    endpoint: ENDPOINT,
    apiKey: process.env.API_KEY,
});

// Константы (2 года блокировки)
const LOCK_DURATION_SECONDS = 31536000 * 2; // 24 месяца
const TEAM_CLIFF_SECONDS = 31536000;      // 1 год клифф
const TEAM_VESTING_SECONDS = 31536000 * 2; // 2 года вестинг
const TOKEN_SALE_RATE = BigInt(process.env.TOKEN_SALE_RATE || '100000'); // 1 TON = 100,000 токенов
const TOTAL_SUPPLY = BigInt(process.env.JETTON_TOTAL_SUPPLY || '1000000000000000'); // 1 квадриллион

async function waitSeqno(walletContract: any, currentSeqno: number) {
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

async function deployContract(
    walletContract: any,
    keyPair: any,
    contractName: string,
    contract: any,
    value: bigint,
    payload?: Cell,
    dryRun: boolean = false
) {
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
            internal({
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

async function sendMessage(
    walletContract: any,
    keyPair: any,
    to: Address,
    value: bigint,
    body: Cell,
    description: string = 'Message',
    dryRun: boolean = false
) {
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
        messages: [ internal({ to, value, body, }) ],
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

    const keyPair = await mnemonicToPrivateKey(MNEMONIC!.split(' '));
    const wallet = WalletContractV4.create({ publicKey: keyPair.publicKey, workchain: 0 });
    const walletContract = client.open(wallet);
    console.log(`📱 Deployer wallet address: ${walletContract.address}`);

    const balance = await client.getBalance(walletContract.address);
    console.log(`💰 Wallet balance: ${Number(balance) / 1e9} TON`);
    
    const requiredBalance = toNano('10'); // Увеличиваем минимум для майннета
    if (balance < requiredBalance) {
        throw new Error(`❌ Insufficient balance. Need at least ${Number(requiredBalance) / 1e9} TON for mainnet deployment.`);
    }

    // --- 1. Инициализация всех контрактов ---
    console.log('\n--- 📋 Initializing contracts ---');
    
    // Код кошелька Jetton
    const walletCodeBuffer = fs.readFileSync(path.join(__dirname, '..', 'build', 'JettonWallet_JettonWallet.code.boc'));
    const walletCode = Cell.fromBoc(walletCodeBuffer)[0];

    const ownerAddr = Address.parse(OWNER_ADDRESS!);
    const teamAddr = Address.parse(TEAM_ADDRESS!);
    const liquidityPoolAddr = Address.parse(LIQUIDITY_POOL_ADDRESS!);
    const projectPoolAddr = Address.parse(PROJECT_POOL_ADDRESS!);
    const investorsCreatorsPoolAddr = Address.parse(INVESTORS_CREATORS_POOL_ADDRESS!);

    // Инициализируем контракты
    const liquidityLock = await LiquidityLock.fromInit(ownerAddr, liquidityPoolAddr, BigInt(LOCK_DURATION_SECONDS));
    const animalHelperPool = await AnimalHelperPool.fromInit(ownerAddr, ownerAddr);
    const animalHelperVoting = await AnimalHelperVoting.fromInit(ownerAddr, ownerAddr, animalHelperPool.address);
    
    const fundsDistributor = await FundsDistributor.fromInit(
        ownerAddr,
        liquidityPoolAddr,
        liquidityLock.address,
        animalHelperPool.address,
        projectPoolAddr,
        investorsCreatorsPoolAddr
    );

    const teamVesting = await TeamVesting.fromInit(ownerAddr, teamAddr, ownerAddr, BigInt(TEAM_CLIFF_SECONDS), BigInt(TEAM_VESTING_SECONDS));
    const tokenSale = await TokenSale.fromInit(ownerAddr, ownerAddr, ownerAddr, fundsDistributor.address, TOKEN_SALE_RATE);

    // Главный контракт токена
    const tokenMetadata = buildTokenMetadata();
    const tokenContract = await AnimalHelperToken.fromInit(
        ownerAddr,
        tokenMetadata,
        walletCode,
        teamVesting.address,
        tokenSale.address
    );

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
    const totalCost = toNano('0.1') * 6n + toNano('0.2') + toNano('0.3'); // 6 контрактов по 0.1 + токен 0.2 + минтинг 0.3
    console.log(`💸 Estimated total deployment cost: ${Number(totalCost) / 1e9} TON`);

    if (!isDryRun) {
        console.log('\n⚠️  ВНИМАНИЕ: Это деплой в МАЙННЕТ!');
        console.log('⚠️  Убедитесь, что все параметры корректны!');
        console.log('⚠️  Продолжение через 10 секунд...');
        await new Promise(resolve => setTimeout(resolve, 10000));
    }

    // --- 2. Деплоим все контракты ---
    await deployContract(walletContract, keyPair, 'LiquidityLock', liquidityLock, toNano('0.1'), undefined, isDryRun);
    await deployContract(walletContract, keyPair, 'AnimalHelperPool', animalHelperPool, toNano('0.1'), undefined, isDryRun);
    await deployContract(walletContract, keyPair, 'AnimalHelperVoting', animalHelperVoting, toNano('0.1'), undefined, isDryRun);
    await deployContract(walletContract, keyPair, 'FundsDistributor', fundsDistributor, toNano('0.1'), undefined, isDryRun);
    await deployContract(walletContract, keyPair, 'TeamVesting', teamVesting, toNano('0.1'), undefined, isDryRun);
    await deployContract(walletContract, keyPair, 'TokenSale', tokenSale, toNano('0.1'), undefined, isDryRun);
    await deployContract(walletContract, keyPair, 'AnimalHelperToken', tokenContract, toNano('0.2'), undefined, isDryRun);

    if (!isDryRun) {
        // --- 3. Настройка адресов ---
        console.log('\n--- ⚙️  Configuring contracts ---');
        
        const createSetAddressPayload = (op_code: number, address: Address) => {
            return beginCell()
                .storeUint(op_code, 32)
                .storeUint(0, 64)
                .storeAddress(address)
                .endCell();
        };

        await sendMessage(walletContract, keyPair, animalHelperPool.address, toNano('0.05'), createSetAddressPayload(0x6a6048d0, animalHelperVoting.address), 'Set voting address');
        await sendMessage(walletContract, keyPair, animalHelperVoting.address, toNano('0.05'), createSetAddressPayload(0x2d5e2193, tokenContract.address), 'Set jetton address (voting)');
        await sendMessage(walletContract, keyPair, teamVesting.address, toNano('0.05'), createSetAddressPayload(0x2d5e2193, tokenContract.address), 'Set jetton address (vesting)');
        await sendMessage(walletContract, keyPair, tokenSale.address, toNano('0.05'), createSetAddressPayload(0x2d5e2193, tokenContract.address), 'Set jetton address (sale)');
        
        const openedTokenContract = client.open(AnimalHelperToken.fromAddress(tokenContract.address));
        const tokenSaleJettonWallet = await openedTokenContract.getGetWalletAddress(tokenSale.address);
        await sendMessage(walletContract, keyPair, tokenSale.address, toNano('0.05'), createSetAddressPayload(0x454d8f28, tokenSaleJettonWallet), 'Set jetton wallet address');

        // --- 4. Выполняем начальный минтинг ---
        console.log('\n--- 🪙 Performing initial minting ---');
        
        const mintPayload = beginCell()
            .storeUint(0, 32)
            .storeStringTail("mint_initial")
            .endCell();
        await sendMessage(walletContract, keyPair, tokenContract.address, toNano('0.3'), mintPayload, 'Initial minting');

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
    } else {
        console.log('\n🟡 DRY RUN COMPLETED - NO ACTUAL DEPLOYMENT WAS PERFORMED');
        console.log('📋 Run without --dry-run to perform actual deployment');
    }
}

main().catch(e => {
    console.error('❌ Deployment failed:', e);
    process.exit(1);
}); 