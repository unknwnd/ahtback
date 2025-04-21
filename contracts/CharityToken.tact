import "@stdlib/deploy";
import "@stdlib/ownable";

// Структура для мастер-данных Jetton 
struct JettonData {
    totalSupply: Int;
    mintable: Bool;
    owner: Address;
    content: Cell;
    walletCode: Cell;
}

// Интерфейс для взаимодействия с кошельком Jetton
trait Jetton {
    totalSupply: Int;
    mintable: Bool;
    owner: Address;
    content: Cell;
    walletCode: Cell;

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
            walletCode: self.walletCode
        };
    }
}

message GetWalletAddress {
    owner_address: Address;
}

message UpdateDistributionContractMessage {
    new_address: Address;
}

message UpdateNFTContractMessage {
    new_address: Address;
}

message UpdateContentMessage {
    new_content: Cell;
}

message BuyTokensMessage {
    // пустое сообщение для покупки токенов
}

message ToggleMintingMessage {
    // пустое сообщение для включения/выключения минтинга
}

message EmergencyWithdrawMessage {
    // пустое сообщение для экстренного вывода средств
}

// Основной контракт токена для помощи животным
contract AnimalHelperToken with Deployable, Ownable, Jetton {
    totalSupply: Int = 1000000000000000; // 1 трлн токенов
    mintable: Bool = true;
    owner: Address; // Явное объявление поля owner
    content: Cell;
    walletCode: Cell;
    distributionContract: Address;
    nftContract: Address;
    
    // Инициализация контракта
    init(owner: Address, distributionContract: Address, nftContract: Address, content: Cell, walletCode: Cell) {
        self.owner = owner;
        self.distributionContract = distributionContract;
        self.nftContract = nftContract;
        self.content = content;
        self.walletCode = walletCode;
    }
    
    // Покупка токенов за TON
    receive(msg: BuyTokensMessage) {
        require(self.mintable, "Minting is paused");
        let amount: Int = context().value - ton("0.05"); // Вычитаем комиссию для обработки
        require(amount > 0, "Insufficient funds");
        
        let tokenAmount: Int = self.calculateTokenAmount(amount);
        self.mint(sender(), tokenAmount);
        
        // Отправляем TON на контракт распределения
        send(SendParameters{
            to: self.distributionContract,
            bounce: true,
            value: amount,
            mode: SendIgnoreErrors,
            body: beginCell().storeUint(0, 32).storeAddress(sender()).endCell()
        });
        
        // Если куплено достаточно токенов, отправляем запрос на создание NFT
        if (tokenAmount >= 1000000) {
            let nftCount: Int = tokenAmount / 1000000;
            send(SendParameters{
                to: self.nftContract,
                bounce: true,
                value: ton("0.05") * nftCount,
                mode: SendIgnoreErrors,
                body: beginCell()
                    .storeUint(1, 32)
                    .storeAddress(sender())
                    .storeUint(nftCount, 32)
                    .endCell()
            });
        }
    }
    
    // Функция для выпуска токенов пользователю
    fun mint(to: Address, amount: Int) {
        // Обновляем общий запас
        self.totalSupply = self.totalSupply - amount;
        require(self.totalSupply >= 0, "Exceeds total supply");
        
        // Вычисляем адрес кошелька пользователя
        let userWallet: Address = self.calculate_user_wallet_address(to);
        
        // Отправляем токены на кошелек пользователя
        send(SendParameters{
            to: userWallet,
            bounce: true,
            value: ton("0.03"),
            mode: SendIgnoreErrors,
            body: beginCell()
                .storeUint(0x178d4519, 32) // op::internal_transfer
                .storeUint(0, 64) // query_id
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
        // Реализация расчета с учетом текущего курса
        return tonAmount * 100000;  // Примерное соотношение: 1 TON = 100,000 токенов AHT
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
        require(sender() == self.owner, "Not owner");
        self.mintable = !self.mintable;
    }
    
    // Обновление контракта распределения
    receive(msg: UpdateDistributionContractMessage) {
        require(sender() == self.owner, "Not owner");
        self.distributionContract = msg.new_address;
    }
    
    // Обновление контракта NFT
    receive(msg: UpdateNFTContractMessage) {
        require(sender() == self.owner, "Not owner");
        self.nftContract = msg.new_address;
    }
    
    // Обновление контента токена
    receive(msg: UpdateContentMessage) {
        require(sender() == self.owner, "Not owner");
        self.content = msg.new_content;
    }
    
    // Получение токенов в случае экстренной ситуации (только владелец)
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