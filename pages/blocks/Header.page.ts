import { Page } from "playwright";

export default class Header {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private selectors = {
        faqLink: "text='Вопрос-ответ'",
        feedbackLink: "text='Обратная связь'",
        videoButton: "//span[@role='button' and contains(., 'Видеоинструкция')]",
    }

    public async clickFAQLink(): Promise<void> {
        await this.page.click(this.selectors.faqLink);
    }

    public async clickFeedbackLink(): Promise<void> {
        await this.page.click(this.selectors.feedbackLink);
    }

    public async clickVideoButton(): Promise<void> {
        await this.page.click(this.selectors.videoButton);
    }
}