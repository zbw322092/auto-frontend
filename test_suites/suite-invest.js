const ajaxEmitter = require('../shared/ajaxEventEmitter.js');
const { crowdInvest } = require('../_private/entries.js');

async function investSuite(page) {

  ajaxEmitter.on('reqData', (data) => {
    console.log('I get your request data: ', data);
  });

  ajaxEmitter.on('resData', (data) => {
    console.log('I get your response data: ', data);
  });

  await page.goto(crowdInvest.local);

  const buttons = await page.$('.purchase-btn');

  await buttons.click();

  await page.screenshot({
    path: './screenshots/view.png',
    fullPage: true
  });
}

module.exports = investSuite;