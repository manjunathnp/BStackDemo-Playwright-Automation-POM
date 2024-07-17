import { Page, Locator } from "playwright";
import BasePage from "../baseTest/BasePage";

export class LoginPage extends BasePage {
    protected usernameTxtFld: Locator;
    protected passwordTxtFld: Locator;
    protected loginButton: Locator;
    protected loginErrorMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameTxtFld = page.locator('div').filter({ hasText: /^Select Username$/ }).nth(2);
        this.passwordTxtFld = page.locator('div').filter({ hasText: /^Select Password$/ }).nth(2);
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.loginErrorMsg = page.locator('[class="api-error"]');

    }

    async selectUsername(username: string) {
        await this.usernameTxtFld.click();
        const usernameOption = this.page.getByText(username, { exact: true });
        await usernameOption.click();
    }

    async selectPassword(password: string) {
        await this.passwordTxtFld.click();
        const passwordOption = this.page.getByText(password, { exact: true });
        await passwordOption.click();
    }

    async clickOnLogin() {
        return await this.loginButton.click();
    }

    async login(username: string, password: string) {
        await this.selectUsername(username);
        await this.selectPassword(password);
        await this.clickOnLogin();
    }

    async waitForLoginButtonToBeVisible(){
        await this.page.waitForSelector('#login-btn', {'timeout': 5000});
    }

    async loginErroMsgDisplayCheck(){
        return await this.loginErrorMsg.isVisible();
    }

    async waitForLoginErrMsgoBeVisible(){
        await this.page.waitForSelector('.api-error', {'timeout': 7500});
    }
}