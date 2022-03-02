import FeedbackPage from "../../pages/feedback.page";
import User from "../../data/user";

describe("Navigation tests for feedback page", () => {
    let feedbackPage: FeedbackPage;

    let user: User;

    beforeAll(async () => {
        feedbackPage = new FeedbackPage();
    });

    beforeEach(async () => {
        await feedbackPage.goto(feedbackPage.path, "Open feedback page");
        user = new User();
    });

    test("Send message by not authorized user", async () => {
        await page.getAttribute()
        await feedbackPage.fill(feedbackPage.selectors.messageTextInput, "Тестовое сообщение", "Enter text message for feedback");
        await feedbackPage.fill(feedbackPage.selectors.usermailInput, user.email, "Enter user email for feedback");
        expect(await feedbackPage.isDisabled(feedbackPage.selectors.sendButton, "Check send message button is enabled")).toBeFalsy();
        await feedbackPage.click(feedbackPage.selectors.sendButton, "Click on send message button");
        await feedbackPage.waitForSelector(feedbackPage.selectors.infoSendedMessageText, "Wait for info about sended message");
        expect(await feedbackPage.isDisabled(feedbackPage.selectors.sendButton, "Check send message button is disabled")).toBeTruthy();
        expect(await feedbackPage.isVisible(feedbackPage.selectors.messageTextInput, "Check message input is hidden")).toBeFalsy();
    });
});

// import {Browser, BrowserContext, chromium, Page} from "playwright";

// describe('Send message from FAQ page', () => {
//     let browser: Browser;
//     let context: BrowserContext;
//     let page: Page;

//     beforeAll(async () => {
//         browser = await chromium.launch({
//             headless: false
//         });
//         context = await browser.newContext();
//         page = await context.newPage();
//     });

//     test("Send message by authorized user", async () => {
//         let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
//         let password = "Qwerty123";
//         let username = "Автотест";

//         await page.goto("https://rbo.uat.dasreda.ru");
//         await page.click("text='Войти'");
//         await page.click("text='Зарегистрироваться'");

//         await page.fill("//div[@class='ant-modal-body']//input[@id='lastName']", username);
//         await page.fill("//div[@class='ant-modal-body']//input[@id='firstName']", username);
//         await page.fill("//div[@class='ant-modal-body']//input[@id='middleName']", username);
//         await page.fill("//div[@class='ant-modal-body']//input[@id='email']", email);
//         await page.fill("//div[contains(@class, 'Registration__registration-form')]//input[@id='password']", password);
//         await page.fill("#passwordMatch", password);
//         await page.click("#personalDataAgreement");
//         await page.click("#test-regForm-singup_button");
//         await page.waitForSelector("//input[@data-qa='codeEntered_field']");
//         await page.reload();

//         await page.click("text='Войти'");
//         await page.fill("#username", email);
//         await page.fill("#password", password);
//         await page.click("#test-loginForm-singIn");
//         await page.waitForSelector("#test-landing-navPanel-logedIn");

//         await page.goto("https://rbo.uat.dasreda.ru/rbidos/feedback");
//         await page.waitForLoadState();
//         await page.fill("#messageText", "Тестовое сообщение");
//         expect(await page.isDisabled("//button[contains(., 'Отправить')]")).toBe(false);
//         await page.click("//button[contains(., 'Отправить')]");
//         await page.waitForSelector("//p[contains(., 'Спасибо за ваше сообщение!')]");
//         expect(await page.isVisible("//p[contains(., 'Спасибо за ваше сообщение!')]")).toBe(true);
//         expect(await page.isDisabled("//button[contains(., 'Отправить')]")).toBe(true);
//         expect(await page.isVisible("#messageText")).toBe(false);
//     });

//     afterAll(async () => {
//         await page.close();
//         await context.close();
//         await browser.close();
//     });
// });