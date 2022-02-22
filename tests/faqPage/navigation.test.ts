import {Browser, BrowserContext, chromium, Page} from "playwright";
import Header from "../../pages/blocks/header.pageBlock";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import MainPage from "../../pages/mainPage.page";

describe('Navigation tests for FAQ page', () => {

    describe("FAQ page navigation tests", () => {
        let faqPage: FAQPage;
        let mainPage: MainPage;
        let feedbackPage: FeedbackPage;
        let header: Header;

        beforeAll(async () => {
            faqPage = new FAQPage();
            mainPage = new MainPage();
            feedbackPage = new FeedbackPage();
            header = await faqPage.getHeader();
        });

        beforeEach(async () => {
            faqPage.goto(faqPage.path, "Open FAQ page");

        });

        test('Clicking on logo', async () => {
            await header.click(header.selectors.logo, "Click on logo icon");
            await mainPage.waitForNavigation("Wait for navigation main page");
            const title = await mainPage.getTextContent(mainPage.selectors.title, "Get text from main page title");
            expect(title).toContain(mainPage.checkData.title);
        });

        test('Clicking on Feedback button', async () => {
            await header.click(header.selectors.feedbackLink, "Click on feedback link in header");
            await feedbackPage.waitForNavigation("Wait for navigation feedback page");
            expect(await feedbackPage
                .isVisible(feedbackPage.selectors.messageTextInput, "Check visibility of feedback area on feedback page"))
                .toBeTruthy();
        });
    });

    

    // let browser: Browser;
    // let context: BrowserContext;
    // let page: Page;

    // const landingTitle = "бизнес легко и быстро";

    // beforeAll(async () => {
    //     browser = await chromium.launch({
    //         headless: false
    //     });
    //     context = await browser.newContext();
    //     page = await context.newPage();
    // });

    // test('Clicking on Feedback button', async () => {
    //     await page.goto("https://rbo.uat.dasreda.ru/rbidos/faq");
    //     await page.click("text='Обратная связь'");
    //     await page.waitForNavigation();
    //     const title = await page.$("h1");
    //     expect(await title.textContent()).toContain("Обратная связь");
    // });

    // test('Clicking on Read link in footer and go to Platform blogs', async () => {
    //     await page.goto("https://rbo.uat.dasreda.ru/rbidos/faq");
    //     await page.click("//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Читать')]");
    //     const [newWindow] = await Promise.all([
    //         context.waitForEvent("page"),
    //     ]);
    //     await newWindow.waitForLoadState();
    //     expect(page.context().pages()[1].url()).toContain('uat.dasreda.ru/learn/blog');
    //     await page.context().pages()[1].close();
    // });

    // test('Clicking on Read link in footer and go to Platform videos', async () => {
    //     await page.goto("https://rbo.uat.dasreda.ru/rbidos/faq");
    //     await page.click("//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Смотреть')]");
    //     const [newWindow] = await Promise.all([
    //         context.waitForEvent("page"),
    //     ]);
    //     await page.waitForTimeout(2000);
    //     //await newWindow.waitForLoadState();
    //     expect(page.context().pages()[1].url()).toContain('uat.dasreda.ru/learn/videos');
    //     await page.context().pages()[1].close();
    // });

    // afterAll(async () => {
    //     await page.close();
    //     await context.close();
    //     await browser.close();
    // });
});