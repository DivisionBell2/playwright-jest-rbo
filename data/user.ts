export default class User {
    username: string = "Автотест";
    password: string = "Qwerty123";
    email: string;

    constructor() {
        this.email = "autotest+" + new Date().getTime() + "@dasredatest.ru";
    }
}