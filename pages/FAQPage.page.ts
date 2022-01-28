import { Page } from "playwright";
import Env from "../utils/environment";
import Header from "./blocks/Header.page";

export default class FAQPage {
    private page: Page;
    private header: Header;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
    }

    public checkData = {
        title: 'Вопрос-ответ'
    }

    private url = Env.url + "/rbidos/faq";

    private selectors = {
        title: 'h1'
    }

    public async goToFAQPage() {
        await this.page.goto(this.url)
    }

    public async getTitleText(): Promise<string> {
        return await this.page.locator(this.selectors.title).textContent();
    }
}

