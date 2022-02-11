import BasePage from "./basePage.page";
import Footer from "./blocks/footer.pageBlock";
import Header from "./blocks/header.pageBlock";

export default class EnterPersonalDataPage extends BasePage {

    public checkData = {
        title: 'Персональные данные'
    }

    private selectors = {
        title: "h1",
        logo: "//div[contains(@class, 'topmenu-logo-pic')]",
        sberIdButton: "//button[contains(@class, 'SberIdButton')]",

        dasredaLink: "//div[contains(@class, 'PersonalInformation__hint-blockquote')]/a[contains(., dasreda.ru)]",
        agreementsLink: "//span[contains(@class, 'PersonalInformation')]/a[contains(., 'Согласие')]"
    }

    public async goToEnterPersonalDataPageEntrepreneur() {
        await page.goto(this.url + "/rbidos/personal-information/ip/1");
    }

    public async goToEnterPersonalDataPageLegalEntity() {
        await page.goto(this.url + "/rbidos/personal-information/ooo/1");
    }

    public async getHeader(): Promise<Header> {
        return new Header();
    }

    public async getFooter(): Promise<Footer> {
        return new Footer();
    }

    public async getTitleText(): Promise<string | null> {
        return await (await page.waitForSelector(this.selectors.title)).textContent();
    }

    public async clickLogo(): Promise<void> {
        await page.click(this.selectors.logo);
    }

    public async clickSberIdButton(): Promise<void> {
        await page.click(this.selectors.sberIdButton);
    }

    public async clickDasredaLink(): Promise<void> {
        await page.click(this.selectors.dasredaLink);
    }

    public async clickAgreementsLink(): Promise<void> {
        await page.click(this.selectors.agreementsLink);
    }
}

