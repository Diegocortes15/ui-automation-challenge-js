import allureReporter from "@wdio/allure-reporter";
import { WdioFactory } from "../../utils/wdioFactory.utils";
import headerComponentMethods from "./components-methods/header-comp";
import supportFactory from "../../utils/supportFactory";

class ProductsPageMethods {
  _wdioFactory;
  _pageName;
  _supportFactory;
  _indexProductsToAdd;
  _headerComponent;
  itemsAdded;

  constructor() {
    this._wdioFactory = new WdioFactory();
    this._pageName = "products-locators.page";
    this._headerComponent = headerComponentMethods;
    this._supportFactory = supportFactory;
  }

  getHeaderComponent() {
    return this._headerComponent;
  }

  async getPrices() {
    const prices = await this._wdioFactory.getAllTextContents(
      this._pageName,
      "itemPriceList"
    );
    return prices.map((price) => price.slice(1));
  }

  async verifyCurrentPage(titlePage) {
    await this._wdioFactory.verifyText(this._pageName, "pageTitle", titlePage);
  }

  async sortProductsByVisibleText({ sortProducts }) {
    await this._wdioFactory.selectByVisibleText(
      this._pageName,
      "dropdownProductSort",
      sortProducts
    );
  }

  async expectedSortPriceLowToHigh() {
    const prices = await this.getPrices();
    return prices
      .map((price) => parseFloat(price))
      .sort((a, b) => a - b)
      .map((price) => price.toFixed(2));
  }

  async verifyPricesOrdered(actualPrices, expectedPrices) {
    async () => {
      actualPrices, expectedPrices;
    };
  }

  async _productsRandomToAdd() {
    const productList = await this._wdioFactory.getElementSelector(
      this._pageName,
      "itemList"
    );

    const productListLength = productList.length;

    const newIndexProductList = new Set();
    for (let index = 0; index < productListLength; index++) {
      newIndexProductList.add(
        await this._supportFactory.getRandomPositiveNumber(productListLength)
      );
    }
    this._indexProductsToAdd = [...newIndexProductList];
  }

  async addProducts() {
    await this._productsRandomToAdd();

    const productsPromises = this._indexProductsToAdd.map(async (index) => {
      const item = {
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
      };
      await this._wdioFactory.clickByIndex(this._pageName, "itemBtn", index);
      return item;
    });

    const productsObject = await Promise.all(productsPromises);

    this.itemsAdded = await this._supportFactory.jsonToString(
      productsObject,
      "itemName"
    );
  }

  async getItemsAdded() {
    return this.itemsAdded;
  }

  async addSpecificProduct({ addProduct }) {
    const reformatProductName = addProduct.toLowerCase();
    const productList = await this._wdioFactory.getAllTextContents(
      this._pageName,
      "itemNameList"
    );
    const products = [];
    const indexProduct = productList.findIndex((productName) =>
      reformatProductName.includes(productName.toLowerCase())
    );
    await this._wdioFactory.clickByIndex(
      this._pageName,
      "itemBtn",
      indexProduct
    );
    await this._wdioFactory.embedFullPageScreenshot(addProduct);
    products.push({
      itemName: await this._wdioFactory.getTextByIndex(
        this._pageName,
        "itemName",
        indexProduct
      ),
      price: String(
        await this._wdioFactory.getTextByIndex(
          this._pageName,
          "itemPrice",
          indexProduct
        )
      ).slice(1),
    });
    this.itemsAdded = await this._supportFactory.jsonToString(
      products,
      "itemName"
    );
  }
}

export default new ProductsPageMethods();
