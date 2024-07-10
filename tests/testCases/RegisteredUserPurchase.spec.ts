import {test, expect} from '../../Fixtures/POMFixtures';

test.describe('Registered User Purchase Item Test', () => {
    test('Purchase Item - Login - Add to cart Test', async({loginPage, homePage, checkoutPage, data, shipping, confirmationPage})=>{
        await loginPage.navigateToSignInPage(data.appSignInURL);
        await loginPage.login(data.demoUsername, data.password);
        expect.soft(await homePage.usernameVisibilityCheck()).toBeTruthy();
    
        await homePage.clickOnAddToCart();
        await homePage.clickOnCheckoutBtn();
    
        await checkoutPage.enterShippingAddress(
                        shipping.firstName, shipping.lastName,
                        shipping.address, shipping.state, 
                        shipping.zip);
        
        expect(await confirmationPage.orderSuccessMsgDisplayed()).toBe(shipping.successMsg);
    
    });
    
    test('Purchase Item - Add to cart Test - Login Test', async({loginPage, homePage, checkoutPage, data, shipping, confirmationPage})=>{
        await homePage.navigateToHomePage(data.appBaseURL);

        await homePage.clickOnAddToCart();
        await homePage.clickOnCheckoutBtn();
        
        await loginPage.login(data.demoUsername, data.password);
        await checkoutPage.enterShippingAddress(
            shipping.firstName, shipping.lastName,
            shipping.address, shipping.state, 
            shipping.zip);
        
        expect(await confirmationPage.orderSuccessMsgDisplayed()).toBe(shipping.successMsg);
    });    
});