import { chromium } from "playwright";
// eslint-disable-next-line no-unused-vars
import { should } from "chai";

should();

let page;
let browser;

describe("Sandbox", () => {
  before(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await chromium.launch()
      : await chromium.launch({ headless: false });
    page = await browser.newPage();

    await page
      .goto("https://e2e-boilerplate.github.io/sandbox/", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  after(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });

  it("should be on sandbox", async () => {
    await page.waitFor("h1");

    const pageTitle = await page.title();
    const title = await page.$eval("h1", (el) => el.textContent);

    pageTitle.should.eql("Sandbox");
    title.should.eql("Sandbox");
  });
});
