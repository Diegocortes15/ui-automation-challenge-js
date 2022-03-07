import headerComp from './components/header-comp';

class CheckoutComplete {
	get headerComp() {
		return headerComp;
	}

	get titlePage() {
		return $('.title').getText();
	}

	get completeHeader() {
		return $('.complete-header').getText();
	}
}

export default new CheckoutComplete();
