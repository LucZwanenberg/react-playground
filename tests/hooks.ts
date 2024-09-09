import { BeforeAll, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import runSmokeTestOrFail from './misc/runSmokeTestOrFail';
import { BASE_URL } from './config';

let browser: Browser;
let page: Page;

BeforeAll(async function () {
  // Do not run browser tests when application cannot be reached
  // to avoid wasting developer's / build infrastructure's time.
  await runSmokeTestOrFail(BASE_URL);
});

Before(async function () {
  browser = await chromium.launch();
  page = await browser.newPage();
  this.page = page;
});

After(async function () {
  await browser.close();
});
