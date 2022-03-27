import BasePage from "../basePage.page";

export default class Header extends BasePage {

    selectors = {
        faqLink: "text='Вопрос-ответ'",
        feedbackLink: "text='Обратная связь'",

        enterButton: "text='Войти'",
        videoButton: "//span[@role='button' and contains(., 'Видеоинструкция')]",
        
        logo: "//div[contains(@class, 'topmenu-logo-pic')]",
        userIcon: "#test-landing-navPanel-logedIn"
    }
}