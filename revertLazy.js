import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

walkDir(srcDir, (filePath) => {
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        let newContent = content;
        
        // Remove import LazyCanvas lines
        const lines = newContent.split('\n');
        const filteredLines = lines.filter(line => !line.includes('import LazyCanvas'));
        newContent = filteredLines.join('\n');

        // Remove <LazyCanvas> and </LazyCanvas> tags completely
        newContent = newContent.replace(/<LazyCanvas>\s*$/gm, '');
        newContent = newContent.replace(/^\s*<\/LazyCanvas>/gm, '');
        newContent = newContent.replace(/<LazyCanvas>/g, '');
        newContent = newContent.replace(/<\/LazyCanvas>/g, '');

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Reverted LazyCanvas in -> ${filePath}`);
        }
    }
});
