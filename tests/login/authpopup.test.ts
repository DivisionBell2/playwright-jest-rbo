import MainPage from "../../pages/mainPage.page";
import Header from "../../pages/blocks/header.pageBlock";
import AuthPopup from "../../pages/blocks/authPopup.pageBlock";
import SberIDPage from "../../pages/sberId.page";
import PasswordReset from "../../pages/passwordResetPage.page";

describe("Auth popup functional tests", () => {
    let mainPage: MainPage;
    let header: Header;
    let passwordReset: PasswordReset;
    let sberIdPage: SberIDPage;
    let authPopup: AuthPopup;

    beforeAll(async () => {
        mainPage = new MainPage();
        sberIdPage = new SberIDPage();
        passwordReset = new PasswordReset();
    });

    beforeEach(async () => {
        await mainPage.goto("/", "Go to main page");
        header = await mainPage.getHeader();
        await header.click(header.selectors.enterButton, "Click enter button");
        authPopup = await mainPage.getAuthPopup();
    });

    test('Click on close button in auth popup', async () => {
        await authPopup.click(authPopup.selectors.closeButton, "Click on close button");
        expect(await authPopup.isHidden(authPopup.selectors.middleNameInput, "Check auth modal window closed")).toBeTruthy();
    });

    test('Click on close button in registration popup', async () => {
        await authPopup.click(authPopup.selectors.registrationLink, "Click registration link on auth window");
        await authPopup.waitForSelector(authPopup.selectors.firstNameInput, "Check first name input visible in registration block");
        await authPopup.click(authPopup.selectors.closeButton, "Click on close auth window button");
        expect(await authPopup.isHidden(authPopup.selectors.modalWindow, "Check the auth window closed", 5)).toBeTruthy();
    });

    test('Clicking on login through SberId button', async () => {
        await authPopup.click(authPopup.selectors.sberIdButton, "Click on SberID Button");
        sberIdPage.waitForNavigation("Wait for navigation on sberID auth page");
        expect(await sberIdPage.getTextContent(sberIdPage.selectors.title, "Get text from title of sgerID auth page"))
        .toContain(sberIdPage.checkData.title);
    });

    test('Go to reset password page', async () => {
        await authPopup.click(authPopup.selectors.resetPasswordButton, "Click forgot password link");
        const isPasswordVisible = await passwordReset.isVisible(passwordReset.selectors.resetPasswordButton,"Check user is on reset password page");
        expect(isPasswordVisible).toBeTruthy();
    });

    test('Changing mode of viewing password', async () => {
        await authPopup.click(authPopup.selectors.viewingPasswordIcon, "Click on view password icon");
        let attributeValue = await authPopup.getAttribute(authPopup.selectors.authPasswordInput, "type", "Get attribute type of password input");
        expect(attributeValue).toBe("text");

        await authPopup.click(authPopup.selectors.viewingPasswordIcon, "Click on view password icon");
        attributeValue = await authPopup.getAttribute(authPopup.selectors.authPasswordInput, "type", "Get attribute type of password input");
        expect(attributeValue).toBe("password");
    });

    test('Сlick on Enter link from registration popup', async () => {
        await authPopup.click(authPopup.selectors.registrationLink, "Click registration link on auth window");
        await authPopup.click(authPopup.selectors.authLink, "Click auth link on registration window");
        expect(await authPopup.isVisible(authPopup.selectors.authTitle, "Get auth title on auth window")).toBe(true);
    });
});