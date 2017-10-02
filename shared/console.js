const emoji = require('node-emoji');
const chalk = require('chalk');

const prettyJSON = require('../utils/prettyJSON.js');

const link = emoji.get('link');
const soon = emoji.get('soon');
const back = emoji.get('back');
const whiteCheckMark = emoji.get('white_check_mark');
const errorMark = emoji.get('x');

module.exports = {
  enterPageConsole,
  reqConsole,
  resConsole,
  reqValid,
  reqInvalid,
  resValid,
  resInvalid
};

/**
 * console log a new line
 */
function newLine () {
  console.log('\n');
}

/**
 * console log when entered a page
 * 
 * @param {object} data 
 */
function enterPageConsole (data) {
  data = data || {};
  let { title } = data;

  console.log(`${link}  Entered page: ${chalk.bold.blue(title)}`);
  newLine();
}

/**
 * console log when ajax request happened
 * 
 * @param {object} data 
 */
function reqConsole (data) {
  data = data || {};
  let { functionCode, url } = data;

  console.log(`${soon}  ${chalk.bold.blue(functionCode)} ajax ${chalk.bold('REQUEST')} is: `);
  console.log(` url: ${chalk.green(url)}`);
  newLine();
}

/**
 * console log when ajax response happened
 * 
 * @param {object} data 
 */
function resConsole (data) {
  data = data || {};
  let { functionCode, status, code, message } = data;

  console.log(`${back}  ${chalk.bold.blue(functionCode)} ajax ${chalk.bold('RESPONSE')} is: `);
  console.log(` response status: ${chalk.green(status)}`);
  console.log(` response data code: ${chalk.green(code)}`);
  console.log(` response data message: ${chalk.green(message)}`);
  newLine();
}

/**
 * console log when request params are valid
 * 
 * @param {object} data 
 */
function reqValid (data) {
  data = data || {};
  let { functionCode } = data;

  console.log(`${whiteCheckMark}  ${chalk.bold.blue(functionCode)} ${chalk.bold('REQUEST')} is: ${chalk.green('valid')}`);
  newLine();
}

/**
 * console log when request params are invalid
 * 
 * @param {object} data 
 */
function reqInvalid (data) {
  data = data || {};
  let { functionCode, error } = data;

  console.log(`${errorMark}  ${chalk.bold.blue(functionCode)} ${chalk.bold('REQUEST')} is: ${chalk.red('invalid')}`);
  console.log(`Invalid reason: \n${prettyJSON(error)}`);
  newLine();
}


/**
 * console log when response params are valid
 * 
 * @param {object} data 
 */
function resValid (data) {
  data = data || {};
  let { functionCode } = data;

  console.log(`${whiteCheckMark}  ${chalk.bold.blue(functionCode)} ${chalk.bold('RESPONSE')} is: ${chalk.green('valid')}`);
  newLine();
}

/**
 * console log when response params are invalid
 * 
 * @param {object} data 
 */
function resInvalid (data) {
  data = data || {};
  let { functionCode, error } = data;

  console.log(`${errorMark}  ${chalk.bold.blue(functionCode)} ${chalk.bold('REQUEST')} is: ${chalk.red('invalid')}`);
  console.log(`Invalid reason: \n${prettyJSON(error)}`);
  newLine();
}
