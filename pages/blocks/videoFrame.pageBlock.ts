import BasePage from "../basePage.page";

export default class VideoFrame extends BasePage {

    selectors = {
        closeButton: "//i[@aria-label='icon: close']",
        frame: "//iframe[@title='YouTube video player']"
    }
}