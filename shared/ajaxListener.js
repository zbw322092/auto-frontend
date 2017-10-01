const chalk = require('chalk');

const ajaxEmitter = require('./ajaxEventEmitter.js');
const getValueFromJSONStr = require('../utils/getValueFromJSONStr.js');
const prettyJSON = require('../utils/prettyJSON.js');

function ajaxListener(page) {

  page.on('request', (req) => {
    if (req.resourceType === 'XHR') {

      ajaxEmitter.emit('reqData', req.postData);

      let functionCode = getValueFromJSONStr(req.postData, 'functionCode');

      console.log(chalk.bgBlueBright(`${chalk.bold(functionCode)} ajax REQUEST is: `));
      console.log(chalk.bold(' request url: '), chalk.green(req.url));
      console.log(chalk.bold(' request data function code: '), chalk.green(functionCode));
    }
  });

  page.on('response', (res) => {
    let request = res.request() || {};
    if (request.resourceType === 'XHR') {

      let functionCode = getValueFromJSONStr(res.request().postData, 'functionCode');

      console.log(chalk.bgCyanBright(`${chalk.bold(functionCode)} ajax RESPONSE is: `));
      console.log(chalk.bold(' response status: '), chalk.green(res.status));
      res.json().then((data) => {

        ajaxEmitter.emit('resData', data, {functionCode});

        console.log(chalk.bold(' response data code: '), chalk.green(getValueFromJSONStr(data, 'code')));
        console.log(chalk.bold(' response message: '), chalk.green(getValueFromJSONStr(data, 'message')));
      });
    }
  });
}

module.exports = ajaxListener;