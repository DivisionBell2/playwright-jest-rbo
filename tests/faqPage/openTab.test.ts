import FAQPage from "../../pages/faqPage.page";

describe('Open tab in FAQ page', () => {
    
    test ('Open tab with answer', async () => {
        let faqPage = new FAQPage();
        await faqPage.goto(faqPage.path, "Open FAQ page");
        await faqPage.clickArrayElement(faqPage.selectors.tabItem, 0,  "Click first faq tab");
        expect(await faqPage.isVisible(faqPage.selectors.answerBlock, "Check visible answer block")).toBeTruthy();
        await faqPage.clickArrayElement(faqPage.selectors.tabItem, 0,  "Click first opened faq tab");
        expect(await faqPage.isVisible(faqPage.selectors.closedTabItem, "Check answerBlock is closed")).toBeTruthy();
    });
});
