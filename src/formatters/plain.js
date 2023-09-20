import _ from 'lodash';

const filterEqual = (data) => {
  const result = data.filter((item) => item.status !== 'equal');
  return result;
};

const makeStatusUpdate = (data, iter = '') => {
  let iter1 = iter;
  const changeStatus = data.map((item) => {
    const item1 = item;
    if (_.has(item1, 'plain')) {
      if ((item1.status === '-')) {
        item1.plain = false;
        iter1 = item1.value;
        return item1;
      }
      item1.status = 'updated';
      item1.object = { value1: iter1, value2: item1.value };
      delete item1.plain;
      iter1 = '';
    }
    return item;
  });
  return changeStatus.flat(1);
};

const formatingValue = (value) => {
  if (value === null) {
    return value;
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  if (typeof (value) === 'object') {
    return '[complex value]';
  }
  return value;
};

const getPlain = (arr, path = '') => {
  let path1 = path;
  const arrWithoutEqual = filterEqual(arr);
  const arrForPlain = makeStatusUpdate(arrWithoutEqual);
  const filteredArr = arrForPlain.filter((item) => !_.has(item, 'plain'));
  const newArr = filteredArr.map((item) => {
    if (item.status === 'nested') {
      const firstPath = path;
      path1 += `${item.key}.`;
      const line = getPlain(item.children, path1);
      path1 = firstPath;
      return line;
    }
    if (item.status === '+') {
      const value = formatingValue(item.value);
      return `Property '${path1}${item.key}' was added with value: ${value}`;
    }
    if (item.status === 'updated') {
      const value1 = formatingValue(item.object.value1);
      const value2 = formatingValue(item.object.value2);
      return `Property '${path}${item.key}' was updated. From ${value1} to ${value2}`;
    }
    return `Property '${path}${item.key}' was removed`;
  });
  const text = newArr.join('\n');
  return text;
};

export default getPlain;
