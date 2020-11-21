const { setWorldConstructor
      , setDefaultTimeout
      , Before
      , After
      , defineStep
      } = require('cucumber');
const world = require('./world.js');
const steps = require('./steps.js');

setDefaultTimeout(5 * 1000);
setWorldConstructor(world);
Before(world.init);
After(world.destroy);

defineStep('I have this untrusted data', steps.save_untrusted_data);
defineStep('my code injects this HTML into the application', steps.inject_html);
defineStep('the user clicks the {word} link', steps.click_id);
defineStep('they will see the message {string}', steps.assert_dialog_message);
defineStep('I scan the untrusted data for potential threats', steps.threat_scan);
defineStep('the {string} threat is detected', steps.assert_threat);
