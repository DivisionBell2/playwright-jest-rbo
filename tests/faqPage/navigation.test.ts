import Footer from "../../pages/blocks/footer.pageBlock";
import Header from "../../pages/blocks/header.pageBlock";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import MainPage from "../../pages/mainPage.page";

describe("Navigation tests for faq page", () => {
    let faqPage: FAQPage;
    let mainPage: MainPage;
    let header: Header;
    let feedbackPage: FeedbackPage;
    let footer: Footer;

    beforeAll(async () => {
        faqPage = new FAQPage();
        mainPage = new MainPage();
        feedbackPage = new FeedbackPage();
        header = await faqPage.getHeader();
        footer = await faqPage.getFooter();
    });

    beforeEach(async () => {
        await faqPage.goto(faqPage.path, "Open feedback page");
    });

    test('Clicking on logo', async () => {
        await header.click(header.selectors.logo, "Click on logo icon");
        await mainPage.waitForNavigation("Wait for navigation main page");
        const title = await mainPage.getTextContent(mainPage.selectors.title, "Get text from main page title");
        expect(title).toContain(mainPage.checkData.title);
    });

    test('Clicking on feedback button', async () => {
        await header.click(header.selectors.feedbackLink, "Сlick feedback link in header");
        await feedbackPage.waitForNavigation("wait for navigation feedback page");
        expect(await feedbackPage.isVisible(feedbackPage.selectors.messageTextInput, "Check visibility of message text input on feedback page"))
        .toBeTruthy();
    });

    test('Clicking on Read link in footer and go to Platform blogs', async () => {
        footer.click(footer.selectors.readLink, "Click on read link on footer");
        const newTab = await faqPage.getNewTab();
        expect(newTab.url()).toContain(footer.checkData.platformReadLink);
    });

    test('Clicking on Watch link in footer and go to Platform blogs', async () => {
        footer.click(footer.selectors.watchLink, "Click on watch link on footer");
        const newTab = await mainPage.getNewTab();
        expect(newTab.url()).toContain(footer.checkData.platformWatchLink);
    });

    afterEach(async () => {
        await faqPage.saveOnlyOneTab();
    });
});