/** @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com> */

const moo = require('moo');

/*
  Building individual regexes as strings to make it easier to the eye.
  We then build the final regex by joining them altogether.
  Note: moo doesnt' support the "i" flag for regex!
*/
const j = '(?:[jJ]|&#[xX]6[aA];?)';
const a = '(?:[aA]|&#[xX]61;?)';
const v = '(?:[vV]|&#[xX]76;?)';
const s = '(?:[sS]|&#[xX]73;?)';
const c = '(?:[cC]|&#[xX]63;?)';
const r = '(?:[rR]|&#[xX]72;?)';
const i = '(?:[iI]|&#[xX]69;?)';
const p = '(?:[pP]|&#[xX]70;?)';
const t = '(?:[tT]|&#[xX]74;?)';
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
