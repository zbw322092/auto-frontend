const chalk = require('chalk');

const ajaxEmitter = require('./ajaxEventEmitter.js');
const { reqConsole, resConsole } = require('./console.js');
const getValueFromJSONStr = require('../utils/getValueFromJSONStr.js');
const prettyJSON = require('../utils/prettyJSON.js');

function ajaxListener(page) {

  page.on('request', (req) => {
    if (req.resourceType === 'XHR') {

      let functionCode = getValueFromJSONStr(req.postData, 'functionCode');
      let reqUrl = req.url;

      reqConsole({
        functionCode: functionCode,
        url: reqUrl
      });

      ajaxEmitter.emit('reqData', req.postData);
    }
  });

  page.on('response', (res) => {
    let request = res.request() || {};
    if (request.resourceType === 'XHR') {

      let functionCode = getValueFromJSONStr(res.request().postData, 'functionCode');
      let status = res.status;

      res.json().then((data) => {
        let code = getValueFromJSONStr(data, 'code');
        let message = getValueFromJSONStr(data, 'message');

        resConsole({ functionCode, status, code, message});

        ajaxEmitter.emit('resData', data, {functionCode});        
      });
    }
  });
}

module.exports = ajaxListener;