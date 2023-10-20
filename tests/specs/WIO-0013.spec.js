import loginPageMethods from "../pages/pages-methods/login-methods.page";
import productsPageMethods from "../pages/pages-methods/products-methods.page";
import { readFileSync } from "fs";

const storyParentId = "WIO-0013";

describe(`Story ${storyParentId}`, async () => {
  const testDataTestCase_1 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0014.json`, "utf-8")
  );
  it(`Test case: ${testDataTestCase_1["testCase"]} | Description: ${testDataTestCase_1["testDescription"]} | Tags: ${testDataTestCase_1["tags"]}`, async () => {
    const data = await testDataTestCase_1;
    await loginPageMethods.goto();
    await loginPageMethods.login(
      data.loginPage.username,
      data.loginPage.password
    );
    const expectedPrices =
      await productsPageMethods.expectedSortPriceLowToHigh();
    await productsPageMethods.sortProductsByVisibleText(data.productsPage);
    const actualPrices = await productsPageMethods.getPrices();
    await productsPageMethods.verifyPricesOrdered(actualPrices, expectedPrices);
  });
});
