import {Browser, BrowserContext, chromium, Page} from "playwright";

describe("Login new user from Main Page", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
    let password = "Qwerty123";
    let username = "Автотест";

    test("Login new user", async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://rbo.uat.dasreda.ru");
        await page.click("text='Войти'");
        await page.click("text='Зарегистрироваться'");

        await page.fill("#lastName", username);
        await page.fill("#firstName", username);
        await page.fill("#middleName", username);
        await page.fill("#email", email);
        await page.fill("//div[contains(@class, 'Registration__registration-form')]//input[@id='password']", password);
        await page.fill("#passwordMatch", password);
        await page.click("#personalDataAgreement");
        await page.click("#test-regForm-singup_button");
        await page.reload();

        await page.click("text='Войти'");
        await page.fill("#username", email);
        await page.fill("#password", password);
        await page.click("#test-loginForm-singIn");

        await page.waitForSelector("#test-landing-navPanel-logedIn");

        await page.close()
        await context.close()
        await browser.close()
    });
})