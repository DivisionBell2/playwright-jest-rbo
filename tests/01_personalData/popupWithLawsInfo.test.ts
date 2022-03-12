import EnterPersonalDataPage from "../../pages/enterPersonalData.page";
import * as urlData from "../../data/checkDataUrls.json";

let personalDataPage = new EnterPersonalDataPage();
const paths = [
    personalDataPage.paths.entrepreneur,
    personalDataPage.paths.legalEntity,
];

paths.forEach(path => {
    describe("Checking of work popup with law information from personal data page", () => {
        test("Checking of work popup with law information from personal data page", async () => {
            await personalDataPage.goto(path, "Open personal data page for " + path);
            await personalDataPage.click(personalDataPage.selectors.lawLink, "Click on law link")
            expect(await personalDataPage.isVisible(personalDataPage.selectors.modalTitle, "Check law modal window title")).toBeTruthy();

            await personalDataPage.click(personalDataPage.selectors.consultantLink, "Click consultant link on law modal window");
            const newTab = await personalDataPage.getNewTab();
            expect(newTab.url()).toContain(urlData.lawLink);

            await personalDataPage.saveOnlyOneTab();
            await personalDataPage.clear();
            await personalDataPage.click(personalDataPage.selectors.closeModalButton, "Click on close modal window on personal data page");
            expect(await personalDataPage.isHidden(personalDataPage.selectors.modalWindow, "Check law modal window hidden")).toBeTruthy();
        });
    });
});