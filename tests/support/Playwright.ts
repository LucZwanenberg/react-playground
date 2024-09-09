import { Browser, Page } from "playwright/test";

export default class Playwright {
  public static page: Page;
  public static browser: Browser;

  public static async initialize(): Promise<void> {
    const { chromium } = require('@playwright/test');
    const browser = await chromium.launch({
      headless: true
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    Playwright.page = page;
    Playwright.browser = browser;
  }

  public static async close(): Promise<void> {
    await Playwright.browser.close;
  }
}