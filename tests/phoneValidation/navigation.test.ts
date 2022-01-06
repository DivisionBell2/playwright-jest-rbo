import {Browser, BrowserContext, chromium, Page} from "playwright";
import {Protocol} from "playwright/types/protocol";
import RemoteLocation = Protocol.Target.RemoteLocation;

const requestPathes = [
    "/rbidos/personal-information/ip/2",
    "/rbidos/personal-information/ooo/2"
];

requestPathes.forEach(requestPath => {
    describe('Navigation on personal data page ' + requestPath, () => {
        let browser: Browser;
        let context: BrowserContext;
        let page: Page;
    
        let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
        let password = "Qwerty123";
        let username = "Автотест";
        let faqTitle = "Вопрос-ответ";
        let feedbackTitle = "Обратная связь";
        let landingTitle = "бизнес легко и быстро";
        let personalDataPageTitle = "Ввод персональных данных";
    
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
    
        test('Clicking on logo', async () => {
            await page.goto(url + requestPath);
            await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
            const title = await page.$("#test-landing-header-text");
            expect(await title.textContent()).toContain(landingTitle);
        });
    
        test('Clicking on FAQ button', async () => {
            await page.goto(url + requestPath);
            await page.click("text='Вопрос-ответ'");
            await page.waitForNavigation();
            const title = await page.$("h1");
            expect(await title.textContent()).toContain(faqTitle);
        });
    
        test('Clicking on feedback button', async () => {
            await page.goto(url + requestPath);
            await page.click("text='Обратная связь'");
            await page.waitForNavigation();
            const title = await page.$("h1");
            expect(await title.textContent()).toContain(feedbackTitle);
        });
    
        test('Clicking on change data link', async () => {
            await page.goto(url + requestPath);
            await page.click("//div[@role='button' and contains(text(), 'Изменить данные')]");
            const title = await page.$("h2");
            expect(await title.textContent()).toContain(personalDataPageTitle);
        });

        test('Clicking on oferta link in footer', async () => {
            await page.goto(url + requestPath);
            await page.click("//a[contains(., 'Договор оферты')]");
            await Promise.all([context.waitForEvent("page")]);
            expect(page.context().pages()[1].url()).toContain('oferta_rbidos');
            await page.context().pages()[1].close();
        });
    
        afterAll(async () => {
            await page.close();
            await context.close();
            await browser.close();
        });
    });
});