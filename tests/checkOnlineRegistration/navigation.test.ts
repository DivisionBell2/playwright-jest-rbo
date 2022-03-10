import Header from "../../pages/blocks/header.pageBlock";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import User from "../../data/user";
import MainPage from "../../pages/mainPage.page";
import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import CheckOnlineRegistrationPage from "../../pages/checkOnlineRegistrationPage.page";

let checkOnlineRegistrationPage = new CheckOnlineRegistrationPage();
const paths = [
    checkOnlineRegistrationPage.paths.entrepreneur,
    checkOnlineRegistrationPage.paths.legalEntity,
];

paths.forEach(path => {
    describe("Navigation tests for check online registration page", () => {
        let faqPage: FAQPage;
        let mainPage: MainPage;
        let header: Header;
        let feedbackPage: FeedbackPage;
        let enterPersonalDataPage: EnterPersonalDataPage;
        let user: User;
    
        beforeAll(async () => {
            faqPage = new FAQPage();
            mainPage = new MainPage();
            feedbackPage = new FeedbackPage();
            enterPersonalDataPage = new EnterPersonalDataPage();
            checkOnlineRegistrationPage = new CheckOnlineRegistrationPage();
            header = await checkOnlineRegistrationPage.getHeader();
            user = new User();
            await mainPage.goto("/", "Go to main page");
            await (await mainPage.getAuthPopup()).login(user);
        });

        beforeEach(async () => {
            await checkOnlineRegistrationPage.goto(path, "Open phone validation page for " + path);
        });

        test('Clicking on logo', async () => {
            await header.click(header.selectors.logo, "Click on logo icon");
            const title = await mainPage.getTextContent(mainPage.selectors.title, "Get text from main page title");
            expect(title).toContain(mainPage.checkData.title);
        });

        // afterEach(async () => {
        //     await phoneValidationPage.saveOnlyOneTab();
        // });

        afterAll(async () => {
            await checkOnlineRegistrationPage.clear();
            await checkOnlineRegistrationPage.reload("Reload page");
        });
    });
});

// import {Browser, BrowserContext, chromium, Page} from "playwright";

// const requestPathes = [
//     "/rbidos/personal-information/ip/3",
//     "/rbidos/personal-information/ooo/3"
// ];

// requestPathes.forEach(requestPath => {
//     describe('Navigation tests for check online registration page ' + requestPath, () => {
//         let browser: Browser;
//         let context: BrowserContext;
//         let page: Page;
    
//         let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
//         let password = "Qwerty123";
//         let username = "Автотест";
//         let faqTitle = "Вопрос-ответ";
//         let landingTitle = "бизнес легко и быстро";
//         let dsTitle = "Деловая среда";
//         let feedbackTitle = "Обратная связь";
    
//         const url = "https://rbo.uat.dasreda.ru";
    
//         beforeAll(async () => {
//             browser = await chromium.launch({
//                 headless: false
//             });
//             context = await browser.newContext()
//             page = await context.newPage();
    
//             await page.goto(url);
//             await page.click("text='Войти'");
//             await page.click("text='Зарегистрироваться'");
    
//             await page.fill("#lastName", username);
//             await page.fill("#firstName", username);
//             await page.fill("#middleName", username);
//             await page.fill("#email", email);
//             await page.fill("//div[contains(@class, 'Registration__registration-form')]//input[@id='password']", password);
//             await page.fill("#passwordMatch", password);
//             await page.click("#personalDataAgreement");
//             await page.click("#test-regForm-singup_button");
//             await page.waitForSelector("//input[@data-qa='codeEntered_field']");
//             await page.reload();
//             await page.click("text='Войти'");
//             await page.fill("#username", email);
//             await page.fill("#password", password);
//             await page.click("#test-loginForm-singIn");
//             await page.waitForSelector("#test-landing-navPanel-logedIn");
//         });
    
//         test('Clicking on logo', async () => {
//             await page.goto(url + requestPath);
//             await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
//             await page.waitForSelector("#test-landing-header-text");
//             const title = await page.$("#test-landing-header-text");
//             expect(await title.textContent()).toContain(landingTitle);
//         });
    
//         test('Clicking on FAQ button', async () => {
//             await page.goto(url + requestPath);
//             await page.click("text='Вопрос-ответ'");
//             await page.waitForNavigation();
//             const title = await page.$("h1");
//             expect(await title.textContent()).toContain(faqTitle);
//         });

//         test('Clicking on feedback button', async () => {
//             await page.goto(url + requestPath);
//             await page.click("text='Обратная связь'");
//             await page.waitForNavigation();
//             const title = await page.$("h1");
//             expect(await title.textContent()).toContain(feedbackTitle);
//         });

//         test('Clicking on how to know android version link', async () => {
//             await page.goto(url + requestPath);
//             await page.click("//a[text()='Как узнать версию Android?']");
//             const [newWindow] = await Promise.all([
//                 context.waitForEvent("page"),
//             ]);
//             await newWindow.waitForLoadState();
//             expect(page.context().pages()[1].url()).toContain('https://rbo.uat.dasreda.ru/rbidos/faq');
//             const isHintCollapsed = await page.context().pages()[1].$("//div[@class='ant-collapse-header' and contains(., 'Как узнать версию Android')]");
//             expect(await isHintCollapsed.getAttribute("aria-expanded")).toBe("true");
//             const isHintImageVisible = await page.context().pages()[1].$("//img[@src='/img/faq/android1.png']");
//             expect(await isHintImageVisible.isVisible()).toBe(true);
//             await page.context().pages()[1].close();
//         });

//         test('Clicking on how to know about NFC link', async () => {
//             await page.goto(url + requestPath);
//             await page.click("//span[text()='Как узнать, есть ли в телефоне NFC?']");
//             const nfcPopup = await page.$("//div[@class='ant-modal-body']");
//             expect(await nfcPopup.isVisible()).toBe(true);
//             await page.click("//div[@class='ant-modal-body']//button[contains(., 'OK')]");
//             for (let i = 0; i < 3; i++) {
//                 if (!await nfcPopup.isHidden()) {
//                     await page.waitForTimeout(1000);
//                     continue;
//                 } else {
//                     break;
//                 }
//             }
//             expect(await nfcPopup.isHidden()).toBe(true);
//         });
    
//         afterAll(async () => {
//             await page.close();
//             await context.close();
//             await browser.close();
//         });
//     });
// });