import { Page } from "playwright";

export default class Footer {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public checkData = {
        platformReadLink: 'uat.dasreda.ru/learn/blog',
        platformWatchLink: 'uat.dasreda.ru/learn/videos'
    }

    private selectors = {
        readLink: "//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Читать')]",
        watchLink: "//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Смотреть')]"
    }

    public async clickReadLink(): Promise<void> {
        await this.page.click(this.selectors.readLink);
    }

    public async clickWatchLink(): Promise<void> {
        await this.page.click(this.selectors.watchLink);
    }
}