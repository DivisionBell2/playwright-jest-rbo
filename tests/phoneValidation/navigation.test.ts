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
            let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
    
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
            await page.waitForSelector("//input[@data-qa='codeEntered_field']");

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
            await page.waitForTimeout(1000);
            const newPage = page.context().pages()[1];

            // if (newPage.url().includes('oferta_rbidos')) {
            //     newPage.waitForTimeout(1000);
            // }

            expect(newPage.url()).toContain('oferta_rbidos');
            
            await page.context().pages()[1].close();
            await page.waitForTimeout(1000);
        });

        test('Clicking on personal data privacy policy link in footer', async () => {
            //await page.goto(url + requestPath);
            await page.click("//a[contains(., 'Политика конфиденциальности')]");
            await Promise.all([context.waitForEvent("page")]);
            await page.waitForTimeout(1000);
            const newPage = page.context().pages()[1];

            // if (!newPage.url().includes('politika.pdf')) {
            //     newPage.waitForTimeout(1000);
            // }

            expect(newPage.url()).toContain('politika.pdf');
            await page.context().pages()[1].close();
            page.waitForTimeout(1000);
        });

        test('Clicking on personal data agreement link in footer', async () => {
            //await page.goto(url + requestPath);
            await page.click("//a[contains(., 'Согласие на обработку данных')]");
            await Promise.all([context.waitForEvent("page")]);
            await page.waitForTimeout(1000);
            const newPage = page.context().pages()[1];

            // if (!newPage.url().includes('soglasie_na_rbidos')) {
            //     newPage.waitForTimeout(1000);
            // }

            expect(newPage.url()).toContain('soglasie_na_rbidos');
            await page.context().pages()[1].close();
            await page.waitForTimeout(1000);
        });
    
        afterAll(async () => {
            await page.close();
            await context.close();
            await browser.close();
        });
    });
});