const chalk = require('chalk');
var Ajv = require('ajv');

const getValueFromJSONStr = require('../utils/getValueFromJSONStr.js');
const ajaxEmitter = require('../shared/ajaxEventEmitter.js');
const validCfGearDetail = require('../schema/invest/schema-cfGearDetail.js');

const { crowdInvest } = require('../_private/entries.js');

async function investSuite(page) {

  ajaxEmitter.on('reqData', (data) => {
    let param = getValueFromJSONStr(data, 'param');
    let functionCode = getValueFromJSONStr(data, 'functionCode');
    if (validCfGearDetail.req(param)) {
      console.log(`${chalk.bold(functionCode)} request is ${chalk.green('valid')}`);
    } else {
      console.log(`${chalk.bold(functionCode)} request is ${chalk.red('invalid')}`);
    }
  });

  ajaxEmitter.on('resData', (data, extraData) => {
    let functionCode = extraData['functionCode'];
    let valid = validCfGearDetail.res(data['data']);
    if (valid) {
      console.log(`${chalk.bold(functionCode)} response is ${chalk.green('valid')}`);
    } else {
      console.log('validCfGearDetail.res.errors: ', validCfGearDetail.res.errors);
      console.log(`${chalk.bold(functionCode)} response is ${chalk.red('invalid')}`);
    }
  });

  await page.goto(crowdInvest.local);

  const buttons = await page.$('.purchase-btn');

  // await buttons.click();

  await page.screenshot({
    path: './screenshots/view.png',
    fullPage: true
  });
}

module.exports = investSuite;
