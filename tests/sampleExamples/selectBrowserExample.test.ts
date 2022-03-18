import {Browser, BrowserContext, chromium, firefox, Page} from "playwright";

describe("Example tests in some browsers", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page

    test("Make test in chrome (not chromium)", async () => {
        browser = await chromium.launch({
            headless: false,
            channel: "chrome"
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://rbo.uat.dasreda.ru/");

        await page.click("#test-landing-upper-ip_button");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain("Персональные данные");

        await page.close();
        await context.close();
        await browser.close();
    });

    test("Make test in firefox", async () => {
        browser = await firefox.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://rbo.uat.dasreda.ru/");

        await page.click("#test-landing-upper-ip_button");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain("Персональные данные");

        await page.close();
        await context.close();
        await browser.close();
    });
});