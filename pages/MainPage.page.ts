import { Page } from "playwright";

export default class MainPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}