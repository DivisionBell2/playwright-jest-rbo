import BasePage from "../basePage.page";

export default class Footer extends BasePage {

    public checkData = {
        platformReadLink: 'uat.dasreda.ru/learn/blog',
        platformWatchLink: 'uat.dasreda.ru/learn/videos'
    }

    selectors = {
        readLink: "//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Читать')]",
        watchLink: "//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Смотреть')]",
        privacyPolicyLink: "//a[contains(., 'Политика конфиденциальности')]",

        ofertaDoc: "//a[contains(., 'Договор оферты')]",
        agreementPersonalDataDoc: "//a[contains(., 'Согласие на обработку данных')]",
    }

    public async clickReadLink(): Promise<void> {
        await this.page.click(this.selectors.readLink);
    }

    public async clickWatchLink(): Promise<void> {
        await this.page.click(this.selectors.watchLink);
    }

    public async clickOfertaLink(): Promise<void> {
        await this.page.click(this.selectors.ofertaDoc);
    }

    public async clickPrivacyPolicyLink(): Promise<void> {
        await this.page.click(this.selectors.privacyPolicyLink);
    }

    public async clickAgreementLink(): Promise<void> {
        await this.page.click(this.selectors.agreementPersonalDataDoc);
    }
}