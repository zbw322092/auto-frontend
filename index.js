const puppeteer = require('puppeteer');
const chalk = require('chalk');

const ajaxEmitter = require('./shared/ajaxEventEmitter.js');

const getValueFromJSONStr = require('./utils/getValueFromJSONStr.js');
const prettyJSON = require('./utils/prettyJSON.js');

const investSuite = require('./test_suites/suite-invest.js');

puppeteer.launch({
  executablePath: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
}).then(async browser => {
  const page = await browser.newPage();

  ajaxListener(page);

  await investSuite(page);

  // other actions...
  await browser.close();
});

function ajaxListener (page) {

  page.on('request', (req) => {
    if (req.resourceType === 'XHR') {
      
      ajaxEmitter.emit('reqData', req.postData);

      console.log(chalk.bgBlueBright('Your ajax REQUEST is: '));
      console.log(chalk.bold(' request url: '), chalk.green(req.url));
      console.log(chalk.bold(' request data function code: '), chalk.green(getValueFromJSONStr(req.postData, 'functionCode')) );
      console.log(chalk.bold(' request data: \n'), prettyJSON(req.postData));
    }
  });

	page.on('response', (res) => {
    let request = res.request() || {};
    if (request.resourceType === 'XHR') {
      console.log(chalk.bgCyanBright('Your ajax RESPONSE is: '));
      console.log(chalk.bold(' response status: '), chalk.green(res.status));
      res.json().then((data) => {

        ajaxEmitter.emit('resData', data);

        console.log(chalk.bold(' response data code: '), chalk.green(getValueFromJSONStr(data, 'code')) );
        console.log(chalk.bold(' response message: '), chalk.green(getValueFromJSONStr(data, 'message')) );
        console.log(chalk.bold(' response data: \n'), prettyJSON(getValueFromJSONStr(data, 'data')) );
      });
    }
  });
}
