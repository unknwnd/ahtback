import "@stdlib/deploy";
import "@stdlib/ownable";

// Сообщения для контракта
message TransferToAnimalShelterMessage {
    shelter_address: Address;
}

message EmergencyTransferMessage {
    target: Address;
    amount: Int as coins;
}

message UpdateVotingContractMessage {
    new_address: Address;
}

message GetStatisticsMessage {
    // пустое сообщение для получения статистики
}

message ConvertToTokenMessage {
    token_address: Address;
    amount: Int as coins;
}

message ExternalDonationMessage {
    // пустое сообщение для внешнего пожертвования
}

message EmergencyWithdrawMessage {
    // пустое сообщение для экстренного вывода средств
}

// Контракт для управления средствами для помощи животным
contract AnimalHelperPool with Deployable, Ownable {
    // Адрес контракта голосования
    owner: Address; // Явное объявление поля owner
    votingContract: Address;
    
    // Данные о последнем трансфере
    lastTransferTime: Int = 0;
    lastTransferAmount: Int = 0;
    lastTransferTarget: Address;
    
    // Статистика
    totalDonated: Int = 0;
    totalTransfers: Int = 0;
    
    // Инициализация контракта
    init(owner: Address, votingContract: Address) {
        self.owner = owner;
        self.votingContract = votingContract;
        self.lastTransferTarget = newAddress(0, 0);
    }
    
    // Получение средств от контракта распределения
    receive() {
        // Просто принимаем средства и увеличиваем счетчик полученных пожертвований
        self.totalDonated = self.totalDonated + context().value;
    }
    
    // Перевод средств приюту для животных (только от контракта голосования)
    receive(msg: TransferToAnimalShelterMessage) {
        require(sender() == self.votingContract || sender() == self.owner, "Not authorized");
        
        // Получаем адрес приюта для животных
        let shelterAddress: Address = msg.shelter_address;
        
        // Рассчитываем сумму для перевода (80% от текущего баланса)
        let amount: Int = myBalance() * 8 / 10;
        require(amount > ton("0.1"), "Insufficient funds");
        
        // Обновляем данные о последнем трансфере
        self.lastTransferTime = now();
        self.lastTransferAmount = amount;
        self.lastTransferTarget = shelterAddress;
        self.totalTransfers = self.totalTransfers + 1;
        
        // Отправляем средства организации помощи животным
        send(SendParameters{
            to: shelterAddress,
            bounce: true,
            value: amount,
            mode: SendIgnoreErrors,
            body: beginCell()
                .storeUint(0, 32)
                .endCell()
        });
    }
    
    // Экстренный перевод средств (только владелец)
    receive(msg: EmergencyTransferMessage) {
        require(sender() == self.owner, "Not owner");
        let target: Address = msg.target;
        let amount: Int = msg.amount;
        
        // Проверка на достаточность средств
        require(amount <= myBalance(), "Insufficient funds");
        
        // Отправляем средства
        send(SendParameters{
            to: target,
            bounce: true,
            value: amount,
            mode: SendIgnoreErrors,
            body: beginCell()
                .storeUint(0, 32)
                .endCell()
        });
        
        // Обновляем статистику
        self.lastTransferTime = now();
        self.lastTransferAmount = amount;
        self.lastTransferTarget = target;
        self.totalTransfers = self.totalTransfers + 1;
    }
    
    // Обновление адреса контракта голосования
    receive(msg: UpdateVotingContractMessage) {
        require(sender() == self.owner, "Not owner");
        self.votingContract = msg.new_address;
    }
    
    // Получение статистики о пожертвованиях
    receive(msg: GetStatisticsMessage) {
        let stats: Cell = beginCell()
            .storeUint(self.totalDonated, 64)
            .storeUint(self.totalTransfers, 32)
            .storeUint(self.lastTransferTime, 64)
            .storeUint(self.lastTransferAmount, 64)
            .storeAddress(self.lastTransferTarget)
            .storeUint(myBalance(), 64)
            .endCell();
        
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: stats
        });
    }
    
    // Конвертация TON в другие токены для упрощения вывода
    receive(msg: ConvertToTokenMessage) {
        require(sender() == self.owner, "Not owner");
        
        let tokenAddress: Address = msg.token_address;
        let amount: Int = msg.amount;
        
        // Проверка на достаточность средств
        require(amount <= myBalance(), "Insufficient funds");
        
        // Отправляем запрос на обмен TON на токены
        send(SendParameters{
            to: tokenAddress,
            bounce: true,
            value: amount,
            mode: SendIgnoreErrors,
            body: beginCell()
                .storeUint(0x15A038FB, 32) // условный код операции для обмена
                .storeUint(0, 64) // query_id
                .storeAddress(myAddress()) // получатель токенов (этот контракт)
                .endCell()
        });
    }
    
    // Получение дополнительных TON от внешних источников для пополнения фонда
    receive(msg: ExternalDonationMessage) {
        // Просто принимаем средства и увеличиваем счетчик пожертвований
        self.totalDonated = self.totalDonated + context().value;
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