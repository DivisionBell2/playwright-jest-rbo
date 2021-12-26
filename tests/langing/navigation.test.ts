import {Browser, BrowserContext, chromium, Page} from "playwright";

describe('Navigation on main page', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let titlePersonalDataPage = "Персональные данные";
    let faqTitle = "Вопрос-ответ";

    beforeEach(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://rbo.uat.dasreda.ru");
    });

    test('Click on start business registration as entrepreneur', async () => {
        await page.click("#test-landing-upper-ip_button");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(titlePersonalDataPage);
    });

    test('Click on start business registration as legal entity', async () => {
        await page.click("#test-landing-upper-ooo_button");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(titlePersonalDataPage);
    });

    test('Click on start business registration as entrepreneur', async () => {
        await page.click("//div[@id='eighthblock']//div[contains(@class, 'landing-left-button') and contains(text(), 'Станьте ИП')]");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(titlePersonalDataPage);
    });

    test('Click on start business registration as legal entity', async () => {
        await page.click("//div[@id='eighthblock']//div[contains(@class, 'landing-right-button') and contains(text(), 'Откройте ООО')]");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(titlePersonalDataPage);
    });

    test('Clicking on FAQ button', async () => {
        await page.click("text='Вопрос-ответ'");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(faqTitle);
    });

    test('Clicking on Feedback button', async () => {
        await page.click("text='Обратная связь'");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain("Обратная связь");
    });

    test('Clicking on FAQ button in landing block', async () => {
        await page.click("//div[@id='tenthblock']//a[text()='Вопросы и ответы']");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(faqTitle);
    });

    test('Clicking on SberIcon and go to sberbank.ru', async () => {
        await page.click("//div[@id='sixth-block-wrapper']//a/img[@alt='Сбербанк']");
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
        ]);
        await newWindow.waitForLoadState();
        expect(page.context().pages()[1].url()).toContain('sberbank.ru');
    });

    afterEach(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});