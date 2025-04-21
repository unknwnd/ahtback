import "@stdlib/deploy";
import "@stdlib/ownable";

// Структуры сообщений
message StartVotingMessage {
    // пустое сообщение для начала голосования
}

message AddProposalMessage {
    shelter_address: Address;
    name: String;
    description: String;
}

message VoteMessage {
    proposal_id: Int as uint32;
}

message FinalizeVotingMessage {
    // пустое сообщение для завершения голосования
}

message GetVotingStatusMessage {
    // пустое сообщение для получения статуса голосования
}

message GetProposalMessage {
    proposal_id: Int as uint32;
}

message GetLastResultsMessage {
    // пустое сообщение для получения результатов
}

message UpdateMinBalanceMessage {
    min_balance: Int as uint64;
}

message UpdateTokenContractMessage {
    new_address: Address;
}

message UpdateAnimalHelperPoolMessage {
    new_address: Address;
}

message EmergencyWithdrawMessage {
    // пустое сообщение для экстренного вывода средств
}

// Структура для хранения данных о предложении
struct Proposal {
    id: Int;                     // Уникальный идентификатор предложения
    shelterAddress: Address;     // Адрес приюта для животных
    name: String;                // Название приюта
    description: String;         // Описание приюта
    votes: Int;                  // Количество голосов
}

