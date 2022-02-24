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
        "<rootDir>/tests/faqPage/openTab.test.ts"
    ],
    // bail: true, // пропуск 1 упавшего теста
    // bail: 1,
    "testTimeout": 25000
}