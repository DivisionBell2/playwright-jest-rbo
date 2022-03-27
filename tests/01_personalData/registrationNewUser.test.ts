import User from "../../data/user";
import EnterPersonalDataPage from "../../pages/enterPersonalData.page";

let personalDataPage = new EnterPersonalDataPage();
const paths = [
    personalDataPage.paths.entrepreneur,
    personalDataPage.paths.legalEntity,
];

paths.forEach(path => {
    describe("Navigation tests for personal data page", () => {
        let user: User;
        
        beforeEach(async () => {
            user = new User();
            await personalDataPage.goto(path, "Open personal data page for " + path);
            await personalDataPage.fill(personalDataPage.selectors.lastNameInput, user.username, "Enter last name on personal data page");
            await personalDataPage.fill(personalDataPage.selectors.firstNameInput, user.username, "Enter first name on personal data page");
            await personalDataPage.fill(personalDataPage.selectors.email, user.email, "Enter email on personal data page");
            await personalDataPage.click(personalDataPage.selectors.personalDataCheckbox, "Click on agreements of personal data checkbox");
            
        });

        test('Registration new user', async () => {
            await personalDataPage.fill(personalDataPage.selectors.middleNameInput, user.username, "Enter middle name on personal data page");
            await personalDataPage.click(personalDataPage.selectors.sendPasswordBUtton, "Click on send password button");
            expect(await personalDataPage.isVisible(personalDataPage.selectors.emailCodeInput, "Check visibility of email code input")).toBeTruthy();
        });

        test('Registration new user without middle name', async () => {
            await personalDataPage.click(personalDataPage.selectors.noMiddleNameCheckbox, "Click on no middle name checkbox");
            await personalDataPage.click(personalDataPage.selectors.sendPasswordBUtton, "Click on send password button");
            expect(await personalDataPage.isVisible(personalDataPage.selectors.emailCodeInput, "Check visibility of email code input")).toBeTruthy();
            expect(await personalDataPage.isVisible(personalDataPage.selectors.noMiddleNameText, "Check visibility of no middle name text")).toBeTruthy();
        });

        afterAll(async () => {
            await personalDataPage.clear();
            await personalDataPage.reload("Reload personal data page");
        });
    });
});