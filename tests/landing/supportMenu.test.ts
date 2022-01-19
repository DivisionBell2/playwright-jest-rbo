import {Browser, BrowserContext, chromium, Page} from "playwright";

describe("Working of support menu", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://rbo.uat.dasreda.ru");
        await page.click("#test-cookieAlert_button");
    });

    test("Open and close support menu", async () => {
        await page.goto("https://rbo.uat.dasreda.ru");
        await page.click("//div[@role='button' and contains(@class, 'SupportCall__messenger')]");
        await page.click("//div[@role='button' and contains(@class, 'SupportCall__messenger-opened')]");
        await page.isHidden("//div[@role='button' and contains(@class, 'SupportCall__messenger-opened')]");
    });

    test("Open and close support phone popup", async () => {
        await page.goto("https://rbo.uat.dasreda.ru");
        await page.click("//div[@role='button' and contains(@class, 'SupportCall__messenger')]");
        await page.click("//div[@role='button' and contains(@class, 'SupportCall__messenger-phone')]");
        const supportPhonePopup = await page.$("//div[@role='dialog']");
        expect(await supportPhonePopup.isVisible()).toBe(true);
        await page.click("//button[@aria-label='Close']");

        // Переписать в отдельную функцию с двумя аргументами селектор и условие
        for (let i = 0; i < 3; i++) {
            const displayStyleSupportPhonePopup = await page.$("//div[@role='dialog']");
            if (await displayStyleSupportPhonePopup.getAttribute("style") == null) {
                await page.waitForTimeout(1000);
                continue;
            }
            expect(await displayStyleSupportPhonePopup.getAttribute("style")).toEqual("display: none;");
        }
    });

    test("Open and close telegram popup", async () => {
        await page.goto("https://rbo.uat.dasreda.ru");
        await page.click("//div[@role='button' and contains(@class, 'SupportCall__messenger')]");
        await page.click("//div[@role='button' and contains(@class, 'SupportCall__messenger-telegram')]");
        const supportPhonePopup = await page.$("//div[@role='dialog']");
        expect(await supportPhonePopup.isVisible()).toBe(true);
        await page.click("//button[@aria-label='Close']");

        // Переписать в отдельную функцию с двумя аргументами селектор и условие
        for (let i = 0; i < 3; i++) {
            const displayStyleSupportPhonePopup = await page.$("//div[@role='dialog']");
            if (await displayStyleSupportPhonePopup.getAttribute("style") == null) {
                await page.waitForTimeout(1000);
                continue;
            }
            expect(await displayStyleSupportPhonePopup.getAttribute("style")).toEqual("display: none;");
        }
    });

    test("Go to feedback page", async () => {
        await page.goto("https://rbo.uat.dasreda.ru");
        await page.click("//div[@role='button' and contains(@class, 'SupportCall__messenger')]");
        await page.click("//div[@role='button' and contains(@class, 'SupportCall__messenger-omni')]");
        await page.waitForLoadState();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain("Обратная связь");
    });

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});