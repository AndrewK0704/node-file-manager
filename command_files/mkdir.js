import fs from 'fs/promises';
import path from 'path';

export const mkdir = async (currentDirectory, input) => {
    let addr = input.trim().split(' ');
    addr.shift();
    addr=addr.join(' ');

    const newDir = path.join(currentDirectory, addr);

    await fs.readdir(newDir).then(() => {
        console.log('Operation failed');  
    }).catch(() => {
        fs.mkdir(newDir);
    });
};