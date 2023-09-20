import _ from 'lodash';

const filterEqual = (arr) => {
  const result = arr.filter((item) => item.status !== 'equal');
  return result;
};

const makeStatusUpdate = (arr, iter = '') => {
  const changeStatus = arr.map((item) => {
    if (_.has(item, 'plain')) {
      if ((item.status === '-')) {
        item.status = 'delete';
        item.plain = false;
        iter = item.value;
        return item;
      }
      item.status = 'updated';
      item.object = { value1: iter, value2: item.value };
      delete item.plain;
      iter = '';
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
  const arrWithoutEqual = filterEqual(arr);
  const arrForPlain = makeStatusUpdate(arrWithoutEqual);
  const filteredArr = arrForPlain.filter((item) => !_.has(item, 'plain'));
  const newArr = filteredArr.map((item) => {
    if (item.status === 'nested') {
      const firstPath = path;
      path += `${item.key}.`;
      const line = getPlain(item.children, path);
      path = firstPath;
      return line;
    }
    if (item.status === '+') {
      const value = formatingValue(item.value);
      return `Property '${path}${item.key}' was added with value: ${value}`;
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
