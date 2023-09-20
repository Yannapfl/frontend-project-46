import { readFileSync } from 'fs';
import path from 'path';
import process from 'process';
import comparing from './comparing';
import parser from './parsers';
import getStylish from './formatters/stylish';
import getPlain from './formatters/plain';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => readFileSync(getFilePath(filepath), 'utf-8');
const getFormat = (filepath) => path.extname(filepath).slice(1);

const parseFile = (filepath) => parser(readFile(filepath), getFormat(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
  const data = comparing(file1, file2);
  switch (format) {
    case 'stylish':
      return `{\n${getStylish(data)}\n}`;
    case 'plain':
      return getPlain(data);
    default:
      throw new Error(`Unknown ${format}.`);
  }
};

export default genDiff;
