import BasePage from "../basePage.page";

export default class Header extends BasePage {

    private selectors = {
        faqLink: "text='Вопрос-ответ'",
        feedbackLink: "text='Обратная связь'",

        videoButton: "//span[@role='button' and contains(., 'Видеоинструкция')]",
        enterButton: "text='Войти'",

        userIcon: "#test-landing-navPanel-logedIn"
    }

    public async clickFAQLink(): Promise<void> {
        await page.click(this.selectors.faqLink);
    }

    public async clickFeedbackLink(): Promise<void> {
        await page.click(this.selectors.feedbackLink);
    }

    public async clickVideoButton(): Promise<void> {
        await page.click(this.selectors.videoButton);
    }

    public async clickEnterButton(): Promise<void> {
        await page.click(this.selectors.enterButton);
    }

    public async isUserIconVisible(): Promise<boolean> {
        await page.waitForTimeout(5000)
        return await page.isVisible(this.selectors.userIcon);
    }
}