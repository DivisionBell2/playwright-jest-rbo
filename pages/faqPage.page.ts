import { Page } from "playwright";
import BasePage from "./basePage.page";
import Header from "./blocks/header.pageBlock";

export default class FAQPage extends BasePage {

    public checkData = {
        title: 'Вопрос-ответ',
        platformAgreement: 'https://uni-rbo.dasreda.ru/go/VBaOeYjhS4'
    }

    private selectors = {
        searchInput: "//input[@name='faq-search']"
    }

    public async goToFAQPage() {
        await this.page.goto(this.url)
    }

    public async checkSearchInputVisible(): Promise<boolean> {
        await this.page.waitForNavigation();
        return await this.page.isVisible(this.selectors.searchInput);
    }
}

