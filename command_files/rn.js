import fs from 'fs/promises';
import path from 'path';

export const rn = async (currentDirectory, input) => {

    const oldFile = path.join(currentDirectory, input.trim().split(' ')[1]);
    const newFile = path.join(currentDirectory, input.trim().split(' ')[2]);

    await fs.access(oldFile).then(() => {
        fs.rename(oldFile, newFile)
    }).catch(() => {
        console.log('Operation failed');
    });

};