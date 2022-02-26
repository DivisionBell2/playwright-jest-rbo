import FeedbackPage from "../../pages/feedback.page";
import MainPage from "../../pages/mainPage.page";
import Header from "../../pages/blocks/header.pageBlock";

describe("Navigation tests for feedback page", () => {
    let feedbackPage: FeedbackPage;
    let mainPage: MainPage;
    let header: Header;

    beforeAll(async () => {
        feedbackPage = new FeedbackPage();
        mainPage = new MainPage();
        header = await feedbackPage.getHeader();
    });

    beforeEach(async () => {
        await feedbackPage.goto(feedbackPage.path, "Open feedback page");
    });

    test('Clicking on logo', async () => {
        await header.click(header.selectors.logo, "Click on logo icon");
        await mainPage.waitForNavigation("Wait for navigation main page");
        const title = await mainPage.getTextContent(mainPage.selectors.title, "Get text from main page title");
        expect(title).toContain(mainPage.checkData.title);
    });

    afterEach(async () => {
        await mainPage.saveOnlyOneTab();
    });
});

// import {Browser, BrowserContext, chromium, Page} from "playwright";

// describe('Navigation tests for feedback page', () => {
//     let browser: Browser;
//     let context: BrowserContext;
//     let page: Page;

//     const landingTitle = "бизнес легко и быстро";

//     beforeAll(async () => {
//         browser = await chromium.launch({
//             headless: false
//         });
//         context = await browser.newContext();
//         page = await context.newPage();
//         await page.goto("https://rbo.uat.dasreda.ru/rbidos/feedback");
//     });

//     test('Clicking on logo', async () => {
//         await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
//         await page.waitForNavigation();
//         const title = await page.$("#test-landing-header-text");
//         expect(await title.textContent()).toContain(landingTitle);
//     });

//     test('Open youtube frame from header', async () => {
//         await page.click("//span[@role='button' and contains(., 'Видеоинструкция')]");
//         const frame = page.frame("//iframe[@title='YouTube video player']");
//         await page.click("//i[@aria-label='icon: close']");
//     });

//     test('Clicking on Read link in footer and go to Platform blogs', async () => {
//         await page.click("//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Читать')]");
//         const [newWindow] = await Promise.all([
//             context.waitForEvent("page"),
//         ]);
//         await newWindow.waitForLoadState();
//         expect(page.context().pages()[1].url()).toContain('uat.dasreda.ru/learn/blog');
//         await page.context().pages()[1].close();
//     });

//     test('Clicking on Watch link in footer and go to Platform videos', async () => {
//         await page.click("//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Смотреть')]");
//         const [newWindow] = await Promise.all([
//             context.waitForEvent("page"),
//         ]);
//         await newWindow.waitForLoadState();
//         expect(page.context().pages()[1].url()).toContain('uat.dasreda.ru/learn/videos');
//         await page.context().pages()[1].close();
//     });

//     test('Clicking on Watch link in footer and go to Platform courses', async () => {
//         await page.click("//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Учиться')]");
//         const [newWindow] = await Promise.all([
//             context.waitForEvent("page"),
//         ]);
//         await newWindow.waitForLoadState();
//         expect(page.context().pages()[1].url()).toContain('uat.dasreda.ru/learn/courses');
//         await page.context().pages()[1].close();
//     });

//     afterAll(async () => {
//         await page.close();
//         await context.close();
//         await browser.close();
//     });
// });