import fs from 'fs';
import path from 'path';
import { messageDirectory } from '../general/messageDirectory.js';

export const cat = async (currentDirectory, input) => {

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

    await fs.promises.access(mkDir).then(() => {
        const readStream=fs.createReadStream(mkDir);
        readStream.on('data', (data) => {
            process.stdout.write(data.toString());
        });
        readStream.on('end', () => {
            console.log('\n')
            messageDirectory(currentDirectory);
            process.stdout.write('\nEnter command: ');
        });
    })
    .catch(() => {
        console.log('Operation failed');
        messageDirectory(currentDirectory);
    });
};