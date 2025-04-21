import { toNano, Address, beginCell, Cell } from '@ton/core';
import { TonClient, WalletContractV4, internal } from '@ton/ton';
import fs from 'fs';
import path from 'path';
import { buildTokenMetadata, buildNFTCollectionMetadata } from './utils';
import { mnemonicToPrivateKey } from '@ton/crypto';
import * as dotenv from 'dotenv';

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
        if (walletBalance < toNano('1')) {
            console.error('Not enough funds to deploy contracts. Need at least 1 TON');
            console.error('Please send TON to your wallet address and try again.');
            process.exit(1);
        }

        // Пока мы не можем использовать сгенерированные модули из-за проблем совместимости,
        // мы будем использовать предварительно определенные адреса контрактов для тестирования

        console.log('\n⚠️ ВНИМАНИЕ! ⚠️');
        console.log('В связи с проблемами совместимости библиотек, мы можем только отправить средства на адреса контрактов.');
        console.log('Это имитация деплоя для проверки функциональности отправки транзакций.');
        console.log('Для полноценного деплоя необходимо будет решить проблемы совместимости.');

        console.log('\nSending test transaction to PROJECT_POOL_ADDRESS...');
        await sendDeployTransaction(
            walletContract,
            keyPair,
            PROJECT_POOL_ADDRESS, // Используем существующий адрес
            toNano('0.01'), // Отправляем 0.01 TON
            undefined,
            beginCell().storeUint(0, 32).storeStringTail('Test deploy').endCell()
        );

        console.log('\nTest completed successfully!');
        console.log(`Check the transaction in the explorer: https://testnet.tonscan.org/address/${walletAddress.toString()}`);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

deploy().catch(console.error); 