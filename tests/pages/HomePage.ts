import { Page, Locator } from "playwright";
import BasePage from "../baseTest/BasePage";

export class HomePage extends BasePage{
    protected usernameDisplay: Locator;
    protected logoutLink: Locator;
    protected addToCartBtn: Locator
    protected checkOutBtn: Locator


    constructor(page: Page){
        super(page);
        this.usernameDisplay = page.locator('#username');
        this.logoutLink = page.locator('#logout');
        this.addToCartBtn = page.locator("xpath=//div[p[normalize-space()='iPhone 12']]").getByText('Add to cart');
        this.checkOutBtn = page.locator('.buy-btn');
    }

    async usernameVisibilityCheck(){ 
        return await this.usernameDisplay.isVisible();
    }

    async logout(){
        return await this.logoutLink.click();
    }

    async clickOnAddToCart() {
        return await this.addToCartBtn.click({timeout: 15000});
    }

    async clickOnCheckoutBtn(){
        return await this.checkOutBtn.click();
    }
}