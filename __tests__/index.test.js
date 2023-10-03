import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';

const filenamed = fileURLToPath(import.meta.url);
const dirnamed = dirname(filenamed);

const getFixturePath = (filename) => path.join(dirnamed, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

const files = [['file1.json', 'file2.json'], ['file1.yml', 'file2.yaml']];

test.each(files)('gendiff', (file1, file2) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const resultStylish = readFile('expectedStylish.txt');
  expect(gendiff(filepath1, filepath2)).toEqual(resultStylish);
  expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(resultStylish);
  expect(gendiff(filepath1, filepath2, 'plain')).toEqual(readFile('expectedPlain.txt'));
  expect(gendiff(filepath1, filepath2, 'json')).toEqual(readFile('expectedJSON.txt'));
});

test.failing('boom!', () => {
  const json1 = getFixturePath('file1.json');
  expect(gendiff(json1, getFixturePath('errorFile.txt'), 'plain')).toEqual(readFile('resultPlain.txt'));
});
