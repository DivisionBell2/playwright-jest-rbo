import Footer from "./blocks/footer.pageBlock";
import Header from "./blocks/header.pageBlock";
import SupportMenu from "./blocks/supportMenu.pageBlock";
import VideoFrame from "./blocks/videoFrame.pageBlock";
import BasePage from "./basePage.page";

export default class MainPage extends BasePage {

    public checkData = {
        ofertaUrl: 'oferta_rbidos',
        agreementUrl: 'soglasie_na_rbidos',
        title: 'бизнес легко и быстро'
    }

    selectors = {
        landingStartEntrepreneurButton: '#test-landing-upper-ip_button',
        landingStartLegalEntityButton: '#test-landing-upper-ooo_button',
        blockStartEntrepreneurButton: "//div[@id='eighthblock']//div[contains(@class, 'landing-left-button') and contains(text(), 'Станьте ИП')]",
        blockStartLegalEntityButton: "//div[@id='eighthblock']//div[contains(@class, 'landing-right-button') and contains(text(), 'Откройте ООО')]",
        faqButton: "//div[@id='tenthblock']//a[text()='Вопросы и ответы']",
        goToSberBankButton: "//div[@id='sixth-block-wrapper']//a/img[@alt='Сбербанк']",
        cookieButton: "#test-cookieAlert_button",
        
        ofertaLink: "//a[contains(., 'Оферты')]",
        agreementLink: "//a[contains(., 'Согласие')]",

        title: "#test-landing-header-text",
    }

    public async goToMainPage() {
        await page.goto(this.url)
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

    public async clickLandingStartEntrepreneurButton(): Promise<void> {
        await this.page.click(this.selectors.landingStartEntrepreneurButton);
    }

    public async clickLandingStartLegalEntityButton(): Promise<void> {
        await this.page.click(this.selectors.landingStartLegalEntityButton);
    }

    public async clickBlockStartEntrepreneurButton(): Promise<void> {
        await this.page.click(this.selectors.blockStartEntrepreneurButton);
    }

    public async clickBlockStartLegalEntityButton(): Promise<void> {
        await this.page.click(this.selectors.blockStartLegalEntityButton);
    }

    public async clickFAQButton(): Promise<void> {
        await this.page.click(this.selectors.faqButton);
    }

    public async clickSberbankButton(): Promise<void> {
        await this.page.click(this.selectors.goToSberBankButton);
    }

    public async clickOfertaLink(): Promise<void> {
        await this.page.click(this.selectors.ofertaLink);
    }

    public async clickAgreementLink(): Promise<void> {
        await this.page.click(this.selectors.agreementLink);
    }

    public async clickCookieButton(): Promise<void> {
        await this.page.click(this.selectors.cookieButton);
    }

    public async getTitleText(): Promise<string|null> {
        return await (await this.page.waitForSelector(this.selectors.title)).textContent();
    }
}