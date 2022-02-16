import { Page } from "playwright";
import Env from "../utils/environment";
import BasePage from "./basePage.page";
import Header from "./blocks/header.pageBlock";

export default class FeedbackPage extends BasePage {

    // public checkData = {
    //     messageTextInput: 'Обратная связь'
    // }

    //private url = Env.url + "rbidos/feedback";

    private selectors = {
        messageTextInput: '#messageText'
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