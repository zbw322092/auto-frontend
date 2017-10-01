const chalk = require('chalk');

const getValueFromJSONStr = require('../utils/getValueFromJSONStr.js');
const prettyJSON = require('../utils/prettyJSON.js');
const ajaxEmitter = require('./ajaxEventEmitter.js');

function schemaValidator(validator) {
  ajaxEmitter.on('reqData', (data) => {
    let param = getValueFromJSONStr(data, 'param');
    let functionCode = getValueFromJSONStr(data, 'functionCode');
    if (validator.req(param)) {
      console.log(chalk.bgBlueBright(`${chalk.bold(functionCode)} REQUEST is: `), chalk.green('valid'));
    } else {
      console.log(chalk.bgBlueBright(`${chalk.bold(functionCode)} REQUEST is: `), chalk.red('invalid'));
      console.log('Invalid reason: ', prettyJSON(validator.req.errors[0]));
    }
  });
  
  ajaxEmitter.on('resData', (data, extraData) => {
    let functionCode = extraData['functionCode'];
    let valid = validator.res(data['data']);
    if (valid) {
      console.log(chalk.bgCyanBright(`${chalk.bold(functionCode)} RESPONSE is: `), chalk.green('valid'));
    } else {
      console.log(chalk.bgCyanBright(`${chalk.bold(functionCode)} RESPONSE is: `), chalk.red('invalid'));
      console.log('Invalid reason: ', prettyJSON(validator.res.errors[0]));
    }
  });
}

module.exports = schemaValidator;