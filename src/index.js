import { readFileSync } from 'fs';
import path from 'path';
import process from 'process';
import compare from './comparing.js';
import parser from './parsers.js';
import formate from './formatters/index.js';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => readFileSync(getFilePath(filepath), 'utf-8');
const getFormat = (filepath) => path.extname(filepath).slice(1);

const parseFile = (filepath) => parser(readFile(filepath), getFormat(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const content1 = parseFile(filepath1);
  const content2 = parseFile(filepath2);
  const data = compare(content1, content2);
  return formate(data, format);
};

export default genDiff;
