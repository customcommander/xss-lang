# @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>

@{% const lexer = require('./lexer.js'); %}
@lexer lexer

xss ->
  (js_url | none)
  {% ([[found]]) => found %}

none ->
  %any
  {% () => ({ threat: 'none' }) %}

js_url ->
  %js_protocol %any
  {% ([protocol, js]) => ({ threat: 'js_url'
                          , found: protocol.value + js.value
                          , raw: protocol.text + js.text
                          })  %}
