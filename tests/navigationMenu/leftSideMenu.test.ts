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
    
        let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
        let password = "Qwerty123";
        let username = "Автотест";
        let checkTitle = "Персональные данные";
        let titlePersonalDataPage = "Персональные данные";
    
        beforeEach(async () => {
            browser = await chromium.launch({
                headless: false
            });
            context = await browser.newContext();
            page = await context.newPage();
        });
    
        test("Go to steps of first block", async () => {
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
            await page.click(requestType);
            const title = await page.$("h1");
            expect(await title.textContent()).toContain(checkTitle);
    
            await page.waitForSelector("//input[@id='lastName' and @value='" + username + "']");
            const pageEmail = await page.$('//div[contains(@class, "PersonalInformation")]//p');
            expect(await pageEmail.textContent()).toContain(email);
            await page.waitForSelector("//button[contains(., 'Продолжить')]");
            await page.click("//button[contains(., 'Продолжить')]");
    
            //expect(await page.isVisible("//ul/li[@role='menuitem']/div[contains(@class, 'title') and contains(., 'Персональные данные')]/../ul")).toBe(true);
            await page.click("//ul/li[@role='menuitem']/div[contains(@class, 'title') and contains(., 'Персональные данные')]/../ul/li[contains(., 'Ввод персональных данных')]");
            expect(await title.textContent()).toContain(titlePersonalDataPage);
        });
    
        afterEach(async () => {
            await page.close();
            await context.close();
            await browser.close();
        });
    });
});