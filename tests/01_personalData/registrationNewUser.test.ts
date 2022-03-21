
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
            await personalDataPage.fill(personalDataPage.selectors.lastNameInput, user.username, "Enter last name on personal data page", 1000);
            await personalDataPage.fill(personalDataPage.selectors.firstNameInput, user.username, "Enter first name on personal data page", 1000);
            await personalDataPage.fill(personalDataPage.selectors.middleNameInput, user.username, "Enter middle name on personal data page", 1000);
            await personalDataPage.fill(personalDataPage.selectors.email, user.email, "Enter email on personal data page");
            await personalDataPage.click(personalDataPage.selectors.personalDataCheckbox, "Click on agreements of personal data checkbox");
            
        });

        test('Registration new user', async () => {
            await personalDataPage.click(personalDataPage.selectors.sendPasswordBUtton, "Click on send password button");
            expect(await personalDataPage.isVisible(personalDataPage.selectors.emailCodeInput, "Check visibility of email code input")).toBeTruthy();
        });

        afterAll(async () => {
            await personalDataPage.clear();
            await personalDataPage.reload("Reload personal data page");
        });
    });
});
// import {Browser, BrowserContext, chromium, Page} from "playwright";
// import {Protocol} from "playwright/types/protocol";
// import RemoteLocation = Protocol.Target.RemoteLocation;

// const requestPathes = [
//     "/rbidos/personal-information/ip/1",
//     "/rbidos/personal-information/ooo/1"
// ];

// requestPathes.forEach(requestPath => {
//     describe('Navigation on personal data page', () =>{
//         let browser: Browser;
//         let context: BrowserContext;
//         let page: Page;
    
//         let username = "Автотест";
    
//         const url = "https://rbo.uat.dasreda.ru";
    
//         beforeAll(async () => {
//             browser = await chromium.launch({
//                 headless: false
//             });
//             context = await browser.newContext()
//             page = await context.newPage();
//         });
    
//         test('Registration new user', async () => {
//             const email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
//             await page.goto(url + requestPath);
//             await page.fill("#lastName", username);
//             await page.fill("#firstName", username);
//             await page.fill("#middleName", username);
//             await page.fill("#email", email);
//             await page.click("//label[contains(@class, 'PersonalInformation__checkbox') and contains(., 'передачу персональных данных')]/span[contains(@class, 'ant-checkbox')]");
//             await page.click("#test-send_password");
//             await page.waitForSelector("#emailCode");
//         });

//         test('Registration new user without middle name', async () => {
//             const email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
//             await page.goto(url + requestPath);
//             await page.fill("#lastName", username);
//             await page.fill("#firstName", username);
//             await page.click("//div[contains(@class, 'input-item-no-mid-name')]/label");
//             await page.fill("#email", email);
//             await page.click("//label[contains(@class, 'PersonalInformation__checkbox') and contains(., 'передачу персональных данных')]/span[contains(@class, 'ant-checkbox')]");
//             await page.click("#test-send_password");
//             await page.waitForSelector("#emailCode");
//         });
        
//         afterAll(async () => {
//             await page.close();
//             await context.close();
//             await browser.close();
//         });
//     });
// });