import { Page } from "playwright";
import Env from "../utils/environment";
import Header from "./blocks/Header.page";

export default class FeedbackPage {
    private page: Page;
    private header: Header;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
    }

    public checkData = {
        title: 'Обратная связь'
    }

    private url = Env.url + "rbidos/feedback";

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