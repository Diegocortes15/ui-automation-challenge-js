import { expect } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';
import { readFileSync } from 'fs';

export class WdioFactory {
  async getElement(filePath, elementName) {
    const rawdata = readFileSync(`./tests/pages/pages-objects/${filePath}.json`);
    const data = JSON.parse(rawdata);
    return data.locators[elementName];
  }

  async getElementSelector(filePath, elementName) {
    const rawdata = readFileSync(`./tests/pages/pages-objects/${filePath}.json`);
    const data = JSON.parse(rawdata);
    return $$(data.locators[elementName].selector);
  }

  async embedFullPageScreenshot(description) {
    await allureReporter.step(`"${description} - 📸 Full page screenshot`.trim(), async () => {
      const screenshot = await browser.takeScreenshot();
      const binaryImage = Buffer.from(screenshot, 'base64');
      allureReporter.addAttachment(`📸 ${description}`, binaryImage, 'image/png');
    });
  }

  async click(filePath, elementName) {
    const element = await this.getElement(filePath, elementName);

    await $(element.selector).scrollIntoView();
    await $(element.selector).waitForClickable({
      timeoutMsg: `❌ "${element.description}" could not be clickable >> ${element.selector}`,
    });
    await $(element.selector).click();
    allureReporter.addAttachment(
      `👣 "${element.description}" is clicked`,
      `👣 "${element.description}" is clicked`,
      'text/plain',
    );
  }

  async clickAllIfExists(filePath, elementName) {
    const element = await this.getElement(filePath, elementName);
    let selector = $$(element.selector);
    let booleanFlag = selector.length;
    while (booleanFlag > 0) {
      await $$(element.selector)[0].click();
      selector = $$(element.selector);
      booleanFlag = selector.length;
    }
    allureReporter.addAttachment(
      `👣 "${element.description}" is clicked`,
      `👣 "${element.description}" is clicked`,
      'text/plain',
    );
  }

  async clickByIndex(filePath, elementName, index) {
    const element = await this.getElement(filePath, elementName);
    await $$(element.selector)[index].scrollIntoView();
    await $$(element.selector)[index].waitForClickable({
      timeoutMsg: `❌ "${element.description}" could not be clickable >> ${element.selector}`,
    });
    await $$(element.selector)[index].click();
    allureReporter.addAttachment(
      `👣 "${element.description} #${index}" is clicked`,
      `👣 "${element.description} #${index}" is clicked`,
      'text/plain',
    );
  }

  async setValue(filePath, elementName, strValue) {
    const element = await this.getElement(filePath, elementName);
    await $(element.selector).scrollIntoView();
    await $(element.selector).waitForEnabled({
      timeoutMsg: `❌ "${element.description}" was not enabled >> ${element.selector}`,
    });
    await $(element.selector).setValue(strValue);
    allureReporter.addAttachment(
      `👣 "${element.description}" is entered with "${strValue}"`,
      `👣 "${element.description}" is entered with "${strValue}"`,
      'text/plain',
    );
  }

  async selectByVisibleText(filePath, elementName, strValue) {
    const element = await this.getElement(filePath, elementName);
    await $(element.selector).waitForDisplayed({
      timeoutMsg: `❌ "${element.description}" was not displayed >> ${element.selector}`,
    });
    await $(element.selector).scrollIntoView();
    await $(element.selector).selectByVisibleText(strValue);
    allureReporter.addAttachment(
      `👣 "${element.description}" is selected with option "${strValue}"`,
      `👣 "${element.description}" is selected with option "${strValue}"`,
      'text/plain',
    );
  }

  async getTextByIndex(filePath, elementName, index) {
    const element = await this.getElement(filePath, elementName);
    const elementTextContent = await $$(element.selector)[index].getText();
    allureReporter.addAttachment(
      `👣 "${element.description} #${index}" text is obtained`,
      `👣 "${element.description} #${index}" text is obtained`,
      'text/plain',
    );
    return elementTextContent;
  }

  async getText(filePath, elementName) {
    const element = await this.getElement(filePath, elementName);
    allureReporter.addAttachment(
      `👣 "${element.description}" text is obtained`,
      `👣 "${element.description}" text is obtained`,
      'text/plain',
    );
    return await $(element.selector).getText();
  }

  async getAllTextContents(filePath, elementName) {
    const element = await this.getElement(filePath, elementName);
    const elements = $$(element.selector);
    const textPromises = await elements.map(async (element) => await element.getText());
    const textContents = await Promise.all(textPromises);
    allureReporter.addAttachment(
      `👣 "${element.description}" text is obtained`,
      `👣 "${element.description}" text is obtained`,
      'text/plain',
    );
    return textContents;
  }

  async verifyText(filePath, elementName, strExpectedText) {
    const element = await this.getElement(filePath, elementName);
    const actualText = await this.getText(filePath, elementName);
    if (actualText.includes(strExpectedText)) {
      await this.embedFullPageScreenshot(
        `✅ PASSED: "${element.description}" text is displayed as Expected = "${strExpectedText}" >> Actual = "${actualText}" - Screenshot`,
      );
    } else {
      await this.embedFullPageScreenshot(
        `💥 FAILED: "${element.description}" text is NOT displayed as Expected = "${strExpectedText}" >> Actual = "${actualText}" - Screenshot`,
      );
    }
    await expect($(element.selector)).toHaveText(expect.stringContaining(await strExpectedText));
  }

  async verifyCompareValues(strActualValue, strExpectedValue) {
    if (strActualValue === strExpectedValue) {
      await this.embedFullPageScreenshot(
        `✅ PASSED: "Value is displayed as Expected = "${strExpectedValue}" >> Actual = "${strActualValue}" - Screenshot`,
      );
    } else {
      await this.embedFullPageScreenshot(
        `💥 FAILED: "Value is NOT displayed. Expected = "${strExpectedValue}" >> Actual = "${strActualValue}" - Screenshot`,
      );
    }
    await expect(strActualValue).toEqual(strExpectedValue);
  }

  async verifyValue(filePath, elementName, strExpectedValue) {
    const element = await this.getElement(filePath, elementName);
    const actualValue = await $(element.selector).getValue();
    if (actualValue === strExpectedValue) {
      await this.embedFullPageScreenshot(
        `✅ PASSED: "${element.description}" value is displayed as Expected = "${strExpectedValue}" >> Actual = "${actualValue}" - Screenshot`,
      );
    } else {
      await this.embedFullPageScreenshot(
        `💥 FAILED: "${element.description}" value is NOT displayed. Expected = "${strExpectedValue}" >> Actual = "${actualValue}" - Screenshot`,
      );
    }
    await expect($(element.selector)).toHaveValue(await strExpectedValue);
  }

  async verifyURL(expectedURL) {
    await expect(browser).toHaveUrl(expectedURL);
    const actualUrl = await browser.getUrl();
    if (actualUrl === expectedURL) {
      await this.embedFullPageScreenshot(
        `✅ PASSED: "URL page is as Expected = "${expectedURL}" >> Actual = "${actualUrl}" - Screenshot`,
      );
    } else {
      await this.embedFullPageScreenshot(
        `💥 FAILED: "URL page is NOT as Expected = "${expectedURL}" >> Actual = "${actualUrl}" - Screenshot`,
      );
    }
  }
}
