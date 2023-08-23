install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

npm ci:
	install-deps

test-coverage:
	npm test -- --coverage --coverageProvider=v8