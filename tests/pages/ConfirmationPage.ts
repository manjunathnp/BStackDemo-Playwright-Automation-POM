import { Page, Locator } from "playwright";
import BasePage from "../baseTest/BasePage";

export class ConfirmationPage extends BasePage{
    protected orderSuccessMsg: Locator;


    constructor(page: Page){
        super(page);
        this.orderSuccessMsg = page.locator('#confirmation-message');
    }

    async orderSuccessMsgDisplayed(){
        return this.orderSuccessMsg.innerText();

    }

    
}