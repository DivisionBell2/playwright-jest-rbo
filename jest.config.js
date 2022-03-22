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
        // 36-55
        // "<rootDir>/tests/login/authpopup.test.ts",
        // "<rootDir>/tests/faqPage/**.test.ts",
        // "<rootDir>/tests/feedbackPage/**.test.ts",
        // "<rootDir>/tests/0_landing/**.test.ts",
        // "<rootDir>/tests/login/login.test.ts",
        // "<rootDir>/tests/01_personalData/** */.test.ts",
        // "<rootDir>/tests/02_phoneValidation/**.test.ts",
        // "<rootDir>/tests/03_checkOnlineRegistration/**.test.ts",

        // "<rootDir>/tests/05_enterPassportData/navigation.test.ts"
    ],
    // bail: true,
    // bail: 1,
    "testTimeout": 40000
}