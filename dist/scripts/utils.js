"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOffchainMetadata = buildOffchainMetadata;
exports.cellToHex = cellToHex;
exports.hexToCell = hexToCell;
exports.buildTokenMetadata = buildTokenMetadata;
exports.buildJSONMetadata = buildJSONMetadata;
exports.toNanoTon = toNanoTon;
exports.fromNanoTon = fromNanoTon;
const core_1 = require("@ton/core");
/**
 * Создает ячейку со значением в формате Snake
 * @param str Строковое значение
 * @returns Cell с содержимым
 */
function makeSnakeCell(str) {
    return (0, core_1.beginCell)().storeBuffer(Buffer.from(str)).endCell();
}
/**
 * Формирует ячейку для off-chain метаданных
 * @param uri URI метаданных
 * @returns Cell с метаданными
 */
function buildOffchainMetadata(uri) {
    return (0, core_1.beginCell)()
        .storeInt(0x01, 8) // off-chain marker
        .storeBuffer(Buffer.from(uri))
        .endCell();
}
/**
 * Конвертирует ячейку в hex-строку
 * @param cell Ячейка для конвертации
 * @returns Строка в формате Hex
 */
function cellToHex(cell) {
    return cell.toBoc().toString('hex');
}
/**
 * Создает ячейку кода из hex-строки
 * @param hex Hex-строка с кодом
 * @returns Cell с кодом
 */
function hexToCell(hex) {
    return core_1.Cell.fromBoc(Buffer.from(hex, 'hex'))[0];
}
/**
 * Создает метаданные для токена в формате on-chain
 * @returns {Cell} Cell с метаданными токена
 */
function buildTokenMetadata() {
    const metadata = {
        name: 'Animal Helper Token',
        symbol: 'AHT',
        description: 'Animal Helper Token (AHT) - благотворительный токен на блокчейне TON для финансирования помощи животным. Проект объединяет криптовалютные технологии и благотворительность, обеспечивая прозрачное, децентрализованное распределение средств приютам для животных.',
        decimals: '9',
        image: 'https://example.com/aht_logo.png', //TODO: Заменить на реальный URL
        website: 'https://animalhelpertoken.org', //TODO: Заменить на реальный URL
        social: 'https://t.me/AnimalHelperToken' //TODO: Заменить на реальный URL
    };
    const dict = core_1.Dictionary.empty(core_1.Dictionary.Keys.Buffer(32), core_1.Dictionary.Values.Cell());
    for (const key in metadata) {
        dict.set(Buffer.from(key), makeSnakeCell(metadata[key]));
    }
    return (0, core_1.beginCell)()
        .storeInt(0, 8) // onchain marker
        .storeDict(dict)
        .endCell();
}
/**
 * Создает строку для метаданных JSON
 * @param {object} params - Параметры метаданных
 * @returns {string} JSON-строка
 */
function buildJSONMetadata(params) {
    return JSON.stringify(params, null, 2);
}
/**
 * Преобразует TON в наноTON (1 TON = 10^9 nanoTON)
 * @param amount - Количество TON в строковом формате
 * @returns {bigint} Количество в nanoTON
 */
function toNanoTon(amount) {
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
function fromNanoTon(amount, decimals = 4) {
    const strAmount = amount.toString().padStart(10, '0');
    const intPart = strAmount.slice(0, -9) || '0';
    const fracPart = strAmount.slice(-9).substring(0, decimals);
    return `${intPart}.${fracPart}`;
}
