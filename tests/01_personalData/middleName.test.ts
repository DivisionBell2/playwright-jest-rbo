import Header from "../../pages/blocks/header.pageBlock";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import User from "../../data/user";
import MainPage from "../../pages/mainPage.page";
import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import SberbankPage from "../../pages/sberbankPage";
import SberIDPage from "../../pages/sberId.page";
import * as urlData from "../../data/checkDataUrls.json";
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
            expect(await  personalDataPage.isHidden(personalDataPage.selectors.middleNameInput, "Check middle name is not visible")).toBeTruthy();

            // await header.click(header.selectors.logo, "Click on logo icon");
            // const title = await mainPage.getTextContent(mainPage.selectors.title, "Get text from main page title");
            // expect(title).toContain(mainPage.checkData.title);
        });

        // afterEach(async () => {
        //     await personalDataPage.saveOnlyOneTab();  
        // });

        afterAll(async () => {
            await personalDataPage.clear();
            await personalDataPage.reload("Reload personal data page");
        });
    });
});
// import {Browser, BrowserContext, chromium, Page} from "playwright";

// const requestType = [
//     "#test-landing-upper-ip_button",
//     "#test-landing-upper-ooo_button"
// ];

// requestType.forEach(requestType => {
//     describe ("Check working entering personal data without middleName " + requestType, () => {
//         let browser: Browser;
//         let context: BrowserContext;
//         let page: Page;
    
//         let url = "https://rbo.uat.dasreda.ru";
//         let popupTitle = "Изменения в законе № 129-ФЗ";
    
//         let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
//         let password = "Qwerty123";
//         let username = "Автотест";
    
//         beforeEach(async () => {
//             browser = await chromium.launch({
//                 headless: false
//             });
//             context = await browser.newContext();
//             page = await context.newPage();
//         });
        
//         test("Start registration business for logined user with delete middle name", async () => {
            
//             await page.click(requestType);
//             await page.waitForLoadState();
//             await page.click("//div[contains(@class, 'input-item-no-mid-name')]/label");
//             await page.waitForSelector("//p[text()='Без отчества']");
//             expect(await page.isVisible("//input[@id='middleName']")).toBe(false);
//             await page.waitForLoadState();
//             await page.click("//button[contains(., 'Продолжить')]");
//             await page.waitForLoadState();
//             await page.waitForSelector("//div[contains(@class, 'request-number-hint')]");
//             expect(await page.isVisible("//div[text()='" + username + " " + username + "']")).toBe(true);
//         });

//         test("Start registration business for logined user with delete middle name", async () => {
//             await page.goto(url);
//             await page.click(requestType);

//             await page.waitForLoadState();
//             await page.click("//div[contains(@class, 'input-item-no-mid-name')]/label");
//             await page.waitForSelector("//p[text()='Без отчества']");
//             expect(await page.isVisible("//input[@id='middleName']")).toBe(false);
//             await page.click("//div[contains(@class, 'input-item-no-mid-name')]/label");
//             expect(await page.isVisible("//input[@id='middleName']")).toBe(true);
//         });
        
//         afterEach( async () => {
//             await page.close();
//             await context.close();
//             await browser.close();
//         });
//     });
// });