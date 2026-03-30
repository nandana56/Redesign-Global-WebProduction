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

        if (content.includes('import WebGLDisposer from ')) {
            
            // Re-calculate the relative path properly
            const fileDir = path.dirname(file); 
            // fileDir is e.g. "src\pages" or "src\components"
            // the full path of WebGLDisposer is "src\components\WebGLDisposer"
            const disposerPath = path.join(SRC_DIR, 'components', 'WebGLDisposer');
            
            let relativePath = path.relative(fileDir, disposerPath);
            // On Windows this might use \, convert to /
            relativePath = relativePath.split(path.sep).join('/');
            
            if (!relativePath.startsWith('.')) {
                relativePath = './' + relativePath;
            }
            
            content = content.replace(/import WebGLDisposer from '.*';/, `import WebGLDisposer from '${relativePath}';`);
            
            fs.writeFileSync(file, content, 'utf8');
            console.log('Fixed import in', file, 'to', relativePath);
        }
    });
};

processFiles();
