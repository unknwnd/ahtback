import "@stdlib/deploy";

// Сообщения для контракта
message GetWalletDataMessage {
    // пустое сообщение для получения данных кошелька
}

message InternalTransferMessage {
    query_id: Int as uint64;
    amount: Int as coins;
    from: Address;
    response_destination: Address;
    forward_ton_amount: Int as coins = 0;
    forward_payload: Cell? = null;
}

message TransferMessage {
    query_id: Int as uint64;
    amount: Int as coins;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell? = null;
    forward_ton_amount: Int as coins = 0;
    forward_payload: Cell? = null;
}

message BurnMessage {
    query_id: Int as uint64;
    amount: Int as coins;
    response_destination: Address;
}

// Структура для хранения данных о кошельке Jetton
struct JettonWalletData {
    balance: Int;
    owner: Address;
    jettonMaster: Address;
    walletCode: Cell;
}

// Контракт кошелька Jetton
contract JettonWallet {
    balance: Int;
    owner: Address;
    jettonMaster: Address;
    
    init(jettonMaster: Address, owner: Address) {
        self.balance = 0;
        self.owner = owner;
        self.jettonMaster = jettonMaster;
    }
    
    // Получение данных о кошельке Jetton
    receive(msg: GetWalletDataMessage) {
        let walletData: JettonWalletData = self.get_wallet_data();
        
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: 64, // SendRemainingValue + SendIgnoreErrors
            body: beginCell()
                .storeCoins(walletData.balance)
                .storeAddress(walletData.owner)
                .storeAddress(walletData.jettonMaster)
                .storeRef(walletData.walletCode)
                .endCell()
        });
    }
    
    // Внутренний перевод токенов от другого кошелька
    receive(msg: InternalTransferMessage) {
        // Только мастер-контракт и другие кошельки могут вызывать этот метод
        let is_jetton_master: Bool = sender() == self.jettonMaster;
        let is_wallet: Bool = false; // В реальной реализации будет проверка на кошелек
        require(is_jetton_master || is_wallet, "Invalid sender");
        
        // Увеличиваем баланс
        self.balance = self.balance + msg.amount;
        
        // Если указан получатель уведомления, отправляем его
        let response_destination: Address = msg.response_destination;
        if (response_destination != newAddress(0, 0)) {
            send(SendParameters{
                to: response_destination,
                value: 0,
                mode: 64, // SendRemainingValue + SendIgnoreErrors
                body: beginCell()
                    .storeUint(0x7362d09c, 32) // notify transfer
                    .storeUint(msg.query_id, 64)
                    .storeCoins(msg.amount)
                    .storeAddress(self.owner)
                    .endCell()
            });
        }
    }
    
    // Перевод токенов на другой кошелек
    receive(msg: TransferMessage) {
        // Проверяем, что отправитель - владелец кошелька
        require(sender() == self.owner, "Not owner");
        
        // Проверяем достаточность баланса
        require(self.balance >= msg.amount, "Insufficient balance");
        
        // Уменьшаем баланс отправителя
        self.balance = self.balance - msg.amount;
        
        // Получаем адрес кошелька получателя
        let to_wallet: Address = self.calculate_jetton_wallet_address(self.jettonMaster, msg.destination);
        
        // Отправляем токены на кошелек получателя
        send(SendParameters{
            to: to_wallet,
            bounce: true,
            value: msg.forward_ton_amount + ton("0.05"),
            mode: 1, // SendPayGasSeparately
            body: beginCell()
                .storeUint(0x178d4519, 32) // internal_transfer
                .storeUint(msg.query_id, 64)
                .storeCoins(msg.amount)
                .storeAddress(self.owner)
                .storeAddress(msg.response_destination)
                .storeCoins(msg.forward_ton_amount)
                .storeMaybeRef(msg.forward_payload)
                .endCell()
        });
        
        // Если нужно отправить уведомление
        let response_destination: Address = msg.response_destination;
        if (response_destination != newAddress(0, 0)) {
            send(SendParameters{
                to: response_destination,
                value: 0,
                mode: 64, // SendRemainingValue + SendIgnoreErrors
                body: beginCell()
                    .storeUint(0x7362d09c, 32) // notify transfer
                    .storeUint(msg.query_id, 64)
                    .storeCoins(msg.amount)
                    .storeAddress(msg.destination)
                    .endCell()
            });
        }
    }
    
    // Сжигание токенов
    receive(msg: BurnMessage) {
        let query_id: Int = msg.query_id;
        let amount: Int = msg.amount;
        let response_destination: Address = msg.response_destination;
        
        // Проверяем, что отправитель - владелец
        require(sender() == self.owner, "Not owner");
        
        // Проверяем достаточность баланса
        require(self.balance >= amount, "Insufficient balance");
        
        // Уменьшаем баланс
        self.balance = self.balance - amount;
        
        // Отправляем уведомление мастер-контракту о сжигании
        send(SendParameters{
            to: self.jettonMaster,
            value: 0,
            mode: 64, // SendRemainingValue + SendIgnoreErrors
            body: beginCell()
                .storeUint(0x595f07bc, 32) // burn notification
                .storeUint(query_id, 64)
                .storeCoins(amount)
                .storeAddress(self.owner)
                .storeAddress(response_destination)
                .endCell()
        });
    }
    
    // Вычисляет адрес кошелька для указанного владельца
    fun calculate_jetton_wallet_address(jettonMaster: Address, owner: Address): Address {
        let data: StateInit = self.calculate_jetton_wallet_init(jettonMaster, owner);
        return contractAddress(data);
    }
    
    // Вычисляет state init для кошелька Jetton
    fun calculate_jetton_wallet_init(jettonMaster: Address, owner: Address): StateInit {
        return StateInit {
            code: self.calculate_jetton_wallet_code(),
            data: beginCell()
                .storeAddress(jettonMaster)
                .storeAddress(owner)
                .endCell()
        };
    }
    
    // Получает код кошелька Jetton
    fun calculate_jetton_wallet_code(): Cell {
        // В реальной реализации возвращается код из мастер-контракта
        return beginCell().endCell();
    }
    
    // Получение данных о кошельке
    get fun get_wallet_data(): JettonWalletData {
        return JettonWalletData{
            balance: self.balance,
            owner: self.owner,
            jettonMaster: self.jettonMaster,
            walletCode: self.calculate_jetton_wallet_code()
        };
    }
} 