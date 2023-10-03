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
  expect(gendiff(getFixturePath(file1), getFixturePath(file2))).toEqual(readFile('expectedStylish.txt'));
  expect(gendiff(getFixturePath(file1), getFixturePath(file2), 'stylish')).toEqual(readFile('expectedStylish.txt'));
  expect(gendiff(getFixturePath(file1), getFixturePath(file2), 'plain')).toEqual(readFile('expectedPlain.txt'));
  expect(gendiff(getFixturePath(file1), getFixturePath(file2), 'json')).toEqual(readFile('expectedJSON.txt'));
});

test.failing('boom!', () => {
  const json1 = getFixturePath('file1.json');
  expect(gendiff(json1, getFixturePath('errorFile.txt'), 'plain')).toEqual(readFile('resultPlain.txt'));
});
