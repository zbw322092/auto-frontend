module.exports = function waitForAWhile (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve();
    }, ms);
  });
};