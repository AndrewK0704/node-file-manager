import fs from 'fs/promises';
import path from 'path';

export const rm = async (currentDirectory, input) => {

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

    await fs.unlink(mkDir).then(() => {
    }).catch(() => {
        console.log('Operation failed');
    });

};