import os from 'os';
import { messageDirectory } from './messageDirectory.js';

export let name = '';

export const start = () => {
    name=process.argv[2].split('=')[1];
    console.log(`Welcome to the File Manager, ${name}!`);
    console.log(`Starting working directory is ${os.homedir()}`);
    messageDirectory(startDirectory());
};

export const startDirectory = () => {
    const directory = process.cwd();
    return directory;
};