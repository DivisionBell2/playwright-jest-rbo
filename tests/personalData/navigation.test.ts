import {Browser, BrowserContext, chromium, Page} from "playwright";
import {Protocol} from "playwright/types/protocol";
import RemoteLocation = Protocol.Target.RemoteLocation;

describe('Navigation on personal data page', () =>{
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let faqTitle = "Вопрос-ответ";
    let landingTitle = "бизнес легко и быстро";
    let dsTitle = "Деловая среда";
    let sberbankOnlineUrl = "online.sberbank.ru";

    const url = "https://rbo.uat.dasreda.ru/rbidos/personal-information/";

    beforeEach(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext()
        page = await context.newPage();
    })

    test ('Clicking on FAQ button for Entrepreneur request', async () => {
        await page.goto(url + "ip/1");
        await page.click("text='Вопрос-ответ'");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(faqTitle);
    });

    test ('Clicking on FAQ button for Legal Entity request', async () => {
        await page.goto(url + "ooo/1");
        await page.click("text='Вопрос-ответ'");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(faqTitle);
    });

    test ('Clicking on logo for Entrepreneur request', async () => {
        await page.goto(url + "ip/1");
        await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
        await page.waitForNavigation();
        const title = await page.$("#test-landing-header-text");
        expect(await title.textContent()).toContain(landingTitle);
    });

    test ('Clicking on logo for Legal Entity request', async () => {
        await page.goto(url + "ooo/1");
        await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
        await page.waitForNavigation();
        const title = await page.$("#test-landing-header-text");
        expect(await title.textContent()).toContain(landingTitle);
    });

    test ('Clicking on login through SberId button for Entrepreneur request', async () => {
        await page.goto(url + "ip/1");
        await page.click("//button[contains(@class, 'SberIdButton')]");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(dsTitle);
    });

    test ('Clicking on login through SberId button for Legal Entity request', async () => {
        await page.goto(url + "ooo/1");
        await page.click("//button[contains(@class, 'SberIdButton')]");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(dsTitle);
    });

    test ('Clicking on feedback button for Entrepreneur request', async () => {
        await page.goto(url + "ip/1");
        await page.click("text='Обратная связь'");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain("Обратная связь");
    });

    test ('Clicking on feedback button for Legal Entity request', async () => {
        await page.goto(url + "ooo/1");
        await page.click("text='Обратная связь'");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain("Обратная связь");
    });

    test ('Clicking on sberId Button for Entrepreneur request', async () => {
        await page.goto(url + "ip/1");
        await page.click("//button[contains(@class, 'sberId')]");
        await page.waitForNavigation();
        const currentUrl = await page.url();
        expect(await currentUrl.valueOf()).toContain(sberbankOnlineUrl);
    });

    test ('Clicking on sberId Button for Legal Entity request', async () => {
        await page.goto(url + "ooo/1");
        await page.click("//button[contains(@class, 'sberId')]");
        await page.waitForNavigation();
        const currentUrl = await page.url();
        expect(await currentUrl.valueOf()).toContain(sberbankOnlineUrl);
    });

    test ('Clicking on dasreda.ru link for Entrepreneur request', async () => {
        await page.goto(url + "ip/1");
        await page.click("//div[contains(@class, 'PersonalInformation__hint-blockquote')]/a[contains(., dasreda.ru)]");
        await Promise.all([context.waitForEvent("page")]);
        expect(page.context().pages()[1].url()).toContain('https://dasreda.ru/');
        await page.context().pages()[1].close();
    });

    test ('Clicking on dasreda.ru link for Legal Entity request', async () => {
        await page.goto(url + "ooo/1");
        await page.click("//div[contains(@class, 'PersonalInformation__hint-blockquote')]/a[contains(., dasreda.ru)]");
        await Promise.all([context.waitForEvent("page")]);
        expect(page.context().pages()[1].url()).toContain('https://dasreda.ru/');
        await page.context().pages()[1].close();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
})