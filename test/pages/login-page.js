class LoginPage {
	async open() {
		await browser.url('/');
	}

	get userInput() {
		return $('#user-name[type=text]');
	}

	get passwordInput() {
		return $('#password[type=password]');
	}

	get submitButton() {
		return $('#login-button[type=submit]');
	}

	get errorMessage() {
		return $('.error-message-container.error');
	}

	async login(userName = '', password = '') {
		await this.userInput.setValue(userName);
		await this.passwordInput.setValue(password);

		await this.submitButton.click();
	}
}

export default new LoginPage();
