MOCHA=node_modules/.bin/mocha -u qunit -c --ignore-leaks -t 110000 test/runner.js
CLEAR=node test/clear.js

test:
	$(MOCHA) -R spec
	$(CLEAR)

md:
	$(MOCHA) -R Markdown > test/results/test.md
	$(CLEAR)

html:
	$(MOCHA) -R HTML > test/results/test.html
	$(CLEAR)

cov:
	rm -rf src-cov
	jscoverage src src-cov

html-cov:
	make cov
	@MP_COV=1 $(MOCHA) -R html-cov > test/results/coverage.html
	$(CLEAR)

json-cov:
	make cov
	@MP_COV=1 $(MOCHA) -R json-cov > test/results/coverage.json
	$(CLEAR)


.PHONY: test html-cov json-cov md html