import BasePage from "../basePage.page";

export default class AuthPopup extends BasePage {

    // public checkData = {
    //     platformReadLink: 'uat.dasreda.ru/learn/blog',
    //     platformWatchLink: 'uat.dasreda.ru/learn/videos'
    // }

    private selectors = {
        registrationButton: "#test-regForm-singup_button",
        authButton: "#test-loginForm-singIn",

        registrationLink: "text='Зарегистрироваться'",
        agreementCheckbox: "#personalDataAgreement",

        lastNameInput: "//div[@class='ant-modal-body']//input[@id='lastName']",
        firstNameInput: "//div[@class='ant-modal-body']//input[@id='firstName']",
        middleNameInput: "//div[@class='ant-modal-body']//input[@id='middleName']",
        emailInput: "//div[@class='ant-modal-body']//input[@id='email']",
        passwordInput: "//div[contains(@class, 'Registration__registration-form')]//input[@id='password']",
        passwordMatchInput: "#passwordMatch",
        usernameInput: "#username",
        authPasswordInput: "#password",
    }

    public async enterFirstName(firstName: string): Promise<void> {
        await this.page.fill(this.selectors.firstNameInput, firstName);
    }

    public async enterMiddleName(middleName: string): Promise<void> {
        await this.page.fill(this.selectors.middleNameInput, middleName);
    }

    public async enterLastName(lastName: string): Promise<void> {
        await this.page.fill(this.selectors.lastNameInput, lastName);
    }

    public async enterEmail(email: string): Promise<void> {
        await this.page.fill(this.selectors.emailInput, email);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.page.fill(this.selectors.passwordInput, password);
    }

    public async enterPasswordMatch(passwordMatch: string): Promise<void> {
        await this.page.fill(this.selectors.passwordMatchInput, passwordMatch);
    }

    public async enterUsername(email: string): Promise<void> {
        await this.page.fill(this.selectors.usernameInput, email);
    }

    public async clickRegistrationLink(): Promise<void> {
        await this.page.click(this.selectors.registrationLink);
    }

    public async enterAuthPassword(password: string): Promise<void> {
        await this.page.fill(this.selectors.usernameInput, password);
    }

    public async clickAgreementCheckbox(): Promise<void> {
        await this.page.click(this.selectors.agreementCheckbox);
    }

    public async clickRegistrationButton(): Promise<void> {
        await this.page.click(this.selectors.registrationButton);
    }

    public async clickAuthButton(): Promise<void> {
        await this.page.click(this.selectors.authButton);
    }
}