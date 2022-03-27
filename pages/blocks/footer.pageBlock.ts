import BasePage from "../basePage.page";

export default class Footer extends BasePage {

    public checkData = {
        platformReadLink: 'uat.dasreda.ru/learn/blog',
        platformWatchLink: 'uat.dasreda.ru/learn/videos'
    }

    selectors = {
        agreementPersonalDataLink: "//a[contains(., 'Согласие на обработку данных')]",
        readLink: "//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Читать')]",
        ofertaLink: "//a[contains(., 'Договор оферты')]",
        privacyPolicyLink: "//a[contains(., 'Политика конфиденциальности')]",
        watchLink: "//div[contains(@class, 'ant-row MainFooter__footer-menu-content')]//li/a[contains(., 'Смотреть')]",
        userAgreementLink: "//a[contains(., 'Пользовательское соглашение')]",
    }
}