import _ from 'lodash';

const countOpeningSpace = 4;
const defendSpace = 2;
const countInitialSpaces = (depth) => defendSpace + depth * countOpeningSpace;
const countClosingSpaces = (depth) => depth * countOpeningSpace;

const stringify = (value, depth) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const stringifyObject = keys.map((key) => `${' '.repeat(countInitialSpaces(depth + 1))}  ${key}: ${stringify(value[key], depth + 1)}`);
    return `{\n${stringifyObject.join('\n')}\n${' '.repeat(countClosingSpaces(depth + 1))}}`;
  }
  return value;
};

const getStylish = (data) => {
  const stylish = (content, depth = 0) => {
    const stringifyData = content.map((item) => {
      switch (item.type) {
        case 'nested':
          return [`${' '.repeat(countInitialSpaces(depth))}  ${item.key}: {\n${stylish(item.children, depth + 1)}`,
            `${' '.repeat(countClosingSpaces(depth + 1))}}`].join('\n');
        case 'equal':
          return `${' '.repeat(countInitialSpaces(depth))}  ${item.key}: ${stringify(item.value, depth)}`;
        case 'added':
          return `${' '.repeat(countInitialSpaces(depth))}+ ${item.key}: ${stringify(item.value, depth)}`;
        case 'deleted':
          return `${' '.repeat(countInitialSpaces(depth))}- ${item.key}: ${stringify(item.value, depth)}`;
        case 'updated':
          return [`${' '.repeat(countInitialSpaces(depth))}- ${item.key}: ${stringify(item.value1, depth)}`,
            `${' '.repeat(countInitialSpaces(depth))}+ ${item.key}: ${stringify(item.value2, depth)}`].join('\n');
        default:
          throw new Error(`'Unknown ${item.type}'`);
      }
    });
    const text = stringifyData.join('\n');
    return text;
  };
  return `{\n${stylish(data)}\n}`;
};

export default getStylish;
