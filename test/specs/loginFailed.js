import { LOCKED_OUT_USER, GENERIC_USER, VALID_PASSWORD } from '../utils/config';
import loginPage from '../pages/login-page';
import allureReporter from '@wdio/allure-reporter';

describe('Login with a invalid user', () => {
	before(async () => {
		await browser.maximizeWindow();
	});

	beforeEach(async () => {
		allureReporter.addFeature('Login');
		await loginPage.open();
	});

	it('Should show error message for nonexistent user', async () => {
		allureReporter.addSeverity('critical');
		allureReporter.startStep(
			'⏩ Trying to login with invalid username and password'
		);
		await loginPage.login(GENERIC_USER, VALID_PASSWORD);
		allureReporter.addStep(
			'⏩ Check Error Message: Username and password do not match any user in this service'
		);
		await expect(await loginPage.errorMessage).toHaveTextContaining(
			'Username and password do not match any user in this service'
		);
	});

	it('Should show error message for blocked user', async () => {
		allureReporter.addSeverity('critical');
		allureReporter.startStep(
			'⏩ Trying to login with locked username and password'
		);
		await loginPage.login(LOCKED_OUT_USER, VALID_PASSWORD);
		allureReporter.addStep(
			'⏩ Check Error Message: Sorry, this user has been locked out'
		);
		await expect(await loginPage.errorMessage).toHaveTextContaining(
			'Sorry, this user has been locked out'
		);
	});

	it('Try login without username and password', async () => {
		allureReporter.addSeverity('critical');
		allureReporter.startStep('⏩ Trying to login without username and password');
		await loginPage.login('', '');
		allureReporter.addStep('⏩ Check Error Message: Username is required');
		await expect(await loginPage.errorMessage).toHaveTextContaining(
			'Username is required'
		);
	});

	it('Try login without password', async () => {
		allureReporter.addSeverity('critical');
		allureReporter.startStep(
			'⏩ Trying to login with username and without password'
		);
		await loginPage.login(GENERIC_USER, '');
		allureReporter.addStep('⏩ Check Error Message: Password is required');
		await expect(await loginPage.errorMessage).toHaveTextContaining(
			'Password is required'
		);
	});

	it('Try login without username', async () => {
		allureReporter.addSeverity('critical');
		allureReporter.startStep('⏩ Trying to login just with password');
		await loginPage.login('', VALID_PASSWORD);
		allureReporter.addStep('⏩ Check Error Message: Username is required');
		await expect(await loginPage.errorMessage).toHaveTextContaining(
			'Username is required'
		);
	});
});
