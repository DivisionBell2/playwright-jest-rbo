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
        // 32
        "<rootDir>/tests/login/authpopup.test.ts",
        "<rootDir>/tests/faqPage/**.test.ts",
        "<rootDir>/tests/feedbackPage/**.test.ts",
        "<rootDir>/tests/landing/navigation.test.ts",
        "<rootDir>/tests/login/login.test.ts",

        // "<rootDir>/tests/phoneValidation/navigation.test.ts",
        // "<rootDir>/tests/landing/supportMenu.test.ts"
    ],
    bail: true,
    bail: 1,
    "testTimeout": 30000
}