import BasePage from "../basePage.page";

export default class LeftMenu extends BasePage {

    selectors = {
        enterPersonalPageLink: "//ul/li[@role='menuitem']/div[contains(@class, 'title') and contains(., 'Персональные данные')]/../ul/li[contains(., 'Ввод персональных данных')]",
        phoneValidationPageLink: "//ul/li[@role='menuitem']/div[contains(@class, 'title') and contains(., 'Персональные данные')]/../ul/li[contains(., 'Подтверждение номера телефона')]"
    }
}