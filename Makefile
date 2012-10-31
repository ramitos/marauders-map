test:
	./node_modules/.bin/mocha -u qunit -c -R spec --ignore-leaks -t 110000 test/runner.js
	node test/clear.js

clear:
	node test/clear.js

.PHONY: test clear