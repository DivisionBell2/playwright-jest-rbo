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

    test('Clicking on Read link in footer and go to Platform blogs', async () => {
        await page.goto("https://rbo.uat.dasreda.ru/rbidos/faq");
        await page.click("//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Читать')]");
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
        ]);
        await newWindow.waitForLoadState();
        expect(page.context().pages()[1].url()).toContain('uat.dasreda.ru/learn/blog');
        await page.context().pages()[1].close();
    });

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});