# playwright-jest-rbo

**Purpose**

Here are autotests that check the operation of the business registration service

**Using technologies**
- typescript as main programming language
- playwright as testing library
- jest as main framework for automation testing
- allure for reporting

**Requirements**

NodeJS 12 or later on the machine

**How to use**

1. Download
2. Execute `npm i` in project directory
3. Insert correct url in `data/url.json` (Removed due to security requirements)
4. Execute tests by `npm run test`
5. Generate a report by `allure serve`

**Структура**

- `data` - here located the main non-changeable test data data
- `pages` - here located the information about web pages and blocks (for example, header, footer, e.t.c.), including selectors and methods that serve page functional
- `tests` - The location of the autotests, sorted by functionality. Tests from the sampleExamples folder are experiments and do not participate in the main test run
- `utils` - The location of the classes serving the tests
- `jest-playwright.config.js, jest.config.js, package.json` - Files that manage dependencies and framework settings.