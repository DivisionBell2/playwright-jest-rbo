import BasePage from "./basePage.page";
import Footer from "./blocks/footer.pageBlock";
import Header from "./blocks/header.pageBlock";

export default class FAQPage extends BasePage {

    public checkData = {
        title: 'Вопрос-ответ',
        platformAgreement: 'https://uni-rbo.dasreda.ru/go/VBaOeYjhS4'
    }

    selectors = {
        answerBlock: "//div[@class='ant-collapse-content-box']",
        androidImage: "//img[@src='/img/faq/android1.png']",
        androidVersionInfoBlock: "//div[@class='ant-collapse-header' and contains(., 'Как узнать версию Android')]",
        closedTabItem: "//div[@class='ant-collapse-item']/div[@aria-expanded='false']",
        cookieButton: "#test-cookieAlert_button",
        searchInput: "//input[@name='faq-search']",
        tabItem: "//div[@class='ant-collapse-item']",
    }

    path = "/rbidos/faq";

    public async goToFAQPage() {
        await this.page.goto(this.url)
    }

    public async getHeader(): Promise<Header> {
        return new Header();
    }

    public async getFooter(): Promise<Footer> {
        return new Footer();
    }
}

