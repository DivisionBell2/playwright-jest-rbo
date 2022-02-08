import { Page } from "playwright";

export default class EnterPersonalDataPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public checkData = {
        title: 'Персональные данные'
    }

    private selectors = {
        title: 'h1',
    }

    public async getTitleText(): Promise<string | null> {
        return await (await this.page.waitForSelector(this.selectors.title)).textContent();
    }
}

