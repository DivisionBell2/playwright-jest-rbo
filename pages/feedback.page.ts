import { Page } from "playwright";
import Env from "../utils/environment";
import BasePage from "./basePage.page";
import Header from "./blocks/header.pageBlock";

export default class FeedbackPage extends BasePage {

    public checkData = {
        title: 'Обратная связь'
    }

    //private url = Env.url + "rbidos/feedback";

    private selectors = {
        title: 'h1'
    }

    public async goToFeedbackPage() {
        await this.page.goto(this.url)
    }

    public async getTitleText(): Promise<string | null> {
        return await (await this.page.waitForSelector(this.selectors.title)).textContent();
    }
}