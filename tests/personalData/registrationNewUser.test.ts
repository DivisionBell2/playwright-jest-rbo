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
    
        let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
        let username = "Автотест";
    
        const url = "https://rbo.uat.dasreda.ru";
    
        beforeEach(async () => {
            browser = await chromium.launch({
                headless: false
            });
            context = await browser.newContext()
            page = await context.newPage();
        });
    
        test('Clicking on FAQ button', async () => {
            await page.goto(url + requestPath);
            await page.fill("#lastName", username);
            await page.fill("#firstName", username);
            await page.fill("#middleName", username);
            await page.fill("#email", email);
            await page.click("//label[contains(@class, 'PersonalInformation__checkbox') and contains(., 'передачу персональных данных')]/span[contains(@class, 'ant-checkbox')]");
            await page.click("#test-send_password");
            await page.waitForSelector("#emailCode");
        });
        
        afterEach(async () => {
            await page.close();
            await context.close();
            await browser.close();
        });
    });
});