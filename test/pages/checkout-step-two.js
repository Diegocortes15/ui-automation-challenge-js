import headerComp from './components/header-comp';

class CheckoutStepTwo {
	get headerComp() {
		return headerComp;
	}

	get titlePage() {
		return $('.title').getText();
	}

	get finishButton() {
		return $('[data-test="finish"]');
	}

	async click_finishButton() {
		await this.finishButton.waitForClickable({
			timeoutMsg: 'Finish button could not be clickable',
		});
		await this.finishButton.click();
	}
}

export default new CheckoutStepTwo();
