const stringify = (value) => {
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
  const filteredArr = arr.filter((item) => item.type !== 'equal');
  const newArr = filteredArr.map((item) => {
    if (item.type === 'nested') {
      const firstPath = path;
      path1 += `${item.key}.`;
      const line = getPlain(item.children, path1);
      path1 = firstPath;
      return line;
    }
    switch (item.type) {
      case 'added':
        return `Property '${path1}${item.key}' was added with value: ${stringify(item.value)}`;
      case 'deleted':
        return `Property '${path}${item.key}' was removed`;
      case 'updated':
        return `Property '${path}${item.key}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
      default:
        throw new Error(`Unknown ${item.type}.`);
    }
  });
  const text = newArr.join('\n');
  return text;
};

export default getPlain;
