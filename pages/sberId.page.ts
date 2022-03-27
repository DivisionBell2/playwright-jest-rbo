import BasePage from "./basePage.page";

export default class SberIDPage extends BasePage {

    public checkData = {
        title: 'Деловая среда'
    }

    selectors = {
        title: "//h1[text()='Деловая среда']"
    }
}

