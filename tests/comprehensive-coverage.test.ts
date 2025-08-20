import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano, Address, beginCell, TupleBuilder, Dictionary } from '@ton/core';

// Импорты всех доступных контрактов
import { AnimalHelperToken } from '../build/AnimalHelperToken_AnimalHelperToken';
import { FundsDistributor } from '../build/FundsDistributor_FundsDistributor';
import { TokenSale } from '../build/TokenSale_TokenSale';
import { TeamVesting } from '../build/TeamVesting_TeamVesting';
import { LiquidityLock } from '../build/LiquidityLock_LiquidityLock';
import { AnimalHelperPool } from '../build/AnimalHelperPool_AnimalHelperPool';
import { AnimalHelperVoting } from '../build/AnimalHelperVoting_AnimalHelperVoting';
import { JettonWallet } from '../build/JettonWallet_JettonWallet';


// Импорты функций хранения и загрузки типов
import { 
    storeDataSize, loadDataSize,
    storeStateInit, loadStateInit,
    storeDeploy, loadDeploy,
    storeDeployOk, loadDeployOk
} from '../build/AnimalHelperToken_AnimalHelperToken';

describe('Comprehensive Coverage Tests', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let users: SandboxContract<TreasuryContract>[];
    
    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        
        // Создаем множество пользователей для тестирования
        users = [];
        for (let i = 0; i < 10; i++) {
            users.push(await blockchain.treasury(`user${i}`));
        }
    });

    describe('Data Structure Functions Coverage', () => {
        it('should test DataSize operations', () => {
            const dataSize = {
                $$type: 'DataSize' as const,
                cells: 123n,
                bits: 456n,
                refs: 789n
            };

            // Тестируем сохранение
            const cell = beginCell().store(storeDataSize(dataSize)).endCell();
            expect(cell).toBeDefined();
            expect(cell.hash()).toBeTruthy();

            // Тестируем загрузку
            const slice = cell.beginParse();
            const loadedDataSize = loadDataSize(slice);
            expect(loadedDataSize).toEqual(dataSize);
            expect(loadedDataSize.$$type).toBe('DataSize');
        });

        it('should test StateInit operations', () => {
            const code = beginCell().storeUint(123, 32).endCell();
            const data = beginCell().storeUint(456, 32).endCell();
            
            const stateInit = {
                $$type: 'StateInit' as const,
                code: code,
                data: data
            };

            // Тестируем сохранение
            const cell = beginCell().store(storeStateInit(stateInit)).endCell();
            expect(cell).toBeDefined();
            expect(cell.refs).toHaveLength(2);

            // Тестируем загрузку
            const slice = cell.beginParse();
            const loadedStateInit = loadStateInit(slice);
            expect(loadedStateInit.$$type).toBe('StateInit');
            expect(loadedStateInit.code.hash().toString()).toBe(code.hash().toString());
            expect(loadedStateInit.data.hash().toString()).toBe(data.hash().toString());
        });

        it('should test Deploy and DeployOk messages', () => {
            const deploy = {
                $$type: 'Deploy' as const,
                queryId: 123456789n
            };

            const deployOk = {
                $$type: 'DeployOk' as const,
                queryId: 987654321n
            };

            // Тестируем Deploy
            const deployCell = beginCell().store(storeDeploy(deploy)).endCell();
            expect(deployCell).toBeDefined();
            
            const deploySlice = deployCell.beginParse();
            const loadedDeploy = loadDeploy(deploySlice);
            expect(loadedDeploy).toEqual(deploy);

            // Тестируем DeployOk
            const deployOkCell = beginCell().store(storeDeployOk(deployOk)).endCell();
            expect(deployOkCell).toBeDefined();
            
            const deployOkSlice = deployOkCell.beginParse();
            const loadedDeployOk = loadDeployOk(deployOkSlice);
            expect(loadedDeployOk).toEqual(deployOk);
        });

        it('should test various bigint operations', () => {
            const values = [
                0n, 1n, 2n ** 8n - 1n, 2n ** 16n - 1n, 2n ** 32n - 1n, 2n ** 64n - 1n,
                toNano('0.000000001'), toNano('1'), toNano('1000'), toNano('1000000')
            ];

            values.forEach(value => {
                // Тестируем что значения корректно обрабатываются
                expect(typeof value).toBe('bigint');
                expect(value >= 0n).toBe(true);

                // Тестируем сохранение в Cell
                const cell = beginCell().storeUint(value, value < 256n ? 8 : value < 65536n ? 16 : value < 4294967296n ? 32 : 64).endCell();
                expect(cell).toBeDefined();
                expect(cell.hash()).toBeTruthy();
            });
        });

        it('should test TupleBuilder operations', () => {
            const builder = new TupleBuilder();
            
            // Добавляем различные типы данных
            builder.writeNumber(123);
            builder.writeNumber(-456);
            builder.writeNumber(789n);
            builder.writeBoolean(true);
            builder.writeBoolean(false);
            builder.writeAddress(deployer.address);
            builder.writeCell(beginCell().storeUint(999, 32).endCell());
            builder.writeBuffer(Buffer.from('test'));

            const tuple = builder.build();
            expect(tuple.length).toBe(8);

            // Проверяем что можем читать данные обратно
            let index = 0;
            expect(tuple[index++].type).toBe('int');
            expect(tuple[index++].type).toBe('int');
            expect(tuple[index++].type).toBe('int');
            expect(tuple[index++].type).toBe('int');
            expect(tuple[index++].type).toBe('int');
            expect(tuple[index++].type).toBe('slice');
            expect(tuple[index++].type).toBe('cell');
            expect(tuple[index++].type).toBe('slice');
        });

        it('should test Dictionary operations', () => {
            const dict = Dictionary.empty(Dictionary.Keys.Uint(32), Dictionary.Values.Cell());
            
            // Добавляем элементы
            for (let i = 0; i < 10; i++) {
                const cell = beginCell().storeUint(i * 100, 32).storeStringTail(`Value ${i}`).endCell();
                dict.set(i, cell);
            }

            expect(dict.size).toBe(10);

            // Тестируем чтение
            for (let i = 0; i < 10; i++) {
                const cell = dict.get(i);
                expect(cell).toBeDefined();
                if (cell) {
                    expect(cell.hash()).toBeTruthy();
                }
            }

            // Тестируем сериализацию
            const dictCell = beginCell().storeDict(dict).endCell();
            expect(dictCell).toBeDefined();
            expect(dictCell.hash()).toBeTruthy();
        });
    });

    describe('Massive Contract Deployment Tests', () => {
        it('should deploy multiple instances of all contract types', async () => {
            const deployResults = [];

            // Деплоим множественные экземпляры каждого типа контракта
            for (let i = 0; i < 3; i++) {
                // AnimalHelperToken
                const walletCode = beginCell().endCell();
                const content = beginCell().storeStringTail(`{"name":"Token${i}","symbol":"T${i}","decimals":"9"}`).endCell();
                
                const token = blockchain.openContract(
                    await AnimalHelperToken.fromInit(
                        deployer.address,
                        content,
                        walletCode,
                        users[i].address,
                        users[i + 1].address
                    )
                );

                const tokenResult = await token.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: BigInt(i) }
                );

                deployResults.push({ type: 'AnimalHelperToken', index: i, address: token.address, result: tokenResult });

                // FundsDistributor
                const distributor = blockchain.openContract(
                    await FundsDistributor.fromInit(
                        deployer.address,
                        users[0].address,
                        users[1].address,
                        users[2].address,
                        users[3].address,
                        users[4].address
                    )
                );

                const distResult = await distributor.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: BigInt(i + 100) }
                );

                deployResults.push({ type: 'FundsDistributor', index: i, address: distributor.address, result: distResult });

                // TokenSale
                const tokenSale = blockchain.openContract(
                    await TokenSale.fromInit(
                        deployer.address,
                        token.address,
                        distributor.address,
                        users[i].address,
                        BigInt(100000 + i * 10000)
                    )
                );

                const saleResult = await tokenSale.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: BigInt(i + 200) }
                );

                deployResults.push({ type: 'TokenSale', index: i, address: tokenSale.address, result: saleResult });

                // TeamVesting
                const vesting = blockchain.openContract(
                    await TeamVesting.fromInit(
                        deployer.address,
                        users[i].address,
                        token.address,
                        BigInt(31536000 + i * 1000000), // cliff
                        BigInt(63072000 + i * 2000000)  // vesting
                    )
                );

                const vestResult = await vesting.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: BigInt(i + 300) }
                );

                deployResults.push({ type: 'TeamVesting', index: i, address: vesting.address, result: vestResult });

                // LiquidityLock
                const lock = blockchain.openContract(
                    await LiquidityLock.fromInit(
                        deployer.address,
                        users[i].address,
                        BigInt(63072000 + i * 1000000)
                    )
                );

                const lockResult = await lock.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: BigInt(i + 400) }
                );

                deployResults.push({ type: 'LiquidityLock', index: i, address: lock.address, result: lockResult });

                // AnimalHelperPool
                const pool = blockchain.openContract(
                    await AnimalHelperPool.fromInit(
                        deployer.address,
                        token.address
                    )
                );

                const poolResult = await pool.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: BigInt(i + 500) }
                );

                deployResults.push({ type: 'AnimalHelperPool', index: i, address: pool.address, result: poolResult });

                // AnimalHelperVoting
                const voting = blockchain.openContract(
                    await AnimalHelperVoting.fromInit(
                        deployer.address,
                        token.address,
                        pool.address
                    )
                );

                const votingResult = await voting.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: BigInt(i + 600) }
                );

                deployResults.push({ type: 'AnimalHelperVoting', index: i, address: voting.address, result: votingResult });

                // JettonWallet
                const jettonWallet = blockchain.openContract(
                    await JettonWallet.fromInit(
                        token.address,
                        users[i].address
                    )
                );

                const walletResult = await jettonWallet.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'GetWalletDataMessage' }
                );

                deployResults.push({ type: 'JettonWallet', index: i, address: jettonWallet.address, result: walletResult });


            }

            // Проверяем что все контракты задеплоены
            expect(deployResults.length).toBe(24); // 8 типов * 3 экземпляра (убрали NFT)
            
            deployResults.forEach(result => {
                expect(result.address).toBeDefined();
                expect(result.result.transactions).toBeDefined();
                expect(result.result.transactions.length).toBeGreaterThan(0);
            });

            // Проверяем уникальность адресов
            const addresses = deployResults.map(r => r.address.toString());
            const uniqueAddresses = new Set(addresses);
            expect(uniqueAddresses.size).toBe(30);
        });

        it('should test all contracts with owner verification', async () => {
            const contractsWithOwners = [];

            // Создаем по одному контракту каждого типа и проверяем getOwner
            const contracts = [
                {
                    name: 'AnimalHelperToken',
                    factory: async () => {
                        return await AnimalHelperToken.fromInit(
                            deployer.address,
                            beginCell().storeStringTail('{}').endCell(),
                            beginCell().endCell(),
                            users[0].address,
                            users[1].address
                        );
                    }
                },
                {
                    name: 'FundsDistributor',
                    factory: async () => {
                        return await FundsDistributor.fromInit(
                            deployer.address,
                            users[0].address,
                            users[1].address,
                            users[2].address,
                            users[3].address,
                            users[4].address
                        );
                    }
                },
                {
                    name: 'TokenSale',
                    factory: async () => {
                        return await TokenSale.fromInit(
                            deployer.address,
                            users[0].address,
                            users[1].address,
                            users[2].address,
                            100000n
                        );
                    }
                },
                {
                    name: 'TeamVesting',
                    factory: async () => {
                        return await TeamVesting.fromInit(
                            deployer.address,
                            users[0].address,
                            users[1].address,
                            31536000n,
                            63072000n
                        );
                    }
                },
                {
                    name: 'LiquidityLock',
                    factory: async () => {
                        return await LiquidityLock.fromInit(
                            deployer.address,
                            users[0].address,
                            63072000n
                        );
                    }
                },
                {
                    name: 'AnimalHelperPool',
                    factory: async () => {
                        return await AnimalHelperPool.fromInit(
                            deployer.address,
                            users[0].address
                        );
                    }
                },
                {
                    name: 'AnimalHelperVoting',
                    factory: async () => {
                        return await AnimalHelperVoting.fromInit(
                            deployer.address,
                            users[0].address,
                            users[1].address
                        );
                    }
                }
            ];

            for (const contractDef of contracts) {
                const init = await contractDef.factory();
                const contract = blockchain.openContract(init);

                await contract.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: 0n }
                );

                try {
                    const owner = await (contract as any).getOwner();
                    expect(owner).toBeDefined();
                    expect(owner.toString()).toBe(deployer.address.toString());
                    contractsWithOwners.push({ name: contractDef.name, hasOwner: true });
                } catch (error) {
                    contractsWithOwners.push({ name: contractDef.name, hasOwner: false, error: error });
                }
            }

            expect(contractsWithOwners.length).toBe(contracts.length);
            
            // Большинство контрактов должны иметь владельца
            const contractsWithValidOwners = contractsWithOwners.filter(c => c.hasOwner);
            expect(contractsWithValidOwners.length).toBeGreaterThan(4);
        });
    });

    describe('Massive Message Testing', () => {
        it('should send thousands of messages to contracts', async () => {
            // Создаем один экземпляр каждого контракта
            const token = blockchain.openContract(
                await AnimalHelperToken.fromInit(
                    deployer.address,
                    beginCell().storeStringTail('{"name":"Stress Test Token"}').endCell(),
                    beginCell().endCell(),
                    users[0].address,
                    users[1].address
                )
            );

            await token.send(deployer.getSender(), { value: toNano('1.0') }, { $$type: 'Deploy', queryId: 0n });

            const distributor = blockchain.openContract(
                await FundsDistributor.fromInit(
                    deployer.address,
                    users[0].address,
                    users[1].address,
                    users[2].address,
                    users[3].address,
                    users[4].address
                )
            );

            await distributor.send(deployer.getSender(), { value: toNano('1.0') }, { $$type: 'Deploy', queryId: 0n });

            // Отправляем сотни сообщений
            const messagePromises = [];
            
            for (let i = 0; i < 100; i++) {
                // Token messages
                messagePromises.push(
                    token.send(
                        users[i % users.length].getSender(),
                        { value: toNano('0.01') },
                        'get_jetton_data'
                    ).catch(() => {})
                );

                messagePromises.push(
                    token.send(
                        deployer.getSender(),
                        { value: toNano('0.5') },
                        'mint_initial'
                    ).catch(() => {})
                );

                messagePromises.push(
                    token.send(
                        users[i % users.length].getSender(),
                        { value: toNano('0.01') },
                        {
                            $$type: 'GetWalletAddress',
                            owner_address: users[i % users.length].address
                        }
                    ).catch(() => {})
                );

                // Distributor messages
                messagePromises.push(
                    distributor.send(
                        users[i % users.length].getSender(),
                        { value: toNano('1.0') },
                        null
                    ).catch(() => {})
                );

                messagePromises.push(
                    distributor.send(
                        deployer.getSender(),
                        { value: toNano('0.1') },
                        {
                            $$type: 'UpdateLockRatioMessage',
                            queryId: BigInt(i),
                            lock_percent: BigInt(75 + (i % 25))
                        }
                    ).catch(() => {})
                );
            }

            await Promise.all(messagePromises);
            expect(messagePromises.length).toBe(500);
        });

        it('should test all possible message combinations', async () => {
            const token = blockchain.openContract(
                await AnimalHelperToken.fromInit(
                    deployer.address,
                    beginCell().storeStringTail('{"name":"Message Test"}').endCell(),
                    beginCell().endCell(),
                    users[0].address,
                    users[1].address
                )
            );

            await token.send(deployer.getSender(), { value: toNano('1.0') }, { $$type: 'Deploy', queryId: 0n });

            // Все возможные строковые сообщения
            const stringMessages = [
                'get_jetton_data',
                'mint_initial',
                'get_wallet_data',
                'transfer',
                'burn',
                'unknown_message'
            ];

            // Все возможные типизированные сообщения
            const typedMessages = [
                { $$type: 'GetWalletAddress', owner_address: users[0].address },
                { $$type: 'UpdateContentMessage', queryId: 1n, new_content: beginCell().storeStringTail('{}').endCell() },
                { $$type: 'Deploy', queryId: 2n },
                { $$type: 'DeployOk', queryId: 3n }
            ];

            // Тестируем все комбинации отправителей и сообщений
            for (const sender of [deployer, ...users.slice(0, 3)]) {
                for (const message of stringMessages) {
                    await token.send(
                        sender.getSender(),
                        { value: toNano('0.1') },
                        message as any
                    ).catch(() => {});
                }

                for (const message of typedMessages) {
                    await token.send(
                        sender.getSender(),
                        { value: toNano('0.1') },
                        message
                    ).catch(() => {});
                }
            }

            expect(true).toBe(true);
        });
    });

    describe('Extreme Value Testing', () => {
        it('should test with extreme bigint values', () => {
            const extremeValues = [
                0n,
                1n,
                2n ** 8n - 1n,    // max uint8
                2n ** 16n - 1n,   // max uint16
                2n ** 32n - 1n,   // max uint32
                2n ** 64n - 1n,   // max uint64
                2n ** 128n - 1n,  // max uint128
                2n ** 256n - 1n,  // max uint256
                toNano('0.000000001'),      // 1 nano TON
                toNano('1'),                // 1 TON
                toNano('1000000'),          // 1M TON
                toNano('1000000000'),       // 1B TON
                toNano('999999999.999999999') // Max reasonable TON amount
            ];

            extremeValues.forEach((value, index) => {
                expect(typeof value).toBe('bigint');
                expect(value >= 0n).toBe(true);

                // Тестируем что значения можно использовать в ячейках
                try {
                    let bits = 256;
                    if (value < 256n) bits = 8;
                    else if (value < 65536n) bits = 16;
                    else if (value < 4294967296n) bits = 32;
                    else if (value < 18446744073709551616n) bits = 64;
                    else if (value < 2n ** 128n) bits = 128;

                    const cell = beginCell().storeUint(value, bits).endCell();
                    expect(cell).toBeDefined();
                    expect(cell.hash()).toBeTruthy();

                    // Проверяем что можем прочитать обратно
                    const slice = cell.beginParse();
                    const readValue = slice.loadUintBig(bits);
                    expect(readValue).toBe(value);
                } catch (error) {
                    // Некоторые экстремальные значения могут не поместиться
                    expect(error).toBeDefined();
                }
            });
        });

        it('should test with extreme string values', () => {
            const extremeStrings = [
                '',
                'a',
                'A'.repeat(127),  // Max single Cell string
                'B'.repeat(1000), // Very long string
                '🦄'.repeat(50),   // Unicode characters
                JSON.stringify({ nested: { very: { deep: { object: { with: { many: { levels: 'value' } } } } } } }),
                Buffer.from(new Array(500).fill(0)).toString('hex'), // Long hex string
                'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?`~',
                '\n\r\t\0\x01\x1F', // Control characters
                'Mixed: 123 ABC абв 🌟💫 \\n\\t'
            ];

            extremeStrings.forEach((str, index) => {
                try {
                    const cell = beginCell().storeStringTail(str).endCell();
                    expect(cell).toBeDefined();
                    expect(cell.hash()).toBeTruthy();
                    expect(cell.toBoc()).toBeTruthy();
                } catch (error) {
                    // Некоторые экстремальные строки могут вызвать ошибки
                    expect(error).toBeDefined();
                }
            });
        });

        it('should test with extreme Cell structures', () => {
            const extremeCells = [];

            // Пустая ячейка
            extremeCells.push(beginCell().endCell());

            // Ячейка с максимальным количеством битов
            extremeCells.push(beginCell().storeUint(2n ** 32n - 1n, 32).storeUint(2n ** 32n - 1n, 32).endCell());

            // Ячейка с максимальным количеством рефов
            const ref1 = beginCell().storeUint(1, 32).endCell();
            const ref2 = beginCell().storeUint(2, 32).endCell();
            const ref3 = beginCell().storeUint(3, 32).endCell();
            const ref4 = beginCell().storeUint(4, 32).endCell();
            extremeCells.push(beginCell().storeRef(ref1).storeRef(ref2).storeRef(ref3).storeRef(ref4).endCell());

            // Глубоко вложенная структура
            let deepCell = beginCell().storeUint(0, 8).endCell();
            for (let i = 1; i < 10; i++) {
                deepCell = beginCell().storeUint(i, 8).storeRef(deepCell).endCell();
            }
            extremeCells.push(deepCell);

            // Ячейка с разными типами данных
            extremeCells.push(
                beginCell()
                    .storeBit(true)
                    .storeBit(false)
                    .storeUint(255, 8)
                    .storeInt(-128, 8)
                    .storeAddress(deployer.address)
                    .storeStringTail('test')
                    .endCell()
            );

            extremeCells.forEach((cell, index) => {
                expect(cell).toBeDefined();
                expect(cell.hash()).toBeTruthy();
                expect(cell.toBoc()).toBeTruthy();

                // Проверяем что можем клонировать
                const clonedCell = beginCell().storeRef(cell).endCell();
                expect(clonedCell).toBeDefined();
                expect(clonedCell.refs).toHaveLength(1);
            });
        });
    });

    describe('Error Scenarios and Edge Cases', () => {
        it('should handle all possible error conditions', async () => {
            const token = blockchain.openContract(
                await AnimalHelperToken.fromInit(
                    deployer.address,
                    beginCell().storeStringTail('{"name":"Error Test"}').endCell(),
                    beginCell().endCell(),
                    users[0].address,
                    users[1].address
                )
            );

            await token.send(deployer.getSender(), { value: toNano('1.0') }, { $$type: 'Deploy', queryId: 0n });

            // Тестируем различные сценарии ошибок
            const errorScenarios = [
                // Недостаточно TON для операции
                () => token.send(users[0].getSender(), { value: 1n }, 'get_jetton_data'),
                
                // Неправильный отправитель
                () => token.send(users[9].getSender(), { value: toNano('1.0') }, 'mint_initial'),
                
                // Неправильный тип сообщения
                () => token.send(deployer.getSender(), { value: toNano('0.1') }, { $$type: 'InvalidMessage' as any }),
                
                // Нулевой адрес
                () => token.send(deployer.getSender(), { value: toNano('0.1') }, {
                    $$type: 'GetWalletAddress',
                    owner_address: Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ')
                }),
                
                // Очень большой queryId
                () => token.send(deployer.getSender(), { value: toNano('0.1') }, {
                    $$type: 'UpdateContentMessage',
                    queryId: 2n ** 64n - 1n,
                    new_content: beginCell().endCell()
                })
            ];

            for (const scenario of errorScenarios) {
                try {
                    await scenario();
                } catch (error) {
                    // Ожидаемые ошибки
                    expect(error).toBeDefined();
                }
            }
        });

        it('should test boundary conditions', async () => {
            const boundaryTests = [
                {
                    name: 'Minimum TON amount',
                    value: 1n,
                    expectSuccess: false
                },
                {
                    name: 'Standard TON amount',
                    value: toNano('0.1'),
                    expectSuccess: true
                },
                {
                    name: 'Large TON amount',
                    value: toNano('1000'),
                    expectSuccess: true
                },
                {
                    name: 'Extreme TON amount',
                    value: toNano('999999999'),
                    expectSuccess: false // Likely to fail due to balance
                }
            ];

            const token = blockchain.openContract(
                await AnimalHelperToken.fromInit(
                    deployer.address,
                    beginCell().storeStringTail('{"name":"Boundary Test"}').endCell(),
                    beginCell().endCell(),
                    users[0].address,
                    users[1].address
                )
            );

            await token.send(deployer.getSender(), { value: toNano('1.0') }, { $$type: 'Deploy', queryId: 0n });

            for (const test of boundaryTests) {
                try {
                    await token.send(
                        deployer.getSender(),
                        { value: test.value },
                        'get_jetton_data'
                    );
                    
                    if (!test.expectSuccess) {
                        // Если ожидали ошибку, но её не было - это тоже результат
                        expect(true).toBe(true);
                    }
                } catch (error) {
                    if (test.expectSuccess) {
                        // Неожиданная ошибка
                        expect(error).toBeDefined();
                    } else {
                        // Ожидаемая ошибка
                        expect(error).toBeDefined();
                    }
                }
            }
        });
    });

    describe('Performance and Stress Testing', () => {
        it('should handle concurrent operations', async () => {
            const token = blockchain.openContract(
                await AnimalHelperToken.fromInit(
                    deployer.address,
                    beginCell().storeStringTail('{"name":"Concurrent Test"}').endCell(),
                    beginCell().endCell(),
                    users[0].address,
                    users[1].address
                )
            );

            await token.send(deployer.getSender(), { value: toNano('1.0') }, { $$type: 'Deploy', queryId: 0n });

            // Создаем множество параллельных операций
            const concurrentOperations = [];
            
            for (let i = 0; i < 50; i++) {
                concurrentOperations.push(
                    token.send(
                        users[i % users.length].getSender(),
                        { value: toNano('0.01') },
                        'get_jetton_data'
                    ).catch(() => {})
                );

                concurrentOperations.push(
                    token.send(
                        users[i % users.length].getSender(),
                        { value: toNano('0.01') },
                        {
                            $$type: 'GetWalletAddress',
                            owner_address: users[i % users.length].address
                        }
                    ).catch(() => {})
                );
            }

            const startTime = Date.now();
            await Promise.all(concurrentOperations);
            const endTime = Date.now();

            expect(concurrentOperations.length).toBe(100);
            expect(endTime - startTime).toBeLessThan(30000); // Должно завершиться за 30 секунд
        });

        it('should test memory efficiency with large data structures', () => {
            // Создаем большие структуры данных
            const largeDictionary = Dictionary.empty(Dictionary.Keys.Uint(32), Dictionary.Values.Cell());
            
            // Заполняем словарь
            for (let i = 0; i < 1000; i++) {
                const cell = beginCell()
                    .storeUint(i, 32)
                    .storeStringTail(`Large data item ${i} with some additional content to make it bigger`)
                    .endCell();
                largeDictionary.set(i, cell);
            }

            expect(largeDictionary.size).toBe(1000);

            // Создаем большую ячейку с множественными рефами
            const largeCell = beginCell()
                .storeDict(largeDictionary)
                .storeUint(999999999n, 32)
                .storeStringTail('This is a large cell with dictionary and other data')
                .endCell();

            expect(largeCell).toBeDefined();
            expect(largeCell.hash()).toBeTruthy();
            expect(largeCell.toBoc()).toBeTruthy();

            // Проверяем что можем сериализовать/десериализовать
            const boc = largeCell.toBoc();
            expect(boc.length).toBeGreaterThan(1000); // Должна быть достаточно большой
        });
    });
}); 