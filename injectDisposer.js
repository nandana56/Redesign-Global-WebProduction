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

const processFiles = () => {
    const files = getAllFiles(SRC_DIR).filter(f => f.endsWith('.js') || f.endsWith('.jsx'));

    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');

        // Check if file uses Canvas from @react-three/fiber
        if (content.includes('<Canvas') && !content.includes('WebGLDisposer')) {
            console.log('Processing:', file);
            
            // Add import
            // Figure out the path to WebGLDisposer
            const depth = file.split(path.sep).length - SRC_DIR.split('/').length - 1;
            const prefix = depth === 0 ? './components/' : '../'.repeat(depth) + 'components/';
            const importStatement = `import WebGLDisposer from '${prefix}WebGLDisposer';\n`;
            
            // Insert import after the last import statement
            const lines = content.split('\n');
            let lastImportIndex = -1;
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].startsWith('import ')) {
                    lastImportIndex = i;
                }
            }
            if (lastImportIndex !== -1) {
                lines.splice(lastImportIndex + 1, 0, importStatement);
            } else {
                lines.unshift(importStatement);
            }
            content = lines.join('\n');

            // Find all <Canvas... > and insert <WebGLDisposer /> right after
            const regex = /(<Canvas[^>]*>)/g;
            content = content.replace(regex, '$1\n                <WebGLDisposer />');

            fs.writeFileSync(file, content, 'utf8');
        }
    });
};

processFiles();
