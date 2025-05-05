import path from 'path';
import readline from 'readline';
import { stdin as input, stdout as output } from 'process';
import { messageDirectory } from '../general/messageDirectory.js';
import { name, startDirectory } from '../general/start.js';
import { up } from '../command_nav/up.js';
import { cd } from '../command_nav/cd.js';
import { ls } from '../command_nav/ls.js';

let currentDirectory = startDirectory();

export const enter = () => {
    const rl = readline.createInterface({ input, output });
    rl.setPrompt('\nEnter command: ');
    rl.prompt();

    rl.on('line', async (input) => {
        
        switch (input.trim().split(' ')[0]) {
            case 'up':
                currentDirectory=up(currentDirectory);
                messageDirectory(currentDirectory);
                rl.prompt();
                break;
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
            // case 'cat':
            //   break;
            // case 'add':
            //   break;
            // case 'mkdir':
            //   break;
            // case 'rn':
            //   break;
            // case 'cp':
            //   break;
            // case 'mv':
            //   break;
            // case 'rm':
            //   break;
            // case 'os':
            //   break;
            // case 'hash':
            //   break;
            // case 'compress':
            //   break;
            // case 'decompress':
            //   break;
            case '.exit':
                rl.close();
                break;
            default:
                console.log('\nInvalid input');
                messageDirectory(currentDirectory);
                rl.prompt();
        }
        
    });

    rl.on('close', () => console.log(`\n\nThank you for using File Manager, ${name}, goodbye!`))

};