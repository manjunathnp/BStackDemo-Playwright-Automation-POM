import { test, expect } from '../../Fixtures/POMFixtures';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Read and parse the CSV file
const csvFilePath = path.join('./testData','multiUserCreds.csv');
const records = parse(fs.readFileSync(csvFilePath, 'utf-8'), {
    columns: true,
    skip_empty_lines: true
});

// Iterate through each record in the CSV
records.forEach((record) => {
    if (record.username !== 'locked_user') {
        test(`Login Test - ${record.username}`, async ({ landingPage, loginPage, homePage }) => {
            await landingPage.waitForPageToLoad();

            // Landing page assertions
            expect.soft(await landingPage.getURL()).toBe('https://bstackdemo.com/');
            expect.soft(await landingPage.getTitle()).toBe('StackDemo');
    
            // Clicking sign-in link and navigating to login page
            await landingPage.clickSignLink();
            await loginPage.waitForLoginButtonToBeVisible();
            expect.soft(await loginPage.getURL()).toBe('https://bstackdemo.com/signin');
    
            // Logging in with credentials
            await loginPage.login(record.username, record.password);
            await loginPage.waitForPageToLoad();
            expect.soft(await homePage.usernameVisibilityCheck()).toBeTruthy();
    
            // Logging out and asserting landing page after logout
            await homePage.logout();
            await landingPage.waitForPageToLoad();
            expect.soft(await landingPage.getURL()).toBe('https://bstackdemo.com/');
            expect.soft(await landingPage.getTitle()).toBe('StackDemo');
        });
    }

    
});

// Check if the current record is for 'locked_user'
records.forEach((record) => {
    if (record.username === 'locked_user') {
        test(`Login Test - ${record.username}`, async ({ landingPage, loginPage }) => {
            await landingPage.waitForPageToLoad();
            
            // Landing page assertions
            expect.soft(await landingPage.getURL()).toBe('https://bstackdemo.com/');
            expect.soft(await landingPage.getTitle()).toBe('StackDemo');
    
            // Clicking sign-in link and navigating to login page
            await landingPage.clickSignLink();
            await loginPage.waitForLoginButtonToBeVisible();
            expect.soft(await loginPage.getURL()).toBe('https://bstackdemo.com/signin');
    
            // Logging in with credentials
            await loginPage.login(record.username, record.password);
            await loginPage.waitForPageToLoad();
            await loginPage.waitForLoginErrMsgoBeVisible();

            // Asserting login error message display check for locked user
            expect.soft(await loginPage.loginErroMsgDisplayCheck()).toBeTruthy();
    
        });
    }
});




// import {test, expect} from '../../Fixtures/POMFixtures';
// import fs from 'fs';
// import path from 'path';
// import { parse } from 'csv-parse/sync';


// // Read and parse the CSV file
// const records = parse(fs.readFileSync(path.join('./testData','multiUserCreds.csv')), {
//     columns: true,
//     skip_empty_lines: true
//   });

// const lockedUserRecord = records.find(record => record.username === 'locked_user');


// records.forEach((record) => {
//     test(`Login Test - ${record.username}`, async ({ landingPage, loginPage, homePage, data }) => {
//         // Landing page assertions
//         expect.soft(await landingPage.getURL()).toBe(data.appBaseURL);
//         expect.soft(await landingPage.getTitle()).toBe(data.pageTitle);

//         // Clicking sign-in link and navigating to login page
//         await landingPage.clickSignLink();
//         await loginPage.waitForLoginButtonToBeVisible();
//         expect.soft(await loginPage.getURL()).toBe(data.appSignInURL);

//         // Logging in with credentials
//         await loginPage.login(record.username, record.password);
//         await loginPage.waitForPageToLoad();
//         expect.soft(await homePage.usernameVisibilityCheck()).toBeTruthy();

//         // Logging out and asserting landing page after logout
//         await homePage.logout();
//         await landingPage.waitForPageToLoad();
//         expect.soft(await landingPage.getURL()).toBe(data.appBaseURL);
//         expect.soft(await landingPage.getTitle()).toBe(data.pageTitle);
//     });

//     if(lockedUserRecord){
//         test(`Login - ${record.username} Test`, async({landingPage, loginPage, homePage, data })=>{
//             // Landing page assertions
//             expect.soft(await landingPage.getURL()).toBe(data.appBaseURL);
//             expect.soft(await landingPage.getTitle()).toBe(data.pageTitle);
    
//             // Clicking sign-in link and navigating to login page
//             await landingPage.clickSignLink();
//             await loginPage.waitForLoginButtonToBeVisible();
//             expect.soft(await loginPage.getURL()).toBe(data.appSignInURL);
    
//             // Logging in with credentials
//             await loginPage.login(record.username, record.password);
//             await loginPage.waitForPageToLoad();
//             expect.soft(loginPage.loginErroMsgDisplayCheck()).toBeTruthy();
            
//             });
//     }
// });
