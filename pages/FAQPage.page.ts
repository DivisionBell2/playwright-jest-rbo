import { Page } from "playwright";
import BasePage from "./basePage.page";
import Header from "./blocks/header.pageBlock";

export default class FAQPage extends BasePage {

    public checkData = {
        title: 'Вопрос-ответ'
    }

    private selectors = {
        title: 'h1'
    }

    public async goToFAQPage() {
        await this.page.goto(this.url)
    }

    public async getTitleText(): Promise<string | null> {
        return await (await this.page.waitForSelector(this.selectors.title)).textContent();
    }
}

