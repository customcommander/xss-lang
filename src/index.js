/** @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com> */

const nearley = require('nearley');
const grammar = require('./grammar.js');
const {version} = require('../package.json');

const AMBIGUOUS_GRAMMAR =
`A message from your xss-lang parser v${version}:

Sorry but I seem unable to make sense of this text.
Please consider submitting an issue:

https://github.com/customcommander/xss-lang/issues
`;

const NO_THREAT =
`A message from your xss-lang parser v${version}:

I didn't find any threat.
If there was one and I missed it please consider submitting an issue:

https://github.com/customcommander/xss-lang/issues
`;

module.exports = (text, opts = {}) => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  parser.feed(text);

  if (parser.results.length > 1) {
    throw new Error(AMBIGUOUS_GRAMMAR);
  }

  const res = parser.results[0];

  if (opts.debug === true && res.threat === 'none') {
    console.log(NO_THREAT);
    return false;
  }

  return res;
};
