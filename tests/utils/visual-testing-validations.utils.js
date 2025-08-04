import { readFileSync } from 'fs';
import path from 'path';
import allureReporter from '@wdio/allure-reporter';
import { AUTO_SAVE_BASELINE } from '../../wdio.conf';
import S3Service from './s3-service.utils.js';

class VisualTesting {
  constructor() {
    this.allureReporter = allureReporter;
  }

  async _embedScreenshot(description, path) {
    try {
      await this.allureReporter.step(description, async () => {
        const screenshot = readFileSync(path);
        this.allureReporter.addAttachment(description, screenshot, 'image/png');
      });
    } catch (error) {
      console.error(`Error embedding screenshot: ${error.message}`);
    }
  }

  async _handlePassed(tagName, actualImgPath, actualMismatch, expectedMismatch) {
    const passedDescription = `👁‍🗨 | ✅ PASSED >> Screens match within ${
      100 - actualMismatch
    }% tolerance (${expectedMismatch}% allowed).`;
    await this._embedScreenshot(passedDescription, actualImgPath);

    if (actualMismatch !== 0) {
      await this._handleDifference(tagName);
    }
  }

  async _handleFailed(tagName, actualImgPath, actualMismatch, expectedMismatch) {
    const failedDescription = `👁‍🗨 | 💥 FAILED >> Screens do not match within the allowed tolerance (${actualMismatch}% mismatch with ${expectedMismatch}% threshold).`;
    await this._embedScreenshot(failedDescription, actualImgPath);
    await this._handleDifference(tagName);
  }

  async _handleDifference(tagName) {
    const diffImgPath = await this._getDiffImgPath(tagName);
    const diffDescription = `👁‍🗨 | 🛑 DIFFERENCE >> Difference Detected: ${tagName}.png`;
    await this._embedScreenshot(diffDescription, diffImgPath);
  }

  async _getDiffImgPath(tagName) {
    const browserName = browser.capabilities.browserName.toLowerCase();
    const basePath = process.cwd();
    return path.join(basePath, `tmp/diff/desktop_${browserName}/${tagName}.png`);
  }

  // Assertions

  async toMatchScreenSnapshot(tagName, mismatchThreshold = 0, options) {
    const visualOptions = typeof mismatchThreshold === 'object' ? mismatchThreshold : options;
    const expectedMismatch = typeof mismatchThreshold === 'number' ? mismatchThreshold : 0;

    if (AUTO_SAVE_BASELINE) {
      const route = await browser.saveScreen(tagName, visualOptions);
      const path = `${route.path}/${route.fileName}`; // Use forward slashes for consistency
      await S3Service.uploadFile(path);
    } else {
      const baselineFolder = path.join(process.cwd(), 'tmp', 'baseline');
      await S3Service.downloadFile(`${tagName}.png`, baselineFolder);
    }

    const actualMismatch = await browser.checkScreen(tagName, visualOptions);

    const baseImgPath = path.join(process.cwd(), 'tmp', 'baseline', `${tagName}.png`);
    const actualImgPath = path.join(process.cwd(), 'tmp', 'actual', `${tagName}.png`);

    const baseDescription = `👁‍🗨 | 🔲 BASEIMAGE >> ${tagName}.png`;
    await this._embedScreenshot(baseDescription, baseImgPath);

    if (actualMismatch <= mismatchThreshold) {
      await this._handlePassed(tagName, actualImgPath, actualMismatch, expectedMismatch);
    } else {
      await this._handleFailed(tagName, actualImgPath, actualMismatch, expectedMismatch);
    }

    await expect(actualMismatch).toBeLessThanOrEqual(expectedMismatch);
  }

  async toMatchFullPageSnapshot(tagName, mismatchThreshold = 0, options = {}) {
    const visualOptions = typeof mismatchThreshold === 'object' ? mismatchThreshold : options;
    const expectedMismatch = typeof mismatchThreshold === 'number' ? mismatchThreshold : 0;

    const actualMismatch = await browser.checkFullPageScreen(tagName, visualOptions);
    const baseImgPath = path.join(process.cwd(), 'tmp', 'baseline', `${tagName}.png`);
    const actualImgPath = path.join(process.cwd(), 'tmp', 'actual', `${tagName}.png`);

    const baseDescription = `👁‍🗨 | 🔲 BASEIMAGE >> ${tagName}.png`;
    await this._embedScreenshot(baseDescription, baseImgPath);

    if (actualMismatch <= expectedMismatch) {
      await this._handlePassed(tagName, actualImgPath, actualMismatch, expectedMismatch);
    } else {
      await this._handleFailed(tagName, actualImgPath, actualMismatch, expectedMismatch);
    }

    await expect(actualMismatch).toBeLessThanOrEqual(expectedMismatch);
  }

  async toMatchElementSnapshot(tagName, mismatchThreshold = 0, options = {}) {
    const visualOptions = typeof mismatchThreshold === 'object' ? mismatchThreshold : options;
    const expectedMismatch = typeof mismatchThreshold === 'number' ? mismatchThreshold : 0;

    const actualMismatch = await browser.checkElement(tagName, visualOptions);
    const baseImgPath = path.join(process.cwd(), 'tmp', 'baseline', `${tagName}.png`);
    const actualImgPath = path.join(process.cwd(), 'tmp', 'actual', `${tagName}.png`);

    const baseDescription = `👁‍🗨 | 🔲 BASEIMAGE >> ${tagName}.png`;
    await this._embedScreenshot(baseDescription, baseImgPath);

    if (actualMismatch <= expectedMismatch) {
      await this._handlePassed(tagName, actualImgPath, actualMismatch, expectedMismatch);
    } else {
      await this._handleFailed(tagName, actualImgPath, actualMismatch, expectedMismatch);
    }

    await expect(actualMismatch).toBeLessThanOrEqual(expectedMismatch);
  }
}

export default VisualTesting;
