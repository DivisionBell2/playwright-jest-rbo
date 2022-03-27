import Header from "../../pages/blocks/header.pageBlock";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import MainPage from "../../pages/mainPage.page";
import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import SberIDPage from "../../pages/sberId.page";
import * as urlData from "../../data/checkDataUrls.json";
import Footer from "../../pages/blocks/footer.pageBlock";

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
        let footer: Footer;
    
        beforeAll(async () => {
            faqPage = new FAQPage();
            mainPage = new MainPage();
            feedbackPage = new FeedbackPage();
            sberIdPage = new SberIDPage();
            header = await personalDataPage.getHeader();
            footer = await personalDataPage.getFooter();
        });
            beforeEach(async () => {
                await personalDataPage.goto(path, "Open personal data page for " + path);
            });

            test('Clicking on logo', async () => {
                await header.click(header.selectors.logo, "Click on logo icon");
                const title = await mainPage.getTextContent(mainPage.selectors.title, "Get text from main page title");
                expect(title).toContain(mainPage.checkData.title);
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

            test('Clicking on login through SberId button', async () => {
                await personalDataPage.click(personalDataPage.selectors.sberIdButton, "Click on login through SberID button");
                const title = await sberIdPage.getTextContent(sberIdPage.selectors.title, "Get text from sber id page page title");
                expect(title).toContain(sberIdPage.checkData.title);
            });

            test('Clicking on dasreda.ru link', async () => {
                await personalDataPage.click(personalDataPage.selectors.dasredaLink, "Click on dasreda.ru link");
                const newTab = await personalDataPage.getNewTab();
                expect(newTab.url()).toContain(urlData.platform);
            });

            test('Clicking on agreement link', async () => {
                await personalDataPage.waitForLoadState("Waiting for loading of personal data page");
                await personalDataPage.click(personalDataPage.selectors.agreementsLink, "Click on agreement link");
                const newTab = await personalDataPage.getNewTab();
                
                expect(newTab.url()).toContain(urlData.agreementsPlatform);
            });

            test('Clicking on oferta link in footer', async () => {
                await footer.click(footer.selectors.ofertaLink, "Click on oferta link");
                const newTab = await personalDataPage.getNewTab();
                expect(newTab.url()).toContain(urlData.ofertaLink);
            });

            test('Clicking on privacy policy link and go to privacy policy document', async () => {
                await footer.click(footer.selectors.privacyPolicyLink, "Click privacy policy link");
                const newTab = await mainPage.getNewTab("Waiting the tab with privacy policy document");
                expect(newTab.url()).toContain(urlData.privacyPolicyLink);
            });

            afterEach(async () => {
                await personalDataPage.saveOnlyOneTab();  
            });

            afterAll(async () => {
                await personalDataPage.clear();
            })
    });
});

// import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
// import FAQPage from "../../pages/faqPage.page";
// import FeedbackPage from "../../pages/feedback.page";
// import MainPage from "../../pages/mainPage.page";
// import PlatformPage from "../../pages/platform.page";
// import SberIDPage from "../../pages/sberId.page";
// import * as urlData from "../../data/checkDataUrls.json";

// const requestTypes = [
//     "Entrepreneur",
//     "Legal Entity",
// ];

// requestTypes.forEach(requestType => {
//     describe("Navigation on enter personal data page", () => {
//         let enterPersonalDataPage: EnterPersonalDataPage;
//         let faqPage: FAQPage;
//         let mainPage: MainPage;
//         let sberIdPage: SberIDPage;
//         let feedbackPage: FeedbackPage;
//         let platformPage: PlatformPage;

//         beforeAll(async () => {
//             enterPersonalDataPage = new EnterPersonalDataPage();
//             faqPage = new FAQPage();
//             mainPage = new MainPage();
//             sberIdPage = new SberIDPage();
//             feedbackPage = new FeedbackPage();
//             platformPage = new PlatformPage();
//         });

//         beforeEach(async () => {
//             console.log("Test for " + requestType + " request")
//             if (requestType == "Entrepreneur") {
//                 await enterPersonalDataPage.goToEnterPersonalDataPageEntrepreneur();
//             } else {
//                 await enterPersonalDataPage.goToEnterPersonalDataPageLegalEntity();
//             }
//         });  

//         test('Clicking on privacy policy link in footer', async () => {
//             await(await enterPersonalDataPage.getFooter()).clickPrivacyPolicyLink();
//             await checkUrlInNewTab(urlData.privacyPolicyLink);
//         });

//         test('Clicking on personal data agreement link in footer', async () => {
//             await(await enterPersonalDataPage.getFooter()).clickAgreementLink();
//             await checkUrlInNewTab(urlData.agreements);
//         });

//         afterEach(async () => {
//             await enterPersonalDataPage.saveOnlyOneTab();
//             await enterPersonalDataPage.clear();
//         });

//         async function checkUrlInNewTab(urlPart: string) {
//             const newTab = await enterPersonalDataPage.getNewTab();
//             expect(newTab.url()).toContain(urlPart);
//         }
//     });
// });