const emoji = require('node-emoji');
const chalk = require('chalk');

const link = emoji.get('link');
const soon = emoji.get('soon');
const back = emoji.get('back');

/**
 * console when entered a page
 * 
 * @param {object} data 
 */
function enterPageConsole (data) {
  data = data || {};
  console.log(`${link}  Entered page: ${chalk.bold.blue(data.title)}`);
}

/**
 * console when ajax request happened
 * 
 * @param {object} data 
 */
function reqConsole (data) {
  data = data || {};
  console.log(`${soon}  ${chalk.bold.blue(data.functionCode)} ajax ${chalk.bold('REQUEST')} is: `);
  console.log(` url: ${chalk.green(data.url)}`);
}

/**
 * console when ajax response happened
 * 
 * @param {object} data 
 */
function resConsole (data) {
  data = data || {};
  console.log(`${back}  ${chalk.bold.blue(data.functionCode)} ajax ${chalk.bold('RESPONSE')} is: `);
  console.log(` response status: ${chalk.green(data.status)}`);
  console.log(` response data code: ${chalk.green(data.code)}`);
  console.log(` response data message: ${chalk.green(data.message)}`);
}


