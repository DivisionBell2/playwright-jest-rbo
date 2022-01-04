import {Browser, BrowserContext, chromium, Page} from "playwright";

describe("Working of support menu", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    beforeEach(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://rbo.uat.dasreda.ru");
    });

    test("Open and close support menu", async () => {
        await page.click("#test-cookieAlert_button");
        await page.click("//div[@role='button' and contains(@class, 'SupportCall__messenger')]");
        await page.click("//div[@role='button' and contains(@class, 'SupportCall__messenger-opened')]");
        await page.isHidden("//div[@role='button' and contains(@class, 'SupportCall__messenger-opened')]");
    });

    afterEach(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
})
