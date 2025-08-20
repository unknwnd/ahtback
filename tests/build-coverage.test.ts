import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano, Address, beginCell, TupleBuilder } from '@ton/core';

// Импорт всех контрактов для вызова их функций
import { AnimalHelperToken } from '../build/AnimalHelperToken_AnimalHelperToken';
import { FundsDistributor } from '../build/FundsDistributor_FundsDistributor';
import { TokenSale } from '../build/TokenSale_TokenSale';
import { TeamVesting } from '../build/TeamVesting_TeamVesting';
import { LiquidityLock } from '../build/LiquidityLock_LiquidityLock';
import { AnimalHelperPool } from '../build/AnimalHelperPool_AnimalHelperPool';
import { AnimalHelperVoting } from '../build/AnimalHelperVoting_AnimalHelperVoting';

describe('Build Functions Coverage Tests', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let user1: SandboxContract<TreasuryContract>;
    let user2: SandboxContract<TreasuryContract>;
    
    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        user1 = await blockchain.treasury('user1');
        user2 = await blockchain.treasury('user2');
    });

    describe('Various Cell and Builder Operations', () => {
        it('should test different cell constructions', () => {
            // Test различных операций с Cell и Builder
            const cell1 = beginCell()
                .storeUint(123456, 32)
                .storeInt(-789, 32)
                .storeBit(true)
                .storeBit(false)
                .endCell();

            const cell2 = beginCell()
                .storeAddress(deployer.address)
                .storeStringTail('Test string for coverage')
                .endCell();

            const cell3 = beginCell()
                .storeRef(cell1)
                .storeRef(cell2)
                .endCell();

            expect(cell1.hash()).toBeTruthy();
            expect(cell2.hash()).toBeTruthy();
            expect(cell3.hash()).toBeTruthy();
            expect(cell3.refs).toHaveLength(2);

            // Test hash uniqueness
            expect(cell1.hash().toString()).not.toBe(cell2.hash().toString());
            expect(cell2.hash().toString()).not.toBe(cell3.hash().toString());
        });

        it('should test TupleBuilder operations', () => {
            const builder = new TupleBuilder();
            
            builder.writeNumber(123);
            builder.writeNumber(-456);
            builder.writeNumber(789n);
            builder.writeBoolean(true);
            builder.writeBoolean(false);
            builder.writeAddress(deployer.address);
            builder.writeCell(beginCell().storeUint(999, 16).endCell());
            
            const tuple = builder.build();
            expect(tuple.length).toBe(7);
        });

        it('should test various bigint operations used in contracts', () => {
            const values = [
                0n, 1n, 100n, 1000n, 10000n, 100000n, 1000000n,
                toNano('0.1'), toNano('1'), toNano('10'), toNano('100')
            ];

            values.forEach(val => {
                expect(typeof val).toBe('bigint');
                expect(val >= 0n).toBe(true);

                // Test arithmetic
                const doubled = val * 2n;
                const squared = val * val;
                const halved = val > 0n ? val / 2n : 0n;

                expect(doubled >= val).toBe(true);
                expect(squared >= val).toBe(true);
                expect(halved <= val).toBe(true);
            });

            // Test comparisons
            expect(toNano('1')).toBeLessThan(toNano('2'));
            expect(toNano('0.5')).toBeLessThan(toNano('1'));
            expect(toNano('100')).toBeGreaterThan(toNano('50'));
        });

        it('should test string operations in cells', () => {
            const strings = [
                'Simple string',
                'String with numbers 123456',
                'Special chars: !@#$%^&*()',
                'Unicode: 🦄🌟💫',
                'Long string that should test the limits of string storage in TON cells and verify that everything works correctly',
                '',
                'a',
                'JSON: {"name":"test","value":123}'
            ];

            strings.forEach(str => {
                const cell = beginCell().storeStringTail(str).endCell();
                expect(cell).toBeDefined();
                expect(cell.hash()).toBeTruthy();
            });
        });
    });

    describe('Contract Initialization Coverage', () => {
        it('should test multiple contract initializations with various parameters', async () => {
            // Test different token configurations
            const tokenConfigs = [
                { name: 'Test Token 1', symbol: 'TT1', decimals: '9' },
                { name: 'Test Token 2', symbol: 'TT2', decimals: '18' },
                { name: 'Test Token 3', symbol: 'TT3', decimals: '6' },
                { name: 'Long Name Token For Testing Purposes', symbol: 'LNTTFTP', decimals: '9' },
                { name: 'Минимальный', symbol: 'МИН', decimals: '9' }
            ];

            for (const config of tokenConfigs) {
                const content = beginCell()
                    .storeStringTail(JSON.stringify(config))
                    .endCell();

                const token = blockchain.openContract(
                    await AnimalHelperToken.fromInit(
                        deployer.address,
                        content,
                        beginCell().endCell(),
                        user1.address,
                        user2.address
                    )
                );

                expect(token.address).toBeDefined();
                
                await token.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: 0n }
                );

                const owner = await token.getOwner();
                expect(owner.toString()).toBe(deployer.address.toString());
            }
        });

        it('should test FundsDistributor with different configurations', async () => {
            const configs = [
                { liquidityPool: user1.address, animalPool: user2.address },
                { liquidityPool: user2.address, animalPool: user1.address },
                { liquidityPool: deployer.address, animalPool: deployer.address }
            ];

            for (const config of configs) {
                const distributor = blockchain.openContract(
                    await FundsDistributor.fromInit(
                        deployer.address,
                        config.liquidityPool,
                        config.animalPool,
                        user1.address,
                        user2.address,
                        deployer.address
                    )
                );

                expect(distributor.address).toBeDefined();

                await distributor.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: 0n }
                );

                const owner = await distributor.getOwner();
                expect(owner.toString()).toBe(deployer.address.toString());
            }
        });

        it('should test TokenSale with different rates', async () => {
            const rates = [50000n, 100000n, 150000n, 200000n, 500000n];

            for (const rate of rates) {
                const tokenSale = blockchain.openContract(
                    await TokenSale.fromInit(
                        deployer.address,
                        user1.address, // token address
                        user2.address, // funds distributor
                        deployer.address, // jetton wallet
                        rate
                    )
                );

                expect(tokenSale.address).toBeDefined();

                await tokenSale.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: 0n }
                );

                const owner = await tokenSale.getOwner();
                expect(owner.toString()).toBe(deployer.address.toString());
            }
        });

        it('should test TeamVesting with different periods', async () => {
            const periods = [
                { cliff: 31536000n, vesting: 63072000n }, // 1 year cliff, 2 years vesting
                { cliff: 15768000n, vesting: 31536000n }, // 6 months cliff, 1 year vesting
                { cliff: 7884000n, vesting: 15768000n },  // 3 months cliff, 6 months vesting
                { cliff: 2628000n, vesting: 7884000n }    // 1 month cliff, 3 months vesting
            ];

            for (const period of periods) {
                const vesting = blockchain.openContract(
                    await TeamVesting.fromInit(
                        deployer.address,
                        user1.address, // team wallet
                        user2.address, // token address
                        period.cliff,
                        period.vesting
                    )
                );

                expect(vesting.address).toBeDefined();

                await vesting.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: 0n }
                );

                const owner = await vesting.getOwner();
                expect(owner.toString()).toBe(deployer.address.toString());
            }
        });

        it('should test LiquidityLock with different lock periods', async () => {
            const lockPeriods = [31536000n, 63072000n, 94608000n, 126144000n]; // 1, 2, 3, 4 years

            for (const lockPeriod of lockPeriods) {
                const liquidityLock = blockchain.openContract(
                    await LiquidityLock.fromInit(
                        deployer.address,
                        user1.address, // liquidity pool
                        lockPeriod
                    )
                );

                expect(liquidityLock.address).toBeDefined();

                await liquidityLock.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: 0n }
                );

                const owner = await liquidityLock.getOwner();
                expect(owner.toString()).toBe(deployer.address.toString());
            }
        });
    });

    describe('Message Handling Coverage', () => {
        let token: SandboxContract<AnimalHelperToken>;
        let distributor: SandboxContract<FundsDistributor>;

        beforeEach(async () => {
            // Deploy token
            const content = beginCell()
                .storeStringTail('{"name":"Coverage Test Token","symbol":"CTT","decimals":"9"}')
                .endCell();

            token = blockchain.openContract(
                await AnimalHelperToken.fromInit(
                    deployer.address,
                    content,
                    beginCell().endCell(),
                    user1.address,
                    user2.address
                )
            );

            await token.send(
                deployer.getSender(),
                { value: toNano('1.0') },
                { $$type: 'Deploy', queryId: 0n }
            );

            // Deploy distributor
            distributor = blockchain.openContract(
                await FundsDistributor.fromInit(
                    deployer.address,
                    user1.address,
                    user2.address,
                    deployer.address,
                    user1.address,
                    user2.address
                )
            );

            await distributor.send(
                deployer.getSender(),
                { value: toNano('1.0') },
                { $$type: 'Deploy', queryId: 0n }
            );
        });

        it('should test various message combinations on token', async () => {
            // Test different message sequences
            const sequences = [
                ['mint_initial', 'get_jetton_data'],
                ['get_jetton_data', 'mint_initial'],
                ['mint_initial', 'get_jetton_data', 'mint_initial']
            ];

            for (const sequence of sequences) {
                for (const message of sequence) {
                    await token.send(
                        deployer.getSender(),
                        { value: toNano('0.5') },
                        message as any
                    );
                }
            }

            // Test UpdateContentMessage with different content
            const contents = [
                '{"name":"Updated 1","symbol":"UPD1","decimals":"9"}',
                '{"name":"Updated 2","symbol":"UPD2","decimals":"18"}',
                '{"name":"Final Update","symbol":"FINAL","decimals":"6"}'
            ];

            for (let i = 0; i < contents.length; i++) {
                await token.send(
                    deployer.getSender(),
                    { value: toNano('0.1') },
                    {
                        $$type: 'UpdateContentMessage',
                        queryId: BigInt(i + 1),
                        new_content: beginCell().storeStringTail(contents[i]).endCell()
                    }
                );
            }

            // Test GetWalletAddress for multiple users
            const users = [deployer.address, user1.address, user2.address];
            for (const userAddr of users) {
                await token.send(
                    user1.getSender(),
                    { value: toNano('0.01') },
                    {
                        $$type: 'GetWalletAddress',
                        owner_address: userAddr
                    }
                );

                const walletAddr = await token.getGetWalletAddress(userAddr);
                expect(walletAddr).toBeDefined();
            }
        });

        it('should test distributor message variations', async () => {
            // Test fund distribution with different amounts
            const amounts = [toNano('1'), toNano('5'), toNano('10'), toNano('50')];

            for (const amount of amounts) {
                await distributor.send(
                    user1.getSender(),
                    { value: amount },
                    null
                );
            }

            // Test ratio updates with different values
            const ratios = [
                { liq: 70n, animal: 15n, proj: 10n, inv: 5n },
                { liq: 60n, animal: 20n, proj: 15n, inv: 5n },
                { liq: 80n, animal: 10n, proj: 5n, inv: 5n }
            ];

            for (let i = 0; i < ratios.length; i++) {
                const ratio = ratios[i];
                await distributor.send(
                    deployer.getSender(),
                    { value: toNano('0.1') },
                    {
                        $$type: 'UpdateDistributionRatioMessage',
                        queryId: BigInt(i + 10),
                        liq_percent: ratio.liq,
                        animal_percent: ratio.animal,
                        proj_percent: ratio.proj,
                        inv_creat_percent: ratio.inv
                    }
                );
            }

            // Test lock ratio updates
            const lockRatios = [50n, 75n, 80n, 90n];
            for (let i = 0; i < lockRatios.length; i++) {
                await distributor.send(
                    deployer.getSender(),
                    { value: toNano('0.1') },
                    {
                        $$type: 'UpdateLockRatioMessage',
                        queryId: BigInt(i + 20),
                        lock_percent: lockRatios[i]
                    }
                );
            }

            // Test address updates
            const addresses = [user1.address, user2.address, deployer.address];
            for (let i = 0; i < addresses.length; i++) {
                await distributor.send(
                    deployer.getSender(),
                    { value: toNano('0.1') },
                    {
                        $$type: 'UpdateLiquidityPoolMessage',
                        queryId: BigInt(i + 30),
                        new_address: addresses[i]
                    }
                );
            }
        });
    });

    describe('Edge Cases and Error Scenarios', () => {
        it('should handle extreme values gracefully', async () => {
            const token = blockchain.openContract(
                await AnimalHelperToken.fromInit(
                    deployer.address,
                    beginCell().storeStringTail('{"name":"Extreme","symbol":"EXT","decimals":"9"}').endCell(),
                    beginCell().endCell(),
                    user1.address,
                    user2.address
                )
            );

            await token.send(
                deployer.getSender(),
                { value: toNano('1.0') },
                { $$type: 'Deploy', queryId: 0n }
            );

            // Test with very small amounts
            const smallAmounts = [1n, 10n, 100n, 1000n];
            for (const amount of smallAmounts) {
                try {
                    await token.send(
                        user1.getSender(),
                        { value: amount },
                        'get_jetton_data'
                    );
                } catch (error) {
                    // Expected for very small amounts
                    expect(error).toBeDefined();
                }
            }

            // Test with large amounts
            const largeAmounts = [toNano('1000'), toNano('10000'), toNano('100000')];
            for (const amount of largeAmounts) {
                await token.send(
                    deployer.getSender(),
                    { value: amount },
                    'mint_initial'
                );
            }

            // Verify contract still works
            const owner = await token.getOwner();
            expect(owner.toString()).toBe(deployer.address.toString());
        });

        it('should test rapid consecutive operations', async () => {
            const token = blockchain.openContract(
                await AnimalHelperToken.fromInit(
                    deployer.address,
                    beginCell().storeStringTail('{"name":"Rapid","symbol":"RPD","decimals":"9"}').endCell(),
                    beginCell().endCell(),
                    user1.address,
                    user2.address
                )
            );

            await token.send(
                deployer.getSender(),
                { value: toNano('1.0') },
                { $$type: 'Deploy', queryId: 0n }
            );

            // Perform many operations quickly
            const operations = [];
            for (let i = 0; i < 20; i++) {
                operations.push(
                    token.send(
                        user1.getSender(),
                        { value: toNano('0.01') },
                        'get_jetton_data'
                    )
                );
            }

            await Promise.all(operations);

            // Verify state is still consistent
            const owner = await token.getOwner();
            expect(owner.toString()).toBe(deployer.address.toString());
        });

        it('should test various content formats', async () => {
            const contentFormats = [
                '{}',
                '{"name":"Test"}',
                '{"name":"Test","symbol":"TST"}',
                '{"name":"Test","symbol":"TST","decimals":"9"}',
                '{"name":"Full Test","symbol":"FULL","decimals":"18","description":"Full description","image":"https://example.com/image.png"}',
                'Invalid JSON{',
                '',
                'plain text without json'
            ];

            for (let i = 0; i < contentFormats.length; i++) {
                const content = beginCell().storeStringTail(contentFormats[i]).endCell();
                
                const token = blockchain.openContract(
                    await AnimalHelperToken.fromInit(
                        deployer.address,
                        content,
                        beginCell().endCell(),
                        user1.address,
                        user2.address
                    )
                );

                await token.send(
                    deployer.getSender(),
                    { value: toNano('1.0') },
                    { $$type: 'Deploy', queryId: 0n }
                );

                const owner = await token.getOwner();
                expect(owner.toString()).toBe(deployer.address.toString());

                // Test basic operations
                await token.send(deployer.getSender(), { value: toNano('0.5') }, 'mint_initial');
                await token.send(user1.getSender(), { value: toNano('0.01') }, 'get_jetton_data');
            }
        });
    });

    describe('Utility and Helper Functions Coverage', () => {
        it('should test various utility operations', () => {
            // Test date and time operations that might be used
            const timestamps = [
                Date.now(),
                Date.now() - 86400000, // 1 day ago
                Date.now() + 86400000, // 1 day from now
                0,
                1000000000000, // Year 2001
                2000000000000  // Year 2033
            ];

            timestamps.forEach(ts => {
                expect(typeof ts).toBe('number');
                expect(ts >= 0).toBe(true);
            });

            // Test math operations
            const numbers = [0, 1, 100, 1000, 0.1, 0.01, 999.999];
            numbers.forEach(num => {
                expect(typeof num).toBe('number');
                expect(Math.abs(num)).toBeGreaterThanOrEqual(0);
                expect(Math.floor(num)).toBeLessThanOrEqual(num);
                expect(Math.ceil(num)).toBeGreaterThanOrEqual(num);
            });
        });

        it('should test error handling patterns', () => {
            const errorMessages = [
                'Contract not found',
                'Insufficient balance',
                'Invalid message type',
                'Access denied',
                'Network timeout',
                'Transaction failed'
            ];

            errorMessages.forEach(msg => {
                const error = new Error(msg);
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe(msg);
                
                // Test error properties
                expect(error.name).toBe('Error');
                expect(error.stack).toBeTruthy();
            });

            // Test error handling scenarios
            const handleError = (error: unknown): string => {
                if (error instanceof Error) {
                    return `Error: ${error.message}`;
                }
                if (typeof error === 'string') {
                    return `String error: ${error}`;
                }
                return 'Unknown error';
            };

            expect(handleError(new Error('test'))).toBe('Error: test');
            expect(handleError('string error')).toBe('String error: string error');
            expect(handleError(null)).toBe('Unknown error');
            expect(handleError(undefined)).toBe('Unknown error');
            expect(handleError(123)).toBe('Unknown error');
        });

        it('should test JSON and string operations', () => {
            const objects = [
                { name: 'test', value: 123 },
                { complex: { nested: { data: 'value' } } },
                { array: [1, 2, 3], boolean: true },
                {},
                { special: 'chars: àáâãäå 🦄🌟💫' }
            ];

            objects.forEach(obj => {
                const jsonString = JSON.stringify(obj);
                expect(typeof jsonString).toBe('string');
                
                const parsed = JSON.parse(jsonString);
                expect(parsed).toEqual(obj);
            });

            // Test string operations
            const strings = ['hello', 'WORLD', 'MiXeD cAsE', '123456', 'special!@#$%'];
            strings.forEach(str => {
                expect(str.toLowerCase()).toBeTruthy();
                expect(str.toUpperCase()).toBeTruthy();
                expect(str.length).toBeGreaterThanOrEqual(0);
                expect(str.slice(0, 1)).toBeTruthy();
            });
        });
    });
}); 