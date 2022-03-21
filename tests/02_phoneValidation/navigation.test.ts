import Header from "../../pages/blocks/header.pageBlock";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import User from "../../data/user";
import MainPage from "../../pages/mainPage.page";
import PhoneValidationPage from "../../pages/phoneValidationPage.page";
import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import Footer from "../../pages/blocks/footer.pageBlock";
import * as urlData from "../../data/checkDataUrls.json"

let phoneValidationPage = new PhoneValidationPage();
const paths = [
    phoneValidationPage.paths.entrepreneur,
    phoneValidationPage.paths.legalEntity,
];

paths.forEach(path => {
    describe("Navigation tests for phone validation page", () => {
        let faqPage: FAQPage;
        let mainPage: MainPage;
        let header: Header;
        let feedbackPage: FeedbackPage;
        let enterPersonalDataPage: EnterPersonalDataPage;
        let user: User;
        let footer: Footer;
    
        beforeAll(async () => {
            faqPage = new FAQPage();
            mainPage = new MainPage();
            feedbackPage = new FeedbackPage();
            enterPersonalDataPage = new EnterPersonalDataPage();
            header = await phoneValidationPage.getHeader();
            footer = await phoneValidationPage.getFooter();
            user = new User();
            await mainPage.goto("/", "Go to main page");
            await (await mainPage.getAuthPopup()).login(user);
        });

        beforeEach(async () => {
            await phoneValidationPage.goto(path, "Open phone validation page for " + path);
        });

        test('Clicking on logo', async () => {
            await header.click(header.selectors.logo, "Click on logo icon");
            const title = await mainPage.getTextContent(mainPage.selectors.title, "Get text from main page title");
            expect(title).toContain(mainPage.checkData.title);
        });

        test('Clicking on FAQ button', async () => {
            await header.click(header.selectors.faqLink, "Click on faq link in header");
            await faqPage.waitForNavigation("Wait for navigation of FAQ page");
            expect(await faqPage.isVisible(faqPage.selectors.searchInput, "Check search input visible on faq page", 5)).toBeTruthy();
        });

        test('Clicking on Feedback button', async () => {
            await header.click(header.selectors.feedbackLink, "Сlick feedback link in header");
            await feedbackPage.waitForNavigation("wait for navigation feedback page");
            expect(await feedbackPage.isVisible(feedbackPage.selectors.messageTextInput, "Check visibility of message text input on feedback page"))
            .toBeTruthy();
        });

        test('Clicking on change data link', async () => {
            await page.click("//div[@role='button' and contains(text(), 'Изменить данные')]");
            expect(await enterPersonalDataPage.getTextContent(enterPersonalDataPage.selectors.title, "Get title text from personal data page"))
            .toContain(enterPersonalDataPage.checkData.title);
        });

        test('Clicking on oferta link in footer', async () => {
            await footer.click(footer.selectors.ofertaLink, "Click on oferta link");
            const newTab = await phoneValidationPage.getNewTab();
            expect(newTab.url()).toContain(urlData.ofertaLink);
        });

        test('Clicking on privacy policy link and go to privacy policy document', async () => {
            await footer.click(footer.selectors.privacyPolicyLink, "Click privacy policy link");
            const newTab = await mainPage.getNewTab("Waiting the tab with privacy policy document");
            expect(newTab.url()).toContain(urlData.privacyPolicyLink);
        });

        test('Clicking on agreement link in footer', async () => {
            await footer.click(footer.selectors.agreementPersonalDataLink, "Click on agreement link");
            const newTab = await phoneValidationPage.getNewTab();
            expect(newTab.url()).toContain(urlData.agreements);
        });

        test('Clicking on user agreement link in footer', async () => {
            await footer.click(footer.selectors.userAgreementLink, "Click on user agreement link");
            const newTab = await phoneValidationPage.getNewTab();
            expect(newTab.url()).toContain(urlData.userAgreement);
        });

        afterEach(async () => {
            await phoneValidationPage.saveOnlyOneTab();
        });

        afterAll(async () => {
            await phoneValidationPage.clear();
            await phoneValidationPage.reload("Reload page");
        });
    });
});