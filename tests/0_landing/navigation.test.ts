import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import MainPage from "../../pages/mainPage.page";
import SberbankPage from "../../pages/sberbankPage";
import * as urlData from "../../data/checkDataUrls.json"
import Header from "../../pages/blocks/header.pageBlock";
import VideoFrame from "../../pages/blocks/videoFrame.pageBlock";
import Footer from "../../pages/blocks/footer.pageBlock";

describe("Navigation on main page", () => {
    let mainPage: MainPage;
    let faqPage: FAQPage;
    let enterPersonalDataPage: EnterPersonalDataPage;
    let feedbackPage: FeedbackPage;
    let sberbankPage: SberbankPage;
    let header: Header;
    let videoFrame: VideoFrame;
    let footer: Footer;

    beforeAll(async () => {
        mainPage = new MainPage();
        enterPersonalDataPage = new EnterPersonalDataPage();
        faqPage = new FAQPage();
        feedbackPage = new FeedbackPage();
        sberbankPage = new SberbankPage();
        header = await mainPage.getHeader();
        videoFrame = await mainPage.getVideoFrame();
        footer = await mainPage.getFooter();
    });

    beforeEach(async () => {
        await mainPage.goToMainPage();
    });

    test('Click on start business registration as entrepreneur', async () => {
        await mainPage.click(mainPage.selectors.landingStartEntrepreneurButton, "Click entrepreneur button");
        expect(await enterPersonalDataPage.getTextContent(enterPersonalDataPage.selectors.title, "Get title text from personal data page"))
        .toContain(enterPersonalDataPage.checkData.title);
    });

    test('Click on start business registration as legal entity', async () => {
        await mainPage.click(mainPage.selectors.landingStartLegalEntityButton, "Click entrepreneur button");
        expect(await enterPersonalDataPage.getTextContent(enterPersonalDataPage.selectors.title, "Get title text from personal data page"))
        .toContain(enterPersonalDataPage.checkData.title);
    });

    test('Click on start business registration as entrepreneur', async () => {
        await mainPage.click(mainPage.selectors.blockStartEntrepreneurButton, "Click entrepreneur button in landing info block");
        expect(await enterPersonalDataPage.getTextContent(enterPersonalDataPage.selectors.title, "Get title text from personal data page"))
        .toContain(enterPersonalDataPage.checkData.title);
    });

    test('Click on start business registration as legal entity', async () => {
        await mainPage.click(mainPage.selectors.blockStartLegalEntityButton, "Click legal entity button in landing info block");
        expect(await enterPersonalDataPage.getTextContent(enterPersonalDataPage.selectors.title, "Get title text from personal data page"))
        .toContain(enterPersonalDataPage.checkData.title);
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

    test('Clicking on FAQ button in landing block', async () => {
        await mainPage.click(mainPage.selectors.faqButton, "Click on FAQ button on landing");
        expect(await faqPage.isVisible(faqPage.selectors.searchInput, "Check search input on FAQ page is visible")).toBeTruthy();
    });

    test('Clicking on SberIcon and go to sberbank.ru', async () => {
        await mainPage.click(mainPage.selectors.goToSberBankButton, "Click on go to Sberbank button");
        const newTab = await mainPage.getNewTab();
        expect(newTab.url()).toContain(sberbankPage.checkData.urlDomen);
    });

    test('Open youtube frame from header', async () => {
        await header.click(header.selectors.videoButton, "Click video button on header");
        await videoFrame.waitForSelector(videoFrame.selectors.frame, "Wait for video frame appears");
        await videoFrame.click(videoFrame.selectors.closeButton, "Click for close button on video frame");
        expect(await videoFrame.isHidden(videoFrame.selectors.frame, "Wait for video frame is closed")).toBeTruthy();
    });

    test('Clicking on Oferta link and go to oferta document', async () => {
        await mainPage.click(mainPage.selectors.ofertaLink, "Click oferta link");
        const newTab = await mainPage.getNewTab();
        expect(newTab.url()).toContain(urlData.ofertaLink);
    });

    test('Clicking on Agreement link and go to agreement document', async () => {
        await mainPage.click(mainPage.selectors.agreementLink, "Click agreements link");
        const newTab = await mainPage.getNewTab();
        expect(newTab.url()).toContain(urlData.agreements);
    });

    test('Clicking on Read link in footer and go to Platform blogs', async () => {
        footer.click(footer.selectors.readLink, "Click on read link on footer");
        const newTab = await mainPage.getNewTab();
        expect(newTab.url()).toContain(footer.checkData.platformReadLink);
    });

    test('Clicking on Watch link in footer and go to Platform blogs', async () => {
        footer.click(footer.selectors.watchLink, "Click on watch link on footer");
        const newTab = await mainPage.getNewTab();
        expect(newTab.url()).toContain(footer.checkData.platformWatchLink);
    });

    afterEach(async () => {
        await mainPage.saveOnlyOneTab();
    });
});