/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    verbose: true,
    preset: 'jest-playwright-preset',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testRunner: 'jasmine2',
    setupFilesAfterEnv: ["jest-allure/dist/setup"],
    testMatch: [
        // 8
        "<rootDir>/tests/login/authpopup.test.ts",
        "<rootDir>/tests/faqPage/openTab.test.ts",
        "<rootDir>/tests/faqPage/searchByText.test.ts",
    ],
    bail: true,
    bail: 1,
    "testTimeout": 25000
}