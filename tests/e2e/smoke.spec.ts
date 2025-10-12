import { test, expect } from "@playwright/test";

test.describe("Smoke", () => {
    test("דף הבית נטען ללא זליגת V2", async ({ page }) => {
        const response = await page.goto("/", { waitUntil: "networkidle" });
        expect(response?.ok()).toBeTruthy();

        await expect(
            page.getByRole("heading", { name: "גלו את קוד העושר שלכם" })
        ).toBeVisible();

        await expect(
            page.getByRole("button", { name: "מחשבון קוד העושר" })
        ).toBeVisible();

        const hasV2Class = await page.evaluate(() => {
            return Boolean(document.querySelector('[class*="v2-"]'));
        });

        expect(hasV2Class).toBe(false);
    });

    test("עמודי תנאי שימוש ופרטיות מגיבים תקין", async ({ page }) => {
        const legalPaths = ["/terms", "/privacy"];

        for (const path of legalPaths) {
            const response = await page.goto(path, {
                waitUntil: "domcontentloaded",
            });

            expect(response?.ok()).toBeTruthy();

            await expect(
                page.getByRole("heading", { name: "תנאי שימוש ומדיניות פרטיות" })
            ).toBeVisible();
        }
    });

    test("עמוד V2 נטען רק אם הוגדר", async ({ page }) => {
        const pageErrors: string[] = [];
        page.on("pageerror", (error) => {
            pageErrors.push(error.message);
        });

        const response = await page.goto("/v2", {
            waitUntil: "domcontentloaded",
        });

        test.skip(!response || response.status() === 404, "עמוד V2 לא נפרס בסביבה זו");

        await expect(page.locator("body")).toHaveClass(/\bv2\b/);
        await expect(page.locator(".v2"))
            .toBeVisible();

        expect(pageErrors, "אסור שהעמוד יפלוט שגיאות runtime").toHaveLength(0);
    });

    test("סביבת Alt נשארת מבודדת ומכבדת העדפת תמה", async ({ page }) => {
        await page.addInitScript(() => {
            window.localStorage.setItem("alt-theme-preference", "dark");
        });

        const response = await page.goto("/alt", {
            waitUntil: "domcontentloaded",
        });

        expect(response?.ok()).toBeTruthy();
        expect(response?.headers()["x-robots-tag"] ?? "").toContain("noindex");
        expect(response?.headers()["referrer-policy"] ?? "").toBe("no-referrer");

        await expect(page.locator("meta[name='robots']"))
            .toHaveAttribute("content", /noindex/i);

        await expect(page.locator("body"))
            .toHaveClass(/alt-scope/);

        await expect(page.locator("body"))
            .toHaveAttribute("data-alt-theme", /dark/);
    });

    test("חזרה לעמוד הראשי לא משאירה מחלקות Alt", async ({ page }) => {
        await page.goto("/alt", {
            waitUntil: "domcontentloaded",
        });

        await expect(page.locator("body"))
            .toHaveClass(/alt-scope/);

        const homeResponse = await page.goto("/", {
            waitUntil: "domcontentloaded",
        });

        expect(homeResponse?.ok()).toBeTruthy();

        const bodyClass = await page.locator("body").getAttribute("class");
        expect(bodyClass).toBeTruthy();
        expect(bodyClass?.includes("alt-scope")).toBe(false);
    });
});
