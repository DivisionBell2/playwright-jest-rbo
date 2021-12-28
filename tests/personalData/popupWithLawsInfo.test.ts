import {Browser, BrowserContext, chromium, Page} from "playwright";

describe ("Check working popup with law information from personal data page", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let url = "https://rbo.dasreda.ru/rbidos/personal-information/";
    let popupTitle = "Изменения в законе № 129-ФЗ";

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
    });

    test("for Entrepreneur request", async () => {
        await openLawPopup("ip/1");
        await openConsultantLink();
        await closeLawPopup();
    });

    test("for Entrepreneur request", async () => {
        await openLawPopup("ooo/1");
        await openConsultantLink();
        await closeLawPopup();
    });

    afterAll( async () => {
        await page.close()
        await context.close()
        await browser.close()
    });

    async function openLawPopup(path: string) {
        await page.goto(url + path);
        await page.click("//span[@role='button' and contains(., 'требованиям закона')]");
        const title = await page.$("//span[@class='ant-modal-confirm-title']");
        expect(await title.textContent()).toContain(popupTitle);
    }

    async function openConsultantLink() {
        await page.click("//div[@class='ant-modal-confirm-content']//a");
        await Promise.all([context.waitForEvent("page")]);
        expect(page.context().pages()[1].url()).toContain('http://www.consultant.ru/document/cons_doc_LAW_32881');
        page.context().pages()[1].close();
    }

    async function closeLawPopup() {
        await page.click("//button[contains(., 'Закрыть')]");
        await page.isHidden("//div[@class='ant-modal-confirm-content']");
    }
});