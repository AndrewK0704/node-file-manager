import fs from 'fs/promises';
import path from 'path';

export const cd = async (currentDirectory, input) => {
    const mkDir = path.join(currentDirectory, input.split(' ')[1]);

    try {
        await fs.access(mkDir);
        return mkDir;
    } catch (err) {
        console.log('Operation failed');
        return currentDirectory;
    }
};