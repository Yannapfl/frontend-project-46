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
  const result = readFile('expected.txt');

  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');

  const yaml1 = getFixturePath('file1.yaml');
  const yaml2 = getFixturePath('file2.yaml');
  const yml1 = getFixturePath('file1.yml');
  const yml2 = getFixturePath('file2.yml');

  expect(gendiff(json1, json2)).toEqual(result);
  expect(gendiff(yaml1, yaml2)).toEqual(result);
  expect(gendiff(yml1, yml2)).toEqual(result);
});

test('boom!', () => {
  const errorFile = getFixturePath('errorFile.txt');
  expect(gendiff(errorFile, errorFile)).toThrow(new Error('Unknown format! txt'));
});
