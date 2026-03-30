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
        
        if (!content.includes('<Canvas') || content.includes('LazyCanvas')) return;
        
        let newContent = content;
        
        // Build correct import
        const importPath = filePath.includes(path.join('src', 'pages')) 
            ? "../components/LazyCanvas" 
            : "./LazyCanvas";

        const importStatement = `import LazyCanvas from '${importPath}';\n`;

        // The simplest way to add the import to the top of the file
        newContent = importStatement + newContent;

        // Wrap the canvas. We use exact strings to wrap.
        newContent = newContent.split('<Canvas').join('<LazyCanvas>\n<Canvas');
        newContent = newContent.split('</Canvas>').join('</Canvas>\n</LazyCanvas>');

        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Wrapped Canvas in LazyCanvas in -> ${filePath}`);
    }
});
