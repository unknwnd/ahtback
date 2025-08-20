import "@stdlib/deploy";
import "@stdlib/ownable";
import "./JettonWallet.tact";

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
    totalSupply: Int; 
    maxSupply: Int = 1000000000 * 1000000000; // 1 трлн токенов с 9 знаками после запятой
    mintable: Bool = false; // Минтинг происходит только один раз при деплое
    owner: Address;
    content: Cell;
    walletCode: Cell;
    tokenRate: Int; // Поле обязательно для трейта Jetton
    
    // Адреса контрактов для распределения токенов
    teamVestingContract: Address;
    tokenSaleContract: Address;
    
    // Инициализация контракта
    init(owner: Address, content: Cell, walletCode: Cell, teamVestingContract: Address, tokenSaleContract: Address) {
        self.owner = owner;
        self.content = content;
        self.walletCode = walletCode;
        self.tokenRate = 0; // Логика курса вынесена, но поле нужно для стандарта
        self.totalSupply = self.maxSupply; // Сразу создаем все токены
        
        // Сохраняем адреса контрактов
        self.teamVestingContract = teamVestingContract;
        self.tokenSaleContract = tokenSaleContract;

        // Минтинг будет выполнен через отдельные сообщения после деплоя
        // Это безопаснее, чем делать минтинг в init()
    }
    
    // Функция для выпуска токенов. Используется только владельцем после деплоя.
    receive("mint_initial") {
        self.requireOwner();
        require(self.totalSupply == self.maxSupply, "Initial minting already done");

        // Рассчитываем доли
        let teamAmount: Int = self.maxSupply / 10; // 10% для команды
        let saleAmount: Int = self.maxSupply - teamAmount; // 90% на продажу

        // Отправляем 10% в контракт вестинга команды
        self.mint(self.teamVestingContract, teamAmount, 0);

        // Отправляем 90% в контракт публичной продажи
        self.mint(self.tokenSaleContract, saleAmount, 1);
    }
    
    // Функция для выпуска токенов
    fun mint(to: Address, amount: Int, queryId: Int) {
        // Вычисляем адрес кошелька получателя
        let userWallet: Address = self.calculate_user_wallet_address(to);
        
        // Отправляем токены на кошелек получателя
        send(SendParameters{
            to: userWallet,
            bounce: true,
            value: ton("0.05"), // Газ для развертывания кошелька, если его нет
            mode: SendPayGasSeparately,
            body: beginCell()
                .storeUint(0x178d4519, 32) // op::internal_transfer
                .storeUint(queryId, 64)
                .storeCoins(amount)
                .storeAddress(myAddress())
                .storeAddress(myAddress()) 
                .storeCoins(0)
                .storeBit(false)
                .endCell()
        });
    }
    
    // Обновление контента (метаданных) токена
    receive(msg: UpdateContentMessage) {
        self.requireOwner();
        self.content = msg.new_content;
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
                .storeAddress(myAddress())
                .storeAddress(owner)
                .endCell()
        };
    }

    // Геттер для получения адреса кошелька (нужен для скриптов деплоя)
    get fun get_wallet_address(owner: Address): Address {
        return self.calculate_user_wallet_address(owner);
    }
} 