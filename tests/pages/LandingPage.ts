import { Locator, Page } from "playwright";
import BasePage from '../baseTest/BasePage';

export class LandingPage extends BasePage {
    protected signInLink: Locator;

    constructor(page: Page){
        super(page);
        //this.signInLink = page.getByRole('link', { name: 'Sign In' });
        this.signInLink = page.locator('#signin');
    }

    async clickSignLink(){
        await this.clickElement(this.signInLink);
    } 
    async signInLinkToBeVisible(){
        return await this.page.waitForSelector('#signin', {timeout: 15000});
        //return await this.signInLink.isVisible();
    }
    

}