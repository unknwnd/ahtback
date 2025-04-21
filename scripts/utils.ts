import { Cell, Dictionary, beginCell } from '@ton/core';

/**
 * Строит ячейку с метаданными для токена/NFT в формате onchain
 * @param params Параметры метаданных: имя, символ, описание, изображение и т.д.
 * @returns Cell с метаданными
 */
export function buildOnchainMetadata(params: {
    name: string;
    symbol: string;
    description: string;
    image: string;
    decimals?: number;
    social?: Record<string, string>;
    website?: string;
}): Cell {
    // Создаем словарь для хранения метаданных
    const dict = Dictionary.empty(Dictionary.Keys.Buffer(32), Dictionary.Values.Cell());
    
    // Добавляем обязательные поля
    dict.set(Buffer.from("name"), makeSnakeCell(params.name));
    dict.set(Buffer.from("symbol"), makeSnakeCell(params.symbol));
    dict.set(Buffer.from("description"), makeSnakeCell(params.description));
    dict.set(Buffer.from("image"), makeSnakeCell(params.image));
    
    // Добавляем опциональные поля
    if (params.decimals !== undefined) {
        dict.set(Buffer.from("decimals"), beginCell().storeUint(params.decimals, 8).endCell());
    }
    
    if (params.social) {
        for (const [platform, url] of Object.entries(params.social)) {
            dict.set(Buffer.from(`social.${platform}`), makeSnakeCell(url));
        }
    }
    
    if (params.website) {
        dict.set(Buffer.from("website"), makeSnakeCell(params.website));
    }
    
    // Сериализуем словарь в ячейку
    const contentCell = beginCell()
        .storeInt(0, 8) // onchain marker
        .storeDict(dict)
        .endCell();
    
    return contentCell;
}

/**
 * Создает ячейку со значением в формате Snake
 * @param str Строковое значение
 * @returns Cell с содержимым
 */
function makeSnakeCell(str: string): Cell {
    return beginCell().storeBuffer(Buffer.from(str)).endCell();
}

/**
 * Формирует ячейку для off-chain метаданных
 * @param uri URI метаданных
 * @returns Cell с метаданными
 */
export function buildOffchainMetadata(uri: string): Cell {
    return beginCell()
        .storeInt(0x01, 8) // off-chain marker
        .storeBuffer(Buffer.from(uri))
        .endCell();
}

/**
 * Формирует содержимое для NFT элемента
 * @param params Параметры содержимого NFT
 * @returns Cell с содержимым
 */
export function buildNftContent(params: {
    name: string;
    description: string;
    image: string;
    attributes?: Array<{ trait_type: string; value: string }>;
}): Cell {
    // Создаем словарь для хранения данных NFT
    const dict = Dictionary.empty(Dictionary.Keys.Buffer(32), Dictionary.Values.Cell());
    
    // Добавляем основные поля
    dict.set(Buffer.from("name"), makeSnakeCell(params.name));
    dict.set(Buffer.from("description"), makeSnakeCell(params.description));
    dict.set(Buffer.from("image"), makeSnakeCell(params.image));
    
    // Добавляем атрибуты, если они предоставлены
    if (params.attributes && params.attributes.length > 0) {
        const attributesDict = Dictionary.empty(Dictionary.Keys.Uint(32), Dictionary.Values.Cell());
        
        params.attributes.forEach((attr, index) => {
            const attrCell = beginCell()
                .storeBuffer(Buffer.from(attr.trait_type))
                .storeBuffer(Buffer.from(attr.value))
                .endCell();
            
            attributesDict.set(index, attrCell);
        });
        
        const attributesCell = beginCell()
            .storeDict(attributesDict)
            .endCell();
        
        dict.set(Buffer.from("attributes"), attributesCell);
    }
    
    // Сериализуем словарь в ячейку
    return beginCell()
        .storeInt(0, 8) // onchain marker
        .storeDict(dict)
        .endCell();
}

/**
 * Конвертирует ячейку в hex-строку
 * @param cell Ячейка для конвертации
 * @returns Строка в формате Hex
 */
export function cellToHex(cell: Cell): string {
    return cell.toBoc().toString('hex');
}

/**
 * Создает ячейку кода из hex-строки
 * @param hex Hex-строка с кодом
 * @returns Cell с кодом
 */
export function hexToCell(hex: string): Cell {
    return Cell.fromBoc(Buffer.from(hex, 'hex'))[0];
}

/**
 * Создает метаданные для токена в формате on-chain
 * @returns {Cell} Cell с метаданными токена
 */
