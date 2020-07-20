src/grammar.js: src/grammar.ne src/lexer.js
	yarn -s nearleyc src/grammar.ne > $@