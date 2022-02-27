import BasePage from "./basePage.page";
import Header from "./blocks/header.pageBlock";
import VideoFrame from "./blocks/videoFrame.pageBlock";

export default class FeedbackPage extends BasePage {

    selectors = {
        messageTextInput: '#messageText'
    }

    path = "/rbidos/feedback";

    public async getHeader(): Promise<Header> {
        return new Header();
    }

    public async getVideoFrame(): Promise<VideoFrame> {
        return new VideoFrame();
    }

    public async goToFeedbackPage() {
        await this.page.goto(this.url)
    }

    public async checkMessageTextInputVisible(): Promise<boolean> {
        return await this.page.isVisible(this.selectors.messageTextInput);
    }

    public async waitForNavigationFeedbackPage(): Promise<void> {
        await this.page.waitForNavigation();
    }
}