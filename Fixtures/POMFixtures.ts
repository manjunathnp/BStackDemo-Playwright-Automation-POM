import {Browser, Page, test as baseTest, chromium, firefox, webkit} from '@playwright/test';
import BasePage from '../tests/baseTest/BasePage';
import { LandingPage } from '../tests/pages/LandingPage';
import { LoginPage } from '../tests/pages/LoginPage';
import { HomePage } from '../tests/pages/HomePage';
import * as testData from '../TestData/creds.json';
import * as shippingData from '../TestData/shipping.json';
import { CheckoutPage } from '../tests/pages/CheckoutPage';
import { ConfirmationPage } from '../tests/pages/ConfirmationPage';


type pages = {
    basePage: BasePage,
    landingPage: LandingPage,
    loginPage: LoginPage,
    homePage: HomePage,
    checkoutPage: CheckoutPage,
    confirmationPage: ConfirmationPage,
    data: typeof testData, 
    shipping: typeof shippingData
}

const testPages = baseTest.extend<pages>({
    basePage: async({page}, use)=>{
        await use(new BasePage(page));
    },
    landingPage: async({page}, use)=>{
        await use(new LandingPage(page));
    },
    loginPage: async({page}, use)=>{
        await use(new LoginPage(page));
    },
    homePage: async({page}, use)=>{
        await use(new HomePage(page));
    },
    checkoutPage: async({page}, use)=>{
        await use(new CheckoutPage(page));
    },
    confirmationPage: async({page}, use)=>{
        await use(new ConfirmationPage(page));
    },
    data: async({}, use)=>{
        await use(testData);
    },
    shipping: async({}, use)=>{
        await use(shippingData);
    }
});

//Setup
testPages.beforeEach(async({page})=>{
    await page.setViewportSize({ width: 1400, height: 800 });
    await page.goto('https://bstackdemo.com');
});

// Teardown
testPages.afterEach(async({page})=>{
    await page.close();
});

export const test = testPages;
export const expect = testPages.expect;