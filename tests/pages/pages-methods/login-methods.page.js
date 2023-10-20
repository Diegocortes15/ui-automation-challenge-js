import allureReporter from "@wdio/allure-reporter";
import { WdioFactory } from "../../utils/wdioFactory.utils";

class LoginPageMethods {
  _wdioFactory;
  _pageName;
  _url;

  constructor() {
    this._wdioFactory = new WdioFactory();
    this._pageName = "login-locators.page";
    this._url = "https://www.saucedemo.com/";
  }

  async goto() {
    await browser.navigateTo(this._url);
    browser.executeScript(() => {
      localStorage.clear();
    });
  }

  async enterUsername(username) {
    await this._wdioFactory.setValue(this._pageName, "inputUser", username);
  }

  async enterPassword(password) {
    await this._wdioFactory.setValue(this._pageName, "inputPassword", password);
  }

  async clickButtonSubmit() {
    await this._wdioFactory.click(this._pageName, "buttonSubmit");
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    /*await this._wdioFactory.embedFullPageScreenshot(
          "Login - Screenshot"
        );*/
    await this.clickButtonSubmit();
  }

  async verifyUsername(username) {
    await this._wdioFactory.verifyValue(this._pageName, "inputUser", username);
  }

  async verifyPassword(password) {
    await this._wdioFactory.verifyValue(
      this._pageName,
      "inputPassword",
      password
    );
  }

  async verifyValidationMessage(validationMessage) {
    await this._wdioFactory.verifyText(
      this._pageName,
      "errorMessage",
      validationMessage
    );
  }

  async verifyURL() {
    await this._wdioFactory.verifyURL(this._url);
  }
}

export default new LoginPageMethods();
