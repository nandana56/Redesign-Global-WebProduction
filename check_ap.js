import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach((file) => {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, '/', file));
        }
    });
    return arrayOfFiles;
};

const checkImports = () => {
    const files = getAllFiles(SRC_DIR).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        // Look for <AnimatePresence (with space or tag end)
        const hasUsage = /<AnimatePresence[\s>]/.test(content);
        // Look for import { ...AnimatePresence... } from 'framer-motion'
        const hasImport = /import\s+{[^}]*AnimatePresence[^}]*}\s+from\s+['"]framer-motion['"]/.test(content);
        
        if (hasUsage && !hasImport) {
            console.log(`MISSING IMPORT in: ${file}`);
        }
    });
};

checkImports();
