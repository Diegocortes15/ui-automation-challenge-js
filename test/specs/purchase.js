import {
	STANDARD_USER,
	VALID_PASSWORD,
	SPECIFIC_ITEM_TO_ADD,
} from '../utils/config';

import casual from 'casual';

import loginPage from '../pages/login-page';
import productsPage from '../pages/products-page';
import cartPage from '../pages/cart-page';
import checkoutStepOnePage from '../pages/checkout-step-one-page';
import checkoutStepTwoPage from '../pages/checkout-step-two-page';
import checkoutCompletePage from '../pages/checkout-complete-page';

import allureReporter from '@wdio/allure-reporter';

describe(`Purchase a product`, () => {
	before(async () => {
		await browser.maximizeWindow();

		await loginPage.open();
		allureReporter.startStep('⏩ Login with valid username and password');
		await loginPage.login(STANDARD_USER, VALID_PASSWORD);
		expect(await productsPage.titlePage).toEqual('PRODUCTS');
	});

	it('Should purchase a product', async () => {
		allureReporter.addFeature('Purchase products');
		allureReporter.addSeverity('blocker');
		const itemIndex = await productsPage.itemNameList.findIndex(
			async (item) => (await item.getText()) === SPECIFIC_ITEM_TO_ADD
		);
		await productsPage.click_itemBtn(itemIndex);
		await productsPage.headerComp.click_shoppingCartButton();

		expect(await cartPage.titlePage).toEqual('YOUR CART');
		allureReporter.addStep('⏩ Adding specific product to the shopping cart');
		const itemName = await cartPage.getItemName();
		expect(itemName).toEqual(SPECIFIC_ITEM_TO_ADD);
		allureReporter.addStep('⏩ User goes to CHECKOUT: YOUR INFORMATION page');
		await cartPage.click_checkoutButton();

		expect(await checkoutStepOnePage.titlePage).toEqual(
			'CHECKOUT: YOUR INFORMATION'
		);
		const firstName = await casual._first_name();
		const lastName = await casual._last_name();
		const postalCode = await casual.array_of_digits(6).join('');
		allureReporter.addStep('⏩ Filling out information form');
		await checkoutStepOnePage.fillInformationForm(
			firstName,
			lastName,
			postalCode
		);
		await checkoutStepOnePage.click_continueButton();

		allureReporter.addStep('⏩ Checking general purchase information');
		expect(await checkoutStepTwoPage.titlePage).toEqual('CHECKOUT: OVERVIEW');
		await checkoutStepTwoPage.click_finishButton();

		allureReporter.addStep('⏩ Finalizing purchase');
		expect(await checkoutCompletePage.titlePage).toEqual('CHECKOUT: COMPLETE!');
		expect(await checkoutCompletePage.completeHeader).toEqual(
			'THANK YOU FOR YOUR ORDER'
		);
	});
});
