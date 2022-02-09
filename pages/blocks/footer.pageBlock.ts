import { Page } from "playwright";
import BasePage from "../basePage.page";

export default class Footer extends BasePage {

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