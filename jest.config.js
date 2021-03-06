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
        "<rootDir>/tests/login/**.test.ts",
        "<rootDir>/tests/faqPage/**.test.ts",
        "<rootDir>/tests/feedbackPage/**.test.ts",
        "<rootDir>/tests/0_landing/**.test.ts",
        "<rootDir>/tests/login/login.test.ts",
        "<rootDir>/tests/01_personalData/** */.test.ts",
        "<rootDir>/tests/02_phoneValidation/**.test.ts",
        "<rootDir>/tests/03_checkOnlineRegistration/**.test.ts",
        "<rootDir>/tests/05_enterPassportData/**.test.ts",
        "<rootDir>/tests/navigationMenu/**.test.ts"

    ],
    "testTimeout": 40000
}