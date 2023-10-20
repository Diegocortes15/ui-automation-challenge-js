import allureReporter from "@wdio/allure-reporter";
import { WdioFactory } from "../../utils/wdioFactory.utils";

class CheckoutCompletePageMethods {
  _wdioFactory;
  _pageName;

  constructor() {
    this._wdioFactory = new WdioFactory();
    this._pageName = "checkout-complete-locators.page";
  }

  async verifyCurrentPage({ titlePage: expectedTitlePage }) {
    await this._wdioFactory.verifyText(
      this._pageName,
      "pageTitle",
      expectedTitlePage
    );
  }
}

export default new CheckoutCompletePageMethods();
