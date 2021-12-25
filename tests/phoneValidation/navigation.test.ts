import {Browser, BrowserContext, chromium, Page} from "playwright";
import {Protocol} from "playwright/types/protocol";
import RemoteLocation = Protocol.Target.RemoteLocation;

describe('Navigation on personal data page', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
    let password = "Qwerty123";
    let username = "Автотест";
    let faqTitle = "Вопрос-ответ";
    let landingTitle = "бизнес легко и быстро";
    let dsTitle = "Деловая среда";

    const url = "https://rbo.uat.dasreda.ru";

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext()
        page = await context.newPage();

        await page.goto(url);
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
    });

    test ('Clicking on logo in ip/2 page', async () => {
        await page.goto(url + "/rbidos/personal-information/ip/2");
        await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
        const title = await page.$("#test-landing-header-text");
        expect(await title.textContent()).toContain(landingTitle);
    });

    test ('Clicking on logo in ooo/2 page', async () => {
        await page.goto(url + "/rbidos/personal-information/ooo/2");
        await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
        const title = await page.$("#test-landing-header-text");
        expect(await title.textContent()).toContain(landingTitle);
    });

    test ('Clicking on FAQ button in ip/2 page', async () => {
        await page.goto(url + "/rbidos/personal-information/ip/2");
        await page.click("text='Вопрос-ответ'");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(faqTitle);
    });

    test ('Clicking on FAQ button in ooo/2 page', async () => {
        await page.goto(url + "/rbidos/personal-information/ooo/2");
        await page.click("text='Вопрос-ответ'");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(faqTitle);
    });

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
})