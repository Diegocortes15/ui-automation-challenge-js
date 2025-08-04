import { WdioFactory } from '../../utils/wdio-factory.utils';

class CheckoutOverviewPageMethods {
  _playwrightFactory;
  _pageName;

  constructor() {
    this._playwrightFactory = new WdioFactory(this._page, this._testInfo);
    this._pageName = 'checkout-overview-locators.page';
  }

  async clickButtonFinish() {
    await this._playwrightFactory.click(this._pageName, 'buttonFinish');
  }
}

export default new CheckoutOverviewPageMethods();
