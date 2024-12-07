const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");





(async function googleSearch() {
  // let service = new chrome.ServiceBuilder("./chromedriver/win64-116.0.5793.0/chromedriver-win64/chromedriver.exe");
  let service = new chrome.ServiceBuilder("./chromedriver/win64-131.0.6778.87/chromedriver-win64/chromedriver.exe");

  let driver = await new Builder()
    .forBrowser("chrome")
    .usingServer("http://localhost:4444/wd/hub")

    // .setChromeService(service) // Hizmeti doğrudan Builder ile ayarlayın
    .build();



  try {
    // Navigate to Url
    await driver.get("https://www.google.com");
    // Enter text "Automation Bro" and perform keyboard action "Enter"
    await driver
      .findElement(By.name("q"))
      .sendKeys("Automation Bro", Key.ENTER);

    let firstResult = await driver.wait(
      until.elementLocated(By.css("h3")),
      10000
    );

    console.log(await firstResult.getAttribute("textContent"));
    console.log(await (await driver.getCapabilities()).getBrowserName());
    console.log(await (await driver.getCapabilities()).getBrowserVersion());
  } finally {
    driver.quit();
  }
})();
