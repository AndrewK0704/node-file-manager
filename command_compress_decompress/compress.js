import fs from 'fs';
import path from 'path';
import { createBrotliCompress } from 'zlib';

export const compress = async (currentDirectory, input) => {
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
    let pathToNewDirectory = path.join(mkDirNew, path.basename(pathToFile))+'.br';

    await fs.promises.access(mkDirOld).then(() => {
       return fs.promises.access(mkDirNew);
    })
    .then(()=>{
        fs.createReadStream(pathToFile).pipe(createBrotliCompress()).pipe(fs.createWriteStream(pathToNewDirectory));
    })
    .catch(() => {
        console.log('Operation failed');
    });
};