test:
	./node_modules/.bin/mocha -u qunit -c -R dot --ignore-leaks

.PHONY: test