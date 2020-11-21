const assert = require('assert').strict;
const scan = require('../src/index.js');

module.exports.save_untrusted_data = function (untrusted_data) {
  this.untrusted_data = untrusted_data;
};

module.exports.inject_html = async function (html) {
  await this.page.setContent(html);
};

module.exports.click_id = async function (id) {
  const el = await this.page.$(`#${id}`);
  await el.click();
};

module.exports.assert_dialog_message = async function (expected) {
  // This abitrary wait is a hack but I haven't found a cleaner way
  // to wait until a dialog window has appeared... Suggestion welcome!
  await new Promise((res) => { setTimeout(res, 500) });
  const msg = this.dialog.message();
  await this.dialog.dismiss();
  this.dialog = null;
  assert.strictEqual(msg, expected);
};

module.exports.threat_scan = function () {
  this.scan_result = scan(this.untrusted_data);
};

module.exports.assert_threat = function (threat) {
  assert(this.scan_result !== false, `Expected a threat but none was detected.`);
  assert(this.scan_result.threat === threat, `Expected threat '${threat} but got '${this.scan_result.threat}' instead.`);
};
