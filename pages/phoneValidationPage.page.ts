// import Footer from "./blocks/footer.pageBlock";
import Header from "./blocks/header.pageBlock";
// import SupportMenu from "./blocks/supportMenu.pageBlock";
// import VideoFrame from "./blocks/videoFrame.pageBlock";
import BasePage from "./basePage.page";
import Footer from "./blocks/footer.pageBlock";
// import AuthPopup from "./blocks/authPopup.pageBlock";
import * as constants from "../data/сonstants.json";

export default class PhoneValidationPage extends BasePage {

    // public checkData = {
    //     title: 'бизнес легко и быстро'
    // }

    selectors = {
        selfRegistrationButton: "//button[contains(., 'Я регистрируюсь сам')]",
        sendSMSButton: "#test-send_sms",
        continueButton: "//button[contains(., 'Продолжить')]",

        phoneInput: "//input[@name='phone']",
        smsCodeInput: "#code",

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

    // public async getVideoFrame(): Promise<VideoFrame> {
    //     return new VideoFrame();
    // }

    public async getFooter(): Promise<Footer> {
        return new Footer();
    }

    // public async getSupportMenu(): Promise<SupportMenu> {
    //     return new SupportMenu();
    // }

    // public async getAuthPopup(): Promise<AuthPopup> {
    //     return new AuthPopup();
    // }

    public async basePhoneValidation(message: string) {
        await this.reporter.startStep(message);
        await this.isVisible(this.selectors.requestNumber, "Wait for request number", 3, 2);
        //await page.waitForTimeout(5000)
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