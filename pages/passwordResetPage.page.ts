import BasePage from "./basePage.page";

export default class PasswordReset extends BasePage {

    selectors = {
        resetPasswordButton: "//button[contains(., 'Сбросить пароль')]",
    }
}