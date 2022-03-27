import BasePage from "./basePage.page";
import Footer from "./blocks/footer.pageBlock";
import Header from "./blocks/header.pageBlock";
import VideoFrame from "./blocks/videoFrame.pageBlock";

export default class FeedbackPage extends BasePage {

    selectors = {
        messageTextInput: "#messageText",
        usermailInput: "#userMail",

        infoSendedMessageText: "//p[contains(., 'Спасибо за ваше сообщение!')]",
        sendButton: "//button[contains(., 'Отправить')]"
    }

    path = "/rbidos/feedback";

    public async getFooter(): Promise<Footer> {
        return new Footer();
    }

    public async getHeader(): Promise<Header> {
        return new Header();
    }

    public async getVideoFrame(): Promise<VideoFrame> {
        return new VideoFrame();
    }
}