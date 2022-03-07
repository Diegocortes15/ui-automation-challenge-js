class HeaderComponent {
	get primaryHeader() {
		return $('.primary_header');
	}

	get burgerButton() {
		return $('#react-burger-menu-btn');
	}

	get navList() {
		return $('.bm-item-list');
	}

	get logoutButton() {
		return $('#logout_sidebar_link');
	}

	get shoppingCartButton() {
		return $('.shopping_cart_link');
	}

	async click_burgerButton() {
		await this.burgerButton.waitForDisplayed();
		await this.burgerButton.waitForClickable({
			timeoutMsg: 'Menu burger button could not be clickable',
		});
		await this.burgerButton.click();
	}

	async open_navList() {
		await this.click_burgerButton();
		await this.navList.waitForDisplayed();
	}

	async click_logoutButton() {
		await this.burgerButton.waitForDisplayed();
		await this.logoutButton.waitForClickable({
			timeoutMsg: 'Logout button could not be clickable',
		});
		await this.logoutButton.click();
	}

	async click_shoppingCartButton() {
		await this.shoppingCartButton.waitForClickable({
			timeoutMsg: 'Shopping cart button could not be clickable',
		});
		await this.shoppingCartButton.click();
	}
}

export default new HeaderComponent();
