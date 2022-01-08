import {Browser, BrowserContext, chromium, Page} from "playwright";

const requestTypes = [
    "#test-landing-upper-ip_button",
    "#test-landing-upper-ooo_button"
];

requestTypes.forEach(requestType => {
    describe('Left side navigation menu ' + requestType, () => {
        let browser: Browser;
        let context: BrowserContext;
        let page: Page;
    
        let password = "Qwerty123";
        let username = "Автотест";
        let checkTitle = "Персональные данные";
        let titlePersonalDataPage = "Персональные данные";

        let email: string;
    
        beforeEach(async () => {
            browser = await chromium.launch({
                headless: false
            });
            context = await browser.newContext();
            page = await context.newPage();
            
            email = "autotest+" + new Date().getTime() + "@dasredatest.ru";


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
            await page.waitForSelector("//input[@data-qa='codeEntered_field']");
            await page.reload();
        
            await page.click("text='Войти'");
            await page.fill("#username", email);
            await page.fill("#password", password);
            await page.click("#test-loginForm-singIn");
        
            await page.waitForSelector("#test-landing-navPanel-logedIn");
            await page.click(requestType);
            const title = await page.$("h1");
            expect(await title.textContent()).toContain(checkTitle);
        });
    
        test("Return to enter personal data page from phone validation page", async () => {
            await goToPhoneValidationPage();
            await page.waitForNavigation();
            await page.click("//ul/li[@role='menuitem']/div[contains(@class, 'title') and contains(., 'Персональные данные')]/../ul/li[contains(., 'Ввод персональных данных')]");
            const title = await page.$("h2");
            expect(await title.textContent()).toContain("Ввод персональных данных");
        });

        test("Return to enter personal data page from check online registration page", async () => {
            await goToPhoneValidationPage();
            await goToCheckOnlineRegistrationPage();
            await page.waitForNavigation();
            await page.click("//ul/li[@role='menuitem']/div[contains(@class, 'title') and contains(., 'Персональные данные')]/../ul/li[contains(., 'Ввод персональных данных')]");
            const title = await page.$("h2");
            expect(await title.textContent()).toContain("Ввод персональных данных");
        });

        test("Return to phone validation page from check online registration page", async () => {
            await goToPhoneValidationPage();
            await goToCheckOnlineRegistrationPage();
            await page.waitForNavigation();
            await page.click("//ul/li[@role='menuitem']/div[contains(@class, 'title') and contains(., 'Персональные данные')]/../ul/li[contains(., 'Подтверждение номера телефона')]");
            const title = await page.$("h2");
            expect(await title.textContent()).toContain("Подтверждение номера телефона");
        });
    
        afterEach(async () => {
            await page.close();
            await context.close();
            await browser.close();
        });

        async function goToPhoneValidationPage() {
            await page.waitForSelector("//input[@id='lastName' and @value='" + username + "']");
            const pageEmail = await page.$('//div[contains(@class, "PersonalInformation")]//p');
            expect(await pageEmail.textContent()).toContain(email);
            await page.waitForSelector("//button[contains(., 'Продолжить')]");
            await page.click("//button[contains(., 'Продолжить')]");
        }

        async function goToCheckOnlineRegistrationPage() {
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
        }
    });
});