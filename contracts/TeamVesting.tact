import "@stdlib/deploy";
import "@stdlib/ownable";
import "./JettonWallet.tact"; // Импортируем для работы с кошельком Jetton

// --- Сообщения ---

message ClaimMessage {
    queryId: Int;
}

message SetJettonWallet {
    queryId: Int;
    address: Address;
}

// --- Структуры ---

struct VestingData {
    owner: Address;          // Адрес, который может управлять контрактом (например, мультисиг команды)
    teamWallet: Address;     // Адрес кошелька команды, куда будут выводиться разблокированные токены
    jettonMaster: Address;   // Адрес мастер-контракта нашего токена
    jettonWallet: Address;   // Адрес jetton-кошелька самого этого вестинг-контракта
    
    totalAmount: Int;        // Общее количество токенов, заблокированных на контракте
    claimedAmount: Int;      // Количество токенов, которое уже было выведено
    
    createdAt: Int;          // Время создания (деплоя) контракта (Unix Timestamp)
    cliffDate: Int;          // Дата окончания "клиффа" (периода полной заморозки) (Unix Timestamp)
    vestingPeriod: Int;      // Общий период вестинга в секундах (например, 2 года)
}


// --- Контракт Вестинга ---

contract TeamVesting with Deployable, Ownable {
    
    owner: Address;          // Владелец контракта
    teamWallet: Address;     // Кошелек команды для получения токенов
    jettonMaster: Address;   // Мастер-контракт токена
    jettonWallet: Address?;  // Jetton-кошелек этого контракта (изначально неизвестен)
    
    totalAmount: Int;
    claimedAmount: Int;
    
    createdAt: Int;
    cliffDate: Int;
    vestingPeriod: Int; // в секундах
    
    init(owner: Address, teamWallet: Address, jettonMaster: Address, cliffDuration: Int, vestingDuration: Int) {
        self.owner = owner;
        self.teamWallet = teamWallet;
        self.jettonMaster = jettonMaster;
        self.jettonWallet = null;
        
        self.totalAmount = 0; // Будет установлен вручную
        self.claimedAmount = 0;
        
        self.createdAt = now();
        self.cliffDate = self.createdAt + cliffDuration;
        self.vestingPeriod = vestingDuration;
        
        // Проверяем, что длительности указаны корректно
        require(self.vestingPeriod > 0, "Vesting period should be positive");
        require(self.cliffDate >= self.createdAt, "Cliff date cannot be in the past");
    }
    
    // --- Получение сообщений ---

    // Пустой receive для приема переводов TON на газ
    receive() {}

    // Владелец устанавливает адрес jetton-кошелька после того, как на него будут зачислены токены
    receive(msg: SetJettonWallet) {
        self.requireOwner();
        require(self.jettonWallet == null, "Jetton wallet address is already set");
        self.jettonWallet = msg.address;
    }
    
    // Функция для вывода доступных токенов
    receive(msg: ClaimMessage) {
        self.requireOwner(); // Только владелец может инициировать вывод
        
        // 1. Проверяем, что мы уже знаем адрес нашего jetton-кошелька
        let jWallet: Address = self.getJettonWallet();
        
        // 2. Рассчитываем, сколько токенов доступно для вывода на данный момент
        let availableAmount: Int = self.calculateAvailableToClaim();
        
        // 3. Проверяем, что есть что выводить
        require(availableAmount > 0, "No tokens available to claim");
        
        // 4. Обновляем счетчик выведенных средств
        self.claimedAmount = self.claimedAmount + availableAmount;
        
        // 5. Отправляем сообщение нашему jetton-кошельку с приказом
        //    перевести доступные токены на кошелек команды.
        send(SendParameters{
            to: jWallet,
            value: ton("0.1"), // Отправляем немного TON для оплаты газа
            mode: SendPayGasSeparately,
            body: beginCell()
                .storeUint(0x178d4519, 32) // op::internal_transfer
                .storeUint(msg.queryId, 64)
                .storeCoins(availableAmount)
                .storeAddress(myAddress())
                .storeAddress(self.owner) // responseAddress
                .storeCoins(0)
                .storeBit(false)
                .endCell()
        });
    }

    // --- Get-методы ---
    
    // Возвращает все данные о состоянии вестинга
    get fun getVestingData(): VestingData {
        let jWallet: Address = self.getJettonWallet();
        return VestingData{
            owner: self.owner,
            teamWallet: self.teamWallet,
            jettonMaster: self.jettonMaster,
            jettonWallet: jWallet,
            totalAmount: self.totalAmount,
            claimedAmount: self.claimedAmount,
            createdAt: self.createdAt,
            cliffDate: self.cliffDate,
            vestingPeriod: self.vestingPeriod
        };
    }
    
    // Внутренняя функция для расчета доступных к выводу токенов
    fun calculateAvailableToClaim(): Int {
        // Если период полной заморозки (cliff) еще не прошел, ничего не доступно
        if (now() < self.cliffDate) {
            return 0;
        }
        
        // Рассчитываем, сколько времени прошло с начала вестинга
        let timePassed: Int = now() - self.createdAt;
        
        // Если весь период вестинга уже прошел, доступны все токены
        if (timePassed >= self.vestingPeriod) {
            return self.totalAmount - self.claimedAmount;
        }
        
        // Рассчитываем, какая доля токенов должна быть разблокирована
        // Используем целочисленное деление
        let vestedAmount: Int = (self.totalAmount * timePassed) / self.vestingPeriod;
        
        // Возвращаем разницу между тем, что должно быть доступно, и тем, что уже выведено
        return vestedAmount - self.claimedAmount;
    }
    
    // Вспомогательная функция для безопасного получения адреса jetton-кошелька
    fun getJettonWallet(): Address {
        require(self.jettonWallet != null, "Jetton wallet address is not set yet");
        return self.jettonWallet!!;
    }
} 