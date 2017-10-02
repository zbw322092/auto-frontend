const schemaValidator = require('../shared/schemaValidator.js');
const validCfGearDetail = require('../schema/invest/schema-cfGearDetail.js');
const validCfGearChoice = require('../schema/invest/shema-cfGearChoice.js');

const { crowdInvest } = require('../_private/entries.js');

async function investSuite(page) {

  schemaValidator(validCfGearDetail, 'cf_gear_detail');
  schemaValidator(validCfGearChoice, 'cf_gear_choice');

  await page.goto(crowdInvest.local);

  const buttons = await page.$('.purchase-btn');

  await buttons.click();

  await page.screenshot({
    path: './screenshots/view.png',
    fullPage: true
  });
}

module.exports = investSuite;
