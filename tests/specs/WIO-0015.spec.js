import loginPageMethods from "../pages/pages-methods/login-methods.page";
import productsPageMethods from "../pages/pages-methods/products-methods.page";
import cartPageMethods from "../pages/pages-methods/cart-methods.page";
import { readFileSync } from "fs";

const storyParentId = "WIO-0015";

describe(`Story ${storyParentId}`, async () => {
  const testDataTestCase_1 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0016.json`, "utf-8")
  );
  it(`Test case: ${testDataTestCase_1["testCase"]} | Description: ${testDataTestCase_1["testDescription"]} | Tags: ${testDataTestCase_1["tags"]}`, async () => {
    const data = await testDataTestCase_1;
    await loginPageMethods.goto();
    await loginPageMethods.login(
      data.loginPage.username,
      data.loginPage.password
    );
    await productsPageMethods.addProducts();
    const productsAddedToCart = await productsPageMethods.getItemsAdded();
    await productsPageMethods.getHeaderComponent().clickShoppingCartButton();
    await cartPageMethods.verifyProductsAdded(productsAddedToCart);
    await cartPageMethods.removeItems();
  });

  const testDataTestCase_2 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0017.json`, "utf-8")
  );
  it(`Test case: ${testDataTestCase_2["testCase"]} | Description: ${testDataTestCase_2["testDescription"]} | Tags: ${testDataTestCase_2["tags"]}`, async () => {
    const data = await testDataTestCase_2;
    await loginPageMethods.goto();
    await loginPageMethods.login(
      data.loginPage.username,
      data.loginPage.password
    );
    await productsPageMethods.addSpecificProduct(data.productsPage);
    const productAddedToCart = await productsPageMethods.getItemsAdded();
    await productsPageMethods.getHeaderComponent().clickShoppingCartButton();
    await cartPageMethods.verifyProductsAdded(productAddedToCart);
    await cartPageMethods.removeItems();
  });
});
