import Header from "../../pages/blocks/header.pageBlock";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import User from "../../data/user";
import MainPage from "../../pages/mainPage.page";
import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import CheckOnlineRegistrationPage from "../../pages/checkOnlineRegistrationPage.page";
import PassportDataPage from "../../pages/passportDataPage.page";
import PhoneValidationPage from "../../pages/phoneValidationPage.page";

let phoneValidationPage = new PhoneValidationPage();
const paths = [
    phoneValidationPage.paths.entrepreneur,
    phoneValidationPage.paths.legalEntity,
];

paths.forEach(path => {
    describe("Navigation tests for passport data page", () => {
        let faqPage: FAQPage;
        let mainPage: MainPage;
        let header: Header;
        let feedbackPage: FeedbackPage;
        let enterPersonalDataPage: EnterPersonalDataPage;
        let passportDataPage: PassportDataPage;
        let checkOnlineRegistrationPage: CheckOnlineRegistrationPage;
        let user: User;
        
        beforeAll(async () => {
            passportDataPage = new PassportDataPage();
            faqPage = new FAQPage();
            mainPage = new MainPage();
            feedbackPage = new FeedbackPage();
            enterPersonalDataPage = new EnterPersonalDataPage();
            checkOnlineRegistrationPage = new CheckOnlineRegistrationPage();
            header = await passportDataPage.getHeader();
        });

        beforeEach(async () => {
            user = new User();
            await mainPage.goto("/", "Go to main page");
            await mainPage.clickOnCookieButton();
            await (await mainPage.getAuthPopup()).login(user);
            await checkOnlineRegistrationPage.goto(path, "Open phone validation page for " + path);
            await phoneValidationPage.basePhoneValidation("Phone validation for passport data navigation tests");
            await checkOnlineRegistrationPage.selectBaseOnlineRegistration("Select online registration for passport data navigation tests");
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

        afterEach(async () => {
            // await passportDataPage.goBack("Return to enter passport data page");
            await passportDataPage.clear();
            await passportDataPage.reload("Reload page");
        });

        // afterAll(async () => {
            // await checkOnlineRegistrationPage.clear();
            // await checkOnlineRegistrationPage.reload("Reload page");
        // });
    });
});

// import {Browser, BrowserContext, chromium, Page} from "playwright";

// const requestPathes = [
//     "rbidos/personal-information/ip/",
//     "rbidos/personal-information/ooo/"
// ];

// requestPathes.forEach(requestPath => {
//     describe('Navigation on main page for ' + requestPath, () => {
//         let browser: Browser;
//         let context: BrowserContext;
//         let page: Page;
//         let titlePersonalDataPage = "Персональные данные";
//         let faqTitle = "Вопрос-ответ";
//         let landingTitle = "бизнес легко и быстро";
    
//         let password = "Qwerty123";
//         let username = "Автотест";
//         let checkTitle = "Персональные данные";
//         const url = "https://rbo.uat.dasreda.ru/";

//         beforeEach(async() => {
//             browser = await chromium.launch({
//                 headless: false
//             });
//             context = await browser.newContext();
//             page = await context.newPage();
//             let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
            
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
//             await page.goto(url + requestPath + 2);
//             await page.waitForSelector("//div[contains(@class, 'request-number-hint')]");
//             await page.click("//button[contains(., 'Я регистрируюсь сам')]");

//             // После внедрения паттерна PageObject вынести ожидание в отдельную функцию и вызывать для каждого теста отдельно.
//             if (await page.isVisible("//div[contains(text(), 'На вашем аккаунте уже есть заявка')]")) {
//                 page.click("//button[contains(., 'Выбрать')][1]");
                
//                 await page.waitForTimeout(15000);
//             }

//             await page.fill("//input[@name='phone']", "9992222222");
//             await page.click("#test-send_sms");
//             await page.click("#agreement-conditions");
//             await page.click("#agreementPersonalData");
//             await page.fill("#code", "123123");
//             await page.click("//button[contains(., 'Продолжить')]");
    
//             await page.click("//input[@name='hasSbol' and @value='1']");
//             await page.click("//input[@name='hasBioPassport' and @value='1']");
//             await page.click("#osName");
//             await page.click("//li[text()='Android']");
//             await page.click("//li[contains(@class, 'PersonalInformation')]//input[@type='checkbox']");
//             await page.click("//button[contains(., 'Продолжить')]");
//         })
    
//         test('Clicking on logo', async () => {
//             await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
//             await page.waitForLoadState();
//             expect(await (await page.waitForSelector("#test-landing-header-text")).isVisible()).toBe(true);
//         });

//         test('Open youtube frame from header', async () => {
//             await page.click("//span[@role='button' and contains(., 'Видеоинструкция')]");
//             expect(await (await page.$("//iframe[@title='YouTube video player']")).isVisible()).toBe(true);
//         });

//         test('Clicking on feedback button', async () => {
//             await page.click("text='Обратная связь'");
//             await page.waitForNavigation();
//             const title = await page.$("h1");
//             expect(await title.textContent()).toContain("Обратная связь");
//         });

//         test('Clicking on oferta link in footer', async () => {
//             await page.click("//a[contains(., 'Договор оферты')]");
//             await Promise.all([context.waitForEvent("page")]);
//             await page.context().pages()[1].waitForLoadState();
//             expect(page.context().pages()[1].url()).toContain('oferta_rbidos');
//         });

//         test('Clicking on Agreement link and go to agreement document', async () => {
//             await page.click("//a[contains(., 'Согласие')]");
//             const [newWindow] = await Promise.all([
//                 context.waitForEvent("page"),
//             ]);
//             await page.context().pages()[1].waitForLoadState();
//             expect(page.context().pages()[1].url()).toContain('soglasie_na_obrabotku_pdn_rbidos');
//         });
    
//         afterEach(async () => {
//             await page.close();
//             await context.close();
//             await browser.close();
//         });
//     });
// });