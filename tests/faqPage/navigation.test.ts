import {Browser, BrowserContext, chromium, Page} from "playwright";

describe('Navigation tests for FAQ page', () => {
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
    });

    test ('Clicking on logo', async () => {
        await page.goto("https://rbo.uat.dasreda.ru/rbidos/faq");
        await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
        await page.waitForNavigation();
        const title = await page.$("#test-landing-header-text");
        expect(await title.textContent()).toContain(landingTitle);
    });

    test('Clicking on Feedback button', async () => {
        await page.goto("https://rbo.uat.dasreda.ru/rbidos/faq");
        await page.click("text='Обратная связь'");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain("Обратная связь");
    });

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});