import { Page, Locator } from "playwright";
import * as testData from '../../TestData/creds.json'

export default class BasePage {
    protected page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async openApp(url: string){
        await this.page.goto(url);
    }

    async navigateToSignInPage(url: string){
        await this.page.goto(url, {timeout: 10000});
    }

    async navigateToHomePage(url: string){
        await this.page.goto(url, {timeout: 10000});
    }

    async clickElement(element: Locator){
        await element.click({timeout: 10000});
    }

    async getTitle(){
        return await this.page.title();
    }

    async getURL(){
        return this.page.url();
    }

    async waitForPageToLoad(){
        return this.page.waitForLoadState('load');
    }

    async waitForUrl(){
        return this.page.waitForURL(testData.appBaseURL, {timeout: 12000});
    }

    async waitForElement(selector: string){
        await this.page.waitForSelector(selector, {timeout: 10000});
    }

    async waitForTimeout(seconds: number){
        return this.page.waitForTimeout(seconds*1000);
    }
}