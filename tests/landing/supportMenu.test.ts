import MainPage from "../../pages/mainPage.page";
import FeedbackPage from "../../pages/feedback.page";

describe("Working of support menu", () => {
    let mainPage: MainPage;
    let feedbackPage: FeedbackPage;

    beforeAll(async () => {
        mainPage = new MainPage();
        feedbackPage = new FeedbackPage();
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
});