import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BASE_URL } from '../config';
import Playwright from '../support/Playwright';

When('I navigate to the application home page', async function () {
  await Playwright.page.goto(BASE_URL);
});

Given('the authentication service returns the following user:', function (dataTable) {
  const [_header, [first_name, last_name, email]] = dataTable.raw();
  Playwright.page.route('*/**/authentication/user', route => {
    route.fulfill({
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
  await expect(Playwright.page.getByText(expectedText)).toBeVisible();
});