#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/function.js';


program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format[type]','output format (default: "stylish")')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action( (filepath1, filepath2) => {
        const result = genDiff(filepath1, filepath2);
        console.log(result);
    })

    program.parse();