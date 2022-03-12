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
        // 38
        // "<rootDir>/tests/login/authpopup.test.ts",
        // "<rootDir>/tests/faqPage/**.test.ts",
        // "<rootDir>/tests/feedbackPage/**.test.ts",
        // "<rootDir>/tests/landing/**.test.ts",
        // "<rootDir>/tests/login/login.test.ts",
        // "<rootDir>/tests/personalData/popupWithLawsInfo.test.ts"

        // "<rootDir>/tests/02_phoneValidation/navigation.test.ts"
        // "<rootDir>/tests/personalData/navigation.test.ts"
        "<rootDir>/tests/03_checkOnlineRegistration/navigation.test.ts"
        // "<rootDir>/tests/enterPassportData/navigation.test.ts"
    ],
    bail: true,
    bail: 1,
    "testTimeout": 40000
}