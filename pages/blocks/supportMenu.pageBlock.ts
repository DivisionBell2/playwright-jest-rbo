import BasePage from "../basePage.page";

export default class SupportMenu extends BasePage {

    checkData = {
        popupStyleDisplayNone: "display: none;",
    }

    selectors = {
        dialogWindow: "//div[@role='dialog']",

        closeDialogWindowButton: "//button[@aria-label='Close']",
        feedBackButton: "//div[@role='button' and contains(@class, 'SupportCall__messenger-omni')]",
        supportMenuButton: "//div[@role='button' and contains(@class, 'SupportCall__messenger')]",
        supportMenuOpenedButton: "//div[@role='button' and contains(@class, 'SupportCall__messenger-opened')]",
        phoneButton: "//div[@role='button' and contains(@class, 'SupportCall__messenger-phone')]",
        telegramButton: "//div[@role='button' and contains(@class, 'SupportCall__messenger-telegram')]"
    }
}