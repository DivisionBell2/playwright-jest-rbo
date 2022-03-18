import Header from "../../pages/blocks/header.pageBlock";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import User from "../../data/user";
import MainPage from "../../pages/mainPage.page";
import CheckOnlineRegistrationPage from "../../pages/checkOnlineRegistrationPage.page";
import * as baseUrl from "../../data/url.json";

let checkOnlineRegistrationPage = new CheckOnlineRegistrationPage();
const paths = [
    checkOnlineRegistrationPage.paths.entrepreneur,
    checkOnlineRegistrationPage.paths.legalEntity,
];

paths.forEach(path => {
    describe("Navigation tests for check online registration page", () => {
        let faqPage: FAQPage;
        let mainPage: MainPage;
        let header: Header;
        let feedbackPage: FeedbackPage;
        let user: User;
    
        beforeAll(async () => {
            faqPage = new FAQPage();
            mainPage = new MainPage();
            feedbackPage = new FeedbackPage();
            checkOnlineRegistrationPage = new CheckOnlineRegistrationPage();
            header = await checkOnlineRegistrationPage.getHeader();
            user = new User();
            await mainPage.goto("/", "Go to main page");
            await (await mainPage.getAuthPopup()).login(user);
        });

        beforeEach(async () => {
            await checkOnlineRegistrationPage.goto(path, "Open phone validation page for " + path);
        });

        test('Clicking on logo', async () => {
            await header.click(header.selectors.logo, "Click on logo icon");
            const title = await mainPage.getTextContent(mainPage.selectors.title, "Get text from main page title");
            expect(title).toContain(mainPage.checkData.title);
        });

        test('Clicking on FAQ button', async () => {
            await header.click(header.selectors.faqLink, "Click on faq link in header");
            expect(await faqPage.isVisible(faqPage.selectors.searchInput, "Check search input visible on faq page")).toBeTruthy();
        });

        test('Clicking on Feedback button', async () => {
            await header.click(header.selectors.feedbackLink, "Сlick feedback link in header");
            await feedbackPage.waitForNavigation("wait for navigation feedback page");
            expect(await feedbackPage.isVisible(feedbackPage.selectors.messageTextInput, "Check visibility of message text input on feedback page"))
            .toBeTruthy();
        });

        test('Clicking on how to know android version link', async () => {
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.howToKnowAndroidVersionLink, "Click on how to know android version link");
            const newTab = await checkOnlineRegistrationPage.getNewTab();

            expect(newTab.url()).toContain(baseUrl.url + faqPage.path);
            expect(
                faqPage.isVisible(faqPage.selectors.androidVersionInfoBlock, "Check the visibility of android version info block on FAQ page")
                ).toBeTruthy();
            expect(faqPage.isVisible(faqPage.selectors.androidImage, "Check the visibility of android image on FAQ page")).toBeTruthy();
        });

        test('Clicking on how to know about NFC link', async () => {
            await checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.nfcInfoLink, "Click on how to know about NFC");
            expect(checkOnlineRegistrationPage.isVisible(checkOnlineRegistrationPage.selectors.infoModalWindow, "Check visibility of info modal window")).toBeTruthy();
            checkOnlineRegistrationPage.click(checkOnlineRegistrationPage.selectors.modalWindowOkButton, "Click OK button");
            expect(checkOnlineRegistrationPage.isHidden(checkOnlineRegistrationPage.selectors.infoModalWindow, "Check nonvisibility of info modal window")).toBeTruthy();
        });

        afterEach(async () => {
            await checkOnlineRegistrationPage.saveOnlyOneTab();
        });

        afterAll(async () => {
            await checkOnlineRegistrationPage.clear();
        });
    });
});