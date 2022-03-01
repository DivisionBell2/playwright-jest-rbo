import FeedbackPage from "../../pages/feedback.page";
import MainPage from "../../pages/mainPage.page";
import Header from "../../pages/blocks/header.pageBlock";
import VideoFrame from "../../pages/blocks/videoFrame.pageBlock";
import Footer from "../../pages/blocks/footer.pageBlock";

describe("Navigation tests for feedback page", () => {
    let feedbackPage: FeedbackPage;
    let mainPage: MainPage;
    let header: Header;
    let videoFrame: VideoFrame;
    let footer: Footer;

    beforeAll(async () => {
        feedbackPage = new FeedbackPage();
        mainPage = new MainPage();
        header = await feedbackPage.getHeader();
        videoFrame = await feedbackPage.getVideoFrame();
        footer = await feedbackPage.getFooter();
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

    test('Open youtube frame from header', async () => {
        await header.click(header.selectors.videoButton, "Click video button on header");
        await videoFrame.waitForSelector(videoFrame.selectors.frame, "Wait for video frame appears");
        await videoFrame.click(videoFrame.selectors.closeButton, "Click for close button on video frame");
        expect(await videoFrame.isHidden(videoFrame.selectors.frame, "Wait for video frame is closed")).toBeTruthy();
    });

    test('Clicking on Read link in footer and go to Platform blogs', async () => {
        await footer.click(footer.selectors.readLink, "Click read link on footer");
        const newTab = await feedbackPage.getNewTab();
        expect(newTab.url()).toContain(footer.checkData.platformReadLink);
    });

    test('Clicking on Watch link in footer and go to Platform blogs', async () => {
        await footer.click(footer.selectors.watchLink, "Click watch link on footer");
        const newTab = await feedbackPage.getNewTab();
        expect(newTab.url()).toContain(footer.checkData.platformWatchLink);
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