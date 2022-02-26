import { Page } from "playwright";
import BasePage from "./basePage.page";
import Footer from "./blocks/footer.pageBlock";
import Header from "./blocks/header.pageBlock";

export default class FAQPage extends BasePage {

    public checkData = {
        title: 'Вопрос-ответ',
        platformAgreement: 'https://uni-rbo.dasreda.ru/go/VBaOeYjhS4'
    }

    selectors = {
        searchInput: "//input[@name='faq-search']",
        tabItem: "//div[@class='ant-collapse-item']",
        closedTabItem: "//div[@class='ant-collapse-item']/div[@aria-expanded='false']",
        answerBlock: "//div[@class='ant-collapse-content-box']",
        cookieButton: "#test-cookieAlert_button",
    }

    path = "/rbidos/faq";

    public async goToFAQPage() {
        await this.page.goto(this.url)
    }

    public async checkSearchInputVisible(): Promise<boolean> {
        await this.page.waitForNavigation();
        return await this.page.isVisible(this.selectors.searchInput);
    }

    public async getHeader(): Promise<Header> {
        return new Header();
    }

    public async getFooter(): Promise<Footer> {
        return new Footer();
    }
}

