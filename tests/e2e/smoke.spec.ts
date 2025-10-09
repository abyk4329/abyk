import { test, expect } from "@playwright/test";

test.describe("Smoke", () => {
    test("homepage hero is visible", async ({ page }) => {
        await page.goto("/");

        await expect(
            page.getByRole("heading", { name: "גלו את קוד העושר שלכם" })
        ).toBeVisible();

        await expect(
            page.getByRole("button", { name: "מחשבון קוד העושר" })
        ).toBeVisible();
    });
});
