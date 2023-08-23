import { readFileSync } from 'fs';
import path from 'path';
import process from 'process';
import comparing from './comparing';
import parser from './parsers';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => readFileSync(getFilePath(filepath), 'utf-8');
const getFormat = (filepath) => path.extname(filepath).slice(1);

const parseFile = (filepath) => parser(readFile(filepath), getFormat(filepath));

const getString = (arr) => {
  const newArr = arr.map((item) => {
    if (item.status === 'equal') {
      return `  ${item.key}: ${item.value}`;
    }
    return `${item.status} ${item.key}: ${item.value}`;
  });
  const text = newArr.join('\n');
  return text;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
  const result = getString(comparing(file1, file2));
  return result;
};

export default genDiff;
