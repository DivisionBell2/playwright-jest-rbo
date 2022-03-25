import User from "../../data/user";
import MainPage from "../../pages/mainPage.page";
import CheckOnlineRegistrationPage from "../../pages/checkOnlineRegistrationPage.page";
import PassportDataPage from "../../pages/passportDataPage.page";
import PhoneValidationPage from "../../pages/phoneValidationPage.page";
import LeftMenu from "../../pages/blocks/leftMenu";
import EnterPersonalDataPage from "../../pages/enterPersonalData.page";

let phoneValidationPage = new PhoneValidationPage();
const paths = [
    phoneValidationPage.paths.entrepreneur,
    phoneValidationPage.paths.legalEntity,
];

paths.forEach(path => {
    describe("Navigation tests for passport data page", () => {
        let mainPage: MainPage;
        let passportDataPage: PassportDataPage;
        let checkOnlineRegistrationPage: CheckOnlineRegistrationPage;
        let user: User;
        let leftMenu: LeftMenu;
        let enterPersonalDataPage: EnterPersonalDataPage;
        
        beforeAll(async () => {
            passportDataPage = new PassportDataPage();
            mainPage = new MainPage();
            checkOnlineRegistrationPage = new CheckOnlineRegistrationPage();
            leftMenu = new LeftMenu();
            enterPersonalDataPage = new EnterPersonalDataPage();
        });

        beforeEach(async () => {
            user = new User();
            await mainPage.goto("/", "Go to main page");
            await mainPage.clickOnCookieButton();
            await (await mainPage.getAuthPopup()).login(user);
            await phoneValidationPage.goto(path, "Go to phone validation page");
        });

        test("Return to enter personal data page from phone validation page", async () => {
            await leftMenu.click(leftMenu.selectors.enterPersonalPageLink, "Click on personal data page link");
            expect(await enterPersonalDataPage.getTextContent(enterPersonalDataPage.selectors.title, "Get title text from personal data page"))
        .toContain(enterPersonalDataPage.checkData.title);
        });

        test("Return to enter personal data page from check online registration page", async () => {
            await phoneValidationPage.basePhoneValidation("Phone validation");
            await checkOnlineRegistrationPage
            .waitForSelector(checkOnlineRegistrationPage.selectors.noSbolRadio, "Wait for visible SBOL menu on check online validation page");
            await leftMenu.click(leftMenu.selectors.enterPersonalPageLink, "Click on personal data page link");
            expect(await enterPersonalDataPage.getTextContent(enterPersonalDataPage.selectors.title, "Get title text from personal data page"))
        .toContain(enterPersonalDataPage.checkData.title);
        });

        test("Return to phone validation page from check online registration page", async () => {
            await phoneValidationPage.basePhoneValidation("Phone validation");
            await checkOnlineRegistrationPage
            .waitForSelector(checkOnlineRegistrationPage.selectors.noSbolRadio, "Wait for visible SBOL menu on check online validation page");
            await leftMenu.click(leftMenu.selectors.phoneValidationPageLink, "Click on phone validation page link");
            expect(await phoneValidationPage.isVisible(phoneValidationPage.selectors.selfRegistrationButton, "Check visibility of self registration on phone validation page"))
        .toBeTruthy();
        });

        test("Return to enter personal data page from enter passport data page", async () => {
            await phoneValidationPage.basePhoneValidation("Phone validation");
            await checkOnlineRegistrationPage.selectBaseOnlineRegistration("Fill check online registration form");
            await passportDataPage.waitForSelector(passportDataPage.selectors.title, "Wait for enter passport data page title")
            await leftMenu.click(leftMenu.selectors.enterPersonalPageLink, "Click on personal data page link");
            expect(await enterPersonalDataPage.getTextContent(enterPersonalDataPage.selectors.title, "Get title text from personal data page"))
        .toContain(enterPersonalDataPage.checkData.title);
        });

        afterEach(async () => {
            await passportDataPage.clear();
            await passportDataPage.reload("Reload page");
        });
    });
});