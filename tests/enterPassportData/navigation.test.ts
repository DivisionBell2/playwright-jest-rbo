import {Browser, BrowserContext, chromium, Page} from "playwright";

const requestPathes = [
    "rbidos/personal-information/ip/",
    "rbidos/personal-information/ooo/"
];

requestPathes.forEach(requestPath => {
    describe('Navigation on main page for ' + requestPath, () => {
        let browser: Browser;
        let context: BrowserContext;
        let page: Page;
        let titlePersonalDataPage = "Персональные данные";
        let faqTitle = "Вопрос-ответ";
        let landingTitle = "бизнес легко и быстро";
    
        let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
        let password = "Qwerty123";
        let username = "Автотест";
        let checkTitle = "Персональные данные";
        const url = "https://rbo.uat.dasreda.ru/";
    
        beforeAll(async () => {
            browser = await chromium.launch({
                headless: false
            });
            context = await browser.newContext();
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
        });

        beforeEach(async() => {
            await page.waitForSelector("#test-landing-navPanel-logedIn");
            await page.goto(url + requestPath + 2);
            await page.waitForSelector("//div[contains(@class, 'request-number-hint')]");
            await page.click("//button[contains(., 'Я регистрируюсь сам')]");

            // После внедрения паттерна PageObject вынести ожидание в отдельную функцию и вызывать для каждого теста отдельно.
            if (await page.isVisible("//div[contains(text(), 'На вашем аккаунте уже есть заявка')]")) {
                page.click("//button[contains(., 'Выбрать')][1]");
                
                await page.waitForTimeout(15000);
            }

            await page.fill("//input[@name='phone']", "9992222222");
            await page.click("#test-send_sms");
            await page.click("#agreement-conditions");
            await page.click("#agreementPersonalData");
            await page.fill("#code", "123123");
            await page.click("//button[contains(., 'Продолжить')]");
    
            await page.click("//input[@name='hasSbol' and @value='1']");
            await page.click("//input[@name='hasBioPassport' and @value='1']");
            await page.click("#osName");
            await page.click("//li[text()='Android']");
            await page.click("//li[contains(@class, 'PersonalInformation')]//input[@type='checkbox']");
            await page.click("//button[contains(., 'Продолжить')]");
        })
    
        test ('Clicking on logo', async () => {
            await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
            await page.waitForLoadState();
            expect(await (await page.waitForSelector("#test-landing-header-text")).isVisible()).toBe(true);
        });

        test ('Open youtube frame from header', async () => {
            await page.click("//span[@role='button' and contains(., 'Видеоинструкция')]");
            expect(await (await page.$("//iframe[@title='YouTube video player']")).isVisible()).toBe(true);
        });
    
        afterAll(async () => {
            await page.close();
            await context.close();
            await browser.close();
        });
    });
});