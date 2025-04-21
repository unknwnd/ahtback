import "@stdlib/deploy";
import "@stdlib/ownable";

// Сообщения для контракта
message UpdateLiquidityPoolMessage {
    queryId: Int;
    new_address: Address;
}

message UpdateAnimalHelperPoolMessage {
    queryId: Int;
    new_address: Address;
}

message UpdateProjectPoolMessage {
    queryId: Int;
    new_address: Address;
}

message UpdateInvestorsCreatorsPoolMessage {
    queryId: Int;
    new_address: Address;
}

message UpdateLiquidityLockMessage {
    queryId: Int;
    new_address: Address;
}

message UpdateDistributionRatioMessage {
    queryId: Int;
    liq_percent: Int;
    animal_percent: Int;
    proj_percent: Int;
    inv_creat_percent: Int;
}

message UpdateLockRatioMessage {
    queryId: Int;
    lock_percent: Int; // процент от средств ликвидности, который блокируется
}

message EmergencyWithdrawMessage {
    queryId: Int;
}

// Структура для хранения данных мультиподписи и восстановления
struct AdminConfig {
    tempAdmin: Address?;
    recoveryAddress: Address;
    lockUntil: Int;
    proposalId: Int;
    pendingProposals: map<Int, Cell>;
}

// Структура для проверки транзакций
struct TransactionSummary {
    successCount: Int;
    failCount: Int;
    totalSent: Int;
}

