import {Browser, BrowserContext, chromium, Page} from "playwright";

describe ("Functional tests on auth popup", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let url = "https://rbo.uat.dasreda.ru";

    beforeEach(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto(url);
        await page.click("text='Войти'");
    });

    test("Click on close button in auth popup", async () => {
        await page.click("text='Зарегистрироваться'");
        await page.click("//button[@aria-label='Close']");
        await page.isHidden("//div[@class='ant-modal-content']");
    });

    test("Click on close button in registration popup", async () => {
        await page.click("//button[@aria-label='Close']");
        await page.isHidden("//div[@class='ant-modal-content']");
    });

    test('Clicking on login through SberId button', async () => {
        await page.click("//button[contains(@class, 'SberIdButton')]");
        await page.waitForSelector("//h1[text()='Деловая среда']");
    });

    test('Change viewing of password in password', async () => {
        await page.click("//span[@class='ant-input-suffix']");
        let passwordInputType = await (await page.$("#password")).getAttribute("type");
        expect(passwordInputType).toBe("text");
        await page.click("//span[@class='ant-input-suffix']");
        passwordInputType = await (await page.$("#password")).getAttribute("type");
        expect(passwordInputType).toBe("password");
    });

    test('Go to reset password page', async () => {
        await page.click("//a[text()='Забыли пароль?']");
        await page.waitForSelector("h1");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain("Сброс пароля");
    });

    afterEach( async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
})