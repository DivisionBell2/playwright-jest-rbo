import {Browser, BrowserContext, chromium, Page} from "playwright";

describe('Send message from FAQ page', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
    });

    test("Send message by not authorized user", async () => {
        await page.goto("https://rbo.uat.dasreda.ru/rbidos/feedback");
        await page.fill("#messageText", "Тестовое сообщение");
        await page.fill("#userMail", "autotest+" + new Date().getTime() + "@dasredatest.ru");
        expect(await page.isDisabled("//button[contains(., 'Отправить')]")).toBe(false);
        await page.click("//button[contains(., 'Отправить')]");
        await page.waitForSelector("//p[contains(., 'Спасибо за ваше сообщение!')]");
        expect(await page.isVisible("//p[contains(., 'Спасибо за ваше сообщение!')]")).toBe(true);
        expect(await page.isDisabled("//button[contains(., 'Отправить')]")).toBe(true);
        expect(await page.isVisible("#messageText")).toBe(false);
    });

    test("Send message by authorized user", async () => {
        let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
        let password = "Qwerty123";
        let username = "Автотест";

        await page.goto("https://rbo.uat.dasreda.ru");
        await page.click("text='Войти'");
        await page.click("text='Зарегистрироваться'");

        await page.fill("//div[@class='ant-modal-body']//input[@id='lastName']", username);
        await page.fill("//div[@class='ant-modal-body']//input[@id='firstName']", username);
        await page.fill("//div[@class='ant-modal-body']//input[@id='middleName']", username);
        await page.fill("//div[@class='ant-modal-body']//input[@id='email']", email);
        await page.fill("//div[contains(@class, 'Registration__registration-form')]//input[@id='password']", password);
        await page.fill("#passwordMatch", password);
        await page.click("#personalDataAgreement");
        await page.click("#test-regForm-singup_button");
        await page.waitForSelector("//input[@data-qa='codeEntered_field']");
        await page.reload();

        await page.click("text='Войти'");
        await page.fill("#username", email);
        await page.fill("#password", password);
        await page.click("#test-loginForm-singIn");
        await page.waitForSelector("#test-landing-navPanel-logedIn");

        await page.goto("https://rbo.uat.dasreda.ru/rbidos/feedback");
        await page.waitForLoadState();
        await page.fill("#messageText", "Тестовое сообщение");
        expect(await page.isDisabled("//button[contains(., 'Отправить')]")).toBe(false);
        await page.click("//button[contains(., 'Отправить')]");
        await page.waitForSelector("//p[contains(., 'Спасибо за ваше сообщение!')]");
        expect(await page.isVisible("//p[contains(., 'Спасибо за ваше сообщение!')]")).toBe(true);
        expect(await page.isDisabled("//button[contains(., 'Отправить')]")).toBe(true);
        expect(await page.isVisible("#messageText")).toBe(false);
    });

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});