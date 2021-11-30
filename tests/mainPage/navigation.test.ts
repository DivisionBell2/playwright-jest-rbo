import {Browser, BrowserContext, chromium, Page} from "playwright";
import {Protocol} from "playwright/types/protocol";
import RemoteLocation = Protocol.Target.RemoteLocation;

describe('Navigation on main page', () =>{
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let remote: RemoteLocation
    let checkTitle = "Персональные данные";

    beforeEach(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext()
        page = await context.newPage();
        await page.goto("https://rbo.uat.dasreda.ru")
    })

    test ('Click on start business registration as entrepreneur', async () => {
        await page.click("#test-landing-upper-ip_button");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(checkTitle)
    })

    test ('Click on start business registration as legal entity', async () => {
        await page.click("#test-landing-upper-ooo_button");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(checkTitle)
    })

    afterEach(async () => {
        await page.close()
        await context.close()
        await browser.close()
    })
})