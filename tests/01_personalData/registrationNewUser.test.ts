import {Browser, BrowserContext, chromium, Page} from "playwright";
import {Protocol} from "playwright/types/protocol";
import RemoteLocation = Protocol.Target.RemoteLocation;

const requestPathes = [
    "/rbidos/personal-information/ip/1",
    "/rbidos/personal-information/ooo/1"
];

requestPathes.forEach(requestPath => {
    describe('Navigation on personal data page', () =>{
        let browser: Browser;
        let context: BrowserContext;
        let page: Page;
    
        let username = "Автотест";
    
        const url = "https://rbo.uat.dasreda.ru";
    
        beforeAll(async () => {
            browser = await chromium.launch({
                headless: false
            });
            context = await browser.newContext()
            page = await context.newPage();
        });
    
        test('Registration new user', async () => {
            const email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
            await page.goto(url + requestPath);
            await page.fill("#lastName", username);
            await page.fill("#firstName", username);
            await page.fill("#middleName", username);
            await page.fill("#email", email);
            await page.click("//label[contains(@class, 'PersonalInformation__checkbox') and contains(., 'передачу персональных данных')]/span[contains(@class, 'ant-checkbox')]");
            await page.click("#test-send_password");
            await page.waitForSelector("#emailCode");
        });

        test('Registration new user without middle name', async () => {
            const email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
            await page.goto(url + requestPath);
            await page.fill("#lastName", username);
            await page.fill("#firstName", username);
            await page.click("//div[contains(@class, 'input-item-no-mid-name')]/label");
            await page.fill("#email", email);
            await page.click("//label[contains(@class, 'PersonalInformation__checkbox') and contains(., 'передачу персональных данных')]/span[contains(@class, 'ant-checkbox')]");
            await page.click("#test-send_password");
            await page.waitForSelector("#emailCode");
        });
        
        afterAll(async () => {
            await page.close();
            await context.close();
            await browser.close();
        });
    });
});