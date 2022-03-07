import { BASE_URL, VALID_USERS, VALID_PASSWORD } from '../utils/config';

import loginPage from '../pages/login-page';
import productsPage from '../pages/products-page';

import allureReporter from '@wdio/allure-reporter';

describe('Logout from the home page', () => {
	before(async () => {
		await browser.maximizeWindow();
	});

	it('Logout and finish in login page', async () => {
		allureReporter.addFeature('Login');
		allureReporter.addSeverity('critical');
		for (const user of VALID_USERS) {
			await loginPage.open();

			// Login with valid user
			allureReporter.startStep('⏩ Login with valid username and password');
			await loginPage.login(user, VALID_PASSWORD);

			allureReporter.addStep('⏩ The user goes to PRODUCTS page');
			expect(await productsPage.titlePage).toEqual('PRODUCTS');

			await productsPage.headerComp.primaryHeader.waitForDisplayed();
			await productsPage.headerComp.primaryHeader.waitForClickable();

			await productsPage.headerComp.open_navList();
			allureReporter.addStep('⏩ Opening navigation');

			// Logout
			await productsPage.headerComp.click_logoutButton();
			allureReporter.addStep('⏩ User clicks on logout button');

			// Go to login page
			allureReporter.addStep('⏩ User finish in login page');
			expect(browser).toHaveUrlContaining(BASE_URL);
		}
	});
});
