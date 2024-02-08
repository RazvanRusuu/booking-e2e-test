import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign in" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("razvan@email.com");
  await page.locator("[name=password]").fill("pass1234");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("You are signed in")).toBeVisible();
  await expect(page.getByRole("link", { name: "Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});

test("should allow user to logout", async ({ page }) => {
  await page.goto(`${UI_URL}sign-in`);

  await page.locator("[name=email]").fill("razvan@email.com");
  await page.locator("[name=password]").fill("pass1234");
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.getByRole("button", { name: "Logout" }).click();
  await expect(page.getByText("You have been logged out")).toBeVisible();
});

// todo test create an account
