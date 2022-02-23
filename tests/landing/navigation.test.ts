import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import MainPage from "../../pages/mainPage.page";
import SberbankPage from "../../pages/sberbankPage";
import * as urlData from "../../data/checkDataUrls.json"

describe("Navigation on main page", () => {
    let mainPage: MainPage;
    let faqPage: FAQPage;
    let enterPersonalDataPage: EnterPersonalDataPage;
    let feedbackPage: FeedbackPage;
    let sberbankPage: SberbankPage;

    beforeAll(async () => {
        mainPage = new MainPage();
        enterPersonalDataPage = new EnterPersonalDataPage();
        faqPage = new FAQPage();
        feedbackPage = new FeedbackPage();
        sberbankPage = new SberbankPage();
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
        await (await mainPage.getHeader()).clickFAQLink();
        expect(await faqPage.checkSearchInputVisible()).toBeTruthy();
    });

    test('Clicking on Feedback button', async () => {
        await (await mainPage.getHeader()).clickFeedbackLink();
        await feedbackPage.waitForNavigationFeedbackPage();
        expect(await feedbackPage.checkMessageTextInputVisible()).toBeTruthy();
    });

    test('Clicking on FAQ button in landing block', async () => {
        await mainPage.clickFAQButton();
        expect(await faqPage.checkSearchInputVisible()).toBeTruthy();
    });

    test('Clicking on SberIcon and go to sberbank.ru', async () => {
        await mainPage.clickSberbankButton();
        const newTab = await mainPage.getNewTab();
        expect(newTab.url()).toContain(sberbankPage.checkData.urlDomen);
    });

    test('Open youtube frame from header', async () => {
        await (await mainPage.getHeader()).clickVideoButton();
        const videoFrame = await mainPage.getVideoFrame();
        await videoFrame.waitForVideoFrame();
        await videoFrame.clickCloseButton();
        expect(await (await mainPage.getVideoFrame()).waitForVideoFrameHidden()).toBe(true);
    });

    test('Clicking on Oferta link and go to oferta document', async () => {
        await mainPage.clickOfertaLink();
        const newTab = await mainPage.getNewTab();
        expect(newTab.url()).toContain(urlData.ofertaLink);
    });

    test('Clicking on Agreement link and go to agreement document', async () => {
        await mainPage.clickAgreementLink();
        const newTab = await mainPage.getNewTab();
        expect(newTab.url()).toContain(urlData.agreements);
    });

    test('Clicking on Read link in footer and go to Platform blogs', async () => {
        const footer = await mainPage.getFooter();
        await footer.clickReadLink();
        const newTab = await mainPage.getNewTab();
        expect(newTab.url()).toContain(footer.checkData.platformReadLink);
    });

    test('Clicking on Watch link in footer and go to Platform blogs', async () => {
        const footer = await mainPage.getFooter();
        await footer.clickWatchLink();
        const newTab = await mainPage.getNewTab();
        expect(newTab.url()).toContain(footer.checkData.platformWatchLink);
    });

    afterEach(async () => {
        await mainPage.saveOnlyOneTab();
    });
});