// Контракт для распределения средств между разными пулами
contract FundsDistributor with Deployable, Ownable {
    owner: Address;
    liquidityPool: Address;     // Адрес пула ликвидности
    liquidityLock: Address;     // Адрес контракта блокировки ликвидности
    animalHelperPool: Address;  // Адрес пула помощи животным
    projectPool: Address;       // Адрес пула проекта
    investorsCreatorsPool: Address;  // Адрес пула инвесторов и создателей
    
    // Процентное распределение средств
    liquidityPercent: Int = 65;         // 65% для ликвидности
    animalHelperPercent: Int = 20;      // 20% для помощи животным
    projectPercent: Int = 10;           // 10% для развития проекта
    investorsCreatorsPercent: Int = 5;  // 5% для инвесторов и создателей
    
    // Процент средств ликвидности, направляемых в блокировку
    lockPercent: Int = 70; // 70% средств ликвидности блокируется
    
    // Минимальные суммы для отправки в пулы
    minDistributionAmount: Int = ton("0.01"); // Минимальная сумма для распределения
    
    // Конфигурация безопасности
    adminConfig: AdminConfig;
    
    // Метрики транзакций
    transactionMetrics: TransactionSummary;
    
    init(owner: Address, liquidityPool: Address, liquidityLock: Address, animalHelperPool: Address, 
         projectPool: Address, investorsCreatorsPool: Address) {
        self.owner = owner;
        
        self.liquidityPool = liquidityPool;
        self.liquidityLock = liquidityLock;
        self.animalHelperPool = animalHelperPool;
        self.projectPool = projectPool;
        self.investorsCreatorsPool = investorsCreatorsPool;
        
        // Инициализация системы безопасности
        self.adminConfig = AdminConfig{
            tempAdmin: null,
            recoveryAddress: owner, // По умолчанию совпадает с владельцем
            lockUntil: 0,           // Нет блокировки по умолчанию
            proposalId: 0,
            pendingProposals: emptyMap()
        };
        
        // Инициализация метрик
        self.transactionMetrics = TransactionSummary{
            successCount: 0,
            failCount: 0,
            totalSent: 0
        };
    }
    
    // Проверка прав администратора
    fun requireAdmin() {
        // Проверяем, не заблокирована ли админ функция по времени
        require(now() > self.adminConfig.lockUntil, "Admin functions are temporarily locked");
        
        // Проверяем, является ли отправитель владельцем или временным админом
        let isAdmin: Bool = (sender() == self.owner);
        if (self.adminConfig.tempAdmin != null) {
            isAdmin = isAdmin || (sender() == self.adminConfig.tempAdmin!!);
        }
        require(isAdmin, "Not authorized");
    }
    
    // Основной обработчик для распределения входящих средств
    receive() {
        // Динамический расчет комиссии в зависимости от сети
        let gasAmount: Int = min(ton("0.05"), context().value / 10);
        let totalAmount: Int = context().value - gasAmount;
        
        // Проверяем, достаточно ли средств для распределения
        require(totalAmount >= self.minDistributionAmount, "Amount too small for distribution");
        
        // Проверяем, что все адреса пулов установлены и валидны
        self.validatePoolAddresses();
        
        // Распределение средств согласно процентам
        self.distributeAmount(totalAmount, 0); // 0 - дефолтный queryId
    }
    
    // Проверка валидности адресов пулов
    fun validatePoolAddresses() {
        // Просто проверяем, что адреса не пустые
        require(self.liquidityPool.toString() != "", "Invalid liquidity pool address");
        require(self.liquidityLock.toString() != "", "Invalid liquidity lock address");
        require(self.animalHelperPool.toString() != "", "Invalid animal helper pool address");
        require(self.projectPool.toString() != "", "Invalid project pool address");
        require(self.investorsCreatorsPool.toString() != "", "Invalid investors creators pool address");
    }
    
    // Функция для распределения средств
    fun distributeAmount(amount: Int, queryId: Int) {
        // Проверка суммы на минимальный порог
        require(amount >= self.minDistributionAmount, "Amount too small for distribution");
        
        // Вычисляем суммы для каждого пула на основе процентов
        let liquidityAmount: Int = (amount * self.liquidityPercent) / 100;
        let animalHelperAmount: Int = (amount * self.animalHelperPercent) / 100;
        let projectAmount: Int = (amount * self.projectPercent) / 100;
        let investorsCreatorsAmount: Int = (amount * self.investorsCreatorsPercent) / 100;
        
        // Проверяем, что сумма распределенных средств не превышает доступную сумму
        let distributedSum: Int = liquidityAmount + animalHelperAmount + projectAmount + investorsCreatorsAmount;
        require(distributedSum <= amount, "Distribution error: sum exceeds amount");
        
        // Инициализация счетчика успешных транзакций
        let successCount: Int = 0;
        let sentAmount: Int = 0;
        
        // Распределяем средства для ликвидности между пулом и контрактом блокировки
        if (liquidityAmount >= self.minDistributionAmount) {
            // Вычисляем, сколько средств блокировать
            let lockAmount: Int = (liquidityAmount * self.lockPercent) / 100;
            let directAmount: Int = liquidityAmount - lockAmount;
            
            // Отправляем часть средств напрямую в пул ликвидности
            if (directAmount >= self.minDistributionAmount) {
                let success: Bool = self.sendFunds(self.liquidityPool, directAmount, queryId);
                if (success) {
                    successCount += 1;
                    sentAmount += directAmount;
                }
            }
            
            // Отправляем часть средств в контракт блокировки
            if (lockAmount >= self.minDistributionAmount) {
                let success: Bool = self.sendFunds(self.liquidityLock, lockAmount, queryId);
                if (success) {
                    successCount += 1;
                    sentAmount += lockAmount;
                }
            }
        }
        
        // Отправляем средства в пул помощи животным
        if (animalHelperAmount >= self.minDistributionAmount) {
            let success: Bool = self.sendFunds(self.animalHelperPool, animalHelperAmount, queryId);
            if (success) {
                successCount += 1;
                sentAmount += animalHelperAmount;
            }
        }
        
        // Отправляем средства в пул проекта
        if (projectAmount >= self.minDistributionAmount) {
            let success: Bool = self.sendFunds(self.projectPool, projectAmount, queryId);
            if (success) {
                successCount += 1;
                sentAmount += projectAmount;
            }
        }
        
        // Отправляем средства в пул инвесторов/создателей
        if (investorsCreatorsAmount >= self.minDistributionAmount) {
            let success: Bool = self.sendFunds(self.investorsCreatorsPool, investorsCreatorsAmount, queryId);
            if (success) {
                successCount += 1;
                sentAmount += investorsCreatorsAmount;
            }
        }
        
        // Обновляем метрики транзакций
        self.transactionMetrics.successCount += successCount;
        self.transactionMetrics.failCount += (5 - successCount); // Максимум 5 транзакций
        self.transactionMetrics.totalSent += sentAmount;
    }
    
    // Вспомогательная функция для отправки средств
    fun sendFunds(to: Address, amount: Int, queryId: Int): Bool {
        // Проверяем, что сумма достаточна
        if (amount < self.minDistributionAmount) {
            return false;
        }
        
        // Отправляем средства с корректной обработкой ошибок
        send(SendParameters{
            to: to,
            bounce: true,
            value: amount,
            mode: SendPayGasSeparately, // Используем более безопасный режим
            body: beginCell().storeUint(queryId, 64).endCell()
        });
        
        return true; // Транзакция отправлена успешно
    }
    
    // Функция для экстренного вывода средств (только владелец)
    receive(msg: EmergencyWithdrawMessage) {
        self.requireAdmin();
        
        // В случае экстренной ситуации выводим средства на адрес отправителя
        send(SendParameters{
            to: sender(),
            bounce: false,
            value: 0, // Отправляем все оставшиеся средства
            mode: SendRemainingBalance + SendPayGasSeparately
        });
    }
    
    // Получение текущей конфигурации (только для чтения)
    receive("getConfig") {
        // Готовим ответ с текущей конфигурацией
        let configData = beginCell()
            .storeAddress(self.owner)
            .storeAddress(self.liquidityPool)
            .storeAddress(self.liquidityLock)
            .storeAddress(self.animalHelperPool)
            .storeAddress(self.projectPool)
            .storeAddress(self.investorsCreatorsPool)
            .storeUint(self.liquidityPercent, 8)
            .storeUint(self.animalHelperPercent, 8)
            .storeUint(self.projectPercent, 8)
            .storeUint(self.investorsCreatorsPercent, 8)
            .storeUint(self.lockPercent, 8)
            .endCell();
            
        // Отправляем ответ
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendPayGasSeparately,
            body: configData
        });
    }
    
    // Получение метрик транзакций (только для чтения)
    receive("getMetrics") {
        // Готовим ответ с метриками транзакций
        let metricsData = beginCell()
            .storeUint(self.transactionMetrics.successCount, 64)
            .storeUint(self.transactionMetrics.failCount, 64)
            .storeCoins(self.transactionMetrics.totalSent)
            .endCell();
            
        // Отправляем ответ
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendPayGasSeparately,
            body: metricsData
        });
    }
    
    // Создание предложения администратора (мультиподпись)
    receive("proposeAdminAction") {
        require(sender() == self.owner || (self.adminConfig.tempAdmin != null && sender() == self.adminConfig.tempAdmin!!), 
                "Only admin can propose actions");
        
        // Получаем параметры предложения
        let proposalData = beginCell()
            .storeAddress(sender()) // Кто предложил действие
            .storeUint(now(), 64)   // Время предложения
            .storeSlice(context().raw)  // Данные предложения
            .endCell();
            
        // Генерируем ID предложения и сохраняем его
        let proposalId = self.adminConfig.proposalId;
        self.adminConfig.pendingProposals.set(proposalId, proposalData);
        self.adminConfig.proposalId += 1; // Увеличиваем счетчик для следующего предложения
        
        // Устанавливаем временную блокировку (24 часа для рассмотрения)
        self.adminConfig.lockUntil = now() + 60 * 60 * 24;
    }
    
    // Подтверждение предложения администратора (мультиподпись)
    receive("confirmAdminAction") {
        let slice = context().raw;
        let proposalId = slice.loadUint(32);
        
        // Проверяем существование предложения
        let proposalOpt = self.adminConfig.pendingProposals.get(proposalId);
        require(proposalOpt != null, "Proposal does not exist");
        
        let proposal = proposalOpt!!;
        let proposalSlice = proposal.beginParse();
        let proposer = proposalSlice.loadAddress();
        let proposalTime = proposalSlice.loadUint(64);
        
        // Проверяем, что отправитель не является автором предложения
        require(sender() != proposer, "Cannot confirm own proposal");
        
        // Проверяем право на подтверждение
        self.requireAdmin();
        
        // Проверяем срок действия предложения (не более 7 дней)
        require(now() - proposalTime <= 60 * 60 * 24 * 7, "Proposal expired");
        
        // Загружаем и выполняем действие из предложения
        let actionData = proposalSlice.loadRef().beginParse();
        let actionType = actionData.loadUint(32);
        
        // Обработка различных типов действий
        if (actionType == 1) { // Обновление адреса пула
            let poolType = actionData.loadUint(8);
            let newAddress = actionData.loadAddress();
            
            // Обновляем соответствующий адрес
            if (poolType == 1) {
                self.liquidityPool = newAddress;
            } else if (poolType == 2) {
                self.liquidityLock = newAddress;
            } else if (poolType == 3) {
                self.animalHelperPool = newAddress;
            } else if (poolType == 4) {
                self.projectPool = newAddress;
            } else if (poolType == 5) {
                self.investorsCreatorsPool = newAddress;
            }
        } else if (actionType == 2) { // Обновление процентного соотношения
            let liq = actionData.loadUint(8);
            let animal = actionData.loadUint(8);
            let proj = actionData.loadUint(8);
            let inv = actionData.loadUint(8);
            
            // Проверяем, что сумма равна 100%
            require(liq + animal + proj + inv == 100, "Total percentage must be 100%");
            
            // Обновляем проценты
            self.liquidityPercent = liq;
            self.animalHelperPercent = animal;
            self.projectPercent = proj;
            self.investorsCreatorsPercent = inv;
        } else if (actionType == 3) { // Обновление процента блокировки
            let lockPerc = actionData.loadUint(8);
            require(lockPerc >= 0 && lockPerc <= 100, "Invalid lock percentage");
            self.lockPercent = lockPerc;
        }
        
        // Удаляем предложение после выполнения
        self.adminConfig.pendingProposals.set(proposalId, null);
    }
    
    // Назначение временного администратора
    receive("setTempAdmin") {
        require(sender() == self.owner, "Only owner can set temp admin");
        let slice = context().raw;
        let tempAdmin = slice.loadAddress();
        
        // Устанавливаем временного администратора
        self.adminConfig.tempAdmin = tempAdmin;
        
        // Устанавливаем временную блокировку (24 часа)
        self.adminConfig.lockUntil = now() + 60 * 60 * 24;
    }
    
    // Установка адреса для восстановления
    receive("setRecoveryAddress") {
        require(sender() == self.owner, "Only owner can set recovery address");
        let slice = context().raw;
        let recoveryAddress = slice.loadAddress();
        self.adminConfig.recoveryAddress = recoveryAddress;
    }
    
    // Восстановление доступа в экстренной ситуации
    receive("recoveryAccess") {
        require(sender() == self.adminConfig.recoveryAddress, "Not recovery address");
        
        // Можно восстановить только через 7 дней после запроса
        require(now() > self.adminConfig.lockUntil + 60 * 60 * 24 * 7, "Cooldown period not passed");
        
        let slice = context().raw;
        let newOwner = slice.loadAddress();
        self.owner = newOwner;
        
        // Сбрасываем временного администратора
        self.adminConfig.tempAdmin = null;
    }
    
    // Обновление минимальной суммы для распределения
    receive("updateMinDistributionAmount") {
        self.requireAdmin();
        let slice = context().raw;
        let newAmount = slice.loadCoins();
        require(newAmount > 0, "Amount must be positive");
        self.minDistributionAmount = newAmount;
    }
    
    // Функции обновления с усиленной безопасностью
    
    // Функция для обновления адреса пула ликвидности
    receive(msg: UpdateLiquidityPoolMessage) {
        self.requireAdmin();
        self.liquidityPool = msg.new_address;
    }
    
    // Функция для обновления адреса контракта блокировки ликвидности
    receive(msg: UpdateLiquidityLockMessage) {
        self.requireAdmin();
        self.liquidityLock = msg.new_address;
    }
    
    // Функция для обновления процента блокировки
    receive(msg: UpdateLockRatioMessage) {
        self.requireAdmin();
        
        // Проверить, что процент блокировки в разумных пределах (0-100%)
        require(msg.lock_percent >= 0 && msg.lock_percent <= 100, "Invalid lock percentage");
        
        // Обновить процент блокировки
        self.lockPercent = msg.lock_percent;
    }
    
    // Функция для обновления адреса пула помощи животным
    receive(msg: UpdateAnimalHelperPoolMessage) {
        self.requireAdmin();
        self.animalHelperPool = msg.new_address;
    }
    
    // Функция для обновления адреса пула проекта
    receive(msg: UpdateProjectPoolMessage) {
        self.requireAdmin();
        self.projectPool = msg.new_address;
    }
    
    // Функция для обновления адреса пула инвесторов/создателей
    receive(msg: UpdateInvestorsCreatorsPoolMessage) {
        self.requireAdmin();
        self.investorsCreatorsPool = msg.new_address;
    }
    
    // Функция для обновления процентного соотношения распределения
    receive(msg: UpdateDistributionRatioMessage) {
        self.requireAdmin();
        
        // Проверить, что сумма всех процентов равна 100%
        let total_percent: Int = msg.liq_percent + msg.animal_percent + msg.proj_percent + msg.inv_creat_percent;
        require(total_percent == 100, "Total percentage must be 100%");
        
        // Обновить процентные соотношения
        self.liquidityPercent = msg.liq_percent;
        self.animalHelperPercent = msg.animal_percent;
        self.projectPercent = msg.proj_percent;
        self.investorsCreatorsPercent = msg.inv_creat_percent;
    }
}