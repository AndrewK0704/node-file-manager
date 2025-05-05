import fs from 'fs/promises';
import path from 'path';

export const cd = async (currentDirectory, input) => {
    let mkDir='';
    
    if (input.trim().split(' ')[1].split('\\')[0].length!==2){
        let addr = input.trim().split(' ');
        addr.shift();
        addr=addr.join(' ');
        mkDir = path.join(currentDirectory, addr);
    } else {
        let addr = input.trim().split(' ');
        addr.shift();
        addr=addr.join(' ');
        mkDir=addr;
    }

    try {
        await fs.access(mkDir);
        return mkDir;
    } catch (err) {
        console.log('Operation failed');
        return currentDirectory;
    }
};