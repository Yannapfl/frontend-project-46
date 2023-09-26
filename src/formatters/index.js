import getStylish from './stylish.js';
import getPlain from './plain.js';

const formatting = (data, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(data);
    case 'plain':
      return getPlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown ${format}.`);
  }
};

export default formatting;
