import User from "../../data/user";
import BasePage from "../basePage.page";
import Header from "./header.pageBlock";

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

    public async login(user: User) {
        let header = new Header();

        await header.click(header.selectors.enterButton, "Click enter button");
        await this.click(this.selectors.registrationLink, "Click go to registration link");
        await this.fill(this.selectors.firstNameInput, user.username, "Enter first name of user in first name input");
        await this.fill(this.selectors.middleNameInput, user.username, "Enter middle name of user in middle name input");
        await this.fill(this.selectors.lastNameInput, user.username, "Enter last name of user in last name input");
        await this.fill(this.selectors.emailInput, user.email, "Enter user email in email input");
        await this.fill(this.selectors.passwordInput, user.password, "Enter user password in password input");
        await this.fill(this.selectors.passwordMatchInput, user.password, "Enter user password in password match input");
        await this.click(this.selectors.agreementCheckbox, "Click on to agreement checkbox");
        await this.click(this.selectors.registrationButton, "Click on to registration button");
        await this.waitForSelector(this.selectors.confirmEmailInput, "Wait for confirm email input on popup");

        await this.reload("Reload main page");
        await header.click(header.selectors.enterButton, "Click enter button");

        await this.fill(this.selectors.usernameInput, user.email, "Enter email in auth email input");
        await this.fill(this.selectors.authPasswordInput, user.password, "Enter password in auth password input");
        await this.click(this.selectors.authButton, "Click auth button");

        expect(await header.isHidden(this.selectors.authButton, "Check user auth button is hidden", 5)).toBeTruthy();
        expect(await header.isVisible(header.selectors.userIcon, "Check user icon visible in header", 20)).toBeTruthy();
    }
}