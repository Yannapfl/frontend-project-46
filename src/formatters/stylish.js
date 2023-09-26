import _ from 'lodash';

const countOpeningSpace = 4;
const defendSpace = 2;

const setObjForStylish = (content) => {
  const keys = Object.keys(content);
  const result = keys.map((key) => {
    if (_.isObject(content[key])) {
      return { type: 'nested', key, children: setObjForStylish(content[key]) };
    }
    return { type: 'equal', key, value: content[key] };
  });
  return result;
};

const checkObject = (value, depth) => {
  let depth1 = depth;
  if (_.isObject(value)) {
    depth1 += 1;
    const children = setObjForStylish(value);
    const textObject = `{\n${stringify(children, depth1)}\n${' '.repeat(depth1 * countOpeningSpace)}}`;
    depth1 = depth;
    return textObject;
  }
  return value;
};

const stringify = (data, depth = 0) => {
  let depth1 = depth;
  const newArr = data.map((item) => {
    if (item.type === 'nested') {
      const firstDepth = depth;
      depth1 += 1;
      const line = `${' '.repeat(defendSpace + firstDepth * countOpeningSpace)}  ${item.key}: {\n${stringify(item.children, depth1)}\n${' '.repeat(depth1 * countOpeningSpace)}}`;
      depth1 = firstDepth;
      return line;
    }
    switch (item.type) {
      case 'equal':
        return `${' '.repeat(defendSpace + depth1 * countOpeningSpace)}  ${item.key}: ${checkObject(item.value, depth1)}`;
      case 'added':
        return `${' '.repeat(defendSpace + depth1 * countOpeningSpace)}+ ${item.key}: ${checkObject(item.value, depth1)}`;
      case 'deleted':
        return `${' '.repeat(defendSpace + depth1 * countOpeningSpace)}- ${item.key}: ${checkObject(item.value, depth1)}`;
      case 'updated':
        return `${' '.repeat(defendSpace + depth1 * countOpeningSpace)}- ${item.key}: ${checkObject(item.value1, depth1)}\n${' '.repeat(defendSpace + depth1 * countOpeningSpace)}+ ${item.key}: ${checkObject(item.value2, depth1)}`;
      default:
        throw new Error(`'Unknown ${item.type}'`);
    }
  });
  const text = newArr.join('\n');
  return text;
};

const getStylish = (data) => `{\n${stringify(data)}\n}`;

export default getStylish;
