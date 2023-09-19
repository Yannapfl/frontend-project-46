import _ from 'lodash';

const getKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);
  return sortedKeys;
};
const comparing = (file1, file2) => {
  const keys = getKeys(file1, file2);
  const comparisons = keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { status: 'nested', key, children: comparing(file1[key], file2[key]) };
    }
    if (_.isEqual(file1[key], file2[key])) {
      return { status: 'equal', key, value: file1[key] };
    }
    if (_.has(file1, key) && _.has(file2, key)) {
      return [{ status: '-', key, value: file1[key] }, { status: '+', key, value: file2[key] }];
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      return { status: '-', key, value: file1[key] };
    }
    return { status: '+', key, value: file2[key] };
  });

  return comparisons.flat(1);
};

export default comparing;
