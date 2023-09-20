import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';

const filenamed = fileURLToPath(import.meta.url);
const dirnamed = dirname(filenamed);

const getFixturePath = (filename) => path.join(dirnamed, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

const resultStylish = readFile('expectedStylish.txt');
const resultPlain = readFile('expectedPlain.txt');
const resultJSON = readFile('expectedJSON.txt');

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');

const yaml1 = getFixturePath('file1.yaml');
const yaml2 = getFixturePath('file2.yaml');
const yml1 = getFixturePath('file1.yml');
const yml2 = getFixturePath('file2.yml');

test('gendiff for Stylish', () => {
  expect(gendiff(json1, json2)).toEqual(resultStylish);
  expect(gendiff(yaml1, yaml2, 'stylish')).toEqual(resultStylish);
  expect(gendiff(yml1, yml2)).toEqual(resultStylish);
});

test('gendiff for Plain', () => {
  expect(gendiff(json1, json2, 'plain')).toEqual(resultPlain);
  expect(gendiff(yaml1, yaml2, 'plain')).toEqual(resultPlain);
  expect(gendiff(yml1, yml2, 'plain')).toEqual(resultPlain);
});

test('gendiff for JSON', () => {
  expect(gendiff(json1, json2, 'json')).toEqual(resultJSON);
  expect(gendiff(yaml1, yaml2, 'json')).toEqual(resultJSON);
  expect(gendiff(yml1, yml2, 'json')).toEqual(resultJSON);
});
