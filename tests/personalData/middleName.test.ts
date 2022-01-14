import {Browser, BrowserContext, chromium, Page} from "playwright";

const requestType = [
    "#test-landing-upper-ip_button",
    "#test-landing-upper-ooo_button"
];

requestType.forEach(requestType => {
    describe ("Check working entering personal data without middleName " + requestType, () => {
        let browser: Browser;
        let context: BrowserContext;
        let page: Page;
    
        let url = "https://rbo.uat.dasreda.ru";
        let popupTitle = "Изменения в законе № 129-ФЗ";
    
        let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
        let password = "Qwerty123";
        let username = "Автотест";
    
        beforeEach(async () => {
            browser = await chromium.launch({
                headless: false
            });
            context = await browser.newContext();
            page = await context.newPage();
        });
        
        test("Start registration business for logined user with delete middle name", async () => {
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
            
            await page.click(requestType);
            await page.waitForLoadState();
            await page.click("//div[contains(@class, 'input-item-no-mid-name')]/label");
            await page.waitForSelector("//p[text()='Без отчества']");
            expect(await page.isVisible("//input[@id='middleName']")).toBe(false);
            await page.waitForLoadState();
            await page.click("//button[contains(., 'Продолжить')]");
            await page.waitForLoadState();
            await page.waitForSelector("//div[contains(@class, 'request-number-hint')]");
            expect(await page.isVisible("//div[text()='" + username + " " + username + "']")).toBe(true);
        });

        test("Start registration business for logined user with delete middle name", async () => {
            await page.goto(url);
            await page.click(requestType);

            await page.waitForLoadState();
            await page.click("//div[contains(@class, 'input-item-no-mid-name')]/label");
            await page.waitForSelector("//p[text()='Без отчества']");
            expect(await page.isVisible("//input[@id='middleName']")).toBe(false);
            await page.click("//div[contains(@class, 'input-item-no-mid-name')]/label");
            expect(await page.isVisible("//input[@id='middleName']")).toBe(true);
        });
        
        afterEach( async () => {
            await page.close();
            await context.close();
            await browser.close();
        });
    });
});