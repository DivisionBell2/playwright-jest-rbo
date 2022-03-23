import Header from "../../pages/blocks/header.pageBlock";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import User from "../../data/user";
import MainPage from "../../pages/mainPage.page";
import CheckOnlineRegistrationPage from "../../pages/checkOnlineRegistrationPage.page";
import PassportDataPage from "../../pages/passportDataPage.page";
import PhoneValidationPage from "../../pages/phoneValidationPage.page";
import VideoFrame from "../../pages/blocks/videoFrame.pageBlock";
import Footer from "../../pages/blocks/footer.pageBlock";
import * as urlData from "../../data/checkDataUrls.json"

let phoneValidationPage = new PhoneValidationPage();
const paths = [
    phoneValidationPage.paths.entrepreneur,
    phoneValidationPage.paths.legalEntity,
];

paths.forEach(path => {
    describe("Navigation tests for passport data page", () => {
        let faqPage: FAQPage;
        let mainPage: MainPage;
        let header: Header;
        let feedbackPage: FeedbackPage;
        let passportDataPage: PassportDataPage;
        let checkOnlineRegistrationPage: CheckOnlineRegistrationPage;
        let videoFrame: VideoFrame;
        let user: User;
        let footer: Footer;
        
        beforeAll(async () => {
            passportDataPage = new PassportDataPage();
            faqPage = new FAQPage();
            mainPage = new MainPage();
            feedbackPage = new FeedbackPage();
            checkOnlineRegistrationPage = new CheckOnlineRegistrationPage();
            videoFrame = new VideoFrame();
            footer = new Footer();
            header = await passportDataPage.getHeader();
        });

        beforeEach(async () => {
            user = new User();
            await mainPage.goto("/", "Go to main page");
            await mainPage.clickOnCookieButton();
            await (await mainPage.getAuthPopup()).login(user);
            await checkOnlineRegistrationPage.goto(path, "Open phone validation page for " + path);
            await phoneValidationPage.basePhoneValidation("Phone validation for passport data navigation tests");
            await checkOnlineRegistrationPage.selectBaseOnlineRegistration("Select online registration for passport data navigation tests");
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

        test('Open youtube frame from header', async () => {
            await header.click(header.selectors.videoButton, "Click video button on header");
            await videoFrame.waitForSelector(videoFrame.selectors.frame, "Wait for video frame appears");
            await videoFrame.click(videoFrame.selectors.closeButton, "Click for close button on video frame");
            expect(await videoFrame.isHidden(videoFrame.selectors.frame, "Wait for video frame is closed")).toBeTruthy();
        });

        test('Clicking on Feedback button', async () => {
            await header.click(header.selectors.feedbackLink, "Сlick feedback link in header");
            await feedbackPage.waitForNavigation("wait for navigation feedback page");
            expect(await feedbackPage.isVisible(feedbackPage.selectors.messageTextInput, "Check visibility of message text input on feedback page"))
            .toBeTruthy();
        });

        test('Clicking on oferta link in footer', async () => {
            await footer.click(footer.selectors.ofertaLink, "Click on oferta link");
            const newTab = await phoneValidationPage.getNewTab();
            expect(newTab.url()).toContain(urlData.ofertaLink);
        });

        test('Clicking on agreement link in footer', async () => {
            await footer.click(footer.selectors.agreementPersonalDataLink, "Click on agreement link");
            const newTab = await phoneValidationPage.getNewTab();
            expect(newTab.url()).toContain(urlData.agreements);
        });

        afterEach(async () => {
            await passportDataPage.saveOnlyOneTab();
            await passportDataPage.clear();
            await passportDataPage.reload("Reload page");
        });
    });
});