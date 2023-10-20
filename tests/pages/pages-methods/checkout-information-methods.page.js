import allureReporter from "@wdio/allure-reporter";
import { WdioFactory } from "../../utils/wdioFactory.utils";

class CheckoutInformationPageMethods {
  _wdioFactory;
  _pageName;

  constructor() {
    this._wdioFactory = new WdioFactory(this._page, this._testInfo);
    this._pageName = "checkout-information-locators.page";
  }

  async enterFirstName({ firstName }) {
    await this._wdioFactory.setValue(
      this._pageName,
      "inputFirstName",
      firstName
    );
  }

  async verifyFirstName({ firstName }) {
    await this._wdioFactory.verifyValue(
      this._pageName,
      "inputFirstName",
      firstName
    );
  }

  async enterLastName({ lastName }) {
    await this._wdioFactory.setValue(this._pageName, "inputLastName", lastName);
  }

  async verifyLastName({ lastName }) {
    await this._wdioFactory.verifyValue(
      this._pageName,
      "inputLastName",
      lastName
    );
  }

  async enterPostalCode({ postalCode }) {
    await this._wdioFactory.setValue(
      this._pageName,
      "inputPostalCode",
      postalCode
    );
  }

  async verifyPostalCode({ postalCode }) {
    await this._wdioFactory.verifyValue(
      this._pageName,
      "inputPostalCode",
      postalCode
    );
  }

  async clickButtonContinue() {
    await this._wdioFactory.click(this._pageName, "buttonContinue");
  }
}

export default new CheckoutInformationPageMethods();
