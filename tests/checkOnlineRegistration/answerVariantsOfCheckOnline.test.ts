import {Browser, BrowserContext, chromium, Page} from "playwright";

const requestPathes = [
    "rbidos/personal-information/ip/",
    "rbidos/personal-information/ooo/"
];

requestPathes.forEach(requestPath => {
    describe('Check variants of registration business of user info ' + requestPath, () => {
        let browser: Browser;
        let context: BrowserContext;
        let page: Page;
        let titlePersonalDataPage = "Персональные данные";
        let faqTitle = "Вопрос-ответ";
        let landingTitle = "бизнес легко и быстро";
    
        let password = "Qwerty123";
        let username = "Автотест";
        let checkTitle = "Персональные данные";
        const url = "https://rbo.uat.dasreda.ru/";
        const textMessageWithoutSBOL = "Без логина и пароля в Сбербанк Онлайн мы не можем предоставить вам услугу";

        beforeAll(async() => {
            browser = await chromium.launch({
                headless: false
            });
            context = await browser.newContext();
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
            await page.goto(url + requestPath + 2);
            await page.waitForSelector("//div[contains(@class, 'request-number-hint')]");
            await page.click("//button[contains(., 'Я регистрируюсь сам')]");

            await page.fill("//input[@name='phone']", "9992222222");
            await page.click("#test-send_sms");
            await page.click("#agreement-conditions");
            await page.click("#agreementPersonalData");
            await page.fill("#code", "123123");
            await page.click("//button[contains(., 'Продолжить')]");
    
        });
    
        test('User without SBOL, foreign passport, responsible phone, nfc', async () => {
            await page.click("//input[@name='hasSbol' and @value='2']");
            await page.click("//input[@name='hasBioPassport' and @value='2']");
            await page.click("#osName");
            await page.click("//li[text()='Android']");
            const phoneSelects = await page.$$("//div[@role='combobox' and @aria-autocomplete='list']");
            await phoneSelects[1].click();
            await page.click("//li[text()='4.0 или ниже']");
            await page.click("//button[contains(., 'Продолжить')]");
            await page.waitForSelector("//div[contains(@class, 'Error__error-text')]/div[1]");
            const errorMessage = await page.$("//div[contains(@class, 'Error__error-text')]/div[1]");
            expect(await errorMessage.textContent()).toContain(textMessageWithoutSBOL);
        });

        test('User without SBOL, foreign passport, responsible phone, with nfc', async () => {
            await page.click("//input[@name='hasSbol' and @value='2']");
            await page.click("//input[@name='hasBioPassport' and @value='2']");
            await page.click("#osName");
            await page.click("//li[text()='Android']");
            const phoneSelects = await page.$$("//div[@role='combobox' and @aria-autocomplete='list']");
            await phoneSelects[1].click();
            await page.click("//li[text()='4.0 или ниже']");
            await page.click("//li[contains(@class, 'PersonalInformation')]//input[@type='checkbox']");
            await page.click("//button[contains(., 'Продолжить')]");
            await page.waitForSelector("//div[contains(@class, 'Error__error-text')]/div[1]");
            const errorMessage = await page.$("//div[contains(@class, 'Error__error-text')]/div[1]");
            expect(await errorMessage.textContent()).toContain(textMessageWithoutSBOL);
        });

        afterEach(async () => {
            await page.goto(url + requestPath + 3);
        });
    
        afterAll(async () => {
            await page.close();
            await context.close();
            await browser.close();
        });
    });
});
