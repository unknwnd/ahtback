import "@stdlib/deploy";
import "@stdlib/ownable";

// Структура для мастер-данных Jetton 
struct JettonData {
    totalSupply: Int;
    mintable: Bool;
    owner: Address;
    content: Cell;
    walletCode: Cell;
    tokenRate: Int; // Добавлено: курс токена для расчета
}

// Интерфейс для взаимодействия с кошельком Jetton
trait Jetton {
    totalSupply: Int;
    mintable: Bool;
    owner: Address;
    content: Cell;
    walletCode: Cell;
    tokenRate: Int; // Добавлено: курс токена для расчета

    // Получение данных Jetton
    receive("get_jetton_data") {
        let data = self.get_jetton_data();
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: beginCell().storeRef(data.toCell()).endCell()
        });
    }

    // Получение адреса кошелька Jetton для определенного владельца
    receive(msg: GetWalletAddress) {
        let owner: Address = msg.owner_address;
        let walletAddress = self.calculate_user_wallet_address(owner);
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: beginCell().storeAddress(walletAddress).endCell()
        });
    }

    // Внутренние функции, которые должны быть реализованы
    abstract fun calculate_user_wallet_address(owner: Address): Address;
    
    // Формирование данных Jetton для ответа на запрос
    fun get_jetton_data(): JettonData {
        return JettonData{
            totalSupply: self.totalSupply,
            mintable: self.mintable,
            owner: self.owner,
            content: self.content,
            walletCode: self.walletCode,
            tokenRate: self.tokenRate // Добавлено: возвращаем курс токена
        };
    }
}

message GetWalletAddress {
    owner_address: Address;
}

message UpdateDistributionContractMessage {
    queryId: Int;
    new_address: Address;
}

message UpdateNFTContractMessage {
    queryId: Int;
    new_address: Address;
}

message UpdateContentMessage {
    queryId: Int;
    new_content: Cell;
}

message BuyTokensMessage {
    queryId: Int; // Добавлено: идентификатор запроса
}

message ToggleMintingMessage {
    queryId: Int; // Добавлено: идентификатор запроса
}

message EmergencyWithdrawMessage {
    queryId: Int; // Добавлено: идентификатор запроса
}

message UpdateTokenRateMessage {
    queryId: Int;
    new_rate: Int;
}

struct AdminParams {
    tempAdmin: Address?; // Временный администратор для мультиподписи
    recoveryAddress: Address; // Адрес для восстановления доступа
    lockUntil: Int; // Временная блокировка административных функций
}

