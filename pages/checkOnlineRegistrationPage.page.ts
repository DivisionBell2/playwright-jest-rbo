import Header from "./blocks/header.pageBlock";
import BasePage from "./basePage.page";

export default class CheckOnlineRegistrationPage extends BasePage {

    selectors = {
        continueButton: "//button[contains(., 'Продолжить')]",
        modalWindowOkButton: "//div[@class='ant-modal-body']//button[contains(., 'OK')]",
        noNFCButton: "//button[contains(., 'NFC нет')]",
        
        infoModalWindow: "//div[@class='ant-modal-body']",
        nfcCheckbox: "//li[contains(@class, 'PersonalInformation')]//input[@type='checkbox']",
        noSuitableAndroid: "//li[text()='4.0 или ниже']",
        osNameSelect: "#osName",
        phoneSelects: "//div[@role='combobox' and @aria-autocomplete='list']",
        
        hasSBOLRadio: "//input[@name='hasSbol' and @value='1']",
        hasPassportRadio: "//input[@name='hasBioPassport' and @value='1']",
        noPassportRadio: "//input[@name='hasBioPassport' and @value='2']",
        noSbolRadio: "//input[@name='hasSbol' and @value='2']",
        
        androidLi: "//li[text()='Android']",

        howToKnowAndroidVersionLink: "//a[text()='Как узнать версию Android?']",
        nfcInfoLink: "//span[text()='Как узнать, есть ли в телефоне NFC?']",
        
    }

    paths = {
        entrepreneur: "/rbidos/personal-information/ip/3",
        legalEntity: "/rbidos/personal-information/ooo/3"
    }

    public async getHeader(): Promise<Header> {
        return new Header();
    }

    public async selectBaseOnlineRegistration(message: string) {
        await this.reporter.startStep(message);
        await this.click(this.selectors.hasSBOLRadio, "Click has SBOL radiobutton");
        await this.click(this.selectors.hasPassportRadio, "Click has passport radiobutton");
        await this.click(this.selectors.osNameSelect, "Click OS change menu");
        await this.click(this.selectors.androidLi, "Click android OS");
        await this.click(this.selectors.nfcCheckbox, "CLick NFC checkbox");
        await this.click(this.selectors.continueButton, "Click continue button");
        await this.reporter.endStep();
    }
}