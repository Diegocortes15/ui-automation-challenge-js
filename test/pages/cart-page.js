import headerComp from './components/header-comp';

class CartPage {
	get headerComp() {
		return headerComp;
	}

	get titlePage() {
		return $('.title').getText();
	}

	get itemCartList() {
		return $$('.cart_item');
	}

	get itemNameList() {
		return $$('.inventory_item_name');
	}

	get itemPriceList() {
		return $$('.inventory_item_price');
	}

	get checkoutButton() {
		return $('[data-test="checkout"]');
	}

	async getItemName(index = 0) {
		return await this.itemNameList[index].getText();
	}

	async getItemPrice(index = 0) {
		return await this.itemPriceList[index].getText();
	}

	async click_checkoutButton() {
		await this.checkoutButton.waitForClickable({
			timeoutMsg: 'Checkout button could not be clickable',
		});
		await this.checkoutButton.click();
	}
}

export default new CartPage();
