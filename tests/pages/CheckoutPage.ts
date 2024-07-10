import { Page, Locator } from "playwright";
import BasePage from "../baseTest/BasePage";

export class CheckoutPage extends BasePage{
    protected firstNameTxtFld: Locator;
    protected lastNameTxtFld: Locator;
    protected addressTxtFld: Locator;
    protected stateTxtFld: Locator;
    protected zipTxtFld: Locator;
    protected submitBtn: Locator;


    constructor(page: Page){
        super(page);
        this.firstNameTxtFld = page.locator('#firstNameInput');
        this.lastNameTxtFld = page.locator('#lastNameInput');
        this.addressTxtFld = page.locator('#addressLine1Input');
        this.stateTxtFld = page.locator('#provinceInput');
        this.zipTxtFld = page.locator('#postCodeInput');
        this.submitBtn = page.locator('#checkout-shipping-continue');
    }

    async enterShippingAddress(firstName: string, lastName: string, address: string, state: string, zip: string) {
        await this.firstNameTxtFld.fill(firstName);
        await this.lastNameTxtFld.fill(lastName);
        await this.addressTxtFld.fill(address);
        await this.stateTxtFld.fill(state);
        await this.zipTxtFld.fill(zip);
        await this.submitBtn.click();
    }

    
}