import getStylish from './stylish';
import getPlain from './plain';

const formatting = (data, format) => {
  switch (format) {
    case 'stylish':
      return `{\n${getStylish(data)}\n}`;
    case 'plain':
      return getPlain(data);
    default:
      throw new Error(`Unknown ${format}.`);
  }
};

export default formatting;
