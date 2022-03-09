import MainPage from "../../pages/mainPage.page";
import FeedbackPage from "../../pages/feedback.page";
import SupportMenu from "../../pages/blocks/supportMenu.pageBlock";

describe("Working of support menu", () => {
    let mainPage: MainPage;
    let feedbackPage: FeedbackPage;
    let supportMenu: SupportMenu;

    beforeAll(async () => {
        mainPage = new MainPage();
        feedbackPage = new FeedbackPage();
        supportMenu = await mainPage.getSupportMenu();
        await mainPage.goto("", "Go to main page");
        await mainPage.click(mainPage.selectors.cookieButton, "Click on cookie agreement button");
    });

    beforeEach(async () => {
        await mainPage.goto("", "Go to main page");
        await mainPage.clickOnCookieButton();
        await supportMenu.click(supportMenu.selectors.supportMenuButton, "Click on support menu button");
    });

    test("Close support menu", async () => {
        await supportMenu.click(supportMenu.selectors.supportMenuOpenedButton, "Click on close support menu button");
        expect (await supportMenu.isHidden(supportMenu.selectors.supportMenuOpenedButton, "Wait for support menu closed")).toBeTruthy();
    });

    test("Open and close support phone popup", async () => {
        await supportMenu.click(supportMenu.selectors.phoneButton, "Click on phone button in support menu");
        expect(await supportMenu.isVisible(supportMenu.selectors.dialogWindow, "Check is dialog phone window visible")).toBeTruthy();
        await supportMenu.click(supportMenu.selectors.closeDialogWindowButton, "Click on close dialog phone window");
        expect(await supportMenu.isHidden(supportMenu.selectors.dialogWindow, "Check is dialog phone window hidden")).toBeTruthy();
    });

    test("Open and close telegram popup", async () => {
        await supportMenu.click(supportMenu.selectors.telegramButton, "Click on telegram button in support menu");
        expect(await supportMenu.isVisible(supportMenu.selectors.dialogWindow, "Check is dialog telegram window visible")).toBeTruthy();
        await supportMenu.click(supportMenu.selectors.closeDialogWindowButton, "Click on close dialog phone window");
        expect(await supportMenu.isHidden(supportMenu.selectors.dialogWindow, "Check is dialog phone window hidden")).toBeTruthy();
    });

    test("Go to feedback page", async () => {
        await supportMenu.click(supportMenu.selectors.feedBackButton, "Click on feedback button in support menu");
        expect(await feedbackPage.isVisible(
            feedbackPage.selectors.messageTextInput,
            "Check the feedback message text input on feedback page is visible"
            )).toBeTruthy();
    });
});