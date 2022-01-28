import {Browser, BrowserContext, chromium, Page} from "playwright";
import EnterPersonalDataPage from "../../pages/EnterPersonalData.page";
import FAQPage from "../../pages/FAQPage.page";
import FeedbackPage from "../../pages/Feedback.page";
import MainPage from "../../pages/MainPage.page";

describe('Navigation on main page', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let mainPage: MainPage;
    let faqPage: FAQPage;
    let enterPersonalDataPage: EnterPersonalDataPage;
    let feedbackPage: FeedbackPage;
    let titlePersonalDataPage = "Персональные данные";
    let faqTitle = "Вопрос-ответ";

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        mainPage = new MainPage(page);
        enterPersonalDataPage = new EnterPersonalDataPage(page);
        faqPage = new FAQPage(page);
        feedbackPage = new FeedbackPage(page);
    });

    beforeEach(async () => {
        await mainPage.goToMainPage();
    });

    test('Click on start business registration as entrepreneur', async () => {
        await mainPage.clickLandingStartEntrepreneurButton();
        expect(await enterPersonalDataPage.getTitleText()).toContain(enterPersonalDataPage.checkData.title);
    });

    test('Click on start business registration as legal entity', async () => {
        await mainPage.clickLandingStartLegalEntityButton();
        expect(await enterPersonalDataPage.getTitleText()).toContain(enterPersonalDataPage.checkData.title);
    });

    test('Click on start business registration as entrepreneur', async () => {
        await mainPage.clickBlockStartEntrepreneurButton();
        expect(await enterPersonalDataPage.getTitleText()).toContain(enterPersonalDataPage.checkData.title);
    });

    test('Click on start business registration as legal entity', async () => {
        await mainPage.clickBlockStartLegalEntityButton();
        expect(await enterPersonalDataPage.getTitleText()).toContain(enterPersonalDataPage.checkData.title);
    });

    test('Clicking on FAQ button', async () => {
        await (await mainPage.getHeader()).clickFAQLink();
        expect(await faqPage.getTitleText()).toContain(faqPage.checkData.title);
    });

    test.only('Clicking on Feedback button', async () => {
        await (await mainPage.getHeader()).clickFeedbackLink();
        expect(await feedbackPage.getTitleText()).toContain(feedbackPage.checkData.title);
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
        await page.context().pages()[1].close();
    });

    test('Open youtube frame from header', async () => {
        await page.click("//span[@role='button' and contains(., 'Видеоинструкция')]");
        const frame = page.frame("//iframe[@title='YouTube video player']");
        await page.click("//i[@aria-label='icon: close']");
    });

    test('Clicking on Oferta link and go to oferta document', async () => {
        await page.click("//a[contains(., 'Оферты')]");
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
        ]);
        await newWindow.waitForLoadState();
        expect(page.context().pages()[1].url()).toContain('oferta_rbidos');
        await page.context().pages()[1].close();
    });

    test('Clicking on Agreement link and go to agreement document', async () => {
        await page.click("//a[contains(., 'Согласие')]");
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
        ]);
        await newWindow.waitForLoadState();
        expect(page.context().pages()[1].url()).toContain('soglasie_na_rbidos');
        await page.context().pages()[1].close();
    });

    test('Clicking on FAQ button in page block', async () => {
        await page.click("//div[@id='tenthblock']//a[text()='Вопросы и ответы']");
        await page.waitForNavigation();
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(faqTitle);
    });

    test('Clicking on Read link in footer and go to Platform blogs', async () => {
        await page.click("//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Читать')]");
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
        ]);
        await newWindow.waitForLoadState();
        expect(page.context().pages()[1].url()).toContain('uat.dasreda.ru/learn/blog');
        await page.context().pages()[1].close();
    });

    test('Clicking on Watch link in footer and go to Platform blogs', async () => {
        await page.click("//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Смотреть')]");
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
        ]);
        await newWindow.waitForLoadState();
        expect(page.context().pages()[1].url()).toContain('uat.dasreda.ru/learn/videos');
        await page.context().pages()[1].close();
    });

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});