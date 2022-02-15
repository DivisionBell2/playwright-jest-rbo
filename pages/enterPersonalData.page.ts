import BasePage from "./basePage.page";
import Footer from "./blocks/footer.pageBlock";
import Header from "./blocks/header.pageBlock";

export default class EnterPersonalDataPage extends BasePage {

    public checkData = {
        title: "Персональные данные",
        modalTitle: "Изменения в законе № 129-ФЗ"
    }

    private selectors = {
        title: "h1",
        modalTitle: "//span[@class='ant-modal-confirm-title']",
        logo: "//div[contains(@class, 'topmenu-logo-pic')]",
        modalWindow: "//div[@class='ant-modal-confirm-content']",


        sberIdButton: "//button[contains(@class, 'SberIdButton')]",
        closeModalButton: "//button[contains(., 'Закрыть')]",

        dasredaLink: "//div[contains(@class, 'PersonalInformation__hint-blockquote')]/a[contains(., dasreda.ru)]",
        agreementsLink: "//span[contains(@class, 'PersonalInformation')]/a[contains(., 'Согласие')]",
        lawLink: "//span[@role='button' and contains(., 'требованиям закона')]",
        consultantLink: "//div[@class='ant-modal-confirm-content']//a"
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

    public async getModalTitleText(): Promise<string | null> {
        return await (await page.waitForSelector(this.selectors.modalTitle)).textContent();
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

    public async clickLawModalLink(): Promise<void> {
        await page.click(this.selectors.lawLink);
    }

    public async clickConsultantLink(): Promise<void> {
        await page.click(this.selectors.consultantLink);
    }

    public async clickCloseModalButton(): Promise<void> {
        await page.click(this.selectors.closeModalButton);
    }

    public async checkModalWindowHidden(): Promise<boolean> {
        for (let i = 0; i < 3; i++) {
            if (!await page.isHidden(this.selectors.modalWindow)) {
                await this.page.waitForTimeout(1000);
                continue;
            }
        }
        return await page.isHidden(this.selectors.modalWindow);
    }
}

