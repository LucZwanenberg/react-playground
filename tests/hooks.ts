import { BeforeAll, Before, After } from '@cucumber/cucumber';
import runSmokeTestOrFail from './support/runSmokeTestOrFail';
import { BASE_URL } from './config';
import Playwright from './support/Playwright';

BeforeAll(async function () {
  await runSmokeTestOrFail(BASE_URL);
});

Before(async function () {
  await Playwright.initialize();
});

After(async function () {
  await Playwright.close();
});
