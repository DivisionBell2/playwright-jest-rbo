import User from "../../data/user";
import MainPage from "../../pages/mainPage.page";
import CheckOnlineRegistrationPage from "../../pages/checkOnlineRegistrationPage.page";
import PassportDataPage from "../../pages/passportDataPage.page";
import PhoneValidationPage from "../../pages/phoneValidationPage.page";
import * as files from "../../data/files.json"

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

        test("Preview uploaded file and close preview", async () => {
            passportDataPage = new PassportDataPage();
            mainPage = new MainPage();
            checkOnlineRegistrationPage = new CheckOnlineRegistrationPage();
            user = new User();

            await mainPage.goto("/", "Go to main page");
            await mainPage.clickOnCookieButton();
            await (await mainPage.getAuthPopup()).login(user);
            await checkOnlineRegistrationPage.goto(path, "Open phone validation page for " + path);
            await phoneValidationPage.basePhoneValidation("Phone validation for passport data navigation tests");
            await checkOnlineRegistrationPage.selectBaseOnlineRegistration("Select online registration for passport data navigation tests");
            await passportDataPage.setInputFiles(passportDataPage.selectors.passportUploadField, files.jpgFile, "Upload passport scan");
            
            expect(await passportDataPage.isVisible(passportDataPage.selectors.deleteUploadedFileButton, "Check visibility of uploaded file icon", 30)).toBeTruthy();
            
            await passportDataPage.hover(passportDataPage.selectors.uploadedFileIcon, "Move mouse on uploaded file icon");
            await passportDataPage.click(passportDataPage.selectors.uploadedFileIcon, "Click on uploaded file icon");
            await passportDataPage.waitForSelector(passportDataPage.selectors.filePreviewBlock, "Waiting of file preview block");
            expect(await passportDataPage.isVisible(passportDataPage.selectors.filePreviewBlock, "Check visibility of file preview block", 30)).toBeTruthy();

            await passportDataPage.click(passportDataPage.selectors.closeFilePreviewButton, "Click on close preview button");
            expect(await passportDataPage.isHidden(passportDataPage.selectors.filePreviewBlock, "Check non visibility of file preview block", 30)).toBeTruthy();

            await passportDataPage.saveOnlyOneTab();
            await passportDataPage.clear();
            await passportDataPage.reload("Reload page");
        });
    });
});