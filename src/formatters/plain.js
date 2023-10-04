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

const getPlain = (data) => {
  const plain = (content, path = '') => {
    const plainedArr = content.map((item) => {
      switch (item.type) {
        case 'nested':
          return plain(item.children, (`${path}${item.key}.`));
        case 'equal':
          return null;
        case 'added':
          return `Property '${path}${item.key}' was added with value: ${stringify(item.value)}`;
        case 'deleted':
          return `Property '${path}${item.key}' was removed`;
        case 'updated':
          return `Property '${path}${item.key}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        default:
          throw new Error(`Unknown ${item.type}.`);
      }
    });
    const filteredArr = plainedArr.filter((item) => item !== null);
    const text = filteredArr.join('\n');
    return text;
  };
  return plain(data);
};

export default getPlain;
