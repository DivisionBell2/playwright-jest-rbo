import { Page } from "playwright";

export default class SupportMenu {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public checkData = {
        popupStyleDisplayNone: "display: none;",
    }

    private selectors = {
        supportMenuButton: "//div[@role='button' and contains(@class, 'SupportCall__messenger')]",
        supportMenuOpenedButton: "//div[@role='button' and contains(@class, 'SupportCall__messenger-opened')]",
        phoneButton: "//div[@role='button' and contains(@class, 'SupportCall__messenger-phone')]",
        telegramButton: "//div[@role='button' and contains(@class, 'SupportCall__messenger-telegram')]",
        feedBackButton: "//div[@role='button' and contains(@class, 'SupportCall__messenger-omni')]",
        dialogWindow: "//div[@role='dialog']",
        closeDialogWindowButton: "//button[@aria-label='Close']"
    }

    public async clickToOpenSupportMenuButton(): Promise<void> {
        await this.page.click(this.selectors.supportMenuButton);
    }

    public async clickToCloseSupportMenu(): Promise<void> {
        await this.page.click(this.selectors.supportMenuOpenedButton);
    }

    public async clickPhoneButton(): Promise<void> {
        await this.page.click(this.selectors.phoneButton);
    }

    public async clickTelegramButton(): Promise<void> {
        await this.page.click(this.selectors.telegramButton);
    }

    public async clickFeedbackButton(): Promise<void> {
        await this.page.click(this.selectors.feedBackButton);
    }

    public async clickCloseDialogWindotButton(): Promise<void> {
        await this.page.click(this.selectors.closeDialogWindowButton);
    }

    public async waitForVideoFrameHidden(): Promise<boolean> {
        return await this.page.isHidden(this.selectors.supportMenuOpenedButton);
    }

    public async waitForDialogWindowVisible(): Promise<boolean> {
        return await this.page.isVisible(this.selectors.dialogWindow);
    }

    public async waitForDialogWindowHidden(): Promise<boolean> {
        const supportPopup = await this.page.$(this.selectors.dialogWindow);

        for (let i = 0; i < 3; i++) {
            if (await supportPopup.getAttribute("style") == null) {
                await this.page.waitForTimeout(1000);
                continue;
            }
        }

        if (await supportPopup.getAttribute("style") == this.checkData.popupStyleDisplayNone) {
            return true;
        }

        return false;
    }
}