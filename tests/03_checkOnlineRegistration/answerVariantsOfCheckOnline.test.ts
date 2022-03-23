import User from "../../data/user";
import MainPage from "../../pages/mainPage.page";
import CheckOnlineRegistrationPage from "../../pages/checkOnlineRegistrationPage.page";
import ErrorPage from "../../pages/errorPage.page";

let checkOnlineRegistrationPage = new CheckOnlineRegistrationPage();
const paths = [
    checkOnlineRegistrationPage.paths.entrepreneur,
    checkOnlineRegistrationPage.paths.legalEntity,
];

paths.forEach(path => {
    describe('Check variants of registration business of user info ' + path, () => {
        let mainPage: MainPage;
        let errorPage: ErrorPage;
        let user: User;
    
        beforeAll(async () => {
            mainPage = new MainPage();
            checkOnlineRegistrationPage = new CheckOnlineRegistrationPage();
            errorPage = new ErrorPage();
            user = new User();
            await mainPage.goto("/", "Go to main page");
            await mainPage.clickOnCookieButton();
            await (await mainPage.getAuthPopup()).login(user);
        });

        beforeEach(async () => {
            await checkOnlineRegistrationPage.goto(path, "Open phone validation page for " + path);
        });

        test('User without SBOL, foreign passport, responsible phone, nfc', async () => {
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.noSbolRadio, "Click on no SBOL radio");
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.noPassportRadio, "Click on no passport radio");
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.osNameSelect, "Click on OS select");
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.androidLi, "Click on android OS li");
            const phone = await checkOnlineRegistrationPage.getElementFromArray(checkOnlineRegistrationPage.selectors.phoneSelects, 1, "Get phone selector");
            phone.click();
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.noSuitableAndroid, "Click on android OS 4 or lower li");
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.continueButton, "Click on continueButton");
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.noNFCButton, "Click on no NFC button");
            await errorPage.waitForSelector(errorPage.selectors.errorMessage, "Wait for error message");

            expect(await errorPage.getUrl("Get URL from error page")).toContain(errorPage.path);
            expect(await errorPage.getTextContent(errorPage.selectors.errorMessage, "Get error message"))
            .toContain(errorPage.checkData.textMessageWithoutSBOL);
        });

        test('User without SBOL, foreign passport, responsible phone, with nfc', async () => {
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.noSbolRadio, "Click on no SBOL radio");
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.noPassportRadio, "Click on no passport radio");
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.osNameSelect, "Click on OS select");
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.androidLi, "Click on android OS li");
            const phone = await checkOnlineRegistrationPage.getElementFromArray(checkOnlineRegistrationPage.selectors.phoneSelects, 1, "Get phone selector");
            phone.click();
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.noSuitableAndroid, "Click on android OS 4 or lower li");
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.nfcCheckbox, "Click on NFC checkbox");
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.continueButton, "Click on continueButton");
            await errorPage.waitForSelector(errorPage.selectors.errorMessage, "Wait for error message");

            expect(await errorPage.getUrl("Get URL from error page")).toContain(errorPage.path);
            expect(await errorPage.getTextContent(errorPage.selectors.errorMessage, "Get error message"))
            .toContain(errorPage.checkData.textMessageWithoutSBOL);
        });

        afterAll(async () => {
            await checkOnlineRegistrationPage.clear();
        });
    });
});