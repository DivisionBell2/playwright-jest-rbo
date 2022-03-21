import Header from "../../pages/blocks/header.pageBlock";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import User from "../../data/user";
import MainPage from "../../pages/mainPage.page";
import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import SberIDPage from "../../pages/sberId.page";
import AuthPopup from "../../pages/blocks/authPopup.pageBlock";

let personalDataPage = new EnterPersonalDataPage();
const paths = [
    personalDataPage.paths.entrepreneur,
    personalDataPage.paths.legalEntity,
];

paths.forEach(path => {
    describe("Navigation tests for personal data page", () => {
        let faqPage: FAQPage;
        let mainPage: MainPage;
        let header: Header;
        let feedbackPage: FeedbackPage;
        let sberIdPage: SberIDPage;
        let authPopup: AuthPopup;
        let user: User;
    
        beforeAll(async () => {
            faqPage = new FAQPage();
            mainPage = new MainPage();
            feedbackPage = new FeedbackPage();
            sberIdPage = new SberIDPage();
            header = await personalDataPage.getHeader();
            authPopup = await personalDataPage.getAuthPopup();
            user = new User();
        });
        
        beforeEach(async () => {
            await personalDataPage.goto(path, "Open personal data page for " + path);
        });

        test('Start registration business for logined user with delete middle name', async () => {
            await authPopup.login(user);
            await personalDataPage.waitForSelector(personalDataPage.selectors.noMiddleNameCheckbox, "Wait for no middle name checkbox");
            await personalDataPage.click(personalDataPage.selectors.noMiddleNameCheckbox, "Click on no middle name checkbox");
            await personalDataPage.waitForSelector(personalDataPage.selectors.noMiddleNameText, "Wait for text about no middle name");
            expect(await personalDataPage.isHidden(personalDataPage.selectors.middleNameInput, "Check middle name is not visible")).toBeTruthy();
        });

        afterAll(async () => {
            await personalDataPage.clear();
            await personalDataPage.reload("Reload personal data page");
        });
    });
});