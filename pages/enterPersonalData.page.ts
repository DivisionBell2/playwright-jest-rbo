import BasePage from "./basePage.page";
import Footer from "./blocks/footer.pageBlock";
import Header from "./blocks/header.pageBlock";
import AuthPopup from "./blocks/authPopup.pageBlock";

export default class EnterPersonalDataPage extends BasePage {

    public checkData = {
        title: "Ввод персональных данных",
        modalTitle: "Изменения в законе № 129-ФЗ"
    }

    selectors = {
        title: "h2",
        modalTitle: "//span[@class='ant-modal-confirm-title']",
        logo: "//div[contains(@class, 'topmenu-logo-pic')]",
        modalWindow: "//div[@class='ant-modal-confirm-content']",
        noMiddleNameText: "//p[text()='Без отчества']",


        sberIdButton: "//button[contains(@class, 'SberIdButton')]",
        closeModalButton: "//button[contains(., 'Закрыть')]",
        sendPasswordBUtton: "#test-send_password",

        dasredaLink: "//div[contains(@class, 'PersonalInformation__hint-blockquote')]/a[contains(., dasreda.ru)]",
        agreementsLink: "//span[contains(@class, 'PersonalInformation')]/a[contains(., 'Согласие')]",
        lawLink: "//span[@role='button' and contains(., 'требованиям закона')]",
        consultantLink: "//div[@class='ant-modal-confirm-content']//a",

        noMiddleNameCheckbox: "//div[contains(@class, 'input-item-no-mid-name')]/label",
        personalDataCheckbox: "//label[contains(@class, 'PersonalInformation__checkbox') and contains(., 'передачу персональных данных')]/span[contains(@class, 'ant-checkbox')]",

        middleNameInput: "#middleName",
        lastNameInput: "#lastName",
        firstNameInput: "//input[@id='firstName']",
        email: "#email",
        emailCodeInput: "#emailCode"
        
    }

    paths = {
        entrepreneur: "/rbidos/personal-information/ip/1",
        legalEntity: "/rbidos/personal-information/ooo/1"
    }

    public async goToEnterPersonalDataPageEntrepreneur() {
        await page.goto(this.url + "/rbidos/personal-information/ip/1");
    }

    public async goToEnterPersonalDataPageLegalEntity() {
        await this.page.goto(this.url + "/rbidos/personal-information/ooo/1");
    }

    public async getAuthPopup(): Promise<AuthPopup> {
        return new AuthPopup();
    }

    public async getHeader(): Promise<Header> {
        return new Header();
    }

    public async getFooter(): Promise<Footer> {
        return new Footer();
    }

    public async getTitleText(): Promise<string | null> {
        return await (await this.page.waitForSelector(this.selectors.title)).textContent();
    }

    public async getModalTitleText(): Promise<string | null> {
        return await (await this.page.waitForSelector(this.selectors.modalTitle)).textContent();
    }

    public async clickLogo(): Promise<void> {
        await this.page.click(this.selectors.logo);
    }

    public async clickSberIdButton(): Promise<void> {
        await this.page.click(this.selectors.sberIdButton);
    }

    public async clickDasredaLink(): Promise<void> {
        await this.page.click(this.selectors.dasredaLink);
    }

    public async clickAgreementsLink(): Promise<void> {
        await this.page.click(this.selectors.agreementsLink);
    }

    public async clickLawModalLink(): Promise<void> {
        await this.page.click(this.selectors.lawLink);
    }

    public async clickConsultantLink(): Promise<void> {
        await this.page.click(this.selectors.consultantLink);
    }

    public async clickCloseModalButton(): Promise<void> {
        await this.page.click(this.selectors.closeModalButton);
    }

    public async checkModalWindowHidden(): Promise<boolean> {
        return await this.checkElementHidden(this.selectors.modalWindow);
    }
}

