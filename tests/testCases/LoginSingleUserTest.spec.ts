import {test, expect} from '../../Fixtures/POMFixtures';

test('Demo User Login Test', async({landingPage, loginPage, homePage, data})=>{
    await loginPage.navigateToSignInPage(data.appSignInURL);
    await loginPage.login(data.demoUsername, data.password);
    expect.soft(await homePage.usernameVisibilityCheck()).toBeTruthy();

    await homePage.logout();
    await landingPage.waitForPageToLoad();
    expect.soft(await landingPage.getURL()).toBe(data.appBaseURL);
    expect.soft(await landingPage.getTitle()).toBe(data.pageTitle);
});