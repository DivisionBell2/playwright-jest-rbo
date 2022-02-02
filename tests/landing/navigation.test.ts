import {Browser, BrowserContext, chromium, Page} from "playwright";
import PageTabsHelper from "../../helpers/pageTabs";
import Header from "../../pages/blocks/Header.page";
import VideoFrame from "../../pages/blocks/VideoFrame.page";
import EnterPersonalDataPage from "../../pages/EnterPersonalData.page";
import FAQPage from "../../pages/FAQPage.page";
import FeedbackPage from "../../pages/Feedback.page";
import MainPage from "../../pages/MainPage.page";
import SberbankPage from "../../pages/SberbankPage";

describe('Navigation on main page', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let mainPage: MainPage;
    let faqPage: FAQPage;
    let enterPersonalDataPage: EnterPersonalDataPage;
    let feedbackPage: FeedbackPage;
    let sberbankPage: SberbankPage;

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false,
        });
        context = await browser.newContext();
        page = await context.newPage();
        mainPage = new MainPage(page);
        enterPersonalDataPage = new EnterPersonalDataPage(page);
        faqPage = new FAQPage(page);
        feedbackPage = new FeedbackPage(page);
        sberbankPage = new SberbankPage(page);
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
        const newTab = await PageTabsHelper.getNewTab(context, page);
        expect(newTab.url()).toContain(sberbankPage.checkData.urlDomen);
        //newTab.close();
    });

    test('Open youtube frame from header', async () => {
        await (await mainPage.getHeader()).clickVideoButton();
        const videoFrame = await mainPage.getVideoFrame();
        await (videoFrame).waitForVideoFrame();
        await (videoFrame).clickCloseButton();
        expect(await (await mainPage.getVideoFrame()).waitForVideoFrameHidden()).toBe(true);
    });

    test('Clicking on Oferta link and go to oferta document', async () => {
        await mainPage.clickOfertaLink();
        const newTab = await PageTabsHelper.getNewTab(context, page);
        expect(newTab.url()).toContain(mainPage.checkData.ofertaUrl);
        //newTab.close();
    });

    test('Clicking on Agreement link and go to agreement document', async () => {
        await mainPage.clickAgreementLink();
        const newTab = await PageTabsHelper.getNewTab(context, page);
        expect(newTab.url()).toContain(mainPage.checkData.agreementUrl);
        //newTab.close();
    });

    test('Clicking on Read link in footer and go to Platform blogs', async () => {
        const footer = await mainPage.getFooter();
        await footer.clickReadLink();
        const newTab = await PageTabsHelper.getNewTab(context, page);
        expect(newTab.url()).toContain(footer.checkData.platformReadLink);
        //newTab.close();
    });

    test('Clicking on Watch link in footer and go to Platform blogs', async () => {
        const footer = await mainPage.getFooter();
        await footer.clickWatchLink();
        const newTab = await PageTabsHelper.getNewTab(context, page);
        expect(newTab.url()).toContain(footer.checkData.platformWatchLink);
        //newTab.close();
    });

    afterEach(async () => {
        await PageTabsHelper.saveOnlyOneTab(page);
    });

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});