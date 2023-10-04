import _ from 'lodash';

const countOpeningSpace = 4;
const defendSpace = 2;
const setInitialSpaces = (depth) => ' '.repeat(defendSpace + depth * countOpeningSpace);
const setClosingSpaces = (depth) => ' '.repeat(depth * countOpeningSpace);

const stringify = (value, depth) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const stringifyObject = keys.map((key) => `${(setInitialSpaces(depth + 1))}  ${key}: ${stringify(value[key], depth + 1)}`);
    return `{\n${stringifyObject.join('\n')}\n${setClosingSpaces(depth + 1)}}`;
  }
  return value;
};

const getStylish = (data) => {
  const stylish = (content, depth = 0) => {
    const stringifyData = content.map((item) => {
      switch (item.type) {
        case 'nested':
          return `${setInitialSpaces(depth)}  ${item.key}: {\n${stylish(item.children, depth + 1)}\n${setClosingSpaces(depth + 1)}}`;
        case 'equal':
          return `${setInitialSpaces(depth)}  ${item.key}: ${stringify(item.value, depth)}`;
        case 'added':
          return `${setInitialSpaces(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;
        case 'deleted':
          return `${setInitialSpaces(depth)}- ${item.key}: ${stringify(item.value, depth)}`;
        case 'updated':
          return [`${setInitialSpaces(depth)}- ${item.key}: ${stringify(item.value1, depth)}`,
            `${setInitialSpaces(depth)}+ ${item.key}: ${stringify(item.value2, depth)}`].join('\n');
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
