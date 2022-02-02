import { Page } from "playwright";

export default class VideoFrame {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private selectors = {
        closeButton: "//i[@aria-label='icon: close']",
        frame: "//iframe[@title='YouTube video player']"
    }

    public async clickCloseButton(): Promise<void> {
        await this.page.click(this.selectors.closeButton);
    }

    public async waitForVideoFrame(): Promise<void> {
        await this.page.waitForSelector(this.selectors.frame);
    }

    public async waitForVideoFrameHidden(): Promise<boolean> {
        return await this.page.isHidden(this.selectors.frame)
    }
}