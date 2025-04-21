import "@stdlib/deploy";
import "@stdlib/ownable";

// Сообщения для контракта
message ReleaseTokensMessage {
    // пустое сообщение для высвобождения токенов
}

message UpdateLiquidityPoolMessage {
    new_address: Address;
}

message GetLockInfoMessage {
    // пустое сообщение для получения информации о блокировке
}

message EmergencyReleaseMessage {
    amount: Int as coins;
    signatures: Cell; // многоподписная ячейка
}

message EmergencyWithdrawMessage {
    // пустое сообщение для экстренного вывода средств
}

// Контракт для блокировки ликвидности с постепенным высвобождением
contract LiquidityLock with Deployable, Ownable {
    owner: Address; // Владелец контракта
    liquidityPool: Address; // Адрес пула ликвидности

    // Параметры блокировки
    initialLockTime: Int; // Время начальной блокировки (timestamp)
    releaseStartTime: Int; // Время начала высвобождения
    releaseEndTime: Int; // Время окончания высвобождения
    totalLocked: Int; // Общая сумма заблокированных средств
    totalReleased: Int = 0; // Общая сумма высвобожденных средств
    lastReleaseTime: Int = 0; // Время последнего высвобождения
    
    init(owner: Address, liquidityPool: Address, lockDurationSeconds: Int) {
        self.owner = owner;
        self.liquidityPool = liquidityPool;
        
        // Устанавливаем параметры блокировки
        let now_time: Int = now(); // Текущий timestamp
        self.initialLockTime = now_time;
        self.releaseStartTime = now_time + lockDurationSeconds; // Начало высвобождения через 24 месяца
        
        // 36 месяцев = 1.5 * 24 месяцев, но Tact не поддерживает дробные числа напрямую
        // Поэтому используем целочисленное выражение: 3/2 * lockDurationSeconds
        self.releaseEndTime = self.releaseStartTime + ((lockDurationSeconds * 3) / 2); // Окончание через 60 месяцев (24 + 36)
        self.totalLocked = 0; // Начальное значение заблокированных средств
    }
    
    // Получение средств (добавление заблокированных средств)
    receive() {
        // Принимаем средства и увеличиваем общую сумму заблокированных
        self.totalLocked = self.totalLocked + context().value;
    }
    
    // Высвобождение доступных токенов
    receive(msg: ReleaseTokensMessage) {
        // Проверяем, что наступило время высвобождения
        require(now() >= self.releaseStartTime, "Release period not started");
        
        // Проверяем, что есть что высвобождать
        require(self.totalLocked > self.totalReleased, "No tokens to release");
        
        // Расчет доступной для высвобождения суммы
        let availableToRelease: Int = self.calculateAvailableToRelease();
        require(availableToRelease > 0, "No tokens available for release yet");
        
        // Обновляем сумму высвобожденных средств
        self.totalReleased = self.totalReleased + availableToRelease;
        self.lastReleaseTime = now();
        
        // Отправляем средства в пул ликвидности
        send(SendParameters{
            to: self.liquidityPool,
            bounce: true,
            value: availableToRelease,
            mode: SendIgnoreErrors,
            body: beginCell().storeUint(0, 32).endCell()
        });
    }
    
    // Расчет доступной для высвобождения суммы
    fun calculateAvailableToRelease(): Int {
        // Если период высвобождения еще не начался, возвращаем 0
        if (now() < self.releaseStartTime) {
            return 0;
        }
        
        // Если весь период высвобождения завершен, возвращаем все оставшиеся средства
        if (now() >= self.releaseEndTime) {
            return self.totalLocked - self.totalReleased;
        }
        
        // Расчет пропорции времени, прошедшего с начала высвобождения
        let totalReleasePeriod: Int = self.releaseEndTime - self.releaseStartTime;
        let timePassedSinceStart: Int = now() - self.releaseStartTime;
        
        // Расчет процента высвобождения на основе прошедшего времени
        let releaseRatio: Int = timePassedSinceStart * 100 / totalReleasePeriod;
        
        // Расчет общей суммы, которая должна быть высвобождена к текущему моменту
        let shouldBeReleased: Int = (self.totalLocked * releaseRatio) / 100;
        
        // Вычитаем уже высвобожденную сумму
        return max(shouldBeReleased - self.totalReleased, 0);
    }
    
    // Получение информации о блокировке
    receive(msg: GetLockInfoMessage) {
        let availableToRelease: Int = self.calculateAvailableToRelease();
        
        let lockInfo: Cell = beginCell()
            .storeUint(self.initialLockTime, 64)
            .storeUint(self.releaseStartTime, 64)
            .storeUint(self.releaseEndTime, 64)
            .storeCoins(self.totalLocked)
            .storeCoins(self.totalReleased)
            .storeCoins(availableToRelease)
            .storeUint(self.lastReleaseTime, 64)
            .endCell();
        
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: lockInfo
        });
    }
    
    // Экстренное высвобождение средств (с множественной подписью)
    receive(msg: EmergencyReleaseMessage) {
        require(sender() == self.owner, "Not owner");
        
        // В реальной реализации здесь должна быть проверка подписей
        // Сейчас просто проверяем, что отправитель - владелец
        
        // Проверка на достаточность средств
        require(msg.amount <= (self.totalLocked - self.totalReleased), "Insufficient locked funds");
        
        // Обновляем счетчик высвобожденных средств
        self.totalReleased = self.totalReleased + msg.amount;
        
        // Отправляем средства в пул ликвидности
        send(SendParameters{
            to: self.liquidityPool,
            bounce: true,
            value: msg.amount,
            mode: SendIgnoreErrors,
            body: beginCell().storeUint(0, 32).endCell()
        });
    }
    
    // Обновление адреса пула ликвидности
    receive(msg: UpdateLiquidityPoolMessage) {
        require(sender() == self.owner, "Not owner");
        self.liquidityPool = msg.new_address;
    }
    
    // Функция для экстренного вывода средств (только владелец)
    receive(msg: EmergencyWithdrawMessage) {
        require(sender() == self.owner, "Not owner");
        send(SendParameters{
            to: sender(),
            bounce: false,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }
} 