export function buildTokenMetadata(): Cell {
    // Создаем словарь для хранения метаданных
    const dict = Dictionary.empty(Dictionary.Keys.Buffer(32), Dictionary.Values.Cell());

    // Добавляем метаданные в словарь
    addMetadataEntry(dict, 'name', 'Animal Helper Token');
    addMetadataEntry(dict, 'symbol', 'AHT');
    addMetadataEntry(dict, 'description', 'Animal Helper Token (AHT) - благотворительный токен на блокчейне TON для финансирования помощи животным. Проект объединяет криптовалютные технологии и благотворительность, обеспечивая прозрачное, децентрализованное распределение средств приютам для животных.');
    addMetadataEntry(dict, 'decimals', '9');
    addMetadataEntry(dict, 'image', 'https://example.com/aht_logo.png');
    addMetadataEntry(dict, 'website', 'https://animalhelpertoken.org');
    addMetadataEntry(dict, 'social', 'https://t.me/AnimalHelperToken');

    // Создаем ячейку с меткой on-chain
    // Маркер 0x00 означает, что метаданные хранятся прямо в контракте (on-chain)
    const cell = beginCell()
        .storeUint(0, 8) // on-chain marker
        .storeDict(dict)
        .endCell();

    return cell;
}

/**
 * Создает метаданные для NFT-коллекции в формате on-chain
 * @returns {Cell} Cell с метаданными NFT-коллекции
 */
export function buildNFTCollectionMetadata(): Cell {
    // Создаем словарь для хранения метаданных
    const dict = Dictionary.empty(Dictionary.Keys.Buffer(32), Dictionary.Values.Cell());

    // Добавляем метаданные в словарь
    addMetadataEntry(dict, 'name', 'Animal Helper NFTs');
    addMetadataEntry(dict, 'description', 'Коллекция благотворительных NFT, связанных с проектом Animal Helper Token. Каждый NFT представляет вклад в помощь животным и дает особые привилегии держателю.');
    addMetadataEntry(dict, 'image', 'https://example.com/aht_nft_collection.png');
    addMetadataEntry(dict, 'social', 'https://t.me/AnimalHelperToken');
    addMetadataEntry(dict, 'marketplace', 'https://getgems.io/collection/animal-helper-nfts');

    // Создаем ячейку с меткой on-chain
    const cell = beginCell()
        .storeUint(0, 8) // on-chain marker
        .storeDict(dict)
        .endCell();

    return cell;
}

/**
 * Создает метаданные для NFT-предмета
 * @param {number} index - Индекс NFT
 * @returns {Cell} Cell с метаданными NFT
 */
export function buildNFTItemMetadata(index: number): Cell {
    // Создаем словарь для хранения метаданных
    const dict = Dictionary.empty(Dictionary.Keys.Buffer(32), Dictionary.Values.Cell());

    // Добавляем метаданные в словарь
    addMetadataEntry(dict, 'name', `Animal Helper NFT #${index}`);
    addMetadataEntry(dict, 'description', `Благотворительный NFT #${index} проекта Animal Helper Token. Представляет вклад в помощь животным.`);
    addMetadataEntry(dict, 'image', `https://example.com/aht_nft_${index}.png`);
    addMetadataEntry(dict, 'attributes', JSON.stringify([
        {
            "trait_type": "Charity Level",
            "value": "Silver"
        },
        {
            "trait_type": "Voting Power",
            "value": "1"
        },
        {
            "trait_type": "Benefits",
            "value": "Priority Access"
        }
    ]));

    // Создаем ячейку с меткой on-chain
    const cell = beginCell()
        .storeUint(0, 8) // on-chain marker
        .storeDict(dict)
        .endCell();

    return cell;
}

/**
 * Добавляет запись метаданных в словарь
 * @param {Dictionary} dict - Словарь метаданных
 * @param {string} key - Ключ
 * @param {string} value - Значение
 */
function addMetadataEntry(dict: Dictionary<Buffer, Cell>, key: string, value: string) {
    // Создаем буфер из ключа, дополняя его до 32 байт
    const keyBuffer = Buffer.alloc(32);
    Buffer.from(key).copy(keyBuffer);

    // Создаем ячейку со значением
    const valueCell = beginCell().storeBuffer(Buffer.from(value)).endCell();

    // Добавляем запись в словарь
    dict.set(keyBuffer, valueCell);
}

/**
 * Создает строку для метаданных JSON
 * @param {object} params - Параметры метаданных
 * @returns {string} JSON-строка
 */
export function buildJSONMetadata(params: any): string {
    return JSON.stringify(params, null, 2);
}

/**
 * Преобразует TON в наноTON (1 TON = 10^9 nanoTON)
 * @param amount - Количество TON в строковом формате
 * @returns {bigint} Количество в nanoTON
 */
export function toNanoTon(amount: string): bigint {
    // Разбиваем строку на целую и дробную части
    const parts = amount.split('.');
    let result = BigInt(parts[0]) * BigInt(10 ** 9);
    
    if (parts.length > 1) {
        const fraction = parts[1].padEnd(9, '0').substring(0, 9);
        result += BigInt(fraction);
    }
    
    return result;
}

/**
 * Преобразует наноTON в TON с заданной точностью
 * @param amount - Количество nanoTON
 * @param decimals - Количество знаков после запятой (по умолчанию 4)
 * @returns {string} Строковое представление в TON
 */
export function fromNanoTon(amount: bigint, decimals: number = 4): string {
    const strAmount = amount.toString().padStart(10, '0');
    const intPart = strAmount.slice(0, -9) || '0';
    const fracPart = strAmount.slice(-9).substring(0, decimals);
    
    return `${intPart}.${fracPart}`;
} 