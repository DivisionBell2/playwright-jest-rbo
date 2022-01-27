import { Page } from "playwright";
import Env from "../utils/environment";

export default class MainPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private url = Env.url;

    private landingStartEntrepreneurButton = '#test-landing-upper-ip_button';
    private landingStartLegalEntityButton = '#test-landing-upper-ooo_button';
    private blockStartEntrepreneurButton = "//div[@id='eighthblock']//div[contains(@class, 'landing-left-button') and contains(text(), 'Станьте ИП')]";

    public async goToMainPage() {
        await this.page.goto(this.url)
    }

    public async clickLandingStartEntrepreneurButton(): Promise<void> {
        const ele = await this.page.locator(this.landingStartEntrepreneurButton);
        await ele.click();
    }

    public async clickLandingStartLegalEntityButton(): Promise<void> {
        const ele = await this.page.locator(this.landingStartLegalEntityButton);
        await ele.click();
    }

    public async clickBlockStartEntrepreneurButton(): Promise<void> {
        const ele = await this.page.locator(this.blockStartEntrepreneurButton);
        await ele.click();
    }

    public async getTitleText(): Promise<void> {
        const ele = await this.page.locator(this.landingStartEntrepreneurButton);
        await ele.click();
    }
}

