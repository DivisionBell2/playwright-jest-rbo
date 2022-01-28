import { Page } from "playwright";
import Env from "../utils/environment";
import Header from "./blocks/Header.page";

export default class MainPage {
    private page: Page;
    private header: Header;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
    }

    private url = Env.url;

    private selectors = {
        landingStartEntrepreneurButton: '#test-landing-upper-ip_button',
        landingStartLegalEntityButton: '#test-landing-upper-ooo_button',
        blockStartEntrepreneurButton: "//div[@id='eighthblock']//div[contains(@class, 'landing-left-button') and contains(text(), 'Станьте ИП')]",
        blockStartLegalEntityButton: "//div[@id='eighthblock']//div[contains(@class, 'landing-right-button') and contains(text(), 'Откройте ООО')]"
    }

    public async goToMainPage() {
        await this.page.goto(this.url)
    }

    public async clickLandingStartEntrepreneurButton(): Promise<void> {
        const ele = await this.page.locator(this.selectors.landingStartEntrepreneurButton);
        await ele.click();
    }

    public async clickLandingStartLegalEntityButton(): Promise<void> {
        const ele = await this.page.locator(this.selectors.landingStartLegalEntityButton);
        await ele.click();
    }

    public async clickBlockStartEntrepreneurButton(): Promise<void> {
        const ele = await this.page.locator(this.selectors.blockStartEntrepreneurButton);
        await ele.click();
    }

    public async clickBlockStartLegalEntityButton(): Promise<void> {
        const ele = await this.page.locator(this.selectors.blockStartLegalEntityButton);
        await ele.click();
    }

    public async getTitleText(): Promise<void> {
        const ele = await this.page.locator(this.selectors.landingStartEntrepreneurButton);
        await ele.click();
    }

    public async getHeader(): Promise<Header> {
        return this.header;
    }
}

