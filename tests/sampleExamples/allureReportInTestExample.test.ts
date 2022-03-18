import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import * as urlData from "../../data/checkDataUrls.json";
import ReportUtils from "../../utils/reportUtils";

const requestTypes = [
    "Entrepreneur",
    "Legal Entity",
];

declare const reporter: any

requestTypes.forEach(requestType => {
    describe("Example of allure report with logic in test", () => {
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
            await reporter
            .description("Login into LetCode")
            .story("JIRA101");

            await reporter.startStep("Open modal window");
            await enterPersonalDataPage.clickLawModalLink();
            expect(await enterPersonalDataPage.getModalTitleText()).toContain(enterPersonalDataPage.checkData.modalTitle);
            await ReportUtils.screenshot("openModalWindow");
            await reporter.endStep();

            await reporter.startStep("Open law link");
            await enterPersonalDataPage.clickConsultantLink();
            const newTab = await enterPersonalDataPage.getNewTab();
            expect(newTab.url()).toContain(urlData.lawLink);
            await enterPersonalDataPage.saveOnlyOneTab();
            await enterPersonalDataPage.clear();
            await ReportUtils.screenshot("openLawLink");
            await reporter.endStep();

            await reporter.startStep("Close modal window");
            await enterPersonalDataPage.clickCloseModalButton();
            expect(await enterPersonalDataPage.checkModalWindowHidden()).toBeTruthy();
            await ReportUtils.screenshot("closeModalWindow");
            await reporter.endStep();
        });
    });
});