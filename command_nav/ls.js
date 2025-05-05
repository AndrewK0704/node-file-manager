import fs from 'fs/promises';
import { type } from 'os';
import path from 'path';

export const ls = async (currentDirectory) => {
    let data = await fs.readdir(currentDirectory, { withFileTypes: true });

    const strUpDown  ='------------------------------------------------------------------';
    const strTitle   ='(index)|                     name                    |    type    ';
    const strTamplate='       |                                             |            ';
    let strNew =strTamplate.split('|');
    let index=0;

    console.log(strUpDown);
    console.log(strTitle);
    console.log(strUpDown);

    for (let i=0; i<data.length; i++){

        if (!data[i].isFile()){
            strNew[0]=strNew[0].replace(' ', index).slice(0,7);
            strNew[1]=strNew[1].replace(' ', data[i].name).slice(0,45);
            strNew[2]=strNew[2].replace(' ', data[i].isFile() ? 'file' : 'directory').slice(0,12);
            console.log(strNew.join('|'))
            strNew = strTamplate.split('|');
            index++;
        }
    }

    for (let j=0; j<data.length; j++){

        if (data[j].isFile()){
            strNew[0]=strNew[0].replace(' ', index).slice(0,7);
            strNew[1]=strNew[1].replace(' ', data[j].name).slice(0,45);
            strNew[2]=strNew[2].replace(' ', data[j].isFile() ? 'file' : 'directory').slice(0,12);
            console.log(strNew.join('|'))
            strNew = strTamplate.split('|');
            index++;
        }
    }

    console.log(strUpDown);

};