import { STANDARD_USER, VALID_PASSWORD } from '../utils/config';
import loginPage from '../pages/login-page';
import productsPage from '../pages/products-page';
import allureReporter from '@wdio/allure-reporter';

describe('Sort products by Price (low to high)', () => {
	before(async () => {
		await browser.maximizeWindow();
	});

	beforeEach(async () => {
		await loginPage.open();
		allureReporter.startStep('⏩ Login with valid username and password');
		await loginPage.login(STANDARD_USER, VALID_PASSWORD);
		expect(await productsPage.titlePage).toEqual('PRODUCTS');
	});

	it('Validate the products have been sorted by price correctly', async () => {
		allureReporter.addFeature('Sort products');
		allureReporter.addSeverity('normal');
		const arrayPrices = async function (prices) {
			return await Promise.all(
				await prices.map(
					async (price) => await Number((await price.getText()).slice(1))
				)
			);
		};

		const orderedPrices = [await arrayPrices(await productsPage.itemPriceList)]
			.flat()
			.sort((a, b) => a - b);
		allureReporter.addStep('⏩ Ordering products');
		await productsPage.click_SelectProductSort();
		await productsPage.click_lowHighOption();

		const newPrices = await arrayPrices(await productsPage.itemPriceList);

		allureReporter.addStep('⏩ Checking that those products were organized');
		expect(orderedPrices).toEqual(newPrices);
	});
});
