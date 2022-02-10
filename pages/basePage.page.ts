import { BrowserContext, Page } from "playwright";
import * as data from "../data/url.json";

declare const page: Page;
//declare const url: string;

export default class BasePage {
    protected url: string;
    protected page: Page;

    constructor() {
        this.page = page;
        this.url = data.url;
    }

    async getNewTab(): Promise<Page> {
        await this.getAllTabs(page.context());
        return page.context().pages()[1]
    }

    async saveOnlyOneTab(): Promise<void> {
        const pages = page.context().pages();

        if (pages.length > 1) {
            for (let i = 1; i < pages.length; i++) {
                pages[i].close();
            }
        }
    }

    private async getAllTabs(context: BrowserContext): Promise<void> {
        const [tabs] = await Promise.all([
            context.waitForEvent("page"),
        ]);
        
        await tabs.waitForLoadState();
    }
}