import BasePage from "./basePage.page";
import Header from "./blocks/header.pageBlock";

export default class SberIDPage extends BasePage {

    public checkData = {
        title: 'Деловая среда'
    }

    selectors = {
        title: "//h1[text()='Деловая среда']"
    }

    public async getTitleText(): Promise<string | null> {
        await this.reporter.startStep("Get title text form sberbank id login page")
        await this.page.waitForNavigation();
        const title = await (await this.page.waitForSelector(this.selectors.title)).textContent();
        await this.reporter.endStep();
        return title;
    }
}

