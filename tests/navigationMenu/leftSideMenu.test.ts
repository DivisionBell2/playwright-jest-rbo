import Header from "../../pages/blocks/header.pageBlock";
import FAQPage from "../../pages/faqPage.page";
import FeedbackPage from "../../pages/feedback.page";
import User from "../../data/user";
import MainPage from "../../pages/mainPage.page";
import CheckOnlineRegistrationPage from "../../pages/checkOnlineRegistrationPage.page";
import PassportDataPage from "../../pages/passportDataPage.page";
import PhoneValidationPage from "../../pages/phoneValidationPage.page";
import VideoFrame from "../../pages/blocks/videoFrame.pageBlock";
import Footer from "../../pages/blocks/footer.pageBlock";
import * as urlData from "../../data/checkDataUrls.json"
import LeftMenu from "../../pages/blocks/leftMenu";
import EnterPersonalDataPage from "../../pages/enterPersonalData.page";

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
        let passportDataPage: PassportDataPage;
        let checkOnlineRegistrationPage: CheckOnlineRegistrationPage;
        let videoFrame: VideoFrame;
        let user: User;
        let footer: Footer;
        let leftMenu: LeftMenu;
        let enterPersonalDataPage: EnterPersonalDataPage;
        
        beforeAll(async () => {
            passportDataPage = new PassportDataPage();
            faqPage = new FAQPage();
            mainPage = new MainPage();
            feedbackPage = new FeedbackPage();
            checkOnlineRegistrationPage = new CheckOnlineRegistrationPage();
            videoFrame = new VideoFrame();
            footer = new Footer();
            header = await passportDataPage.getHeader();
            leftMenu = new LeftMenu();
            enterPersonalDataPage = new EnterPersonalDataPage();
        });

        beforeEach(async () => {
            user = new User();
            await mainPage.goto("/", "Go to main page");
            await mainPage.clickOnCookieButton();
            await (await mainPage.getAuthPopup()).login(user);
            await phoneValidationPage.goto(path, "Go to phone validation page");
            // await checkOnlineRegistrationPage.goto(path, "Open phone validation page for " + path);
            // await phoneValidationPage.basePhoneValidation("Phone validation for passport data navigation tests");
            // await checkOnlineRegistrationPage.selectBaseOnlineRegistration("Select online registration for passport data navigation tests");
        });

        test("Return to enter personal data page from phone validation page", async () => {
            await leftMenu.click(leftMenu.selectors.enterPersonalData, "Click on go to enter personal data page");
            expect(await enterPersonalDataPage.getTextContent(enterPersonalDataPage.selectors.title, "Get title text from personal data page"))
        .toContain(enterPersonalDataPage.checkData.title);
        });

        afterEach(async () => {
            // await passportDataPage.saveOnlyOneTab();
            await passportDataPage.clear();
            await passportDataPage.reload("Reload page");
        });
    });
});

// import {Browser, BrowserContext, chromium, Page} from "playwright";

// const requestTypes = [
//     "#test-landing-upper-ip_button",
//     "#test-landing-upper-ooo_button"
// ];

// requestTypes.forEach(requestType => {
//     describe('Left side navigation menu ' + requestType, () => {
//         let browser: Browser;
//         let context: BrowserContext;
//         let page: Page;
    
//         let password = "Qwerty123";
//         let username = "Автотест";
//         let checkTitle = "Персональные данные";
//         let titlePersonalDataPage = "Персональные данные";

//         let email: string;
    
//         beforeAll(async () => {
//             browser = await chromium.launch({
//                 headless: false
//             });
//             context = await browser.newContext();
//             page = await context.newPage();
            
//             email = "autotest+" + new Date().getTime() + "@dasredatest.ru";

//             await page.goto("https://rbo.uat.dasreda.ru");
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
//             // await page.click(requestType);
//             // const title = await page.$("h1");
//             // expect(await title.textContent()).toContain(checkTitle);
//         });

//         beforeEach(async () => {
//             await page.goto("https://rbo.uat.dasreda.ru");
//             // await page.click("text='Войти'");
//             // await page.fill("#username", email);
//             // await page.fill("#password", password);
//             // await page.click("#test-loginForm-singIn");
        
//             await page.waitForSelector("#test-landing-navPanel-logedIn");
//             await page.click(requestType);
//             const title = await page.$("h1");
//             expect(await title.textContent()).toContain(checkTitle);
//         });

//         test("Return to enter personal data page from check online registration page", async () => {
//             await goToPhoneValidationPage();
//             await goToCheckOnlineRegistrationPage();
//             await page.waitForNavigation();
//             await page.click("//ul/li[@role='menuitem']/div[contains(@class, 'title') and contains(., 'Персональные данные')]/../ul/li[contains(., 'Ввод персональных данных')]");
//             const title = await page.$("h2");
//             expect(await title.textContent()).toContain("Ввод персональных данных");
//         });

//         test("Return to phone validation page from check online registration page", async () => {
//             await goToPhoneValidationPage();
//             await goToCheckOnlineRegistrationPage();
//             await page.waitForNavigation();
//             await page.click("//ul/li[@role='menuitem']/div[contains(@class, 'title') and contains(., 'Персональные данные')]/../ul/li[contains(., 'Подтверждение номера телефона')]");
//             const title = await page.$("h2");
//             expect(await title.textContent()).toContain("Подтверждение номера телефона");
//         });

//         test("Return to face-to-face identification page from enter passport data page", async () => {
//             await goToPhoneValidationPage();
//             await goToCheckOnlineRegistrationPage();
//             await goToPassportDataPage();
//             await page.waitForNavigation();
//             await page.click("//ul/li[@role='menuitem']/div[contains(@class, 'title') and contains(., 'Персональные данные')]/../ul/li[contains(., 'Возможность очной идентификации')]");
//             const title = await page.$("h2");
//             expect(await title.textContent()).toContain("Определение возможности подачи документов онлайн");
//         });
    
//         afterAll(async () => {
//             await page.close();
//             await context.close();
//             await browser.close();
//         });

//         async function goToPhoneValidationPage() {
//             await page.waitForSelector("//input[@id='lastName' and @value='" + username + "']");
//             const pageEmail = await page.$('//div[contains(@class, "PersonalInformation")]//p');
//             expect(await pageEmail.textContent()).toContain(email);
//             await page.waitForSelector("//button[contains(., 'Продолжить')]");
//             await page.click("//button[contains(., 'Продолжить')]");
//         }

//         async function goToCheckOnlineRegistrationPage() {
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
//         }

//         async function goToPassportDataPage() {
//             await page.click("//input[@name='hasSbol' and @value='1']");
//             await page.click("//input[@name='hasBioPassport' and @value='1']");
//             await page.click("#osName");
//             await page.click("//li[text()='Android']");
//             await page.click("//li[contains(@class, 'PersonalInformation')]//input[@type='checkbox']");
//             await page.click("//button[contains(., 'Продолжить')]");
//         }
//     });
// });