import "@stdlib/deploy";

// Сообщения для контракта
message InitNFTMessage {
    op: Int as uint32 = 1;
    new_owner: Address;
}

message GetNFTDataMessage {
    // пустое сообщение для получения данных NFT
}

message TransferMessage {
    to: Address;
    response_destination: Address;
    custom_payload: Cell?;
}

message ExchangeMessage {
    token_wallet: Address;
    min_token_amount: Int as coins;
}

// Контракт отдельного NFT-элемента
contract NFTItem {
    collection: Address;  // Адрес коллекции
    index: Int;          // Уникальный индекс NFT
    owner: Address;      // Текущий владелец
    
    init(collection: Address, index: Int) {
        self.collection = collection;
        self.index = index;
        self.owner = collection; // Изначально владелец - это коллекция
    }
    
    // Инициализация NFT с установкой владельца
    receive(msg: InitNFTMessage) {
        require(sender() == self.collection, "Not authorized");
        require(msg.op == 1, "Invalid operation");
        let newOwner: Address = msg.new_owner;
        self.owner = newOwner;
    }
    
    // Получение данных об NFT
    receive(msg: GetNFTDataMessage) {
        let content: Cell = beginCell().storeUint(self.index, 64).endCell();
        
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: beginCell()
                .storeUint(self.index, 64)
                .storeAddress(self.collection)
                .storeAddress(self.owner)
                .storeRef(content)
                .endCell()
        });
    }
    
    // Передача NFT другому владельцу
    receive(msg: TransferMessage) {
        require(sender() == self.owner, "Not authorized");
        let to: Address = msg.to;
        let responseDestination: Address = msg.response_destination;
        let customPayload: Cell? = msg.custom_payload;
        
        // Обновляем владельца
        self.owner = to;
        
        // Отправляем ответ, если нужно
        if (responseDestination != newAddress(0, 0)) {
            let payload: Cell = beginCell().endCell();
            if (customPayload != null) {
                payload = customPayload!!;
            }
            
            send(SendParameters{
                to: responseDestination,
                value: 0,
                mode: SendRemainingValue + SendIgnoreErrors,
                body: beginCell()
                    .storeUint(0x78d6c8fb, 32) // nft_transfer_notification
                    .storeUint(0, 64) // query_id
                    .storeAddress(sender())
                    .storeRef(payload)
                    .endCell()
            });
        }
    }
    
    // Обмен NFT на токены (1 NFT = 100,000 токенов)
    receive(msg: ExchangeMessage) {
        require(sender() == self.owner, "Not authorized");
        let tokenWallet: Address = msg.token_wallet;
        let minTokenAmount: Int = msg.min_token_amount;
        
        // Фиксированное количество токенов за NFT
        let tokenAmount: Int = 100000;
        
        // Проверяем, что предлагаемое количество токенов достаточно
        require(minTokenAmount <= tokenAmount, "Token amount too high");
        
        // Возвращаем NFT в коллекцию
        self.owner = self.collection;
        
        // Отправляем запрос на перевод токенов владельцу
        send(SendParameters{
            to: tokenWallet,
            bounce: true,
            value: ton("0.05"),
            mode: SendIgnoreErrors,
            body: beginCell()
                .storeUint(0x7362d09c, 32) // transfer notification
                .storeUint(0, 64) // query_id
                .storeCoins(tokenAmount)
                .storeAddress(sender())
                .endCell()
        });
        
        // Уведомляем коллекцию об обмене
        send(SendParameters{
            to: self.collection,
            bounce: true,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: beginCell()
                .storeUint(0x05138d91, 32) // exchange notification
                .storeUint(self.index, 64)
                .storeAddress(sender())
                .storeCoins(tokenAmount)
                .endCell()
        });
    }
    
    // Обработка любых других сообщений
    receive() {
        // Перенаправляем все неизвестные сообщения владельцу
        if (sender() != self.owner) {
            send(SendParameters{
                to: self.owner,
                value: 0,
                mode: SendRemainingValue
            });
        }
    }
}