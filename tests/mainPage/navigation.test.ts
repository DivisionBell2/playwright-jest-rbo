import {Browser, BrowserContext, chromium, Page} from "playwright";

describe('Navigation on main page', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let checkTitle = "Персональные данные";

    beforeEach(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://rbo.uat.dasreda.ru");
    })

    test ('Click on start business registration as entrepreneur', async () => {
        await page.click("#test-landing-upper-ip_button");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(checkTitle);
    })

    test ('Click on start business registration as legal entity', async () => {
        await page.click("#test-landing-upper-ooo_button");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(checkTitle);
    })

    test ('Clicking on FAQ button', async () => {
        await page.click("text='Вопрос-ответ'");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain("Вопрос-ответ");
    })

    test ('Clicking on Feedback button', async () => {
        await page.click("text='Обратная связь'");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain("Обратная связь");
    })

    afterEach(async () => {
        await page.close()
        await context.close()
        await browser.close()
    })
})