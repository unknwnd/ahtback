import "@stdlib/deploy";
import "@stdlib/ownable";
import "./JettonWallet.tact";

// --- Сообщения ---

// Сообщение для покупки токенов
message BuyTokens {}

// Сообщение для владельца, чтобы забрать нераспроданные токены
message WithdrawRemaining {
    queryId: Int;
}

// Сообщение для обновления курса
message UpdateRate {
    queryId: Int;
    newRate: Int;
}

// --- Контракт Публичной Продажи ---

contract TokenSale with Deployable, Ownable {

    owner: Address;                 // Владелец контракта (мультисиг команды)
    jettonMaster: Address;          // Мастер-контракт токена
    jettonWallet: Address;          // Jetton-кошелек этого контракта, где хранятся токены на продажу
    fundsDistributor: Address;      // Адрес контракта-распределителя
    
    tokenRate: Int;                 // Курс: сколько токенов можно купить за 1 TON
    
    isActive: Bool;                 // Флаг, активна ли продажа
    
    init(owner: Address, jettonMaster: Address, jettonWallet: Address, fundsDistributor: Address, tokenRate: Int) {
        self.owner = owner;
        self.jettonMaster = jettonMaster;
        self.jettonWallet = jettonWallet;
        self.fundsDistributor = fundsDistributor;
        self.tokenRate = tokenRate;
        self.isActive = true;
    }
    
    // --- Получение сообщений ---

    // Основная функция для покупки токенов
    receive(msg: BuyTokens) {
        require(self.isActive, "Token sale is not active");
        
        // Расчет комиссии за газ и суммы покупки
        let gasAmount: Int = min(ton("0.2"), context().value / 10);
        let amount: Int = context().value - gasAmount;
        require(amount > 0, "Insufficient funds to buy tokens");
        
        // Рассчитываем, сколько токенов нужно отправить покупателю
        let tokenAmount: Int = (amount * self.tokenRate) / ton("1");
        
        // 1. Отправляем приказ нашему jetton-кошельку перевести токены покупателю
        send(SendParameters{
            to: self.jettonWallet,
            value: ton("0.1"),
            mode: SendPayGasSeparately,
            body: beginCell()
                .storeUint(0x178d4519, 32) // op::internal_transfer
                .storeUint(0, 64) // query_id
                .storeCoins(tokenAmount)
                .storeAddress(myAddress())
                .storeAddress(sender()) // response_address
                .storeCoins(ton("0.05")) // forward_ton_amount
                .storeBit(true) // forward_payload in ref
                .storeRef(beginCell().storeAddress(sender()).endCell())
                .endCell()
        });
        
        // 2. Пересылаем полученные TON в контракт-распределитель
        send(SendParameters{
            to: self.fundsDistributor,
            value: amount, // Отправляем сумму без вычета газа
            mode: SendPayGasSeparately,
            body: emptyCell()
        });
    }

    // Владелец может выключить/включить продажу
    receive("toggle_sale") {
        self.requireOwner();
        self.isActive = !self.isActive;
    }

    // Владелец может обновить курс
    receive(msg: UpdateRate) {
        self.requireOwner();
        require(msg.newRate > 0, "Invalid token rate");
        self.tokenRate = msg.newRate;
    }
    
    // Владелец может забрать нераспроданные токены после окончания сейла
    receive(msg: WithdrawRemaining) {
        self.requireOwner();
        require(!self.isActive, "Cannot withdraw while sale is active");
        
        // Узнаем баланс нашего jetton-кошелька
        // Для этого нужно будет реализовать механизм ответа от кошелька,
        // пока что оставим это как концепт
        
        // Отправляем приказ нашему кошельку перевести ВСЕ токены владельцу
        // ... логика перевода всех оставшихся токенов
    }
    
    // --- Get-методы ---
    
    get fun getSaleData(): SaleData {
        return SaleData{
            jettonWallet: self.jettonWallet,
            fundsDistributor: self.fundsDistributor,
            isActive: self.isActive,
            tokenRate: self.tokenRate
        };
    }
}

// Структура для возврата данных из get-метода
struct SaleData {
    jettonWallet: Address;
    fundsDistributor: Address;
    isActive: Bool;
    tokenRate: Int;
} 