import {
	STANDARD_USER,
	VALID_PASSWORD,
	SPECIFIC_ITEM_TO_ADD,
} from '../utils/config';

import loginPage from '../pages/login-page';
import productsPage from '../pages/products-page';
import cartPage from '../pages/cart-page';

import allureReporter from '@wdio/allure-reporter';

describe(`Add the specific product "${SPECIFIC_ITEM_TO_ADD}" to the shopping cart`, () => {
	before(async () => {
		await browser.maximizeWindow();
	});

	beforeEach(async () => {
		await loginPage.open();
		allureReporter.startStep('⏩ Login with valid username and password');
		await loginPage.login(STANDARD_USER, VALID_PASSWORD);
		expect(await productsPage.titlePage).toEqual('PRODUCTS');
	});

	it('Validate the correct product was added to the cart.', async () => {
		allureReporter.addFeature('Add products to the shopping cart');
		allureReporter.addSeverity('critical');

		const itemIndex = await productsPage.itemNameList.findIndex(
			async (item) => (await item.getText()) === SPECIFIC_ITEM_TO_ADD
		);

		await productsPage.click_itemBtn(itemIndex);
		allureReporter.addStep('⏩ Adding specific product to the shopping cart');

		await productsPage.headerComp.click_shoppingCartButton();
		allureReporter.addStep('⏩ User goes to the shopping cart');
		expect(await cartPage.titlePage).toEqual('YOUR CART');

		const itemName = await cartPage.getItemName();

		allureReporter.addStep(
			'⏩ Check specific product was added to shopping cart'
		);
		expect(itemName).toEqual(SPECIFIC_ITEM_TO_ADD);
	});
});
