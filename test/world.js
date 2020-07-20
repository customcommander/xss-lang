const puppeteer = require('puppeteer-core');

module.exports = function () {
  // empty on purpose
};

module.exports.init = async function () {
  this.browser = await puppeteer.connect({browserWSEndpoint: `ws://chrome:3000/`});
  this.page = await this.browser.newPage();
  this.page.on('dialog', dialog => {
    this.dialog = dialog;
  });
};

module.exports.destroy = async function () {
  await this.browser.close();
};
