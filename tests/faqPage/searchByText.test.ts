import FAQPage from "../../pages/faqPage.page";

describe("Searching tests for FAQ page", () => {
    
    test ("Searching by text", async () => {
        let faqPage = new FAQPage();
        const questionText = "Кто может стать предпринимателем";
        
        await faqPage.goto(faqPage.path, "Open FAQ page");
        expect((await faqPage.getLocatorsArray(faqPage.selectors.tabItem, "Get tabs locators")).length).toBeGreaterThan(1);
        await faqPage.fill(faqPage.selectors.searchInput, questionText, "Enter text " + questionText + " in search input");
        expect((await faqPage.getLocatorsArray(faqPage.selectors.tabItem, "Get tabs locators")).length).toBe(1);
    });
});