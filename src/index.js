import { readFileSync } from 'fs';
import path from 'path';
import process from 'process';
import comparing from './comparing';
import parser from './parsers';
import formatting from './formatters/index';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => readFileSync(getFilePath(filepath), 'utf-8');
const getFormat = (filepath) => path.extname(filepath).slice(1);

const parseFile = (filepath) => parser(readFile(filepath), getFormat(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
  const data = comparing(file1, file2);
  return formatting(data, format);
};

export default genDiff;
