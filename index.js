const puppeteer = require('puppeteer');
const chalk = require('chalk');

const ajaxListener = require('./shared/ajaxListener.js');

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


