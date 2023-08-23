import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index';

const filenamed = fileURLToPath(import.meta.url);
const dirnamed = dirname(filenamed);

const getFixturePath = (filename) => path.join(dirnamed, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

test('gendiff', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const result = readFile('expected_json.txt');
  expect(gendiff(filepath1, filepath2)).toEqual(result);
});
