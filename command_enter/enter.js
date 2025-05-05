import path from 'path';
import readline from 'readline';
import os from 'os';
import { stdin as input, stdout as output } from 'process';
import { messageDirectory } from '../general/messageDirectory.js';
import { name, startDirectory } from '../general/start.js';
import { up } from '../command_nav/up.js';
import { cd } from '../command_nav/cd.js';
import { ls } from '../command_nav/ls.js';
import { cat } from '../command_files/cat.js';
import { add } from '../command_files/add.js';
import { mkdir } from '../command_files/mkdir.js';
import { rn } from '../command_files/rn.js';
import { cp } from '../command_files/cp.js';
import { mv } from '../command_files/mv.js';
import { rm } from '../command_files/rm.js';
import { hash } from '../command_hash/hash.js';
import { compress } from '../command_compress_decompress/compress.js';
import { decompress } from '../command_compress_decompress/decompress.js';
import { cpus } from '../command_os/cpus.js';


let currentDirectory = startDirectory();

export const enter = () => {
    const rl = readline.createInterface({ input, output });
    rl.setPrompt('\nEnter command: ');
    rl.prompt();

    rl.on('line', async (input) => {
        
        switch (input.trim().split(' ')[0]) {
            case 'up':
                if (input.trim().length===2){
                    currentDirectory=up(currentDirectory);
                    messageDirectory(currentDirectory);
                    rl.prompt();
                    break;
                } else {
                    console.log('\nInvalid input');
                    messageDirectory(currentDirectory);
                    rl.prompt();
                    break;
                }
            case 'cd':
                currentDirectory= await cd(currentDirectory, input);
                messageDirectory(currentDirectory);
                rl.prompt();
                break;
            case 'ls':
                if (input.trim().length===2){
                    await ls(currentDirectory);
                    messageDirectory(currentDirectory);
                    rl.prompt();
                    break;
                } else {
                    console.log('\nInvalid input');
                    messageDirectory(currentDirectory);
                    rl.prompt();
                    break;
                }
            case 'cat':
                await cat(currentDirectory, input);
                rl.prompt();
                break;
            case 'add':
                await add(currentDirectory, input);
                messageDirectory(currentDirectory);
                rl.prompt();
                break;
            case 'mkdir':
                await mkdir(currentDirectory, input);
                messageDirectory(currentDirectory);
                rl.prompt();
                break;
            case 'rn':
                await rn(currentDirectory, input);
                messageDirectory(currentDirectory);
                rl.prompt();
                break;
            case 'cp':
                await cp(currentDirectory, input);
                messageDirectory(currentDirectory);
                rl.prompt();
                break;
            case 'mv':
                await mv(currentDirectory, input);
                messageDirectory(currentDirectory);
                rl.prompt();
                break;
            case 'rm':
                await rm(currentDirectory, input);
                messageDirectory(currentDirectory);
                rl.prompt();
                break;
            case 'os':{
                switch(input.trim().split(' ')[1]){
                    case '--EOL':
                        console.log(JSON.stringify(os.EOL));
                        messageDirectory(currentDirectory);
                        rl.prompt();
                        break;
                    case '--cpus':
                        await cpus();
                        messageDirectory(currentDirectory);
                        rl.prompt();
                        break;
                    case '--homedir':
                        console.log(os.homedir());
                        messageDirectory(currentDirectory);
                        rl.prompt();
                        break;
                    case '--username':
                        console.log(os.userInfo().username);
                        messageDirectory(currentDirectory);
                        rl.prompt();
                        break;
                    case '--architecture':
                        console.log(os.arch());
                        messageDirectory(currentDirectory);
                        rl.prompt();
                        break;
                    default:
                        console.log('Invalid input');
                        messageDirectory(currentDirectory);
                        rl.prompt();}
                break;
            }

            case 'hash':
                await hash(currentDirectory, input);
                //rl.prompt();
                break;
            case 'compress':
                await compress(currentDirectory, input);
                messageDirectory(currentDirectory);
                rl.prompt();
                break;
            case 'decompress':
                await decompress(currentDirectory, input);
                messageDirectory(currentDirectory);
                rl.prompt();
                break;
            case '.exit':
                rl.close();
                break;
            default:
                console.log('Invalid input');
                messageDirectory(currentDirectory);
                rl.prompt();
        }
        
    });

    rl.on('close', () => console.log(`\n\nThank you for using File Manager, ${name}, goodbye!`))

};