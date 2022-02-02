import { Page } from "playwright-core";

export default class SberbankPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public checkData = {
        urlDomen: 'sberbank.ru'
    }
}