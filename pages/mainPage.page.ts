import Footer from "./blocks/footer.pageBlock";
import Header from "./blocks/header.pageBlock";
import SupportMenu from "./blocks/supportMenu.pageBlock";
import VideoFrame from "./blocks/videoFrame.pageBlock";
import BasePage from "./basePage.page";
import AuthPopup from "./blocks/authPopup.pageBlock";

export default class MainPage extends BasePage {

    public checkData = {
        title: 'бизнес легко и быстро'
    }

    selectors = {
        cookieButton: "#test-cookieAlert_button",
        blockStartEntrepreneurButton: "//div[@id='eighthblock']//div[contains(@class, 'landing-left-button') and contains(text(), 'Станьте ИП')]",
        blockStartLegalEntityButton: "//div[@id='eighthblock']//div[contains(@class, 'landing-right-button') and contains(text(), 'Откройте ООО')]",
        faqButton: "//div[@id='tenthblock']//a[text()='Вопросы и ответы']",
        goToSberBankButton: "//div[@id='sixth-block-wrapper']//a/img[@alt='Сбербанк']",
        landingStartEntrepreneurButton: '#test-landing-upper-ip_button',
        landingStartLegalEntityButton: '#test-landing-upper-ooo_button',
        
        agreementLink: "//a[contains(., 'Согласие')]",
        ofertaLink: "//a[contains(., 'Оферты')]",

        title: "#test-landing-header-text"
    }

    public async getHeader(): Promise<Header> {
        return new Header();
    }

    public async getVideoFrame(): Promise<VideoFrame> {
        return new VideoFrame();
    }

    public async getFooter(): Promise<Footer> {
        return new Footer();
    }

    public async getSupportMenu(): Promise<SupportMenu> {
        return new SupportMenu();
    }

    public async getAuthPopup(): Promise<AuthPopup> {
        return new AuthPopup();
    }

    public async clickOnCookieButton(): Promise<void> {
        if (await this.isVisible(this.selectors.cookieButton, "Check is cookie button exist on page")) {
            await this.click(this.selectors.cookieButton, "Click on cookie button");
        }
    }
}