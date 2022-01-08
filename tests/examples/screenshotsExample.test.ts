import {Browser, BrowserContext, chromium, Page} from "playwright";

describe("Screenshot examples", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://rbo.uat.dasreda.ru/");
    });

    test("Going to first page request business and making screenshots", async () => {
        await page.click("#test-landing-upper-ip_button");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain("Персональные данные");
        // Пример скриншота элемента страницы. Лежит в папке screenshots рядом с тестом
        await (await page.$("//div[contains(@class, 'TopMenu__topmenu-container')]")).screenshot({path: "screenshots/header.png"});
        // Пример скриншота всей страницы. Лежит в папке screenshots рядом с тестом
        await page.screenshot({path: "screenshots/fullPage.png", fullPage: true});
    });

    afterAll(async () => {
        // Пример скриншота в конце теста. Лежит в папке screenshots рядом с тестом
        await page.screenshot({ path: 'screenshots/' + Date.now() + 'screenshot1.png' });
        await page.close();
        await context.close();
        await browser.close();
    });
});