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
        await page.goto("https://rbo.uat.dasreda.ru/rbidos/feedback");
    });

    test("Send message by not authorized user", async () => {
        await page.fill("#messageText", "Тестовое сообщение");
        await page.fill("#userMail", "autotest+" + new Date().getTime() + "@dasredatest.ru");
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