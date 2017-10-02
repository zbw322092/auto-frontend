const chalk = require('chalk');

const getValueFromJSONStr = require('../utils/getValueFromJSONStr.js');
const prettyJSON = require('../utils/prettyJSON.js');
const ajaxEmitter = require('./ajaxEventEmitter.js');
const { reqValid, reqInvalid, resValid, resInvalid } = require('./console.js');

function schemaValidator(validator, funcCode) {
  ajaxEmitter.on('reqData', (data) => {
    let param = getValueFromJSONStr(data, 'param');
    let functionCode = getValueFromJSONStr(data, 'functionCode');
    if (funcCode !== functionCode) return;
    if (validator.req(param)) {
      reqValid({ functionCode });
    } else {
      let error = validator.req.errors[0];
      reqInvalid({ functionCode, error });
    }
  });
  
  ajaxEmitter.on('resData', (data, extraData) => {
    let functionCode = extraData['functionCode'];
    let valid = validator.res(data['data']);
    if (funcCode !== functionCode) return;
    if (valid) {
      resValid({ functionCode });
    } else {
      let error = validator.res.errors[0];
      resInvalid({ functionCode, error });
    }
  });
}

module.exports = schemaValidator;