import fs from 'fs/promises';
import path from 'path';

export const add = async (currentDirectory, input) => {
    let addr = input.trim().split(' ');
    addr.shift();
    addr=addr.join(' ');

    const newFile = path.join(currentDirectory, addr);

    await fs.access(newFile).then(() => {
        console.log('Operation failed');        
    }).catch(() => {
        fs.writeFile(newFile, '');
    });

};