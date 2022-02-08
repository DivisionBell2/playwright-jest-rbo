import { Page } from "playwright";

export default class SberbankPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public checkData = {
        urlDomen: 'sberbank.ru'
    }
}