// Основной контракт токена для помощи животным
contract AnimalHelperToken with Deployable, Ownable, Jetton {
    totalSupply: Int = 0; // Изменено: начинаем с 0 и увеличиваем при минтинге
    maxSupply: Int = 1000000000000000; // 1 трлн токенов - максимальное количество
    mintable: Bool = true;
    owner: Address;
    content: Cell;
    walletCode: Cell;
    distributionContract: Address;
    nftContract: Address;
    tokenRate: Int = 100000; // По умолчанию: 1 TON = 100,000 токенов
    adminParams: AdminParams;
    
    // Инициализация контракта
    init(owner: Address, distributionContract: Address, nftContract: Address, content: Cell, walletCode: Cell) {
        self.owner = owner;
        self.distributionContract = distributionContract;
        self.nftContract = nftContract;
        self.content = content;
        self.walletCode = walletCode;
        self.adminParams = AdminParams{
            tempAdmin: null,
            recoveryAddress: owner, // По умолчанию совпадает с владельцем
            lockUntil: 0 // Нет блокировки по умолчанию
        };
    }
    
    // Проверка прав администратора
    fun requireAdmin() {
        // Проверяем, не заблокирована ли админ функция по времени
        require(now() > self.adminParams.lockUntil, "Admin functions are temporarily locked");
        
        // Проверяем, является ли отправитель владельцем или временным админом
        let isAdmin: Bool = (sender() == self.owner);
        if (self.adminParams.tempAdmin != null) {
            isAdmin = isAdmin || (sender() == self.adminParams.tempAdmin!!);
        }
        require(isAdmin, "Not authorized");
    }
    
    // Покупка токенов за TON
    receive(msg: BuyTokensMessage) {
        require(self.mintable, "Minting is paused");
        
        // Динамический расчет комиссии в зависимости от сети
        let gasAmount: Int = min(ton("0.05"), context().value / 10);
        let amount: Int = context().value - gasAmount;
        require(amount > 0, "Insufficient funds");
        
        let tokenAmount: Int = self.calculateTokenAmount(amount);
        
        // Проверяем, не превышает ли выпуск максимальное количество токенов
        require(self.totalSupply + tokenAmount <= self.maxSupply, "Exceeds maximum token supply");
        
        self.mint(sender(), tokenAmount, msg.queryId);
        
        // Отправляем TON на контракт распределения
        send(SendParameters{
            to: self.distributionContract,
            bounce: true,
            value: amount,
            mode: SendPayGasSeparately, // Изменено: более безопасный режим
            body: beginCell().storeUint(msg.queryId, 64).storeAddress(sender()).endCell()
        });
        
        // Если куплено достаточно токенов, отправляем запрос на создание NFT
        if (tokenAmount >= 100000) {
            let nftCount: Int = tokenAmount / 100000;
            send(SendParameters{
                to: self.nftContract,
                bounce: true,
                value: gasAmount,
                mode: SendPayGasSeparately, // Изменено: более безопасный режим
                body: beginCell()
                    .storeUint(1, 32)
                    .storeUint(msg.queryId, 64) // Добавлено: передаем queryId
                    .storeAddress(sender())
                    .storeUint(nftCount, 32)
                    .endCell()
            });
        }
    }
    
    // Функция для выпуска токенов пользователю
    fun mint(to: Address, amount: Int, queryId: Int) {
        // Увеличиваем общий запас вместо уменьшения
        self.totalSupply = self.totalSupply + amount;
        require(self.totalSupply <= self.maxSupply, "Exceeds max supply");
        
        // Вычисляем адрес кошелька пользователя
        let userWallet: Address = self.calculate_user_wallet_address(to);
        
        // Отправляем токены на кошелек пользователя
        send(SendParameters{
            to: userWallet,
            bounce: true,
            value: ton("0.03"),
            mode: SendPayGasSeparately, // Изменено: более безопасный режим
            body: beginCell()
                .storeUint(0x178d4519, 32) // op::internal_transfer
                .storeUint(queryId, 64) // Используем переданный queryId
                .storeCoins(amount) // amount
                .storeAddress(myAddress()) // from
                .storeAddress(myAddress()) // response_address
                .storeCoins(0) // no forward_ton_amount
                .storeBit(false) // forward_payload in this slice, not separate cell
                .endCell()
        });
    }
    
    // Расчет количества токенов на основе присланного TON
    fun calculateTokenAmount(tonAmount: Int): Int {
        // Используем переменную курса вместо жестко закодированного значения
        return (tonAmount * self.tokenRate) / ton("1");
    }
    
    // Вычисление адреса кошелька пользователя
    override fun calculate_user_wallet_address(owner: Address): Address {
        let data: StateInit = self.calculateWalletInit(owner);
        return contractAddress(data);
    }
    
    // Вычисление StateInit для кошелька пользователя
    fun calculateWalletInit(owner: Address): StateInit {
        return StateInit {
            code: self.walletCode,
            data: beginCell()
                .storeAddress(myAddress())  // Адрес мастер-контракта
                .storeAddress(owner)        // Адрес владельца
                .endCell()
        };
    }
    
    // Административные функции
    
    // Приостановление/возобновление выпуска токенов
    receive(msg: ToggleMintingMessage) {
        self.requireAdmin();
        self.mintable = !self.mintable;
    }
    
    // Обновление контракта распределения
    receive(msg: UpdateDistributionContractMessage) {
        self.requireAdmin();
        self.distributionContract = msg.new_address;
    }
    
    // Обновление контракта NFT
    receive(msg: UpdateNFTContractMessage) {
        self.requireAdmin();
        self.nftContract = msg.new_address;
    }
    
    // Обновление контента токена
    receive(msg: UpdateContentMessage) {
        self.requireAdmin();
        self.content = msg.new_content;
    }
    
    // Обновление курса токена
    receive(msg: UpdateTokenRateMessage) {
        self.requireAdmin();
        require(msg.new_rate > 0, "Token rate must be positive");
        self.tokenRate = msg.new_rate;
    }
    
    // Назначение временного администратора (мультиподпись)
    receive("setTempAdmin") {
        require(sender() == self.owner, "Only owner can set temp admin");
        let slice = context().raw;
        let tempAdmin: Address = slice.loadAddress();
        self.adminParams.tempAdmin = tempAdmin;
        
        // Устанавливаем ограничение по времени (24 часа)
        self.adminParams.lockUntil = now() + 60 * 60 * 24;
    }
    
    // Восстановление доступа в экстренной ситуации
    receive("recoveryAccess") {
        require(sender() == self.adminParams.recoveryAddress, "Not recovery address");
        // Можно восстановить только через 7 дней после запроса
        require(now() > self.adminParams.lockUntil + 60 * 60 * 24 * 7, "Cooldown period not passed");
        
        let slice = context().raw;
        let newOwner: Address = slice.loadAddress();
        self.owner = newOwner;
    }
    
    // Установка адреса для восстановления
    receive("setRecoveryAddress") {
        require(sender() == self.owner, "Only owner can set recovery address");
        let slice = context().raw;
        let recoveryAddress: Address = slice.loadAddress();
        self.adminParams.recoveryAddress = recoveryAddress;
    }
    
    // Получение токенов в случае экстренной ситуации (только владелец)
    receive(msg: EmergencyWithdrawMessage) {
        self.requireAdmin();
        send(SendParameters{
            to: sender(),
            bounce: false,
            value: 0,
            mode: SendRemainingBalance + SendPayGasSeparately
        });
    }
} 