/** @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com> */

const moo = require('moo');

/*
  Building individual regexes as strings to make it easier to the eye.
  We then build the final regex by joining them altogether.
  Note: moo doesnt' support the "i" flag for regex!
*/
const j = '(?:j|J)';
const a = '(?:a|A)';
const v = '(?:v|V)';
const s = '(?:s|S)';
const c = '(?:c|C)';
const r = '(?:r|R)';
const i = '(?:i|I)';
const p = '(?:p|P)';
const t = '(?:t|T)';
const proto_end = ':';

module.exports =
  moo.compile
  ( { js_protocol:
        { match: new RegExp(j+a+v+a+s+c+r+i+p+t+proto_end)
        , value: () => 'javascript:'
        }
    , any: /.+/
    }
    );
