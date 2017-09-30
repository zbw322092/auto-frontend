const prettyjson = require('prettyjson');
const merge = require('lodash/merge');

function prettyJSON (data, options) {
  let type = Object.prototype.toString.call(data);
  switch (type) {
    case '[object String]':
      return prettyjson.renderString(data, merge({
        keysColor: 'black',
        stringColor: 'green',
        indent: 2
      }, options));
      break;
    case '[object Object]':
      return prettyjson.render(data, merge({
        keysColor: 'black',
        stringColor: 'green',
        indent: 2
      }, options));
      break;
    default:
      throw new Error('Unexpected data type');
  }
};

module.exports = prettyJSON;