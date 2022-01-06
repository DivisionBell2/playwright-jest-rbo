import {Browser, BrowserContext, chromium, Page} from "playwright";

describe('Search tests for FAQ page', () => {
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
        await page.goto("https://rbo.uat.dasreda.ru/rbidos/faq");
    });

    test ('Search by text', async () => {
        expect(await (await page.$$("//div[@class='ant-collapse-item']")).length).toBeGreaterThan(1);
        await page.fill("//input[@name='faq-search']", "Кто может стать предпринимателем");
        expect(await (await page.$$("//div[@class='ant-collapse-item']")).length).toBe(1);
    });

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});
