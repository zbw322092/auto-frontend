const { enterPageConsole } = require('../shared/console.js');
const schemaValidator = require('../shared/schemaValidator.js');
const validCfGearDetail = require('../schema/invest/schema-cfGearDetail.js');
const validCfGearChoice = require('../schema/invest/schema-cfGearChoice.js');

const waitForAWhile = require('../utils/waitForAWhile.js');

const { crowdInvest } = require('../_private/entries.js');

async function investSuite(page) {

  schemaValidator(validCfGearDetail, 'cf_gear_detail');
  schemaValidator(validCfGearChoice, 'cf_gear_choice');

  enterPageConsole({ title: 'Invest Grade Select' });
  await page.goto(crowdInvest.local);

  const buttons = await page.$("button[class = 'purchase-btn ng-scope']");

  await buttons.click();

  await page.waitForSelector("button[class = 'right-part']", { visible: true });
  
  // Bottomup dialog totally show up after arount 500ms animation, 
  // before this bottomup totally show up, we cannot click the bottom on it, 
  // so we add waitForAWhile util to solve this problem.
  await waitForAWhile(600);
  
  const btn = await page.$("button[class = 'right-part']");
  await btn.click("button[class = 'right-part']");
  await page.screenshot({
    path: './screenshots/view2.png',
    fullPage: true
  });

}

module.exports = investSuite;
