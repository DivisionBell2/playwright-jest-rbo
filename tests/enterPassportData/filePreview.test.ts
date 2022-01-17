import {Browser, BrowserContext, chromium, Page} from "playwright";

describe("Preview uploaded file", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
    let password = "Qwerty123";
    let username = "Автотест";
    let checkTitle = "Персональные данные";

    test("Preview uploaded file and close preview", async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://rbo.uat.dasreda.ru");
        await page.click("text='Войти'");
        await page.click("text='Зарегистрироваться'");

        await page.fill("#lastName", username);
        await page.fill("#firstName", username);
        await page.fill("#middleName", username);
        await page.fill("#email", email);
        await page.fill("//div[contains(@class, 'Registration__registration-form')]//input[@id='password']", password);
        await page.fill("#passwordMatch", password);
        await page.click("#personalDataAgreement");
        await page.click("#test-regForm-singup_button");
        await page.waitForSelector("//input[@data-qa='codeEntered_field']");
        await page.reload();

        await page.click("text='Войти'");
        await page.fill("#username", email);
        await page.fill("#password", password);
        await page.click("#test-loginForm-singIn");

        await page.waitForSelector("#test-landing-navPanel-logedIn");
        await page.click("#test-landing-upper-ip_button");
        const title = await page.$("h1");
        expect(await title.textContent()).toContain(checkTitle);

        await page.waitForSelector("//input[@id='lastName' and @value='" + username + "']");
        const pageEmail = await page.$('//div[contains(@class, "PersonalInformation")]//p');
        expect(await pageEmail.textContent()).toContain(email);
        await page.waitForSelector("//button[contains(., 'Продолжить')]");
        await page.click("//button[contains(., 'Продолжить')]");

        await page.waitForSelector("//div[contains(@class, 'request-number-hint')]");
        await page.click("//button[contains(., 'Я регистрируюсь сам')]");
        await page.fill("//input[@name='phone']", "9992222222");
        await page.click("#test-send_sms");
        await page.click("#agreement-conditions");
        await page.click("#agreementPersonalData");
        await page.fill("#code", "123123");
        await page.click("//button[contains(., 'Продолжить')]");

        await page.click("//input[@name='hasSbol' and @value='1']");
        await page.click("//input[@name='hasBioPassport' and @value='1']");
        await page.click("#osName");
        await page.click("//li[text()='Android']");
        await page.click("//li[contains(@class, 'PersonalInformation')]//input[@type='checkbox']");
        await page.click("//button[contains(., 'Продолжить')]");

        await page.setInputFiles("//div[@id='UserPasportMain']//input[@type='file']", "tests/examples/pictures/picture.jpg");
        await page.isVisible("//div[contains(@class, 'uploader-delete')]");

        await page.hover("//div[@id='UserPasportMain']//span[@class='ant-upload ant-upload-btn']/div");
        await page.click("//div[@id='UserPasportMain']//span[@class='ant-upload ant-upload-btn']/div");
        await page.waitForSelector("//div[@class='slick-list']");
        const previewImage = await page.$("//div[@class='slick-list']");
        expect(await previewImage.isVisible()).toBe(true);

        await page.click("//button[@aria-label='Close']");
        expect(await previewImage.isHidden()).toBe(true);
    });

    afterEach(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});