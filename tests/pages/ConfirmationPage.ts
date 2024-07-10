import { Page, Locator } from "playwright";
import BasePage from "../baseTest/BasePage";

export class ConfirmationPage extends BasePage{
    protected orderSuccessMsg: Locator;


    constructor(page: Page){
        super(page);
        // this.orderSuccessMsg = page.getByText('Your Order has been successfully placed.');
        this.orderSuccessMsg = page.locator('#confirmation-message');
        //await expect(page.locator('[data-test="shipping-address-heading"]')).toContainText('Your Order has been successfully placed.');


    }

    async orderSuccessMsgDisplayed(){
        return this.orderSuccessMsg.innerText();

    }

    
}