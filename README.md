# Automation Challenge
## Tutorial to run the project
### Prerequisites

Installed:
- Chrome
- Firefox
- MicrofoftEdge

You must have [Visual Studio Code](https://code.visualstudio.com/download) installed

Once installed [Visual Studio Code](https://code.visualstudio.com/download) you need to install a couple of plugins to help you set up the framework.

These plugins are Prettier and ESlint

#### 🤔 How to install Prettier in Visual Studio Code?

1. Go to Visual Studio Code application.
2. On left sidebar in Visual Studio Code, click "Extensions" or press ``` Crtl+Shift+X ```.
3. In the search, type Prettier and click "Prettier - Code formatter", then click on "install".
4. That's all to install Prettier in VSCode 🥳

#### 🤔 How to install ESlint in Visual Studio Code?

1. Go to Visual Studio Code application.
2. On left sidebar in Visual Studio Code, click "Extensions" or press ``` Crtl+Shift+X ```.
3. In the search, type Prettier and click "ESlint", then click on "install".
4. That's all to install ESlint in VSCode 🥳

### Download project

1. Click on the code button in this repository
2. Select the Download Zip option
3. Extract the .zip file with the Extract here option
4. Place the project folder on the desired location

### Open project

- <ins>First way</ins>: Right click on the folder and open it as Visual Studio Code
- <ins>Second way</ins>: Open Visual Studio code and drag the folder in Visual Studio Code Window
- <ins>Third way</ins>: Open Visual Studio, on top sidebar, click File and Open Folder or press ``` Ctrl+K Ctrl+O ```, then choose the folder where you save it

## Running project

- In Visual Studio Code, open new terminal with ``` Ctrl+Shift+` ``` or on top sidebar click Terminal, then click New Terminal

Type the following commands to run the following test cases

- Type ``` npm init ``` and wait all packages will be downloaded

### Running test cases

1. Login with a valid user

    - On Windows: ``` npx kill-port 4444 ; npx wdio --spec test/specs/loginSuccess.js ```
    - On Mac: ``` npx kill-port 4444 && npx wdio --spec test/specs/loginSuccess.js ```
    
2. Login with an invalid user
    - On Windows: ``` npx kill-port 4444 ; npx wdio --spec test/specs/loginFailed.js ```
    - On Mac: ``` npx kill-port 4444 && npx wdio --spec test/specs/loginFailed.js ```
    
    

3. Logout from the home page
    - On Windows: ``` npx kill-port 4444 ; npx wdio --spec test/specs/logout.js ```
    - On Mac: ``` npx kill-port 4444 && npx wdio --spec test/specs/logout.js ```

4. Sort products by Price (low to high)
    - On Windows: ``` npx kill-port 4444 ; npx wdio --spec test/specs/sortProducts.js ```
    - On Mac: ``` npx kill-port 4444 && npx wdio --spec test/specs/sortProducts.js ```

5. Add multiple items to the shopping cart
    - On Windows: ``` npx kill-port 4444 ; npx wdio --spec test/specs/addProducts.js ```
    - On Mac: ``` npx kill-port 4444 && npx wdio --spec test/specs/addProducts.js ```

6. Add the specific product ‘Sauce Labs Onesie’ to the shopping cart
    - On Windows: ``` npx kill-port 4444 ; npx wdio --spec test/specs/addSpecificProduct.js ```
    - On Mac: ``` npx kill-port 4444 && npx wdio --spec test/specs/addSpecificProduct.js ```

7. Complete a purchase
    - On Windows: ``` npx kill-port 4444 ; npx wdio --spec test/specs/purchase.js ```
    - On Mac: ``` npx kill-port 4444 && npx wdio --spec test/specs/purchase.js ```
    
### Running test cases at the same time

- Running all test cases

    - On Windows: ``` npx kill-port 4444 ; npx wdio ```
    - On Mac: ``` npx kill-port 4444 && npx wdio ```
    
- Running test cases by suite
    - Login Suite
        - On Windows: ``` npx kill-port 4444 ; npx wdio --suite login ```
        - On Mac: ``` npx kill-port 4444 && npx wdio --suite login ```
    - Logout Suite
        - On Windows: ``` npx kill-port 4444 ; npx wdio --suite logout ```
        - On Mac: ``` npx kill-port 4444 && npx wdio --suite logout ```
    - Products Suite
        - On Windows: ``` npx kill-port 4444 ; npx wdio --suite products ```
        - On Mac: ``` npx kill-port 4444 && npx wdio --suite products ```
    - Purchase Suite
        - On Windows: ``` npx kill-port 4444 ; npx wdio --suite purchase ```
        - On Mac: ``` npx kill-port 4444 && npx wdio --suite purchase ```

### Open Allure report

- ``` npx allure open ```
