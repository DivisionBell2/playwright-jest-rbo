import { Page } from "playwright";
import Env from "../utils/environment";
import Footer from "./blocks/Footer.page";
import Header from "./blocks/Header.page";
import VideoFrame from "./blocks/VideoFrame.page";

export default class MainPage {
    private page: Page;
    private header: Header;
    private footer: Footer;
    private videoFrame: VideoFrame;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.videoFrame = new VideoFrame(page);
        this.footer = new Footer(page);
    }

    public checkData = {
        ofertaUrl: 'oferta_rbidos',
        agreementUrl: 'soglasie_na_rbidos'
    }

    private url = Env.url;

    private selectors = {
        landingStartEntrepreneurButton: '#test-landing-upper-ip_button',
        landingStartLegalEntityButton: '#test-landing-upper-ooo_button',
        blockStartEntrepreneurButton: "//div[@id='eighthblock']//div[contains(@class, 'landing-left-button') and contains(text(), 'Станьте ИП')]",
        blockStartLegalEntityButton: "//div[@id='eighthblock']//div[contains(@class, 'landing-right-button') and contains(text(), 'Откройте ООО')]",
        faqButton: "//div[@id='tenthblock']//a[text()='Вопросы и ответы']",
        goToSberBankButton: "//div[@id='sixth-block-wrapper']//a/img[@alt='Сбербанк']",
        
        ofertaLink: "//a[contains(., 'Оферты')]",
        agreementLink: "//a[contains(., 'Согласие')]",
    }

    public async goToMainPage() {
        await this.page.goto(this.url)
    }

    public async getHeader(): Promise<Header> {
        return this.header;
    }

    public async getVideoFrame(): Promise<VideoFrame> {
        return this.videoFrame;
    }

    public async getFooter(): Promise<Footer> {
        return this.footer;
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
}