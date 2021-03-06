import Header from "./blocks/header.pageBlock";
import BasePage from "./basePage.page";
import Footer from "./blocks/footer.pageBlock";
import * as constants from "../data/сonstants.json";

export default class PhoneValidationPage extends BasePage {

    selectors = {
        continueButton: "//button[contains(., 'Продолжить')]",
        selfRegistrationButton: "//button[contains(., 'Я регистрируюсь сам')]",
        sendSMSButton: "#test-send_sms",
        selectNewRequestButton: "//div[contains(., 'новую заявку')]/following-sibling::button",

        phoneInput: "//input[@name='phone']",
        smsCodeInput: "#code",

        getNewRequestText: "//div[contains(., 'новую заявку')]",
        requestNumber: "//div[contains(@class, 'request-number-hint')]",
        
        agreementCheckbox: "#agreement-conditions",
        personalDataCheckbox: "#agreementPersonalData"
    }

    paths = {
        entrepreneur: "/rbidos/personal-information/ip/2",
        legalEntity: "/rbidos/personal-information/ooo/2"
    }

    public async getHeader(): Promise<Header> {
        return new Header();
    }

    public async getFooter(): Promise<Footer> {
        return new Footer();
    }

    public async basePhoneValidation(message: string) {
        await this.reporter.startStep(message);
        await this.isVisible(this.selectors.requestNumber, "Wait for request number", 3, 2);
        await this.click(this.selectors.selfRegistrationButton, "Click on self registration button");

        await this.fill(this.selectors.phoneInput, constants.basePhone, "Enter phone number");
        await this.click(this.selectors.sendSMSButton, "Click send sms button");
        await this.click(this.selectors.agreementCheckbox, "Click agreement checkbox");
        await this.click(this.selectors.personalDataCheckbox, "Click personal data checkbox");
        await this.fill(this.selectors.smsCodeInput, constants.phoneCode, "Enter phone code");
        await this.click(this.selectors.continueButton, "Click continue button");
        
        await this.reporter.endStep();
    }
}