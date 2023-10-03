import _ from 'lodash';

const countOpeningSpace = 4;
const defendSpace = 2;
const countInitialSpaces = (depth) => defendSpace + depth * countOpeningSpace;
const countClosingSpaces = (depth) => depth * countOpeningSpace;

const checkObject = (value, depth) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const stringifyObject = keys.map((key) => `${' '.repeat(countInitialSpaces(depth + 1))}  ${key}: ${checkObject(value[key], depth + 1)}`);
    return `{\n${stringifyObject.join('\n')}\n${' '.repeat(countClosingSpaces(depth + 1))}}`;
  }
  return value;
};

const stylish = (data, depth = 0) => {
  const stringifyData = data.map((item) => {
    switch (item.type) {
      case 'nested':
        return `${' '.repeat(countInitialSpaces(depth))}  ${item.key}: {\n${stylish(item.children, depth + 1)}\n${' '.repeat(countClosingSpaces(depth + 1))}}`;
      case 'equal':
        return `${' '.repeat(countInitialSpaces(depth))}  ${item.key}: ${checkObject(item.value, depth)}`;
      case 'added':
        return `${' '.repeat(countInitialSpaces(depth))}+ ${item.key}: ${checkObject(item.value, depth)}`;
      case 'deleted':
        return `${' '.repeat(countInitialSpaces(depth))}- ${item.key}: ${checkObject(item.value, depth)}`;
      case 'updated':
        return `${' '.repeat(countInitialSpaces(depth))}- ${item.key}: ${checkObject(item.value1, depth)}\n${' '.repeat(countInitialSpaces(depth))}+ ${item.key}: ${checkObject(item.value2, depth)}`;
      default:
        throw new Error(`'Unknown ${item.type}'`);
    }
  });
  const text = stringifyData.join('\n');
  return text;
};

const getStylish = (data) => `{\n${stylish(data)}\n}`;

export default getStylish;
