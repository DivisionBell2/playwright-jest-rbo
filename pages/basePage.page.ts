import { ElementHandle, Page } from "playwright";
import * as data from "../data/url.json";

declare const page: Page;
declare const reporter: any

export default class BasePage {
    protected url: string;
    protected page: Page;
    protected reporter;

    constructor() {
        this.page = page;
        this.url = data.url;
        this.reporter = reporter;
    }

    async clear(): Promise<void> {
        await context.clearCookies();
        await context.clearPermissions();
    }

    async click(element: string, message: string) {
        await reporter.startStep(message);
        await page.click(element);
        await reporter.endStep();
    }

    async goBack(message: string) {
        await reporter.startStep(message);
        await page.goBack();
        await reporter.endStep();
    }

    async clickArrayElement(elements: string, elementNumber: number, message: string) {
        await reporter.startStep(message);
        const selectors = await page.$$(elements);
        await selectors[elementNumber].click();
        await reporter.endStep();
    }

    async fill(element: string, text: string, message: string, seconds?: number) {
        await reporter.startStep(message);
        await page.fill(element, text, {timeout: seconds});
        await reporter.endStep();
    }

    async getAttribute(element: string, attribute: string, message: string): Promise<string | null | undefined> {
        await reporter.startStep(message);
        let attributeValue = await (await page.$(element))?.getAttribute(attribute);
        await reporter.endStep();
        return attributeValue;
    }

    async getLocatorsArray(element: string, message: string): Promise<ElementHandle<SVGElement | HTMLElement>[]> {
        await reporter.startStep(message);
        const locatorsArray = await page.$$(element);
        await reporter.endStep();
        return locatorsArray;
    }

    async getNewTab(message?: string): Promise<Page> {
        await reporter.startStep(message);
        await page.waitForTimeout(1000);
        await page.context().pages()[1].waitForLoadState();
        await reporter.endStep();
        return page.context().pages()[1];
    }

    async getTextContent(element: string, message: string): Promise<string|null> {
        await reporter.startStep(message);
        const text = await (await this.page.waitForSelector(element)).textContent();
        await reporter.endStep();
        return text;
    }

    async getElementFromArray(element: string, position: number, message: string): Promise<ElementHandle<SVGElement | HTMLElement>> {
        await reporter.startStep(message);
        const elements = await page.$$(element)
        await reporter.endStep();
        return elements[position];
    }

    async goto(path: string, message: string): Promise<void> {
        await reporter.startStep(message);
        await page.goto(this.url + path);
        await reporter.endStep();
    }

    async hover(element: string, message: string): Promise<void> {
        await reporter.startStep(message);
        await page.hover(element);
        await reporter.endStep();
    }

    async isDisabled(element: string, message: string): Promise<boolean> {
        await reporter.startStep(message);
        const isEnabled = await page.isDisabled(element);
        await reporter.endStep();
        return isEnabled;
    }

    async isHidden(element : string, message: string, seconds?: number): Promise<boolean> {
        await reporter.startStep(message);

        let secondsCount: number;
        let isHidden = false;

        if (seconds != undefined) {
            secondsCount = seconds;
        } else {
            secondsCount = 3;
        }

        for (let i = 0; i < secondsCount; i++) {
            isHidden = await page.isHidden(element);
            if (!isHidden) {
                await page.waitForTimeout(1000);
            } else {
                break;
            }
        }
        await reporter.endStep();
        return isHidden;
    }

    async isVisible(element : string, message: string, seconds?: number, timeout?: number): Promise<boolean> {
        await reporter.startStep(message);

        let secondsCount: number;
        let isVisible = false;

        if (timeout != undefined) {
            await page.waitForTimeout(timeout * 1000);
        }

        if (seconds != undefined) {
            secondsCount = seconds;
        } else {
            secondsCount = 3;
        }

        for (let i = 0; i < secondsCount; i++) {
            isVisible = await page.isVisible(element);
            if (!isVisible) {
                await page.waitForTimeout(1000);
            } else {
                break;
            }
        }
        await reporter.endStep();
        return isVisible;
    }

    async reload(message: string): Promise<void> {
        await reporter.startStep(message);
        await page.reload();
        await reporter.endStep();
    }

    async saveOnlyOneTab(): Promise<void> {
        const pages = page.context().pages();

        if (pages.length > 1) {
            for (let i = 1; i < pages.length; i++) {
                pages[i].close();
            }
        }
    }

    async setInputFiles(element : string, filePath: string, message: string): Promise<void> {
        await reporter.startStep(message);
        await page.setInputFiles(element, filePath);
        await reporter.endStep();
    }

    async getUrl(message: string): Promise<string> {
        await reporter.startStep(message);
        const url = await page.url();
        await reporter.endStep();
        return url;
    }

    async waitForLoadState(message: string): Promise<void> {
        await reporter.startStep(message);
        await page.waitForLoadState();
        await reporter.endStep();
    }

    async waitForNavigation(message: string): Promise<void> {
        await reporter.startStep(message);
        await page.waitForNavigation();
        await reporter.endStep();
    }

    async waitForSelector(element: string, message: string): Promise<void> {
        await reporter.startStep(message);
        await page.waitForSelector(element);
        await reporter.endStep();
    }

    async waitForTimeout(message: string, timeout: number): Promise<void> {
        await reporter.startStep(message);
        await page.waitForTimeout(timeout);
        await reporter.endStep();
    }
}