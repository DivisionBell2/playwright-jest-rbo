import BasePage from "../basePage.page";

export default class AuthPopup extends BasePage {

    private selectors = {
        registrationButton: "#test-regForm-singup_button",
        authButton: "#test-loginForm-singIn",
        closeButton: "//button[@aria-label='Close']",

        lastNameInput: "//div[@class='ant-modal-body']//input[@id='lastName']",
        firstNameInput: "//div[@class='ant-modal-body']//input[@id='firstName']",
        middleNameInput: "//div[@class='ant-modal-body']//input[@id='middleName']",
        emailInput: "//div[@class='ant-modal-body']//input[@id='email']",
        passwordInput: "//div[contains(@class, 'Registration__registration-form')]//input[@id='password']",
        passwordMatchInput: "#passwordMatch",
        usernameInput: "#username",
        authPasswordInput: "#password",
        confirmEmailInput: "//input[@data-qa='codeEntered_field']",

        registrationLink: "text='Зарегистрироваться'",
        agreementCheckbox: "#personalDataAgreement",
        modalWindow: "//div[@class='ant-modal-content']"
    }

    public async enterFirstName(firstName: string): Promise<void> {
        await page.fill(this.selectors.firstNameInput, firstName);
    }

    public async enterMiddleName(middleName: string): Promise<void> {
        await page.fill(this.selectors.middleNameInput, middleName);
    }

    public async enterLastName(lastName: string): Promise<void> {
        await page.fill(this.selectors.lastNameInput, lastName);
    }

    public async enterEmail(email: string): Promise<void> {
        await page.fill(this.selectors.emailInput, email);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.page.fill(this.selectors.passwordInput, password);
    }

    public async enterPasswordMatch(passwordMatch: string): Promise<void> {
        await page.fill(this.selectors.passwordMatchInput, passwordMatch);
    }

    public async enterUsername(email: string): Promise<void> {
        await page.fill(this.selectors.usernameInput, email);
    }

    public async clickRegistrationLink(): Promise<void> {
        await page.click(this.selectors.registrationLink);
    }

    public async enterAuthPassword(password: string): Promise<void> {
        await page.fill(this.selectors.authPasswordInput, password);
    }

    public async clickAgreementCheckbox(): Promise<void> {
        await page.click(this.selectors.agreementCheckbox);
    }

    public async clickRegistrationButton(): Promise<void> {
        await page.click(this.selectors.registrationButton);
        await page.waitForSelector(this.selectors.confirmEmailInput);
    }

    public async clickAuthButton(): Promise<void> {
        await page.click(this.selectors.authButton);
    }

    public async clickCloseButton(): Promise<void> {
        await this.reporter.startStep("Click closed button on auth popup");
        await page.click(this.selectors.closeButton);
        await this.reporter.endStep();
    }

    public async checkModalWindowHidden(): Promise<boolean> {
        await this.reporter.startStep("Check auth modal window closed");
        const isHidden = await this.checkElementHidden(this.selectors.modalWindow);
        await this.reporter.endStep();
        return isHidden;
    }
}