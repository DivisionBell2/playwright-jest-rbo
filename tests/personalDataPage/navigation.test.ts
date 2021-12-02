import {Browser, BrowserContext, chromium, Page} from "playwright";
import {Protocol} from "playwright/types/protocol";
import RemoteLocation = Protocol.Target.RemoteLocation;

describe('Navigation on personal data page', () =>{
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    const url = "https://rbo.uat.dasreda.ru/rbidos/personal-information/";

    beforeEach(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext()
        page = await context.newPage();
    })

    test ('Clicking on FAQ button', async () => {
        await page.goto(url + "ip/1");
        await page.click("text='Вопрос-ответ'");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain("Вопрос-ответ");
    });

    test ('Clicking on FAQ button', async () => {
        await page.goto(url + "ooo/1");
        await page.click("text='Вопрос-ответ'");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain("Вопрос-ответ");
    });

    afterEach(async () => {
        await page.close()
        await context.close()
        await browser.close()
    })
})