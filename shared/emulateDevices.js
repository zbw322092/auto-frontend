const devices = require('puppeteer/DeviceDescriptors');

module.exports = async function emulateDevices (page, deviceName) {
  const device = devices[deviceName];
  if (!device) throw new Error(`no device descriptor found: ${deviceName}`);
  await page.emulate(device);
}