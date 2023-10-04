import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';

const filenamed = fileURLToPath(import.meta.url);
const dirnamed = dirname(filenamed);

const getFixturePath = (filename) => path.join(dirnamed, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

test.each([
  { filePath1: 'file1.json', filePath2: 'file2.json', result: 'expectedStylish.txt' },
  {
    filePath1: 'file1.yml', filePath2: 'file2.yaml', result: 'expectedStylish.txt', format: 'stylish',
  },
  {
    filePath1: 'file1.json', filePath2: 'file2.json', result: 'expectedStylish.txt', format: 'stylish',
  },
  {
    filePath1: 'file1.json', filePath2: 'file2.json', result: 'expectedPlain.txt', format: 'plain',
  },
  {
    filePath1: 'file1.yml', filePath2: 'file2.yaml', result: 'expectedPlain.txt', format: 'plain',
  },
  {
    filePath1: 'file1.yml', filePath2: 'file2.yaml', result: 'expectedJSON.txt', format: 'json',
  },
  {
    filePath1: 'file1.json', filePath2: 'file2.json', result: 'expectedJSON.txt', format: 'json',
  },
])('gendiff', ({
  filePath1, filePath2, result, format,
}) => {
  expect(gendiff(getFixturePath(filePath1), getFixturePath(filePath2), format))
    .toEqual(readFile(result));
});
