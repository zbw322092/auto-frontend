function getValueFromJSONStr (str, prop) {
  let json;
  let type = Object.prototype.toString.call(str);
  switch (type) {
    case '[object String]':
      json = JSON.parse(str);
      break;
    case '[object Object]':
      json = str;
      break;
    default:
      throw new Error('Unexpected data type');
  }
  for (let k in json) {
    if (json.hasOwnProperty(k)) {
      if (k === prop) {
        return json[prop];
      } else if (json[k] instanceof Object) {
        return getValueFromJSONStr(json[k], prop);
      }
    }
  }

  return null;
};

module.exports = getValueFromJSONStr;