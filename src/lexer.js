/** @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com> */

const moo = require('moo');

/*
  Building individual regexes as strings to make it easier to the eye.
  We then build the final regex by joining them altogether.
*/
const js_protocol_re_builder =
  () =>
    { const j = '(?:[jJ]|&#[xX]6[aA];?)';
      const a = '(?:[aA]|&#[xX]61;?)';
      const v = '(?:[vV]|&#[xX]76;?)';
      const s = '(?:[sS]|&#[xX]73;?)';
      const c = '(?:[cC]|&#[xX]63;?)';
      const r = '(?:[rR]|&#[xX]72;?)';
      const i = '(?:[iI]|&#[xX]69;?)';
      const p = '(?:[pP]|&#[xX]70;?)';
      const t = '(?:[tT]|&#[xX]74;?)';
      const proto_end = ':';
      const ws = '(?:&#13;?|&#0+9;?)*'; // whitespaces
      return new RegExp(j+ws+a+ws+v+ws+a+ws+s+ws+c+ws+r+ws+i+ws+p+ws+t+ws+proto_end);
    };

module.exports =
  // remember that `moo` doesn't support the `i` flag for regular expression!
  moo.compile
    ( { js_protocol:
          { match: js_protocol_re_builder()
          , value: () => 'javascript:'
          }
      , any: /.+/
      }
    );
