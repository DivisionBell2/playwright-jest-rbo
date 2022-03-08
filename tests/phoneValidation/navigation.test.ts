import Header from "../../pages/blocks/header.pageBlock";
import FAQPage from "../../pages/faqPage.page";
// import FeedbackPage from "../../pages/feedback.page";
import User from "../../data/user";
import MainPage from "../../pages/mainPage.page";
import PhoneValidationPage from "../../pages/phoneValidationPage.page";

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
        // let feedbackPage: FeedbackPage;
        let user: User;
    
        beforeAll(async () => {
            faqPage = new FAQPage();
            mainPage = new MainPage();
            // feedbackPage = new FeedbackPage();
            header = await phoneValidationPage.getHeader();
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


    
            afterEach(async () => {
                await phoneValidationPage.saveOnlyOneTab();
            });

            afterAll(async () => {
                await phoneValidationPage.clear();
                await phoneValidationPage.reload("Reload page");
            })
    
    });
});

// import {Browser, BrowserContext, chromium, Page} from "playwright";
// import {Protocol} from "playwright/types/protocol";
// import RemoteLocation = Protocol.Target.RemoteLocation;

// const requestPathes = [
//     "/rbidos/personal-information/ip/2",
//     "/rbidos/personal-information/ooo/2"
// ];

// requestPathes.forEach(requestPath => {
//     describe('Navigation on personal data page ' + requestPath, () => {
//         let browser: Browser;
//         let context: BrowserContext;
//         let page: Page;
    
//         let password = "Qwerty123";
//         let username = "Автотест";
//         let faqTitle = "Вопрос-ответ";
//         let feedbackTitle = "Обратная связь";
//         let landingTitle = "бизнес легко и быстро";
//         let personalDataPageTitle = "Ввод персональных данных";
    
//         const url = "https://rbo.uat.dasreda.ru";
    
//         beforeAll(async () => {
//             browser = await chromium.launch({
//                 headless: false
//             });
//             context = await browser.newContext()
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
//         });

//         beforeEach(async () => {
//             await page.goto(url + requestPath);
//         });

    
//         test('Clicking on feedback button', async () => {
//             await page.click("text='Обратная связь'");
//             await page.waitForNavigation();
//             const title = await page.$("h1");
//             expect(await title.textContent()).toContain(feedbackTitle);
//         });
    
//         test('Clicking on change data link', async () => {
//             await page.click("//div[@role='button' and contains(text(), 'Изменить данные')]");
//             const title = await page.$("h2");
//             expect(await title.textContent()).toContain(personalDataPageTitle);
//         });

//         test('Clicking on oferta link in footer', async () => {
//             await page.click("//a[contains(., 'Договор оферты')]");
//             await Promise.all([context.waitForEvent("page")]);
//             await page.waitForTimeout(2000);
//             const newPage = page.context().pages()[1];
//             expect(newPage.url()).toContain('oferta_rbidos');
//             await page.context().pages()[1].close();
//         });

//         test('Clicking on personal data privacy policy link in footer', async () => {
//             await page.click("//a[contains(., 'Политика конфиденциальности')]");
//             await Promise.all([context.waitForEvent("page")]);
//             await page.waitForTimeout(2000);
//             const newPage = page.context().pages()[1];
//             expect(newPage.url()).toContain('politika.pdf');
//             await page.context().pages()[1].close();
//         });

//         test('Clicking on personal data agreement link in footer', async () => {
//             await page.click("//a[contains(., 'Согласие на обработку данных')]");
//             await Promise.all([context.waitForEvent("page")]);
//             await page.waitForTimeout(2000);
//             const newPage = page.context().pages()[1];
//             expect(newPage.url()).toContain('soglasie_na_rbidos');
//             await page.context().pages()[1].close();
//         });

//         test('Clicking on user agreement link in footer', async () => {
//             await page.click("//a[contains(., 'Пользовательское соглашение')]");
//             await Promise.all([context.waitForEvent("page")]);
//             await page.waitForTimeout(2000);
//             const newPage = page.context().pages()[1];
//             expect(newPage.url()).toContain('polzovatelskoe_soglashenie');
//             await page.context().pages()[1].close();
//         });
    
//         afterAll(async () => {
//             await page.close();
//             await context.close();
//             await browser.close();
//         });
//     });
// });