import loginPageMethods from "../pages/pages-methods/login-methods.page";
import productsPageMethods from "../pages/pages-methods/products-methods.page";
import cartPageMethods from "../pages/pages-methods/cart-methods.page";
import checkoutInformationPageMethods from "../pages/pages-methods/checkout-information-methods.page";
import checkoutOverviewPageMethods from "../pages/pages-methods/checkout-overview-methods.page";
import checkoutCompletePageMethods from "../pages/pages-methods/checkout-complete-methods.page";
import supportFactory from "../utils/supportFactory";
import { readFileSync } from "fs";

const storyParentId = "WIO-0018";

describe(`Story ${storyParentId}`, async () => {
  const testDataTestCase_1 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0019.json`, "utf-8")
  );
  it(`Test case: ${testDataTestCase_1["testCase"]} |
Description: ${testDataTestCase_1["testDescription"]} |
Tags: ${testDataTestCase_1["tags"]}`, async () => {
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
    await cartPageMethods.clickCheckoutButton();

    const formData = {
      firstName: await supportFactory.getRandomFirstName(),
      lastName: await supportFactory.getRandomLastName(),
      postalCode: await supportFactory.getRandomZip(),
    };

    console.log("🌻🌻🌻🌻🌻");
    console.log(formData);
    console.log("🌻🌻🌻🌻🌻");

    await checkoutInformationPageMethods.enterFirstName(formData);
    await checkoutInformationPageMethods.verifyFirstName(formData);
    await checkoutInformationPageMethods.enterLastName(formData);
    await checkoutInformationPageMethods.verifyLastName(formData);
    await checkoutInformationPageMethods.enterPostalCode(formData);
    await checkoutInformationPageMethods.verifyPostalCode(formData);
    await checkoutInformationPageMethods.clickButtonContinue();
    await checkoutOverviewPageMethods.clickButtonFinish();
    await checkoutCompletePageMethods.verifyCurrentPage(
      data.checkoutCompletePage
    );
  });

  const testDataTestCase_2 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0023.json`, "utf-8")
  );
  it(`Test case: ${testDataTestCase_2["testCase"]} |
  Description: ${testDataTestCase_2["testDescription"]} |
  Tags: ${testDataTestCase_2["tags"]}`, async () => {
    const data = await testDataTestCase_2;
    await loginPageMethods.goto();
    await loginPageMethods.login(
      data.loginPage.username,
      data.loginPage.password
    );
    await productsPageMethods.addProducts();
    const productsAddedToCart = await productsPageMethods.getItemsAdded();
    await productsPageMethods.getHeaderComponent().clickShoppingCartButton();
    await cartPageMethods.verifyProductsAdded(productsAddedToCart);
    await cartPageMethods.clickCheckoutButton();
    await checkoutInformationPageMethods.enterFirstName(
      data.checkoutInformationPage
    );
    await checkoutInformationPageMethods.verifyFirstName(
      data.checkoutInformationPage
    );
    await checkoutInformationPageMethods.enterLastName(
      data.checkoutInformationPage
    );
    await checkoutInformationPageMethods.verifyLastName(
      data.checkoutInformationPage
    );
    await checkoutInformationPageMethods.enterPostalCode(
      data.checkoutInformationPage
    );
    await checkoutInformationPageMethods.verifyPostalCode(
      data.checkoutInformationPage
    );
    await checkoutInformationPageMethods.clickButtonContinue();
    await checkoutOverviewPageMethods.clickButtonFinish();
    await checkoutCompletePageMethods.verifyCurrentPage(
      data.checkoutCompletePage
    );
  });
});
