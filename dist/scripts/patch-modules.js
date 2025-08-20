"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Путь к директории с модулями
const BUILD_DIR = path.join(__dirname, '..', 'build');
// Функция для патча одного файла
function patchFile(filePath) {
    console.log(`Patching ${filePath}...`);
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        // Добавляем импорты для всех необходимых типов
        const importStatement = `import { hexToCell } from '../scripts/utils';
import {
    Address,
    Cell,
    Contract,
    ContractProvider,
    Sender,
    Builder,
    beginCell,
    Dictionary,
    Slice,
    TupleReader,
    TupleBuilder,
    contractAddress,
    storeMessageRelaxed,
    DictionaryValue,
    ABIType,
    ABIGetter,
    ABIReceiver,
    ContractABI
} from '@ton/core';\n`;
        // Удаляем существующие импорты, которые могут вызывать конфликты
        content = content.replace(/import\s+{[^}]*}\s+from\s+['"]@ton\/core['"];?\s*/g, '');
        // Добавляем новые импорты в начало файла
        content = importStatement + content;
        // Заменяем все вызовы Cell.fromHex на hexToCell
        content = content.replace(/Cell\.fromHex\('([^']+)'\)/g, "hexToCell('$1')");
        // Записываем изменения в файл
        fs.writeFileSync(filePath, content);
        console.log(`Successfully patched ${filePath}`);
    }
    catch (error) {
        console.error(`Error patching ${filePath}:`, error);
    }
}
// Получаем все .ts файлы в директории build
function patchAllFiles() {
    console.log(`Scanning directory: ${BUILD_DIR}`);
    try {
        const files = fs.readdirSync(BUILD_DIR);
        for (const file of files) {
            if (file.endsWith('.ts')) {
                patchFile(path.join(BUILD_DIR, file));
            }
        }
        console.log('All files patched successfully!');
    }
    catch (error) {
        console.error('Error scanning directory:', error);
    }
}
// Выполняем патч всех файлов
patchAllFiles();
