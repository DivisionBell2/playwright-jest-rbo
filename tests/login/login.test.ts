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

        await mainPage.goToMainPage();
        await header.clickEnterButton();

        await authModal.clickRegistrationLink();
        await authModal.enterFirstName(user.username);
        await authModal.enterMiddleName(user.username);
        await authModal.enterLastName(user.username);
        await authModal.enterEmail(user.email);
        await authModal.enterPassword(user.password);
        await authModal.enterPasswordMatch(user.password);
        await authModal.clickAgreementCheckbox();
        await authModal.clickRegistrationButton();

        await mainPage.reloadPage();
        await header.clickEnterButton();

        await authModal.enterUsername(user.email);
        await authModal.enterAuthPassword(user.password);
        await authModal.clickAuthButton();

        expect(await header.isUserIconVisible()).toBeTruthy();
    });
});