import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

test('gendiff', () => {
    expect(gendiff.action(/workspaces/frontend-project-46/__fixtures__/file1.json,/workspaces/frontend-project-46/__fixtures__/file2.json)).toEqual(readFile('expected_json.js'));
  });