import {Browser, BrowserContext, chromium, Page} from "playwright";

describe ("Functional tests on auth popup", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let url = "https://rbo.uat.dasreda.ru";

    beforeEach(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto(url);
        await page.click("text='Войти'");
    });

    test("Click on close button in auth popup", async () => {
        await page.click("//button[@aria-label='Close']");
        await page.isHidden("//div[@class='ant-modal-content']");
    });

    afterEach( async () => {
        await page.close()
        await context.close()
        await browser.close()
    });
})