import {
	STANDARD_USER,
	VALID_PASSWORD,
	NUMBER_ITEMS_TO_ADD,
} from '../utils/config';

import loginPage from '../pages/login-page';
import productsPage from '../pages/products-page';
import cartPage from '../pages/cart-page';

import allureReporter from '@wdio/allure-reporter';

describe('Add multiple items to the shopping cart', () => {
	before(async () => {
		await browser.maximizeWindow();
	});

	beforeEach(async () => {
		await loginPage.open();
		allureReporter.startStep('⏩ Login with valid username and password');
		await loginPage.login(STANDARD_USER, VALID_PASSWORD);
		expect(await productsPage.titlePage).toEqual('PRODUCTS');
	});

	it('Validate all the items that have been added to the shopping cart', async () => {
		allureReporter.addFeature('Add products to the shopping cart');
		allureReporter.addSeverity('critical');
		const { itemList } = productsPage;
		const itemsAdded = [];

		const getRandomNumber = async function (max) {
			return Math.floor(Math.random() * max);
		};

		const newIndex = async function (array, maxNumber) {
			const index = await getRandomNumber(maxNumber);
			if (!array.includes(index)) return index;
			return await newIndex(array, maxNumber);
		};

		const randomArrayIndexes = async function (array) {
			const lengthList = array.length;
			const indexesArray = [];

			const numberItemsToAdd =
				NUMBER_ITEMS_TO_ADD < 1 || NUMBER_ITEMS_TO_ADD > lengthList
					? lengthList
					: NUMBER_ITEMS_TO_ADD;

			while (indexesArray.length !== numberItemsToAdd) {
				indexesArray.push(await newIndex(indexesArray, lengthList));
			}

			return indexesArray;
		};

		allureReporter.addStep('⏩ Selecting products to add to the shopping cart');
		const itemIndex = await randomArrayIndexes(await itemList);

		const addMultipleItems = async function (indexesArray) {
			for (const index of indexesArray) {
				productsPage.click_itemBtn(index);

				itemsAdded.push({
					itemName: await productsPage.getItemName(index),
					price: await productsPage.getItemPrice(index),
				});
			}
		};

		allureReporter.addStep('⏩ Adding products to the shopping cart');
		await addMultipleItems(itemIndex);

		await productsPage.headerComp.click_shoppingCartButton();
		allureReporter.addStep('⏩ User goes to the shopping cart');
		expect(await cartPage.titlePage).toEqual('YOUR CART');

		const shoppingCart = [];

		for (let index = 0; index < (await cartPage.itemCartList.length); index++) {
			shoppingCart.push({
				itemName: await cartPage.getItemName(index),
				price: await cartPage.getItemPrice(index),
			});
		}

		allureReporter.addStep(
			'⏩ Checking that the products were added to the shopping cart'
		);
		expect(itemsAdded).toEqual(shoppingCart);
	});
});
