import headerComp from './components/header-comp';

class ProductsPage {
	get headerComp() {
		return headerComp;
	}

	get titlePage() {
		return $('.title').getText();
	}

	get selectProductSort() {
		return $('[data-test="product_sort_container"]');
	}

	get itemList() {
		return $$('.inventory_item');
	}

	get itemNameList() {
		return $$('.inventory_item_name');
	}

	get itemPriceList() {
		return $$('.inventory_item_price');
	}

	get itemBtnsList() {
		return $$('button.btn_inventory');
	}

	async click_itemBtn(index = 0) {
		await this.itemBtnsList[index].waitForClickable();
		await this.itemBtnsList[index].click();
	}

	async getItemName(index = 0) {
		return await this.itemNameList[index].getText();
	}

	async getItemPrice(index = 0) {
		return await this.itemPriceList[index].getText();
	}

	async click_SelectProductSort() {
		await this.selectProductSort.waitForClickable();
		await this.selectProductSort.click();
	}

	async click_lowHighOption() {
		await this.selectProductSort.selectByAttribute('value', 'lohi');
	}
}

export default new ProductsPage();
