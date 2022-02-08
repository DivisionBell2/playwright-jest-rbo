import { Page } from "playwright";
import PageTabsHelper from "../../helpers/pageTabs";
import EnterPersonalDataPage from "../../pages/EnterPersonalData.page";
import FAQPage from "../../pages/FAQPage.page";
import FeedbackPage from "../../pages/Feedback.page";
import MainPage from "../../pages/MainPage.page";
import SberbankPage from "../../pages/SberbankPage";

declare const page: Page;

describe("Navigation on main page", () => {
    let mainPage: MainPage;
    let faqPage: FAQPage;
    let enterPersonalDataPage: EnterPersonalDataPage;
    let feedbackPage: FeedbackPage;
    let sberbankPage: SberbankPage;

    beforeAll(async () => {
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

    afterEach(async () => {
        await PageTabsHelper.saveOnlyOneTab(page);
    });
});