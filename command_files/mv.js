import fs from 'fs';
import path from 'path';

export const mv = async (currentDirectory, input) => {
    let mkDirOld='';
    let mkDirNew='';
        
    if (input.trim().split(' ')[1].split('\\')[0].length!==2){
        let addr = input.trim().split(' ')[1];
        mkDirOld = path.join(currentDirectory, addr);
    } else {
        let addr = input.trim().split(' ')[1];
        mkDirOld=addr;
    }

    if (input.trim().split(' ')[2].split('\\')[0].length!==2){
        let addr = input.trim().split(' ')[2];
        mkDirNew = path.join(currentDirectory, addr);
    } else {
        let addr = input.trim().split(' ')[2];
        mkDirNew=addr;
    }

    let pathToFile = mkDirOld;
    let pathToNewDirectory = path.join(mkDirNew, path.basename(pathToFile));

    await fs.promises.access(mkDirOld).then(() => {
       return fs.promises.access(mkDirNew);
    })
    .then(async ()=>{
        const readStream=fs.createReadStream(pathToFile);
        const writeStream=fs.createWriteStream(pathToNewDirectory);
    
        await readStream.on('data', async (data) => {
            await writeStream.write(data);
        });
        
        await fs.promises.rm(pathToFile);
    })
    .catch(() => {
        console.log('Operation failed');
    })

};