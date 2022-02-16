import { BrowserContext, Page } from "playwright";
import * as data from "../data/url.json";

declare const page: Page;
declare const reporter: any

export default class BasePage {
    protected url: string;
    protected page: Page;
    protected reporter;

    constructor() {
        this.page = page;
        this.url = data.url;
        this.reporter = reporter;
    }

    async clear(): Promise<void> {
        await context.clearCookies();
        await context.clearPermissions();
    }

    async getNewTab(): Promise<Page> {
        await this.getAllTabs(page.context());
        return page.context().pages()[1];
    }

    async reloadPage(): Promise<void> {
        await page.reload();
    }

    async saveOnlyOneTab(): Promise<void> {
        const pages = page.context().pages();

        if (pages.length > 1) {
            for (let i = 1; i < pages.length; i++) {
                pages[i].close();
            }
        }
    }

    async checkElementHidden(element: string): Promise<boolean> {
        for (let i = 0; i < 3; i++) {
            if (!await this.page.isHidden(element)) {
                await this.page.waitForTimeout(1000);
                continue;
            }
        }
        return await this.page.isHidden(element);
    }

    private async getAllTabs(context: BrowserContext): Promise<void> {
        const [tabs] = await Promise.all([
            context.waitForEvent("page"),
        ]);

        await page.waitForLoadState()
    }
}