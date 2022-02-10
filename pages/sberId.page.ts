import BasePage from "./basePage.page";
import Header from "./blocks/header.pageBlock";

export default class SberIDPage extends BasePage {

    public checkData = {
        title: 'Деловая среда'
    }

    private selectors = {
        title: "//h1[text()='Деловая среда']"
    }

    public async getTitleText(): Promise<string | null> {
        await this.page.waitForNavigation();
        return await (await this.page.waitForSelector(this.selectors.title)).textContent();
    }
}

