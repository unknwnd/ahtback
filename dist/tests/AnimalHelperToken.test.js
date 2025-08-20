"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sandbox_1 = require("@ton/sandbox");
const core_1 = require("@ton/core");
const AnimalHelperToken_AnimalHelperToken_1 = require("../build/AnimalHelperToken_AnimalHelperToken");
const utils_1 = require("../scripts/utils");
require("@ton/test-utils");
describe('AnimalHelperToken', () => {
    let blockchain;
    let owner;
    let user;
    let tokenContract;
    let distributor;
    let nftContract;
    beforeEach(async () => {
        // Инициализация блокчейна для тестирования
        blockchain = await sandbox_1.Blockchain.create();
        // Создаем тестовые аккаунты
        owner = await blockchain.treasury('owner');
        user = await blockchain.treasury('user');
        // Создаем адреса для контрактов, которые будут связаны с токеном
        distributor = core_1.Address.parse('EQD__________________________________________0001');
        nftContract = core_1.Address.parse('EQD__________________________________________0002');
        // Подготовка метаданных для токена
        const content = (0, utils_1.buildTokenMetadata)();
        // Код кошелька Jetton (в настоящих тестах этот код должен быть загружен из файла)
        const walletCode = blockchain.openContract((0, core_1.beginCell)().endCell()).cell;
        // Деплой контракта токена
        tokenContract = blockchain.openContract(await AnimalHelperToken_AnimalHelperToken_1.AnimalHelperToken.fromInit(owner.address, distributor, nftContract, content, walletCode));
        // Выполняем деплой контракта от имени владельца
        const deployResult = await tokenContract.send(owner.getSender(), { value: (0, core_1.toNano)('0.05') }, { $$type: 'Deploy', queryId: 0n });
        // Проверяем успешность деплоя
        expect(deployResult.transactions).toHaveTransaction({
            from: owner.address,
            to: tokenContract.address,
            deploy: true,
            success: true
        });
    });
    it('should have correct initial parameters', async () => {
        // Получаем данные токена
        const data = await tokenContract.getGetJettonData();
        // Проверяем начальные параметры
        expect(data.totalSupply).toEqual(0n); // Начальное предложение токенов
        expect(data.mintable).toEqual(true); // Возможность минтить токены
        expect(data.owner.equals(owner.address)).toBe(true);
    });
    it('should allow buying tokens', async () => {
        // Отправляем транзакцию для покупки токенов
        const buyResult = await tokenContract.send(user.getSender(), { value: (0, core_1.toNano)('1') }, // Отправляем 1 TON
        { $$type: 'BuyTokensMessage' });
        // Проверяем успешность покупки
        expect(buyResult.transactions).toHaveTransaction({
            from: user.address,
            to: tokenContract.address,
            success: true
        });
        // Проверка пересылки средств на контракт распределения
        expect(buyResult.transactions).toHaveTransaction({
            from: tokenContract.address,
            to: distributor,
            success: true
        });
    });
    it('should allow owner to toggle minting', async () => {
        // Проверяем начальное состояние
        const initialData = await tokenContract.getGetJettonData();
        expect(initialData.mintable).toEqual(true);
        // Владелец переключает возможность минтинга
        const toggleResult = await tokenContract.send(owner.getSender(), { value: (0, core_1.toNano)('0.05') }, { $$type: 'ToggleMintingMessage' });
        // Проверяем успешность операции
        expect(toggleResult.transactions).toHaveTransaction({
            from: owner.address,
            to: tokenContract.address,
            success: true
        });
        // Проверяем новое состояние
        const newData = await tokenContract.getGetJettonData();
        expect(newData.mintable).toEqual(false);
    });
    it('should not allow non-owner to toggle minting', async () => {
        // Пользователь пытается переключить возможность минтинга
        const toggleResult = await tokenContract.send(user.getSender(), { value: (0, core_1.toNano)('0.05') }, { $$type: 'ToggleMintingMessage' });
        // Проверяем, что операция не выполнена
        expect(toggleResult.transactions).not.toHaveTransaction({
            from: tokenContract.address,
            op: 0x178d4519 // Op code для успешного переключения
        });
        // Проверяем, что состояние не изменилось
        const newData = await tokenContract.getGetJettonData();
        expect(newData.mintable).toEqual(true);
    });
    it('should allow owner to update contract addresses', async () => {
        // Новый адрес для контракта распределения
        const newDistributor = core_1.Address.parse('EQD__________________________________________0003');
        // Владелец обновляет адрес контракта распределения
        const updateResult = await tokenContract.send(owner.getSender(), { value: (0, core_1.toNano)('0.05') }, { $$type: 'UpdateDistributionContractMessage', new_address: newDistributor });
        // Проверяем успешность операции
        expect(updateResult.transactions).toHaveTransaction({
            from: owner.address,
            to: tokenContract.address,
            success: true
        });
        // Проверяем, что адрес обновлен (в реальном тесте здесь должен быть геттер)
    });
    it('should allow emergency withdrawal by owner', async () => {
        // Сначала пополним баланс контракта
        await blockchain.treasury('someone').send({
            to: tokenContract.address,
            value: (0, core_1.toNano)('2')
        });
        // Получаем начальный баланс владельца
        const initialOwnerBalance = await blockchain.getBalance(owner.address);
        // Владелец запрашивает экстренный вывод средств
        const withdrawResult = await tokenContract.send(owner.getSender(), { value: (0, core_1.toNano)('0.05') }, { $$type: 'EmergencyWithdrawMessage' });
        // Проверяем успешность операции
        expect(withdrawResult.transactions).toHaveTransaction({
            from: tokenContract.address,
            to: owner.address,
            success: true
        });
        // Проверяем, что баланс владельца увеличился
        const newOwnerBalance = await blockchain.getBalance(owner.address);
        expect(newOwnerBalance).toBeGreaterThan(initialOwnerBalance);
    });
});
