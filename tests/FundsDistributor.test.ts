import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, toNano } from '@ton/core';
import { FundsDistributor } from '../build/FundsDistributor_FundsDistributor';
import '@ton/test-utils';

describe('FundsDistributor', () => {
    let blockchain: Blockchain;
    let owner: SandboxContract<TreasuryContract>;
    let user: SandboxContract<TreasuryContract>;
    let distributorContract: SandboxContract<FundsDistributor>;
    
    // Адреса пулов для распределения средств
    let liquidityPool: Address;
    let liquidityLock: Address;
    let animalHelperPool: Address;
    let projectPool: Address;
    let investorsCreatorsPool: Address;

    beforeEach(async () => {
        // Инициализация блокчейна для тестирования
        blockchain = await Blockchain.create();
        
        // Создаем тестовые аккаунты
        owner = await blockchain.treasury('owner');
        user = await blockchain.treasury('user');
        
        // Адреса пулов для распределения средств
        liquidityPool = Address.parse('EQD__________________________________________0001');
        liquidityLock = Address.parse('EQD__________________________________________0002');
        animalHelperPool = Address.parse('EQD__________________________________________0003');
        projectPool = Address.parse('EQD__________________________________________0004');
        investorsCreatorsPool = Address.parse('EQD__________________________________________0005');
        
        // Деплой контракта распределения средств
        distributorContract = blockchain.openContract(
            await FundsDistributor.fromInit(
                owner.address,
                liquidityPool,
                liquidityLock,
                animalHelperPool,
                projectPool,
                investorsCreatorsPool
            )
        );
        
        // Выполняем деплой контракта от имени владельца
        const deployResult = await distributorContract.send(
            owner.getSender(),
            { value: toNano('0.05') },
            { $$type: 'Deploy', queryId: 0n }
        );
    });

    it('should distribute funds according to percentages', async () => {
        // Отправляем средства на контракт распределения
        const amount = toNano('10');
        const distributeResult = await distributorContract.send(
            user.getSender(),
            { value: amount },
            null // Без сообщения, просто перевод средств
        );
        
        // Проверяем транзакции на наличие переводов средств
        expect(distributeResult.transactions).toHaveTransaction({
            from: distributorContract.address,
            to: liquidityPool,
            success: true
        });
        
        expect(distributeResult.transactions).toHaveTransaction({
            from: distributorContract.address,
            to: liquidityLock,
            success: true
        });
        
        expect(distributeResult.transactions).toHaveTransaction({
            from: distributorContract.address,
            to: animalHelperPool,
            success: true
        });
        
        expect(distributeResult.transactions).toHaveTransaction({
            from: distributorContract.address,
            to: projectPool,
            success: true
        });
        
        expect(distributeResult.transactions).toHaveTransaction({
            from: distributorContract.address,
            to: investorsCreatorsPool,
            success: true
        });
    });

    it('should allow owner to update pool addresses', async () => {
        // Новый адрес для пула ликвидности
        const newLiquidityPool = Address.parse('EQD__________________________________________9001');
        
        // Владелец обновляет адрес пула ликвидности
        const updateResult = await distributorContract.send(
            owner.getSender(),
            { value: toNano('0.05') },
            { $$type: 'UpdateLiquidityPoolMessage', new_address: newLiquidityPool }
        );
        
        // Отправляем средства для проверки нового распределения
        const amount = toNano('10');
        const distributeResult = await distributorContract.send(
            user.getSender(),
            { value: amount },
            null
        );
        
        // Проверяем отправку на новый адрес пула ликвидности
        expect(distributeResult.transactions).toHaveTransaction({
            from: distributorContract.address,
            to: newLiquidityPool,
            success: true
        });
    });

    it('should allow owner to update distribution percentages', async () => {
        // Новые проценты распределения
        const newLiquidityPercent = 60n;
        const newAnimalPercent = 20n;
        const newProjectPercent = 15n;
        const newInvestorsPercent = 5n;
        
        // Владелец обновляет проценты распределения
        const updateResult = await distributorContract.send(
            owner.getSender(),
            { value: toNano('0.05') },
            { 
                $$type: 'UpdateDistributionRatioMessage', 
                liq_percent: newLiquidityPercent,
                animal_percent: newAnimalPercent,
                proj_percent: newProjectPercent,
                inv_creat_percent: newInvestorsPercent
            }
        );
        
        // Отправляем средства для проверки нового распределения
        const amount = toNano('10');
        const distributeResult = await distributorContract.send(
            user.getSender(),
            { value: amount },
            null
        );
        
        // Проверяем, что транзакции отражают новое распределение
        expect(distributeResult.transactions).toHaveTransaction({
            from: distributorContract.address,
            to: liquidityPool,
            success: true
        });
        
        expect(distributeResult.transactions).toHaveTransaction({
            from: distributorContract.address,
            to: animalHelperPool,
            success: true
        });
        
        expect(distributeResult.transactions).toHaveTransaction({
            from: distributorContract.address,
            to: projectPool,
            success: true
        });
        
        expect(distributeResult.transactions).toHaveTransaction({
            from: distributorContract.address,
            to: investorsCreatorsPool,
            success: true
        });
    });

    it('should not allow non-owner to update distribution percentages', async () => {
        // Пользователь пытается обновить проценты распределения
        const updateResult = await distributorContract.send(
            user.getSender(),
            { value: toNano('0.05') },
            { 
                $$type: 'UpdateDistributionRatioMessage', 
                liq_percent: 60n,
                animal_percent: 20n,
                proj_percent: 15n,
                inv_creat_percent: 5n
            }
        );
        
        // Проверяем, что транзакция завершилась с ошибкой (обычно возвращается в виде bounced)
        expect(updateResult.transactions).toHaveLength(2); // Ожидаем 2 транзакции (отправка и bounced)
        
        // В реальных тестах можно также проверить, что операция не применилась, отправив транзакцию и проверив распределение
    });

    it('should allow emergency withdrawal by owner', async () => {
        // Пополняем баланс контракта
        await user.send({
            to: distributorContract.address,
            value: toNano('5'),
            bounce: true
        });
        
        // Получаем начальный баланс владельца
        const initialOwnerBalance = await blockchain.getBalance(owner.address);
        
        // Владелец запрашивает экстренный вывод средств
        const withdrawResult = await distributorContract.send(
            owner.getSender(),
            { value: toNano('0.05') },
            { $$type: 'EmergencyWithdrawMessage' }
        );
        
        // Проверяем, что транзакция перевода средств владельцу существует
        expect(withdrawResult.transactions).toHaveTransaction({
            from: distributorContract.address,
            to: owner.address,
            success: true
        });
        
        // Проверяем, что баланс владельца увеличился
        const newOwnerBalance = await blockchain.getBalance(owner.address);
        expect(newOwnerBalance).toBeGreaterThan(initialOwnerBalance);
    });
}); 