import loginPageMethods from "../pages/pages-methods/login-methods.page";
import productsPageMethods from "../pages/pages-methods/products-methods.page";
import { readFileSync } from "fs";

const storyParentId = "WIO-0002";
describe(`Story ${storyParentId}`, async () => {
  const testDataTestCase_1 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0010.json`, "utf-8")
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
    await productsPageMethods.getHeaderComponent().logout();
    await loginPageMethods.verifyURL();
  });

  const testDataTestCase_2 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0011.json`, "utf-8")
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
    await productsPageMethods.getHeaderComponent().logout();
    await loginPageMethods.verifyURL();
  });

  const testDataTestCase_3 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0012.json`, "utf-8")
  );
  it(`Test case: ${testDataTestCase_3["testCase"]} |
Description: ${testDataTestCase_3["testDescription"]} |
Tags: ${testDataTestCase_3["tags"]}`, async () => {
    const data = await testDataTestCase_3;
    await loginPageMethods.goto();
    await loginPageMethods.login(
      data.loginPage.username,
      data.loginPage.password
    );
    await productsPageMethods.getHeaderComponent().logout();
    await loginPageMethods.verifyURL();
  });
});
