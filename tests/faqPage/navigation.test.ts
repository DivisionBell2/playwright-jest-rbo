import Footer from "../../pages/blocks/footer.pageBlock";
import Header from "../../pages/blocks/header.pageBlock";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import MainPage from "../../pages/mainPage.page";

describe("FAQ page navigation tests", () => {
    let faqPage: FAQPage;
    let mainPage: MainPage;
    let feedbackPage: FeedbackPage;
    let header: Header;
    let footer: Footer;

    beforeAll(async () => {
        faqPage = new FAQPage();
        mainPage = new MainPage();
        feedbackPage = new FeedbackPage();
        header = await faqPage.getHeader();
        footer = await faqPage.getFooter();

        faqPage.click(faqPage.selectors.cookieButton, "Click on cookie button on FAQ page");
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

    test('Clicking on Read link in footer and go to Platform blogs', async () => {
        await footer.click(footer.selectors.readLink, "Click on read link on footer");
        const newTab = await faqPage.getNewTab("Get new browser tab");
        expect(newTab.url()).toContain(footer.checkData.platformReadLink);
    });

    test('Clicking on Watch link in footer and go to Platform videos', async () => {
        await footer.click(footer.selectors.watchLink, "Click on watch link on footer");
        const newTab = await faqPage.getNewTab("Get new browser tab");
        expect(newTab.url()).toContain(footer.checkData.platformWatchLink);
    });

    afterEach(async () => {
        await faqPage.saveOnlyOneTab();
    });
});