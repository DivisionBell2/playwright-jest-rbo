import {chromium, Page} from "playwright";

describe('Navigation on main page', () =>{
    let page: Page;
    let checkTitle = "Персональные данные";

    test ('Click on start business registration as entrepreneur', async () => {
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext({
            recordVideo: {
                dir: "./videos/",
                size: {
                    width: 800,
                    height: 600
                }
            }
        });
        page = await context.newPage();
        await page.goto("");

        await page.click("#test-landing-upper-ip_button");
        const title = await (await page.waitForSelector("h1")).textContent();
        expect(title).toContain(checkTitle);

        await page.close()
        await context.close()
        await browser.close()
    });
});