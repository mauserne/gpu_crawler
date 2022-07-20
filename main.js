const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // 다나와 실행
    await driver.get("http://prod.danawa.com/list/?cate=11438730");

    let userAgent = await driver.executeScript("return navigator.userAgent;");

    console.log("[UserAgent]", userAgent);
    await driver.wait(until.elementLocated(By.className("prod_item")), 10000);

    console.log(await driver.getTitle());
    let resultElements = await driver.findElements(By.xpath("//p[2]/a/strong"));
    console.log("[resultElements.length]", resultElements.length);

    let price = [];
    console.log("== Search results ==");
    for (var i = 4; i < 9; i++) {
      price.push(
        parseFloat((await resultElements[i].getText()).split(",").join(""))
      );
    }
    console.log(price);
    const result = price.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);
    const average = result / price.length;
    console.log(average);

    const averageComma = average
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    console.log(averageComma);
    try {
      await driver.wait(() => {
        return false;
      }, 4000);
    } catch (err) {}
  } finally {
    driver.quit();
  }
})();
