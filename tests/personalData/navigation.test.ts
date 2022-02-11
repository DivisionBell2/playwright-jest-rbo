import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import MainPage from "../../pages/mainPage.page";
import PlatformPage from "../../pages/platform.page";
import SberIDPage from "../../pages/sberId.page";
import * as urlData from "../../data/checkDataUrls.json";

const requestTypes = [
    "Entrepreneur",
    "Legal Entity",
];

describe("Navigation on enter personal data page", () => {
    let enterPersonalDataPage: EnterPersonalDataPage;
    let faqPage: FAQPage;
    let mainPage: MainPage;
    let sberIdPage: SberIDPage;
    let feedbackPage: FeedbackPage;
    let platformPage: PlatformPage;

    beforeAll(async () => {
        enterPersonalDataPage = new EnterPersonalDataPage();
        faqPage = new FAQPage();
        mainPage = new MainPage();
        sberIdPage = new SberIDPage();
        feedbackPage = new FeedbackPage();
        platformPage = new PlatformPage();
    });

    requestTypes.forEach(requestType => {
        beforeEach(async () => {
            console.log("Test for " + requestType + " request")
            if (requestType == "Entrepreneur") {
                await enterPersonalDataPage.goToEnterPersonalDataPageEntrepreneur();
            } else {
                await enterPersonalDataPage.goToEnterPersonalDataPageLegalEntity();
            }
        });
    
        test('Clicking on FAQ button', async () => {
            await (await enterPersonalDataPage.getHeader()).clickFAQLink();
            expect(await faqPage.getTitleText()).toContain(faqPage.checkData.title);
        });

        test('Clicking on logo', async () => {
            await enterPersonalDataPage.clickLogo();
            expect(await mainPage.getTitleText()).toContain(mainPage.checkData.title);
        });

        test('Clicking on login through SberId button', async () => {
            await enterPersonalDataPage.clickSberIdButton();
            expect(await sberIdPage.getTitleText()).toContain(sberIdPage.checkData.title);
        });

        test('Clicking on Feedback button', async () => {
            await (await enterPersonalDataPage.getHeader()).clickFeedbackLink();
            await feedbackPage.waitForNavigationFeedbackPage();
            expect(await feedbackPage.getTitleText()).toContain(feedbackPage.checkData.title);
        });

        test('Clicking on dasreda.ru link', async () => {
            await enterPersonalDataPage.clickDasredaLink();
            const newTab = await enterPersonalDataPage.getNewTab();
            expect(newTab.url()).toContain(platformPage.checkData.urlDomen);
        });

        test('Clicking on agreement link', async () => {
            await enterPersonalDataPage.clickAgreementsLink();
            const newTab = await enterPersonalDataPage.getNewTab();
            expect(newTab.url()).toContain(urlData.agreements);
        });

        test('Clicking on oferta link in footer', async () => {
            await (await enterPersonalDataPage.getFooter()).clickOfertaLink();
            const newTab = await enterPersonalDataPage.getNewTab();
            expect(newTab.url()).toContain(urlData.ofertaLink);
        });

        afterEach(async () => {
            await enterPersonalDataPage.saveOnlyOneTab();
        });
    });
});