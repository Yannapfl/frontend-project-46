import _ from 'lodash';

const comparing = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const comparisons = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { type: 'nested', key, children: comparing(data1[key], data2[key]) };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { type: 'equal', key, value: data1[key] };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      return {
        type: 'updated', key, value1: data1[key], value2: data2[key],
      };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { type: 'deleted', key, value: data1[key] };
    }
    return { type: 'added', key, value: data2[key] };
  });
  return comparisons;
};

export default comparing;
