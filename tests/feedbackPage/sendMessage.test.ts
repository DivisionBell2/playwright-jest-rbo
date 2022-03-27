import FeedbackPage from "../../pages/feedback.page";
import User from "../../data/user";
import AuthPopup from "../../pages/blocks/authPopup.pageBlock";

describe("Navigation tests for feedback page", () => {
    let feedbackPage: FeedbackPage;
    let authPopup: AuthPopup;

    let user: User;

    beforeAll(async () => {
        feedbackPage = new FeedbackPage();
        authPopup = new AuthPopup();
    });

    beforeEach(async () => {
        await feedbackPage.goto(feedbackPage.path, "Open feedback page");
        user = new User();
    });

    test("Send message by not authorized user", async () => {
        await feedbackPage.fill(feedbackPage.selectors.messageTextInput, "Тестовое сообщение", "Enter text message for feedback");
        await feedbackPage.fill(feedbackPage.selectors.usermailInput, user.email, "Enter user email for feedback");
        expect(await feedbackPage.isDisabled(feedbackPage.selectors.sendButton, "Check send message button is enabled")).toBeFalsy();

        await feedbackPage.click(feedbackPage.selectors.sendButton, "Click on send message button");
        await feedbackPage.waitForSelector(feedbackPage.selectors.infoSendedMessageText, "Wait for info about sended message");
        expect(await feedbackPage.isDisabled(feedbackPage.selectors.sendButton, "Check send message button is disabled")).toBeTruthy();
        expect(await feedbackPage.isVisible(feedbackPage.selectors.messageTextInput, "Check message input is hidden")).toBeFalsy();
    });

    test("Send message by authorized user", async () => {
        await authPopup.login(user);
        await feedbackPage.fill(feedbackPage.selectors.messageTextInput, "Тестовое сообщение", "Enter text message for feedback");
        expect(await feedbackPage.isDisabled(feedbackPage.selectors.sendButton, "Check send message button is enabled")).toBeFalsy();
        
        await feedbackPage.click(feedbackPage.selectors.sendButton, "Click on send message button");
        await feedbackPage.waitForSelector(feedbackPage.selectors.infoSendedMessageText, "Wait for info about sended message");
        expect(await feedbackPage.isDisabled(feedbackPage.selectors.sendButton, "Check send message button is disabled")).toBeTruthy();
        expect(await feedbackPage.isVisible(feedbackPage.selectors.messageTextInput, "Check message input is hidden")).toBeFalsy();
    });

    afterEach(async () => {
        await feedbackPage.clear();
    });
});