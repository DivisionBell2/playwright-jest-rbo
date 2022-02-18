export default class User {
    readonly username: string = "Автотест";
    readonly password: string = "Qwerty123";
    readonly email: string;

    constructor() {
        this.email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
    }
}