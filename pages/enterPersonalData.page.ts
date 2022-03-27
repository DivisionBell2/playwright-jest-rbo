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
        logo: "//div[contains(@class, 'topmenu-logo-pic')]",
        modalTitle: "//span[@class='ant-modal-confirm-title']",
        modalWindow: "//div[@class='ant-modal-confirm-content']",
        noMiddleNameText: "//p[text()='Без отчества']",
        title: "h2",

        closeModalButton: "//button[contains(., 'Закрыть')]",
        sberIdButton: "//button[contains(@class, 'SberIdButton')]",
        sendPasswordBUtton: "#test-send_password",

        agreementsLink: "//span[contains(@class, 'PersonalInformation')]/a[contains(., 'Согласие')]",
        consultantLink: "//div[@class='ant-modal-confirm-content']//a",
        dasredaLink: "//div[contains(@class, 'PersonalInformation__hint-blockquote')]/a[contains(., dasreda.ru)]",
        lawLink: "//span[@role='button' and contains(., 'требованиям закона')]",

        noMiddleNameCheckbox: "//div[contains(@class, 'input-item-no-mid-name')]/label",
        personalDataCheckbox: "//label[contains(@class, 'PersonalInformation__checkbox') and contains(., 'передачу персональных данных')]/span[contains(@class, 'ant-checkbox')]",

        email: "#email",
        emailCodeInput: "#emailCode",
        firstNameInput: "//input[@id='firstName']",
        middleNameInput: "#middleName",
        lastNameInput: "#lastName",
    }

    paths = {
        entrepreneur: "/rbidos/personal-information/ip/1",
        legalEntity: "/rbidos/personal-information/ooo/1"
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
}

