import { Page } from "playwright";

export default class EnterPersonalDataPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public checkData = {
        title: 'Персональные данные'
    } 

    public async getTitleText(): Promise<string> {
        return await this.page.locator("h1").textContent();
    }
}

