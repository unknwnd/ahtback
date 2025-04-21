import "@stdlib/deploy";
import "@stdlib/ownable";

// Структуры сообщений
message GetCollectionDataMessage {
    // пустое сообщение для получения данных коллекции
}

message NFTAddressByIndexMessage {
    index: Int as uint64;
}

message GetNFTContentMessage {
    index: Int as uint64;
}

message MintNFTMessage {
    recipient: Address;
    batchCount: Int as uint32;
}

message UpdateTokenContractMessage {
    new_token_contract: Address;
}

message UpdateContentMessage {
    new_content: Cell;
}

message EmergencyWithdrawMessage {
    // пустое сообщение для экстренного вывода средств
}

// Структура для хранения данных об NFT
struct NFTData {
    index: Int;              // Уникальный индекс NFT
    collection: Address;     // Адрес коллекции
    owner: Address;          // Текущий владелец
    content: Cell;           // Содержимое/метаданные NFT
}

// Структура для хранения метаданных коллекции
struct CollectionData {
    nextIndex: Int;          // Следующий индекс для минта
    owner: Address;          // Владелец коллекции
    content: Cell;           // Метаданные коллекции
    nftItemCode: Cell;       // Код элемента NFT
}

// Интерфейс коллекции NFT
trait NFTCollection {
    owner: Address;
    content: Cell;           // Метаданные коллекции
    nextIndex: Int;          // Следующий индекс для выпуска NFT
    nftItemCode: Cell;       // Код контракта NFT-элемента
    
    // Получение данных коллекции
    receive(msg: GetCollectionDataMessage) {
        let data = self.getCollectionData();
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: beginCell().storeRef(data.toCell()).endCell()
        });
    }
    
    // Получение адреса NFT по индексу
    receive(msg: NFTAddressByIndexMessage) {
        let nftAddress = self.getNFTAddressByIndex(msg.index);
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: beginCell().storeAddress(nftAddress).endCell()
        });
    }
    
    // Получение информации о коллекции по её индексу
    receive(msg: GetNFTContentMessage) {
        let content = self.getNFTContent(msg.index);
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: beginCell().storeRef(content).endCell()
        });
    }
    
    // Формирование данных коллекции для ответа
    fun getCollectionData(): CollectionData {
        return CollectionData{
            nextIndex: self.nextIndex,
            owner: self.owner,
            content: self.content,
            nftItemCode: self.nftItemCode
        };
    }
    
    // Абстрактные функции, которые должны быть реализованы
    abstract fun getNFTAddressByIndex(index: Int): Address;
    abstract fun getNFTContent(index: Int): Cell;
}

// Контракт для NFT связанных с токеном помощи животным
contract AnimalHelperNFT with Deployable, Ownable, NFTCollection {
    owner: Address; // Явное объявление поля owner
    nextIndex: Int = 0;
    content: Cell;
    nftItemCode: Cell;
    tokenContract: Address;
    
    // Инициализация контракта
    init(owner: Address, tokenContract: Address, content: Cell, nftItemCode: Cell) {
        self.owner = owner;
        self.tokenContract = tokenContract;
        self.content = content;
        self.nftItemCode = nftItemCode;
    }
    
    // Создание нового NFT (только от токен-контракта)
    receive(msg: MintNFTMessage) {
        require(sender() == self.tokenContract || sender() == self.owner, "Not authorized");
        
        // Проверяем, что у нас достаточно средств для создания batchCount NFT
        let mintCost: Int = ton("0.04") * msg.batchCount;
        require(context().value >= mintCost, "Insufficient funds for minting");
        
        // Создаем указанное количество NFT
        repeat(msg.batchCount) {
            self.mint(msg.recipient);
        }
    }
    
    // Создание одного NFT для получателя
    fun mint(to: Address) {
        // Подготавливаем данные для NFT
        let nftIndex: Int = self.nextIndex;
        self.nextIndex = self.nextIndex + 1;
        
        // Вычисляем StateInit для контракта NFT
        let nftInit: StateInit = self.getNFTStateInit(nftIndex);
        let nftAddr: Address = contractAddress(nftInit);
        
        // Отправляем сообщение для деплоя NFT
        send(SendParameters{
            to: nftAddr,
            value: ton("0.03"),
            mode: SendIgnoreErrors,
            code: nftInit.code,
            data: nftInit.data,
            body: beginCell()
                .storeUint(1, 32)  // операция init
                .storeAddress(to)  // владелец
                .endCell()
        });
    }
    
    // Вычисление StateInit для NFT
    fun getNFTStateInit(index: Int): StateInit {
        return StateInit {
            code: self.nftItemCode,
            data: beginCell()
                .storeAddress(myAddress())  // адрес коллекции
                .storeUint(index, 64)       // индекс
                .endCell()
        };
    }
    
    // Получение адреса NFT по его индексу
    override fun getNFTAddressByIndex(index: Int): Address {
        let init: StateInit = self.getNFTStateInit(index);
        return contractAddress(init);
    }
    
    // Получение контента NFT по его индексу
    override fun getNFTContent(index: Int): Cell {
        return beginCell()
            .storeRef(self.content)
            .storeUint(index, 64)
            .endCell();
    }
    
    // Обновление контракта токена
    receive(msg: UpdateTokenContractMessage) {
        require(sender() == self.owner, "Not owner");
        self.tokenContract = msg.new_token_contract;
    }
    
    // Обновление контента коллекции
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