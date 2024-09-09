import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BASE_URL } from '../config';
import Playwright from '../support/Playwright';

Given('the application is open', async function () {
  await Playwright.page.goto(BASE_URL);
});

Then('the greeting message {string} should not be visible', async function (message: string) {
  const text = Playwright.page.locator(`text="${message}"`);
  await expect(text).toBeHidden();
});

Then('a button with the text {string} should be present', async function (buttonText: string) {
  const button = Playwright.page.locator(`text="${buttonText}"`);
  await expect(button).toBeVisible();
});

When('the user clicks the {string} button', async function (buttonText: string) {
  const button = Playwright.page.locator(`text="${buttonText}"`);
  await button.click();
});

Then('the button should disappear', async function () {
  const button = Playwright.page.locator('text="Click me"');
  await expect(button).toBeHidden();
});

Then('the greeting message {string} should become visible', async function (message: string) {
  const text = Playwright.page.locator(`text="${message}"`);
  await expect(text).toBeVisible();
});