// Контракт для голосования о получателе средств для помощи животным
contract AnimalHelperVoting with Deployable, Ownable {
    // Связанные контракты
    owner: Address; // Явное объявление поля owner
    tokenContract: Address;      // Контракт токена для проверки балансов
    animalHelperPool: Address;   // Пул средств для помощи животным
    
    // Данные о голосовании
    proposalsCount: Int = 0;     // Количество предложений
    votingActive: Bool = false;  // Активно ли голосование
    votingStartTime: Int = 0;    // Время начала голосования
    votingEndTime: Int = 0;      // Время окончания голосования
    minTokenBalance: Int = 1000; // Минимальный баланс токенов для голосования
    lastVotingResults: Cell;     // Результаты последнего голосования
    
    // Хранилища данных
    proposals: map<Int, Proposal>;       // Предложения по ID
    votes: map<Address, Int>;            // Голоса по адресу (0 = не голосовал, id+1 = голосовал за id)
    voterTokenBalances: map<Address, Int>; // Балансы токенов участников на момент голосования
    
    init(owner: Address, tokenContract: Address, animalHelperPool: Address) {
        self.owner = owner;
        self.tokenContract = tokenContract;
        self.animalHelperPool = animalHelperPool;
        self.lastVotingResults = beginCell().endCell();
    }
    
    // Создание нового голосования (только владелец)
    receive(msg: StartVotingMessage) {
        require(sender() == self.owner, "Not owner");
        require(!self.votingActive, "Voting already active");
        
        // Устанавливаем период голосования на 30 дней
        self.votingActive = true;
        self.votingStartTime = now();
        self.votingEndTime = self.votingStartTime + 86400 * 30; // 30 дней
        
        // Сбрасываем данные предыдущего голосования
        self.proposalsCount = 0;
        self.proposals = emptyMap();
        self.votes = emptyMap();
        self.voterTokenBalances = emptyMap();
    }
    
    // Добавление нового предложения для приюта животных
    receive(msg: AddProposalMessage) {
        require(self.votingActive, "Voting not active");
        require(now() < self.votingEndTime, "Voting period ended");
        
        // Проверяем, что отправитель имеет достаточно токенов
        let balance: Int = self.getTokenBalance(sender());
        require(balance >= self.minTokenBalance, "Insufficient token balance");
        
        // Получаем данные предложения из сообщения
        let shelterAddress: Address = msg.shelter_address;
        let name: String = msg.name;
        let description: String = msg.description;
        
        // Создаем и сохраняем предложение
        let proposal: Proposal = Proposal{
            id: self.proposalsCount,
            shelterAddress: shelterAddress,
            name: name,
            description: description,
            votes: 0
        };
        
        self.proposals.set(self.proposalsCount, proposal);
        self.proposalsCount = self.proposalsCount + 1;
    }
    
    // Голосование за приют
    receive(msg: VoteMessage) {
        require(self.votingActive, "Voting not active");
        require(now() < self.votingEndTime, "Voting period ended");
        
        // Проверка, что пользователь еще не голосовал
        require(self.votes.get(sender()) == null, "Already voted");
        
        // Получаем ID предложения
        let proposalId: Int = msg.proposal_id;
        require(proposalId < self.proposalsCount, "Invalid proposal ID");
        
        // Получаем баланс токенов пользователя
        let balance: Int = self.getTokenBalance(sender());
        require(balance >= self.minTokenBalance, "Insufficient token balance");
        
        // Сохраняем баланс пользователя для подсчета голосов
        self.voterTokenBalances.set(sender(), balance);
        
        // Обновляем количество голосов для предложения
        let proposal: Proposal = self.proposals.get(proposalId)!!;
        proposal.votes = proposal.votes + balance;
        self.proposals.set(proposalId, proposal);
        
        // Отмечаем, что пользователь проголосовал
        self.votes.set(sender(), proposalId + 1);
    }
    
    // Завершение голосования и отправка средств победителю
    receive(msg: FinalizeVotingMessage) {
        require(sender() == self.owner || now() >= self.votingEndTime, "Not allowed or voting not ended");
        require(self.votingActive, "No active voting");
        
        // Находим победителя
        let winningProposal: Proposal = self.findWinningProposal();
        
        // Сохраняем результаты голосования
        self.lastVotingResults = self.serializeResults(winningProposal);
        
        // Отправляем запрос на перевод средств приюту для животных
        send(SendParameters{
            to: self.animalHelperPool,
            bounce: true,
            value: ton("0.05"),
            mode: SendIgnoreErrors,
            body: beginCell()
                .storeUint(1, 32)  // Операция перевода
                .storeAddress(winningProposal.shelterAddress)
                .endCell()
        });
        
        // Завершаем голосование
        self.votingActive = false;
    }
    
    // Получение текущего статуса голосования
    receive(msg: GetVotingStatusMessage) {
        let status: Cell = beginCell()
            .storeBool(self.votingActive)
            .storeUint(self.votingStartTime, 64)
            .storeUint(self.votingEndTime, 64)
            .storeUint(self.proposalsCount, 32)
            .endCell();
        
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: status
        });
    }
    
    // Получение информации о предложении
    receive(msg: GetProposalMessage) {
        let proposalId: Int = msg.proposal_id;
        require(proposalId < self.proposalsCount, "Invalid proposal ID");
        
        let proposal: Proposal = self.proposals.get(proposalId)!!;
        
        let proposalData: Cell = beginCell()
            .storeUint(proposal.id, 32)
            .storeAddress(proposal.shelterAddress)
            .storeRef(beginCell().endCell())
            .storeRef(beginCell().endCell())
            .storeUint(proposal.votes, 128)
            .endCell();
        
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: proposalData
        });
    }
    
    // Получение результатов последнего голосования
    receive(msg: GetLastResultsMessage) {
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: self.lastVotingResults
        });
    }
    
    // Обновление минимального баланса токенов для голосования
    receive(msg: UpdateMinBalanceMessage) {
        require(sender() == self.owner, "Not owner");
        self.minTokenBalance = msg.min_balance;
    }
    
    // Обновление адреса контракта токена
    receive(msg: UpdateTokenContractMessage) {
        require(sender() == self.owner, "Not owner");
        self.tokenContract = msg.new_address;
    }
    
    // Обновление адреса пула помощи животным
    receive(msg: UpdateAnimalHelperPoolMessage) {
        require(sender() == self.owner, "Not owner");
        self.animalHelperPool = msg.new_address;
    }
    
    // Вспомогательные функции
    
    // Получение баланса токенов пользователя
    fun getTokenBalance(addr: Address): Int {
        // В реальной реализации здесь должен быть запрос к контракту токена
        // Для упрощения возвращаем либо сохраненный баланс, либо минимальный баланс
        let savedBalance: Int? = self.voterTokenBalances.get(addr);
        if (savedBalance != null) {
            return savedBalance!!;
        }
        
        // Заглушка - в реальной реализации нужен запрос к токен-контракту
        return self.minTokenBalance; 
    }
    
    // Поиск предложения с наибольшим количеством голосов
    fun findWinningProposal(): Proposal {
        let maxVotes: Int = 0;
        let winningId: Int = 0;
        
        // Проходим по всем предложениям и находим с максимальным количеством голосов
        let i: Int = 0;
        while (i < self.proposalsCount) {
            let proposal: Proposal = self.proposals.get(i)!!;
            if (proposal.votes > maxVotes) {
                maxVotes = proposal.votes;
                winningId = i;
            }
            i = i + 1;
        }
        
        return self.proposals.get(winningId)!!;
    }
    
    // Сериализация результатов голосования
    fun serializeResults(winner: Proposal): Cell {
        return beginCell()
            .storeUint(winner.id, 32)
            .storeAddress(winner.shelterAddress)
            .storeRef(beginCell().endCell())
            .storeUint(winner.votes, 128)
            .storeUint(self.votingEndTime, 64)
            .endCell();
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