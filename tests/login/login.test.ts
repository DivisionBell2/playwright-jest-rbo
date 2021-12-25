import {Browser, BrowserContext, chromium, Page} from "playwright";

describe("Login new user from Main Page", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let password = "Qwerty123";
    let username = "Автотест";
    let url = "https://rbo.uat.dasreda.ru";
    let titlePersonalDataPage = "Персональные данные";

    beforeEach(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
    });

    test("Login new user", async () => {
        await loginProcess(url);
        await page.waitForSelector("#test-landing-navPanel-logedIn");
    });

    test("Login new user from first page Entrepreneur registration", async () => {
        await loginProcess(url + "/rbidos/personal-information/ip/1");
        await assertionsPersonalPage();
    });

    test("Login new user from first page Legal Entity registration", async () => {
        await loginProcess(url + "/rbidos/personal-information/ooo/1");
        await assertionsPersonalPage();
    });

    async function loginProcess(url: string) {
        let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";

        await page.goto(url);
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
        await page.reload();

        await page.click("text='Войти'");
        await page.fill("#username", email);
        await page.fill("#password", password);
        await page.click("#test-loginForm-singIn");
    };

    async function assertionsPersonalPage() {
        await page.waitForSelector("#test-landing-navPanel-logedIn");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(titlePersonalDataPage);
    }

    afterEach( async () => {
        await page.close()
        await context.close()
        await browser.close()
    });
})
