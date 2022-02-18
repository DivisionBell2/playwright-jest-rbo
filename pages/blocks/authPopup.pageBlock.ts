import BasePage from "../basePage.page";

export default class AuthPopup extends BasePage {

    selectors = {
        authButton: "#test-loginForm-singIn",
        closeButton: "//button[@aria-label='Close']",
        registrationButton: "#test-regForm-singup_button",
        resetPasswordButton: "//a[text()='Забыли пароль?']",
        sberIdButton: "//button[contains(@class, 'SberIdButton')]",
        
        authPasswordInput: "#password",
        confirmEmailInput: "//input[@data-qa='codeEntered_field']",
        emailInput: "//div[@class='ant-modal-body']//input[@id='email']",
        firstNameInput: "//div[@class='ant-modal-body']//input[@id='firstName']",
        lastNameInput: "//div[@class='ant-modal-body']//input[@id='lastName']",
        middleNameInput: "//div[@class='ant-modal-body']//input[@id='middleName']",
        passwordInput: "//div[contains(@class, 'Registration__registration-form')]//input[@id='password']",
        passwordMatchInput: "#passwordMatch",
        usernameInput: "#username",
        
        authLink: "//div[@role='button' and text()='Войти']",
        registrationLink: "text='Зарегистрироваться'",

        authTitle: "//h2[text()='Вход']",
        agreementCheckbox: "#personalDataAgreement",
        modalWindow: "//div[@class='ant-modal-content']",
        viewingPasswordIcon: "//span[@class='ant-input-suffix']"
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
        await this.reporter.startStep("Click on auth button");
        await page.click(this.selectors.authButton);
        await this.reporter.endStep();
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

    public async clickSberIdButton(): Promise<void> {
        await this.reporter.startStep("Click on sber id button");
        await page.click(this.selectors.sberIdButton);
        await this.reporter.endStep();
    }
}