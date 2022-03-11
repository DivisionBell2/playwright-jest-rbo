// import Footer from "./blocks/footer.pageBlock";
import Header from "./blocks/header.pageBlock";
// import SupportMenu from "./blocks/supportMenu.pageBlock";
// import VideoFrame from "./blocks/videoFrame.pageBlock";
import BasePage from "./basePage.page";
// import AuthPopup from "./blocks/authPopup.pageBlock";

export default class CheckOnlineRegistrationPage extends BasePage {

    // public checkData = {
    //     title: 'бизнес легко и быстро'
    // }

    selectors = {
        continueButton: "//button[contains(., 'Продолжить')]",
        nfcCheckbox: "//li[contains(@class, 'PersonalInformation')]//input[@type='checkbox']",
        hasSBOLRadio: "//input[@name='hasSbol' and @value='1']",
        hasPassportRadio: "//input[@name='hasBioPassport' and @value='1']",

        androidLi: "//li[text()='Android']",
        osNameSelect: "#osName",
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

    // public async getVideoFrame(): Promise<VideoFrame> {
    //     return new VideoFrame();
    // }

    // public async getFooter(): Promise<Footer> {
    //     return new Footer();
    // }

    // public async getSupportMenu(): Promise<SupportMenu> {
    //     return new SupportMenu();
    // }

    // public async getAuthPopup(): Promise<AuthPopup> {
    //     return new AuthPopup();
    // }
}