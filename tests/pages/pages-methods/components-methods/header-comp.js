import allureReporter from "@wdio/allure-reporter";
import { WdioFactory } from "../../../utils/wdioFactory.utils";

class HeaderComponentMethods {
  _wdioFactory;
  _pageName;

  constructor() {
    this._wdioFactory = new WdioFactory();
    this._pageName = "components-objects/header.component";
  }

  async clickBurgerButton() {
    await this._wdioFactory.click(this._pageName, "burgerButton");
  }

  async openNavList() {
    await this._wdioFactory.click(this._pageName, "navList");
  }

  async clickLogoutButton() {
    await this._wdioFactory.click(this._pageName, "logoutButton");
  }

  async clickShoppingCartButton() {
    await this._wdioFactory.click(this._pageName, "shoppingCartButton");
  }

  async logout() {
    this.clickBurgerButton();
    this.clickLogoutButton();
  }
}

export default new HeaderComponentMethods();
