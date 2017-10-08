const puppeteer = require('puppeteer');
const chalk = require('chalk');

const ajaxListener = require('./shared/ajaxListener.js');
const emulateDevices = require('./shared/emulateDevices.js');

const investSuite = require('./test_suites/suite-invest.js');

puppeteer.launch({
  executablePath: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
}).then(async browser => {
  const page = await browser.newPage();

  emulateDevices(page, 'iPhone 5');

  ajaxListener(page);

  await investSuite(page);

  // other actions...
  await browser.close();
});


