import { BrowserContext, Page } from "playwright";

export default class PageTabsHelper {
    

    static async getNewTab(page: Page): Promise<Page> {
        await this.getAllTabs(page.context());
        return page.context().pages()[1]
    }

    static async saveOnlyOneTab(page: Page): Promise<void> {
        const pages = page.context().pages();

        if (pages.length > 1) {
            for (let i = 1; i < pages.length; i++) {
                pages[i].close();
            }
        }
    }

    private static async getAllTabs(context: BrowserContext): Promise<void> {
        const [tabs] = await Promise.all([
            context.waitForEvent("page"),
        ]);
        
        await tabs.waitForLoadState();
    }
}