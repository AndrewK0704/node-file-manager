import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { messageDirectory } from '../general/messageDirectory.js';

export const hash = async (currentDirectory, input) => {

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

    await fs.promises.access(mkDir).then(async() => {
        const stream=await fs.createReadStream(mkDir);
        const hash=await crypto.createHash('sha256');
        await stream.on('data', async (data) => {
            const finalHex=await hash.update(data).digest('hex');
            await messageDirectory(currentDirectory);
            console.log(finalHex); 
            process.stdout.write('\nEnter command: ');
        });
        
    }).catch(() => {
        messageDirectory(currentDirectory);
        console.log('Operation failed');
        process.stdout.write('\nEnter command: ');
    });
};