import BasePage from "./basePage.page";

export default class ErrorPage extends BasePage {

    selectors = {
        errorMessage: "//div[contains(@class, 'Error__error-text')]/div[1]"
    }

    checkData = {
        textMessageWithoutSBOL: "Без логина и пароля в Сбербанк Онлайн мы не можем предоставить вам услугу"
    }

    path = "/rbidos/error"
}
