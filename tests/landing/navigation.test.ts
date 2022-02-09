import { Page } from "playwright";
import PageTabsHelper from "../../helpers/pageTabs";
import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import FAQPage from "../../pages/FAQPage.page";
import FeedbackPage from "../../pages/feedback.page";
import MainPage from "../../pages/mainPage.page";
import SberbankPage from "../../pages/sberbankPage";

declare const page: Page;

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
        await mainPage.clickLandingStartEntrepreneurButton();
        expect(await enterPersonalDataPage.getTitleText()).toContain(enterPersonalDataPage.checkData.title);
    });

    test('Click on start business registration as legal entity', async () => {
        await mainPage.clickLandingStartLegalEntityButton();
        expect(await enterPersonalDataPage.getTitleText()).toContain(enterPersonalDataPage.checkData.title);
    });

    test('Click on start business registration as entrepreneur', async () => {
        await mainPage.clickBlockStartEntrepreneurButton();
        expect(await enterPersonalDataPage.getTitleText()).toContain(enterPersonalDataPage.checkData.title);
    });

    test('Click on start business registration as legal entity', async () => {
        await mainPage.clickBlockStartLegalEntityButton();
        expect(await enterPersonalDataPage.getTitleText()).toContain(enterPersonalDataPage.checkData.title);
    });

    test('Clicking on FAQ button', async () => {
        await (await mainPage.getHeader()).clickFAQLink();
        expect(await faqPage.getTitleText()).toContain(faqPage.checkData.title);
    });

    test('Clicking on Feedback button', async () => {
        await (await mainPage.getHeader()).clickFeedbackLink();
        expect(await feedbackPage.getTitleText()).toContain(feedbackPage.checkData.title);
    });

    test('Clicking on FAQ button in landing block', async () => {
        await mainPage.clickFAQButton();
        expect(await faqPage.getTitleText()).toContain(faqPage.checkData.title);
    });

    test('Clicking on SberIcon and go to sberbank.ru', async () => {
        await mainPage.clickSberbankButton();
        const newTab = await mainPage.getNewTab(page);
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
        const newTab = await mainPage.getNewTab(page);
        expect(newTab.url()).toContain(mainPage.checkData.ofertaUrl);
    });

    test('Clicking on Agreement link and go to agreement document', async () => {
        await mainPage.clickAgreementLink();
        const newTab = await mainPage.getNewTab(page);
        expect(newTab.url()).toContain(mainPage.checkData.agreementUrl);
    });

    test('Clicking on Read link in footer and go to Platform blogs', async () => {
        const footer = await mainPage.getFooter();
        await footer.clickReadLink();
        const newTab = await mainPage.getNewTab(page);
        expect(newTab.url()).toContain(footer.checkData.platformReadLink);
    });

    test('Clicking on Watch link in footer and go to Platform blogs', async () => {
        const footer = await mainPage.getFooter();
        await footer.clickWatchLink();
        const newTab = await mainPage.getNewTab(page);
        expect(newTab.url()).toContain(footer.checkData.platformWatchLink);
    });

    afterEach(async () => {
        await PageTabsHelper.saveOnlyOneTab(page);
    });
});