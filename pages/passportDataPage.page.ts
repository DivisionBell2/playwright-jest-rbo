// import Footer from "./blocks/footer.pageBlock";
import Header from "./blocks/header.pageBlock";
// import SupportMenu from "./blocks/supportMenu.pageBlock";
// import VideoFrame from "./blocks/videoFrame.pageBlock";
import BasePage from "./basePage.page";
import Footer from "./blocks/footer.pageBlock";
// import AuthPopup from "./blocks/authPopup.pageBlock";

export default class PassportDataPage extends BasePage {

    selectors = {
        passportUploadField: "//div[@id='UserPasportMain']//input[@type='file']",
        uploadedFileIcon: "//div[@id='UserPasportMain']//span[@class='ant-upload ant-upload-btn']/div",
        filePreviewBlock: "//div[@class='slick-list']",

        closeFilePreviewButton: "//button[@aria-label='Close']",
        deleteUploadedFileButton: "//div[contains(@class, 'uploader-delete')]",
    }

    paths = {
        entrepreneur: "/rbidos/personal-information/ip/5",
        legalEntity: "/rbidos/personal-information/ooo/5"
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
}