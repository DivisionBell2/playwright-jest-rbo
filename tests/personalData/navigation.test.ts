import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import MainPage from "../../pages/mainPage.page";
import SberIDPage from "../../pages/sberId.page";

const requestTypes = [
    "Entrepreneur",
    "Legal Entity",
];

requestTypes.forEach(requestType => {
    describe("Navigation on main page", () => {
        let enterPersonalDataPage: EnterPersonalDataPage;
        let faqPage: FAQPage;
        let mainPage: MainPage;
        let sberIdPage: SberIDPage;
        let feedbackPage: FeedbackPage;
    
        beforeAll(async () => {
            enterPersonalDataPage = new EnterPersonalDataPage();
            faqPage = new FAQPage();
            mainPage = new MainPage();
            sberIdPage = new SberIDPage();
            feedbackPage = new FeedbackPage();
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
    });
});