import {Browser, BrowserContext, chromium, Page} from "playwright";

describe("Registration new business process", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
    let password = "Qwerty123";
    let username = "Автотест";
    let checkTitle = "Персональные данные";

    test("registration new business", async () => {
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
        await page.click("#test-landing-upper-ip_button");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(checkTitle);

        await page.waitForTimeout(5000);
        const pageEmail = await page.$('//div[contains(@class, "PersonalInformation")]//p');
        expect(await pageEmail.textContent()).toContain(email);
        await page.waitForSelector("//button[contains(., 'Продолжить')]");
        await page.click("//button[contains(., 'Продолжить')]");

        await page.click("//button[contains(., 'Я регистрируюсь сам')]");
        await page.fill("//input[@name='phone']", "9992222222");
        await page.click("#test-send_sms");
        await page.click("#agreement-conditions");
        await page.click("#agreementPersonalData");
        await page.fill("#code", "123123");

        await page.close();
        await context.close();
        await browser.close();
    });
})