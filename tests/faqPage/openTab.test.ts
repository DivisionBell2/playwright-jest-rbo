import {Browser, BrowserContext, chromium, Page} from "playwright";

describe('Open tab in FAQ page', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    test ('Open tab with answer', async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://rbo.uat.dasreda.ru/rbidos/faq");

        const questionTitles = await page.$$("//div[@class='ant-collapse-item']");
        await questionTitles[0].click();
        const answerBlock = await page.$("//div[@class='ant-collapse-content-box']");
        expect(await answerBlock.isVisible()).toBe(true);
        await questionTitles[0].click();
        const closedAnswerBlock = await page.$("//div[@class='ant-collapse-item']/div[@aria-expanded='false'][1]");
        expect(await closedAnswerBlock.isVisible()).toBe(true);

        await page.close();
        await context.close();
        await browser.close();
    });
});
