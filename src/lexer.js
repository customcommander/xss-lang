/** @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com> */

const moo = require('moo');

module.exports =
  moo.compile
  ( { js_protocol:
        { match: /[jJ][aA][vV][aA][sS][cC][rR][iI][pP][tT][:]/
        , value: () => 'javascript:'
        }
    , any: /.+/
    }
    );
