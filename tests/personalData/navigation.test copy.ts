import {Protocol} from "playwright/types/protocol";
import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import FAQPage from "../../pages/faqPage.page";
import RemoteLocation = Protocol.Target.RemoteLocation;

const pages = [
    new EnterPersonalDataPage().goToEnterPersonalDataPageEntrepreneur(),
    new EnterPersonalDataPage().goToEnterPersonalDataPageLegalEntity(),
];

pages.forEach(openPage => {
    describe('Navigation on personal data page', () => {
        let enterPersonalDataPage: EnterPersonalDataPage;
        let faqPage: FAQPage;

        beforeAll(async () => {
            enterPersonalDataPage = new EnterPersonalDataPage();
            faqPage = new FAQPage();
        });

        beforeEach(async () => {
            //await openPage;
            await enterPersonalDataPage.goToEnterPersonalDataPageEntrepreneur();
        });

        test('Clicking on FAQ button', async () => {
            const header = await enterPersonalDataPage.getHeader();
            await header.clickFAQLink();
            //await (await enterPersonalDataPage.getHeader()).clickFAQLink();
            expect(await faqPage.getTitleText()).toContain(faqPage.checkData.title);
        });
        
    });
});

        // test('Clicking on privacy policy link in footer', async () => {
        //     await page.goto(url + requestPath);
        //     await page.click("//a[contains(., 'Политика конфиденциальности')]");
        //     await Promise.all([context.waitForEvent("page")]);
        //     expect(page.context().pages()[1].url()).toContain('politika.pdf');
        //     await page.context().pages()[1].close();
        // });

        // test('Clicking on personal data agreement link in footer', async () => {
        //     await page.goto(url + requestPath);
        //     await page.click("//a[contains(., 'Согласие на обработку данных')]");
        //     await Promise.all([context.waitForEvent("page")]);
        //     expect(page.context().pages()[1].url()).toContain('soglasie_na_rbidos');
        //     await page.context().pages()[1].close();
        // });

        // test('Clicking on user agreement link in footer', async () => {
        //     await page.goto(url + requestPath);
        //     await page.click("//a[contains(., 'Пользовательское соглашение')]");
        //     await Promise.all([context.waitForEvent("page")]);
        //     expect(page.context().pages()[1].url()).toContain('polzovatelskoe_soglashenie');
        //     await page.context().pages()[1].close();
        // });

        // afterEach(async () => {
        //     await page.close();
        //     await context.close();
        //     await browser.close();
        // });
//     });
// });