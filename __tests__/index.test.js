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
  const errorFile = getFixturePath('file2.txt');

  const file1_json = getFixturePath('file1.json');
  const file2_json = getFixturePath('file2.json');
  const result_json = readFile('expected_json.txt');

  const file1_yaml = getFixturePath('file1.yaml');
  const file2_yaml = getFixturePath('file2.yaml');
  const file1_yml = getFixturePath('file1.yml');
  const file2_yml = getFixturePath('file2.yml');
  const result_yaml = readFile('expected_yaml.txt');
  expect(gendiff(file1_json, file2_json)).toEqual(result_json);
  expect(gendiff(file1_yaml, file2_yaml)).toEqual(result_yaml);
  expect(gendiff(file1_yml, file2_yml)).toEqual(result_yaml);

  expect(gendiff(file1_json, errorFile)).toEqual('Unknown format! txt');
});
