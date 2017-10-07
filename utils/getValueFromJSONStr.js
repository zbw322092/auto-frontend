function getValueFromJSONStr(str, prop) {
  let result;
  function loop (str, prop) {
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
        return;
    }

    for (let k in json) {
      if (json.hasOwnProperty(k)) {
        if (k === prop) {
          return result = json[prop];
        } else if (json[k] instanceof Object) {
          loop(json[k], prop);
        }
      }
    }

  }
  
  loop(str, prop);

  return result;
}

module.exports = getValueFromJSONStr;