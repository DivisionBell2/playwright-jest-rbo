import MainPage from "../../pages/mainPage.page";
import User from "../../data/user";

describe("Login new user from Main Page", () => {
    let mainPage: MainPage;
    let user: User;

    test("Login new user", async () => {
        mainPage = new MainPage();
        const header = await mainPage.getHeader();
        const authModal = await mainPage.getAuthPopup();
        user = new User();

        await mainPage.goto("", "Open main page");
        await header.click(header.selectors.enterButton, "Click enter button");
        await authModal.click(authModal.selectors.registrationLink, "Click go to registration link");
        await authModal.fill(authModal.selectors.firstNameInput, user.username, "Enter first name of user in first name input");
        await authModal.fill(authModal.selectors.middleNameInput, user.username, "Enter middle name of user in middle name input");
        await authModal.fill(authModal.selectors.lastNameInput, user.username, "Enter last name of user in last name input");
        await authModal.fill(authModal.selectors.emailInput, user.email, "Enter user email in email input");
        await authModal.fill(authModal.selectors.passwordInput, user.password, "Enter user password in password input");
        await authModal.fill(authModal.selectors.passwordMatchInput, user.password, "Enter user password in password match input");
        await authModal.click(authModal.selectors.agreementCheckbox, "Click on to agreement checkbox");
        await authModal.click(authModal.selectors.registrationButton, "Click on to registration button");
        await authModal.waitForSelector(authModal.selectors.confirmEmailInput, "Wait for confirm email input on popup");

        await authModal.reloadPage();
        await header.click(header.selectors.enterButton, "Click enter button");

        await authModal.fill(authModal.selectors.usernameInput, user.email, "Enter email in auth email input");
        await authModal.fill(authModal.selectors.authPasswordInput, user.password, "Enter password in auth password input");
        await authModal.click(authModal.selectors.authButton, "Click auth button");

        expect(await header.isVisible(header.selectors.userIcon, "Check user icon visible in header", 10)).toBeTruthy();
    });
});