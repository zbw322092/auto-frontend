const EventEmitter = require('events');

class AjaxEmitter extends EventEmitter {};
const ajaxEmitter = new AjaxEmitter();

ajaxEmitter.on('uncaughtException', (err) => {
  console.log(`some error happened: ${err}`);
});

module.exports = ajaxEmitter;