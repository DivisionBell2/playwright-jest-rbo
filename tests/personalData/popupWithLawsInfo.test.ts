import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import * as urlData from "../../data/checkDataUrls.json";
import ReportUtils from "../../utils/reportUtils";

const requestTypes = [
    "Entrepreneur",
    "Legal Entity",
];

declare const reporter: any

requestTypes.forEach(requestType => {
    describe("Check working popup with law information from personal data page", () => {
        let enterPersonalDataPage: EnterPersonalDataPage;

        beforeAll(async () => {
            enterPersonalDataPage = new EnterPersonalDataPage();
        });

        test('Check working popup with law information from personal data page', async () => {
            console.log("Test for " + requestType + " request");

            if (requestType == "Entrepreneur") {
                await enterPersonalDataPage.goToEnterPersonalDataPageEntrepreneur();
            } else {
                await enterPersonalDataPage.goToEnterPersonalDataPageLegalEntity();
            }
            await enterPersonalDataPage.clickLawModalLink();
            expect(await enterPersonalDataPage.getModalTitleText()).toContain(enterPersonalDataPage.checkData.modalTitle);

            await enterPersonalDataPage.clickConsultantLink();
            const newTab = await enterPersonalDataPage.getNewTab();
            expect(newTab.url()).toContain(urlData.lawLink);
            await enterPersonalDataPage.saveOnlyOneTab();
            await enterPersonalDataPage.clear();

            await enterPersonalDataPage.clickCloseModalButton();
            expect(await enterPersonalDataPage.checkModalWindowHidden()).toBeTruthy();
        });
    });
});