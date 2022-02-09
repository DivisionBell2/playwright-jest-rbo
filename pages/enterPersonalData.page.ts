import { Page } from "playwright";
import BasePage from "./basePage.page";

export default class EnterPersonalDataPage extends BasePage {

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

