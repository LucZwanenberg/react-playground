import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BASE_URL } from '../config';
import Playwright from '../support/Playwright';

When('I navigate to the application home page', async function () {
  await Playwright.page.goto(BASE_URL);
});

Given('the authentication service returns null', async () => {
  await Playwright.page.route('*/**/authentication/user', async route => {
    await route.fulfill({ json: null });
  });
});

Given('the authentication service returns the following user:', async (dataTable) => {
  const [_header, [first_name, last_name, email]] = dataTable.raw();
  await Playwright.page.route('*/**/authentication/user', async route => {
    await route.fulfill({
      json: {
        id: 12,
        email: email,
        first_name,
        last_name
      }
    });
  });
});

Then('the application should show {string}', async function (expectedText: string) {
  await expect(Playwright.page.getByText(expectedText)).toBeVisible({ timeout: 60000 });
});