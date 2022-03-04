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
        // 28
        "<rootDir>/tests/login/authpopup.test.ts",
        "<rootDir>/tests/faqPage/openTab.test.ts",
        "<rootDir>/tests/faqPage/searchByText.test.ts",
        "<rootDir>/tests/feedbackPage/**.test.ts",
        "<rootDir>/tests/landing/navigation.test.ts",
        "<rootDir>/tests/login/login.test.ts",

        //"<rootDir>/tests/faqPage/navigation.test.ts",
    ],
    bail: true,
    bail: 1,
    "testTimeout": 25000
}