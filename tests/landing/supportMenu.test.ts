import {Browser, BrowserContext, chromium, Page} from "playwright";
import MainPage from "../../pages/MainPage.page";
import FeedbackPage from "../../pages/Feedback.page";

describe("Working of support menu", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let mainPage: MainPage;
    let feedbackPage: FeedbackPage;

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        mainPage = new MainPage(page);
        feedbackPage = new FeedbackPage(page);
        await mainPage.goToMainPage();
        await mainPage.clickCookieButton();
    });

    beforeEach(async () => {
        await mainPage.goToMainPage();
        await (await mainPage.getSupportMenu()).clickToOpenSupportMenuButton();
    });

    test("Open and close support menu", async () => {
        const supportMenu = await mainPage.getSupportMenu();
        await supportMenu.clickToCloseSupportMenu();
        expect(await supportMenu.waitForVideoFrameHidden()).toBeTruthy();
    });

    test("Open and close support phone popup", async () => {
        const supportMenu = await mainPage.getSupportMenu();
        await supportMenu.clickPhoneButton();
        expect(await supportMenu.waitForDialogWindowVisible()).toBeTruthy();
        await supportMenu.clickCloseDialogWindotButton();
        expect(await supportMenu.waitForDialogWindowHidden()).toBeTruthy();
    });

    test("Open and close telegram popup", async () => {
        const supportMenu = await mainPage.getSupportMenu();
        await supportMenu.clickTelegramButton();
        expect(await supportMenu.waitForDialogWindowVisible()).toBeTruthy();
        await supportMenu.clickCloseDialogWindotButton();
        expect(await supportMenu.waitForDialogWindowHidden()).toBeTruthy();
    });

    test("Go to feedback page", async () => {
        await (await mainPage.getSupportMenu()).clickFeedbackButton();
        expect(await feedbackPage.getTitleText()).toContain(feedbackPage.checkData.title);
    });

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});