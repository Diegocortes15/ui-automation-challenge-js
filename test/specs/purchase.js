import {
	STANDARD_USER,
	VALID_PASSWORD,
	SPECIFIC_ITEM_TO_ADD,
} from '../utils/config';

import casual from 'casual';

import loginPage from '../pages/login-page';
import productsPage from '../pages/products-page';
import cartPage from '../pages/cart-page';
import checkoutStepOne from '../pages/checkout-step-one';
import checkoutStepTwo from '../pages/checkout-step-two';
import checkoutComplete from '../pages/checkout-complete';

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

		expect(await checkoutStepOne.titlePage).toEqual('CHECKOUT: YOUR INFORMATION');
		const firstName = await casual._first_name();
		const lastName = await casual._last_name();
		const postalCode = await casual.array_of_digits(6).join('');
		allureReporter.addStep('⏩ Filling out information form');
		await checkoutStepOne.fillInformationForm(firstName, lastName, postalCode);
		await checkoutStepOne.click_continueButton();

		allureReporter.addStep('⏩ Checking general purchase information');
		expect(await checkoutStepTwo.titlePage).toEqual('CHECKOUT: OVERVIEW');
		await checkoutStepTwo.click_finishButton();

		allureReporter.addStep('⏩ Finalizing purchase');
		expect(await checkoutComplete.titlePage).toEqual('CHECKOUT: COMPLETE!');
		expect(await checkoutComplete.completeHeader).toEqual(
			'THANK YOU FOR YOUR ORDER'
		);
	});
});
