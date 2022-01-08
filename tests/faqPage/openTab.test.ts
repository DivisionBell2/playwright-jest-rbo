import {Browser, BrowserContext, chromium, Page} from "playwright";

describe('Open tab in FAQ page', () => {
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
        const questionTitles = await page.$$("//div[@class='ant-collapse-item']");
        await questionTitles[0].click();
        const answerBlock = await page.$("//div[@class='ant-collapse-content-box']");
        expect(await answerBlock.isVisible()).toBe(true);
    });

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});
