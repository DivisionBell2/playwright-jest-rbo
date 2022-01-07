import {Browser, BrowserContext, chromium, Page} from "playwright";

describe('Navigation tests for feedback page', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    const landingTitle = "бизнес легко и быстро";

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://rbo.uat.dasreda.ru/rbidos/feedback");
    });

    test('Clicking on logo', async () => {
        await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
        await page.waitForNavigation();
        const title = await page.$("#test-landing-header-text");
        expect(await title.textContent()).toContain(landingTitle);
    });

    test('Open youtube frame from header', async () => {
        await page.click("//span[@role='button' and contains(., 'Видеоинструкция')]");
        const frame = page.frame("//iframe[@title='YouTube video player']");
        await page.click("//i[@aria-label='icon: close']");
    });

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});