const puppeteer = require('puppeteer');
const chalk = require('chalk');

const getValueFromJSONStr = require('./utils/getValueFromJSONStr.js');

puppeteer.launch({
  executablePath: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
}).then(async browser => {
  const page = await browser.newPage();

  ajaxListener(page);

  await page.goto('your_url');

  const buttons = await page.$('.purchase-btn');

  await buttons.click();

  await page.screenshot({
    path: './screenshots/view.png',
    fullPage: true
  });

  // other actions...
  await browser.close();
});

function ajaxListener (page) {

  page.on('request', (req) => {
    if (req.resourceType === 'XHR') {
      console.log(chalk.bgBlueBright('Your ajax request is: '));
      console.log(' request url: ', chalk.green(req.url));
      console.log(' request data function code: ', chalk.green(getValueFromJSONStr(req.postData, 'functionCode')) );
      console.log(' request data: ', chalk.green(req.postData));
    }
  });

	page.on('response', response => {
    const req = response.request(); 
    if (req.resourceType === 'XHR') {
      response.json().then((json) => {
        resData = json.data;
      });
    }
  });
}
