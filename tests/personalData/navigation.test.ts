import {Browser, BrowserContext, chromium, Page} from "playwright";
import {Protocol} from "playwright/types/protocol";
import RemoteLocation = Protocol.Target.RemoteLocation;

const requestPathes = [
    "/rbidos/personal-information/ip/1",
    "/rbidos/personal-information/ooo/1"
];

requestPathes.forEach(requestPath => {
    describe('Navigation on personal data page', () =>{
        let browser: Browser;
        let context: BrowserContext;
        let page: Page;
    
        let faqTitle = "Вопрос-ответ";
        let landingTitle = "бизнес легко и быстро";
        let sberbankOnlineUrl = "online.sberbank.ru";
    
        const url = "https://rbo.uat.dasreda.ru";
    
        beforeEach(async () => {
            browser = await chromium.launch({
                headless: false
            });
            context = await browser.newContext()
            page = await context.newPage();
        });
    
        test('Clicking on FAQ button', async () => {
            await page.goto(url + requestPath);
            await page.click("text='Вопрос-ответ'");
            await page.waitForNavigation();
            const title = await page.$("h1");
            expect(await title.textContent()).toContain(faqTitle);
        });
    
        test('Clicking on logo', async () => {
            await page.goto(url + requestPath);
            await page.click("//div[contains(@class, 'topmenu-logo-pic')]");
            await page.waitForNavigation();
            const title = await page.$("#test-landing-header-text");
            expect(await title.textContent()).toContain(landingTitle);
        });
    
        test('Clicking on login through SberId button', async () => {
            await page.goto(url + requestPath);
            await page.click("//button[contains(@class, 'SberIdButton')]");
            await page.waitForSelector("//h1[text()='Деловая среда']")
        });
    
        test('Clicking on feedback button', async () => {
            await page.goto(url + requestPath);
            await page.click("text='Обратная связь'");
            await page.waitForNavigation();
            const title = await page.$("h1");
            expect(await title.textContent()).toContain("Обратная связь");
        });
    
        test('Clicking on sberId Button', async () => {
            await page.goto(url + requestPath);
            await page.click("//button[contains(@class, 'sberId')]");
            await page.waitForNavigation();
            const currentUrl = await page.url();
            expect(await currentUrl.valueOf()).toContain(sberbankOnlineUrl);
        });
    
        test('Clicking on dasreda.ru link', async () => {
            await page.goto(url + requestPath);
            await page.click("//div[contains(@class, 'PersonalInformation__hint-blockquote')]/a[contains(., dasreda.ru)]");
            await Promise.all([context.waitForEvent("page")]);
            expect(page.context().pages()[1].url()).toContain('https://dasreda.ru/');
            await page.context().pages()[1].close();
        });
    
        test('Clicking on agreement link', async () => {
            await page.goto(url + requestPath);
            await page.click("//span[contains(@class, 'PersonalInformation')]/a[contains(., 'Согласие')]");
            await Promise.all([context.waitForEvent("page")]);
            expect(page.context().pages()[1].url()).toContain('soglasie_na_rbidos');
            await page.context().pages()[1].close();
        });
    
        test('Clicking on oferta link in footer', async () => {
            await page.goto(url + requestPath);
            await page.click("//a[contains(., 'Договор оферты')]");
            await Promise.all([context.waitForEvent("page")]);
            expect(page.context().pages()[1].url()).toContain('oferta_rbidos');
            await page.context().pages()[1].close();
        });

        test('Clicking on privacy policy link in footer', async () => {
            await page.goto(url + requestPath);
            await page.click("//a[contains(., 'Политика конфиденциальности')]");
            await Promise.all([context.waitForEvent("page")]);
            expect(page.context().pages()[1].url()).toContain('politika.pdf');
            await page.context().pages()[1].close();
        });

        test('Clicking on personal data agreement link in footer', async () => {
            await page.goto(url + requestPath);
            await page.click("//a[contains(., 'Согласие на обработку данных')]");
            await Promise.all([context.waitForEvent("page")]);
            expect(page.context().pages()[1].url()).toContain('soglasie_na_rbidos');
            await page.context().pages()[1].close();
        });

        test.only('Clicking on user agreement link in footer', async () => {
            await page.goto(url + requestPath);
            await page.click("//a[contains(., 'Пользовательское соглашение')]");
            await Promise.all([context.waitForEvent("page")]);
            expect(page.context().pages()[1].url()).toContain('polzovatelskoe_soglashenie');
            await page.context().pages()[1].close();
        });

        afterEach(async () => {
            await page.close();
            await context.close();
            await browser.close();
        });
    });
});