// import Footer from "./blocks/footer.pageBlock";
import Header from "./blocks/header.pageBlock";
// import SupportMenu from "./blocks/supportMenu.pageBlock";
// import VideoFrame from "./blocks/videoFrame.pageBlock";
import BasePage from "./basePage.page";
// import AuthPopup from "./blocks/authPopup.pageBlock";

export default class PhoneValidationPage extends BasePage {

    // public checkData = {
    //     title: 'бизнес легко и быстро'
    // }

    selectors = {
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