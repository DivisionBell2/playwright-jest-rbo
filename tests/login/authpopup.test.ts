import MainPage from "../../pages/mainPage.page";
import Header from "../../pages/blocks/header.pageBlock";
import AuthPopup from "../../pages/blocks/authPopup.pageBlock";
import SberIDPage from "../../pages/sberId.page";
import PasswordReset from "../../pages/passwordResetPage.page";

describe("Functional tests for auth popup", () => {
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
        await mainPage.goToMainPage();
        header = await mainPage.getHeader();
        await header.clickEnterButton();
        authPopup = await mainPage.getAuthPopup();
    });

    test('Click on close button in auth popup', async () => {
        await authPopup.clickCloseButton();
        expect(await authPopup.checkModalWindowHidden()).toBeTruthy();
    });

    test('Click on close button in registration popup', async () => {
        await authPopup.clickRegistrationLink();
        await authPopup.clickCloseButton();
        expect(await authPopup.checkModalWindowHidden()).toBeTruthy();
    });

    test('Clicking on login through SberId button', async () => {
        await authPopup.clickSberIdButton();
        sberIdPage.waitForNavigation("Wait for navigation on sberID auth page");
        expect(await sberIdPage.getTextContent(
            sberIdPage.selectors.title,
            "Get text from title of sgerID auth page"
            )).toContain(sberIdPage.checkData.title);
    });

    test('Go to reset password page', async () => {
        await authPopup.clickResetPasswordButton();
        expect(await passwordReset.isVisible(
            passwordReset.selectors.resetPasswordButton,
            "Check user is on reset password page"
        )).toBeTruthy();
    });
});

// import {Browser, BrowserContext, chromium, Page} from "playwright";

// describe ("Functional tests on auth popup", () => {
//     let browser: Browser;
//     let context: BrowserContext;
//     let page: Page;

//     let url = "https://rbo.uat.dasreda.ru";

//     beforeAll(async () => {
//         browser = await chromium.launch({
//             headless: false
//         });
//         context = await browser.newContext();
//         page = await context.newPage();
//     });

//     beforeEach( async () => {
//         await page.goto(url);
//         await page.click("text='Войти'");
//     });

//     xtest("Click on close button in auth popup", async () => {
//         await page.click("//button[@aria-label='Close']");
//         await page.isHidden("//div[@class='ant-modal-content']");
//     });

//     xtest("Click on close button in registration popup", async () => {
//         await page.click("text='Зарегистрироваться'");
//         await page.click("//button[@aria-label='Close']");
//         await page.isHidden("//div[@class='ant-modal-content']");
//     });

    // xtest('Clicking on login through SberId button', async () => {
    //     await page.click("//button[contains(@class, 'SberIdButton')]");
    //     await page.waitForSelector("//h1[text()='Деловая среда']");
    // });

//     test('Change viewing of password in password', async () => {
//         await page.click("//span[@class='ant-input-suffix']");
//         let passwordInputType = await (await page.$("#password")).getAttribute("type");
//         expect(passwordInputType).toBe("text");
//         await page.click("//span[@class='ant-input-suffix']");
//         passwordInputType = await (await page.$("#password")).getAttribute("type");
//         expect(passwordInputType).toBe("password");
//     });

    // xtest('Go to reset password page', async () => {
    //     await page.click("//a[text()='Забыли пароль?']");
    //     await page.waitForSelector("h1");
    //     const title = await page.$("h1");
    //     expect(await title.textContent()).toContain("Сброс пароля");
    // });

//     test('Сlick on Enter link from registration popup', async () => {
//         await page.click("text='Зарегистрироваться'");
//         await page.click("//div[@role='button' and text()='Войти']");
//         const authPopupTitle = await page.$("//h2[text()='Вход']");
//         expect(await (authPopupTitle).isVisible()).toBe(true);
//     });

//     afterAll(async () => {
//         await page.close();
//         await context.close();
//         await browser.close();
//     });
// });