import _ from 'lodash';

const countOpeningSpace = 4;
const defendSpace = 2;

const getObjForStylish = (obj) => {
  const keys = Object.keys(obj);
  const arr = keys.map((key) => {
    if (_.isObject(obj[key])) {
      return { status: 'nested', key, children: getObjForStylish(obj[key]) };
    }
    return { status: 'equal', key, value: obj[key] };
  });
  return arr;
};

const getStylish = (arr, depth = 0) => {
  let depth1 = depth;
  const newArr = arr.map((item) => {
    if (item.status === 'nested') {
      const firstDepth = depth;
      depth1 += 1;
      const line = `${' '.repeat(defendSpace + firstDepth * countOpeningSpace)}  ${item.key}: {\n${getStylish(item.children, depth1)}\n${' '.repeat(depth1 * countOpeningSpace)}}`;
      depth1 = firstDepth;
      return line;
    }
    if (item.status === 'equal') {
      return `${' '.repeat(defendSpace + depth1 * countOpeningSpace)}  ${item.key}: ${item.value}`;
    }

    if (_.isObject(item.value)) {
      const firstDepth = depth1;
      depth1 += 1;
      const children = getObjForStylish(item.value);
      const textObject = `${' '.repeat(defendSpace + firstDepth * countOpeningSpace)}${item.status} ${item.key}: {\n${getStylish(children, depth1)}\n${' '.repeat(depth1 * countOpeningSpace)}}`;
      depth1 = firstDepth;
      return textObject;
    }
    return `${' '.repeat(defendSpace + depth1 * countOpeningSpace)}${item.status} ${item.key}: ${item.value}`;
  });
  const text = newArr.join('\n');
  return text;
};

export default getStylish;
