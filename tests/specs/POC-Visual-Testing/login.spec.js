import VisualTesting from '../../utils/visual-testing-validations.utils';
import loginPageMethods from '../../pages/pages-methods/login-methods.page';
import productsPageMethods from '../../pages/pages-methods/products-methods.page';

import { readFileSync } from 'fs';

const storyParentId = 'login';
describe(`Story ${storyParentId}`, async () => {
  before(async () => {});

  const testDataTestCase_1 = JSON.parse(
    readFileSync(`./tests/data/POC-Visual-Testing/${storyParentId}/WIO-0024.json`, 'utf-8'),
  );
  it(`Test case: ${testDataTestCase_1['testCase']} | Description: ${testDataTestCase_1['testDescription']} | Tags: ${testDataTestCase_1['tags']}`, async () => {
    await browser.setWindowSize(1280, 720);

    const visualTestingHelper = new VisualTesting();

    const data = testDataTestCase_1;
    await loginPageMethods.goto();
    await loginPageMethods.enterUsername('standard_user');
    //await loginPageMethods.enterUsername('standard_user');
    await loginPageMethods.enterPassword(data.loginPage.password);
    await loginPageMethods.verifyPassword(data.loginPage.password);
    await loginPageMethods.clickButtonSubmit();
    await productsPageMethods.verifyCurrentPage(data.productsPage.titlePage);

    const imgTagName = 'VT-Products-Page';
    await visualTestingHelper.toMatchScreenSnapshot(imgTagName, {
      // hideElements: [],
    });
  });

  const testDataTestCase_2 = JSON.parse(
    readFileSync(`./tests/data/POC-Visual-Testing/${storyParentId}/WIO-0025.json`, 'utf-8'),
  );
  it(`Test case: ${testDataTestCase_2['testCase']} | Description: ${testDataTestCase_2['testDescription']} | Tags: ${testDataTestCase_2['tags']}`, async () => {
    await browser.setWindowSize(1280, 720);
    const visualTestingHelper = new VisualTesting();
    await loginPageMethods.goto();
    // Verify UI elements are present
    await expect($('#user-name')).toBeDisplayed();
    await expect($('#password')).toBeDisplayed();
    await expect($('#login-button')).toBeDisplayed();
    // Visual snapshot of the login page
    const imgTagName = 'VT-Login-Page';
    await visualTestingHelper.toMatchScreenSnapshot(imgTagName, {
      // hideElements: [await $('#login_credentials')],
    });
  });
});
