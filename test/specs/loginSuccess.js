import { VALID_USERS, VALID_PASSWORD } from '../utils/config';

import loginPage from '../pages/login-page';
import productsPage from '../pages/products-page';

import allureReporter from '@wdio/allure-reporter';

describe('Login with a valid user', () => {
	before(async () => {
		await browser.maximizeWindow();
	});

	it('Should login with valid credentials', async () => {
		allureReporter.addFeature('Login');
		allureReporter.addSeverity('blocker');
		allureReporter.startStep(
			'⏩ Trying to login with valid usernames and password'
		);
		for (const user of VALID_USERS) {
			await loginPage.open();
			allureReporter.startStep('⏩ Login with valid username and password');
			await loginPage.login(user, VALID_PASSWORD);
			allureReporter.addStep('⏩ The user goes to PRODUCTS page');
			expect(await productsPage.titlePage).toEqual('PRODUCTS');
		}
	});
});
