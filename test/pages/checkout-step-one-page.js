import headerComp from './components/header-comp';

class CheckoutStepOnePage {
	get headerComp() {
		return headerComp;
	}

	get titlePage() {
		return $('.title').getText();
	}

	get inputFirstName() {
		return $('[data-test="firstName"]');
	}

	get inputLastName() {
		return $('[data-test="lastName"]');
	}

	get inputPostalCode() {
		return $('[data-test="postalCode"]');
	}

	get continueButton() {
		return $('[data-test="continue"]');
	}

	async fillFirstNameBlank(firstName) {
		await (
			await this.inputFirstName
		).waitForEnabled({
			timeoutMsg: 'First name input could not be enable',
		});
		await this.inputFirstName.setValue(firstName);
	}

	async fillLastNameBlank(lastName) {
		await (
			await this.inputLastName
		).waitForEnabled({
			timeoutMsg: 'Last name input could not be enable',
		});
		await this.inputLastName.setValue(lastName);
	}

	async fillPostalCodeBlank(postalCode) {
		await (
			await this.inputPostalCode
		).waitForEnabled({
			timeoutMsg: 'Postal code input could not be enable',
		});
		await this.inputPostalCode.setValue(postalCode);
	}

	async click_continueButton() {
		await this.continueButton.waitForClickable({
			timeoutMsg: 'Checkout button could not be clickable',
		});
		await this.continueButton.click();
	}

	async fillInformationForm(firstName, lastName, postalCode) {
		await this.fillFirstNameBlank(firstName);
		await this.fillLastNameBlank(lastName);
		await this.fillPostalCodeBlank(postalCode);
	}
}

export default new CheckoutStepOnePage();
