const puppeteerExtra = require("puppeteer-extra");
const stealth = require("puppeteer-extra-plugin-stealth");

puppeteerExtra.use(stealth());

const appDetailsScraper = async (url) => {
  let browser;

  return new Promise(async (resolve, reject) => {
    try {
      browser = await puppeteerExtra.launch({
        headless: "new",
        defaultViewport: null,
        userDataDir: "./tmp",
        args: ["--no-sandbox"],
      });

      const page = await browser.newPage();
      await page.goto(url);

      const imageURL = await page.$eval("div.Mqg6jb.Mhrnjf img", (img) =>
        img.getAttribute("src")
      );

      const outerDiv = await page.$(".Uc6QCc");

      if (outerDiv) {
        const innerText = await outerDiv.$eval(
          ".VfPpkd-vQzf8d",
          (element) => element.innerText
        );

        const words = innerText.split(" ");

        const lastWord = words[words.length - 1];
        const category = lastWord.charAt(0).toUpperCase() + lastWord.slice(1);

        resolve({ imageURL, category });
      }
    } catch (error) {
      console.error(`Error@findProductData: ${error}`);
      reject(error);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  });
};

module.exports = { appDetailsScraper };
