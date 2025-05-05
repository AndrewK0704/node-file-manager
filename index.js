import fs from 'fs';
import path from 'path';
import os from 'os';
import readline from 'readline';
import { stdin as input, stdout as output } from 'process';

import {start, name} from './general/start.js';
import {enter} from './command_enter/enter.js';


start();
enter();