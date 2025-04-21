import * as fs from 'fs';
import * as path from 'path';

// Путь к директории с модулями
const BUILD_DIR = path.join(__dirname, '..', 'build');

// Функция для патча одного файла
function patchFile(filePath: string) {
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
    } catch (error) {
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
    } catch (error) {
        console.error('Error scanning directory:', error);
    }
}

// Выполняем патч всех файлов
patchAllFiles(); 