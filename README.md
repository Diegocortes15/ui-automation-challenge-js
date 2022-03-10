# Automation Challenge
## Tutorial to run the project
### Prerequisites

#### JDK Java



1. Make sure you have installed [JDK Java](https://www.oracle.com/java/technologies/downloads/).

![JDK Java](https://user-images.githubusercontent.com/60171460/157584525-0bb45d95-4d3a-42da-8999-c8dce37dda6d.png)

2. Take in mind the **path** when you are saving Java folder **that contains jdk**.
3. Copy jdk path.

![JDK1](https://user-images.githubusercontent.com/60171460/157490631-05ab1bfb-ac26-46e5-95a3-ea89c261247d.png)

4. On windows, in search bar, type **environment variables** and click on **Edit the system environment variables**.

![environment variables](https://user-images.githubusercontent.com/60171460/157496931-f1d25ccc-66c8-4608-9a3b-24fd2411a920.gif)


5. In the **System properties** window, click **environment variables**.
6. In **Environment variables** window in **Advanced tab**, in **System variables** section, double click **Path**.
7. In **Edit environment variable** click **New** button and paste the **path that contains jdk**, then click **Ok**.
8. Close the open windows and that's all to install JDK 🥳.

![environment variables (2)](https://user-images.githubusercontent.com/60171460/157497327-09035824-bc66-4f1f-ad66-a92690bf4313.gif)

#### Node.js

1. You need must have [Node.js](https://nodejs.org/en/) installed (Node.js LTS version recommended)
2. When you are installing Node.js, make sure to check the option

    - [x] **Automatically install the necesary tools. Note that this will also install Chocolatey. The script will pop-up in a new window after the installation completes.**

![nodeInstall](https://user-images.githubusercontent.com/60171460/157139770-d00bb969-9b36-4179-9dd2-ec5bf3fbd89a.PNG)

#### Browsers

Installed:
- Chrome
- Firefox
- MicrofoftEdge

#### Visual Studio Code

You must have [Visual Studio Code](https://code.visualstudio.com/download) installed

Once you have installed [Visual Studio Code](https://code.visualstudio.com/download) you need to install a couple of plugins to help you set up the framework.

These plugins are Prettier and ESlint

#### 🤔 How to install Prettier in Visual Studio Code?

1. Go to Visual Studio Code application.
2. On left sidebar in Visual Studio Code, click **Extensions** or press ``` Crtl+Shift+X ```.
3. In the search, type Prettier and click **Prettier - Code formatter**, then click on **install**.
4. That's all to install Prettier in VSCode 🥳

![prettier-gif](https://user-images.githubusercontent.com/60171460/157494947-54ed24b8-21dd-45bb-9b27-a29a5e3493b9.gif)

#### 🤔 How to install ESlint in Visual Studio Code?

1. Go to Visual Studio Code application.
2. On left sidebar in Visual Studio Code, click **Extensions** or press ``` Crtl+Shift+X ```.
3. In the search, type Prettier and click **ESlint**, then click on **install**.
4. That's all to install ESlint in VSCode 🥳

![eslint-gif](https://user-images.githubusercontent.com/60171460/157495264-718507fb-aef2-4375-b089-5eb7f9858c33.gif)

## Download and open project

### Download project

1. Click on the code button in this repository
2. Select the Download Zip option
3. Extract the .zip file with the **Extract here** option
4. Place the project folder on the desired location

### Open project

- **<ins>First way</ins>:** Right click on the folder and open it with Visual Studio Code
- **<ins>Second way</ins>:** Open Visual Studio code and drag the folder in Visual Studio Code Window
- **<ins>Third way</ins>:** Open Visual Studio, on top bar, click File and Open Folder or press ``` Ctrl+K Ctrl+O ```, then choose the folder where you save it

![openProject-gif](https://user-images.githubusercontent.com/60171460/157499108-f272d71b-f60c-460d-acdd-49b3c9002933.gif)

## Running project

- In Visual Studio Code, open new terminal with ``` Ctrl+Shift+` ``` or ``` Ctrl+Shift+ñ ``` or on top bar click **Terminal**, then click **New Terminal**

![openTerminal](https://user-images.githubusercontent.com/60171460/157498798-253494f2-abc8-4764-a343-3cb8e37acdc9.gif)

Type the following commands to run the following test cases

- Type ``` npm install ``` and wait all packages will be downloaded

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
