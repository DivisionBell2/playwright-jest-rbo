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

    const url = "https://rbo.uat.dasreda.ru/rbidos/personal-information/";

    beforeEach(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext()
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
    })

    test ('Clicking on logo in ip/2 page', async () => {
        await page.waitForSelector("#test-landing-navPanel-logedIn");
        await page.click("#test-landing-upper-ip_button");

        await page.waitForSelector("//input[@id='lastName' and @value='" + username + "']");
        const pageEmail = await page.$('//div[contains(@class, "PersonalInformation")]//p');
        expect(await pageEmail.textContent()).toContain(email);
        await page.waitForSelector("//button[contains(., 'Продолжить')]");
        await page.click("//button[contains(., 'Продолжить')]");

        await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
        const title = await page.$("#test-landing-header-text");
        expect(await title.textContent()).toContain(landingTitle);
    });

    test ('Clicking on logo in ooo/2 page', async () => {
        await page.waitForSelector("#test-landing-navPanel-logedIn");
        await page.click("#test-landing-upper-ooo_button");

        await page.waitForSelector("//input[@id='lastName' and @value='" + username + "']");
        const pageEmail = await page.$('//div[contains(@class, "PersonalInformation")]//p');
        expect(await pageEmail.textContent()).toContain(email);
        await page.waitForSelector("//button[contains(., 'Продолжить')]");
        await page.click("//button[contains(., 'Продолжить')]");

        await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
        const title = await page.$("#test-landing-header-text");
        expect(await title.textContent()).toContain(landingTitle);
    });

    afterEach(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
})