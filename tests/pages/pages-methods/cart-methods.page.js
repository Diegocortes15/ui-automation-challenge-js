import allureReporter from "@wdio/allure-reporter";
import { WdioFactory } from "../../utils/wdioFactory.utils";
import supportFactory from "../../utils/supportFactory";

class CartPageMethods {
  _supportFactory;
  _wdioFactory;
  _pageName;
  cartItemsAdded;

  constructor() {
    this._supportFactory = supportFactory;
    this._wdioFactory = new WdioFactory();
    this._pageName = "cart-locators.page";
  }

  async clickCheckoutButton() {
    await this._wdioFactory.click(this._pageName, "buttonCheckout");
  }

  async getCartProducts() {
    const products = [];
    const productList = await await this._wdioFactory.getElementSelector(
      this._pageName,
      "itemCartList"
    );
    const productListLength = productList.length;
    for (let index = 0; index < productListLength; index++) {
      products.push({
        itemName: await this._wdioFactory.getTextByIndex(
          this._pageName,
          "itemName",
          index
        ),
        price: String(
          await this._wdioFactory.getTextByIndex(
            this._pageName,
            "itemPrice",
            index
          )
        ).slice(1),
      });
    }
    this.cartItemsAdded = await this._supportFactory.jsonToString(
      products,
      "itemName"
    );
    return this.cartItemsAdded;
  }

  async removeItems() {
    await this._wdioFactory.clickAllIfExists(this._pageName, "itemBtn");
  }

  async verifyProductsAdded(expectedProductsAdded) {
    const products = await this.getCartProducts();
    await this._wdioFactory.verifyCompareValues(
      products,
      expectedProductsAdded
    );
  }
}

export default new CartPageMethods();
