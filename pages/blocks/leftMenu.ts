import BasePage from "../basePage.page";

export default class LeftMenu extends BasePage {

    selectors = {
        enterPersonalData: "//ul/li[@role='menuitem']/div[contains(@class, 'title') and contains(., 'Персональные данные')]/../ul/li[contains(., 'Ввод персональных данных')]"
    }
}