import Header from "./blocks/header.pageBlock";
import BasePage from "./basePage.page";
import Footer from "./blocks/footer.pageBlock";

export default class PassportDataPage extends BasePage {

    selectors = {
        filePreviewBlock: "//div[@class='slick-list']",
        passportUploadField: "//div[@id='UserPasportMain']//input[@type='file']",
        uploadedFileIcon: "//div[@id='UserPasportMain']//span[@class='ant-upload ant-upload-btn']/div",
        
        closeFilePreviewButton: "//button[@aria-label='Close']",
        deleteUploadedFileButton: "//div[contains(@class, 'uploader-delete')]",

        title: "//h2[contains(., 'Ввод паспортных данных')]"
    }

    paths = {
        entrepreneur: "/rbidos/personal-information/ip/5",
        legalEntity: "/rbidos/personal-information/ooo/5"
    }

    public async getHeader(): Promise<Header> {
        return new Header();
    }

    public async getFooter(): Promise<Footer> {
        return new Footer();
    }
}