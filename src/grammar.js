// Generated automatically by nearley, version 2.19.5
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
 const lexer = require('./lexer.js'); var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "xss$subexpression$1", "symbols": ["js_url"]},
    {"name": "xss$subexpression$1", "symbols": ["none"]},
    {"name": "xss", "symbols": ["xss$subexpression$1"], "postprocess": ([[found]]) => found},
    {"name": "none", "symbols": [(lexer.has("any") ? {type: "any"} : any)], "postprocess": () => ({ threat: 'none' })},
    {"name": "js_url", "symbols": [(lexer.has("js_protocol") ? {type: "js_protocol"} : js_protocol), (lexer.has("any") ? {type: "any"} : any)], "postprocess":  ([protocol, js]) => ({ threat: 'js_url'
        , found: protocol.value + js.value
        , raw: protocol.text + js.text
        })  }
]
  , ParserStart: "xss"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
