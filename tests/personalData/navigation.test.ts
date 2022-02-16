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

requestTypes.forEach(requestType => {
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
            expect(await faqPage.checkSearchInputVisible()).toBeTruthy();
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
            expect(await feedbackPage.checkMessageTextInputVisible()).toBeTruthy();
        });

        test('Clicking on dasreda.ru link', async () => {
            await enterPersonalDataPage.clickDasredaLink();
            await checkUrlInNewTab(platformPage.checkData.urlDomen);
        });

        test('Clicking on agreement link', async () => {
            await enterPersonalDataPage.clickAgreementsLink();
            await checkUrlInNewTab(urlData.agreementsPlatform);
        });

        test('Clicking on oferta link in footer', async () => {
            await (await enterPersonalDataPage.getFooter()).clickOfertaLink();
            await checkUrlInNewTab(urlData.ofertaLink);
        });

        test('Clicking on privacy policy link in footer', async () => {
            await(await enterPersonalDataPage.getFooter()).clickPrivacyPolicyLink();
            await checkUrlInNewTab(urlData.privacyPolicyLink);
        });

        test('Clicking on personal data agreement link in footer', async () => {
            await(await enterPersonalDataPage.getFooter()).clickAgreementLink();
            await checkUrlInNewTab(urlData.agreements);
        });

        afterEach(async () => {
            await enterPersonalDataPage.saveOnlyOneTab();
            await enterPersonalDataPage.clear();
        });

        async function checkUrlInNewTab(urlPart: string) {
            const newTab = await enterPersonalDataPage.getNewTab();
            expect(newTab.url()).toContain(urlPart);
        }
    });
});