import loginPageMethods from "../pages/pages-methods/login-methods.page";
import productsPageMethods from "../pages/pages-methods/products-methods.page";
import { readFileSync } from "fs";

const storyParentId = "WIO-0001";
describe(`Story ${storyParentId}`, async () => {
  const testDataTestCase_1 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0003.json`, "utf-8")
  );
  it(`Test case: ${testDataTestCase_1["testCase"]} | Description: ${testDataTestCase_1["testDescription"]} | Tags: ${testDataTestCase_1["tags"]}`, async () => {
    const data = testDataTestCase_1;
    await loginPageMethods.goto();
    await loginPageMethods.enterUsername(data.loginPage.username);
    await loginPageMethods.verifyUsername(data.loginPage.username);
    await loginPageMethods.enterPassword(data.loginPage.password);
    await loginPageMethods.verifyPassword(data.loginPage.password);
    await loginPageMethods.clickButtonSubmit();
    await productsPageMethods.verifyCurrentPage(data.productsPage.titlePage);
  });

  const testDataTestCase_2 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0004.json`, "utf-8")
  );
  it(`Test case: ${testDataTestCase_2["testCase"]} | Description: ${testDataTestCase_2["testDescription"]} | Tags: ${testDataTestCase_2["tags"]}`, async () => {
    const data = await testDataTestCase_2;
    await loginPageMethods.goto();
    await loginPageMethods.enterUsername(data.loginPage.username);
    await loginPageMethods.enterPassword(data.loginPage.password);
    await loginPageMethods.verifyUsername(data.loginPage.username);
    await loginPageMethods.verifyPassword(data.loginPage.password);
    await loginPageMethods.clickButtonSubmit();
    await productsPageMethods.verifyCurrentPage(data.productsPage.titlePage);
  });

  const testDataTestCase_3 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0005.json`, "utf-8")
  );
  it(`Test case: ${testDataTestCase_3["testCase"]} | Description: ${testDataTestCase_3["testDescription"]} | Tags: ${testDataTestCase_3["tags"]}`, async () => {
    const data = await testDataTestCase_3;
    await loginPageMethods.goto();
    await loginPageMethods.enterUsername(data.loginPage.username);
    await loginPageMethods.enterPassword(data.loginPage.password);
    await loginPageMethods.verifyUsername(data.loginPage.username);
    await loginPageMethods.verifyPassword(data.loginPage.password);
    await loginPageMethods.clickButtonSubmit();
    await productsPageMethods.verifyCurrentPage(data.productsPage.titlePage);
  });

  const testDataTestCase_4 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0006.json`, "utf-8")
  );
  it(`Test case: ${testDataTestCase_4["testCase"]} |Description: ${testDataTestCase_4["testDescription"]} | Tags: ${testDataTestCase_4["tags"]}`, async () => {
    const data = await testDataTestCase_4;
    await loginPageMethods.goto();
    await loginPageMethods.enterUsername(data.loginPage.username);
    await loginPageMethods.enterPassword(data.loginPage.password);
    await loginPageMethods.verifyUsername(data.loginPage.username);
    await loginPageMethods.verifyPassword(data.loginPage.password);
    await loginPageMethods.clickButtonSubmit();
    await loginPageMethods.verifyValidationMessage(
      data.loginPage.validationMessage
    );
  });

  const testDataTestCase_5 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0007.json`, "utf-8")
  );
  it(`Test case: ${testDataTestCase_5["testCase"]} | Description: ${testDataTestCase_5["testDescription"]} | Tags: ${testDataTestCase_5["tags"]}`, async () => {
    const data = await testDataTestCase_5;

    await loginPageMethods.goto();
    await loginPageMethods.enterUsername(data.loginPage.username);
    await loginPageMethods.enterPassword(data.loginPage.password);
    await loginPageMethods.verifyUsername(data.loginPage.username);
    await loginPageMethods.verifyPassword(data.loginPage.password);
    await loginPageMethods.clickButtonSubmit();
    await loginPageMethods.verifyValidationMessage(
      data.loginPage.validationMessage
    );
  });

  const testDataTestCase_6 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0008.json`, "utf-8")
  );
  it(`Test case: ${testDataTestCase_6["testCase"]} | Description: ${testDataTestCase_6["testDescription"]} | Tags: ${testDataTestCase_6["tags"]}`, async () => {
    const data = await testDataTestCase_6;

    await loginPageMethods.goto();
    await loginPageMethods.enterUsername(data.loginPage.username);
    await loginPageMethods.enterPassword(data.loginPage.password);
    await loginPageMethods.verifyUsername(data.loginPage.username);
    await loginPageMethods.verifyPassword(data.loginPage.password);
    await loginPageMethods.clickButtonSubmit();
    await loginPageMethods.verifyValidationMessage(
      data.loginPage.validationMessage
    );
  });

  const testDataTestCase_7 = JSON.parse(
    readFileSync(`./tests/data/${storyParentId}/WIO-0009.json`, "utf-8")
  );
  it(`Test case: ${testDataTestCase_7["testCase"]} | Description: ${testDataTestCase_7["testDescription"]} | Tags: ${testDataTestCase_7["tags"]}`, async () => {
    const data = await testDataTestCase_7;

    await loginPageMethods.goto();
    await loginPageMethods.enterUsername(data.loginPage.username);
    await loginPageMethods.enterPassword(data.loginPage.password);
    await loginPageMethods.verifyUsername(data.loginPage.username);
    await loginPageMethods.verifyPassword(data.loginPage.password);
    await loginPageMethods.clickButtonSubmit();
    await loginPageMethods.verifyValidationMessage(
      data.loginPage.validationMessage
    );
  });
});
