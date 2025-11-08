import { test, expect } from "@playwright/test";

test.describe("Masonville Corner Store landing page", () => {
  test("serves metadata and structured data", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();

    await expect(page).toHaveTitle(/Masonville Corner Store/);

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toContain("Fresh-cut fries");

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBe("https://masonvillecorner.store/");

    const ldJsonRaw = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(ldJsonRaw).toBeTruthy();
    const ldJson = JSON.parse(ldJsonRaw ?? "{}");
    expect(ldJson["@type"]).toBe("ConvenienceStore");
    expect(ldJson.aggregateRating.reviewCount).toBeGreaterThan(0);
  });

  test("shows primary calls to action", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Order Fries" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Get Directions" })).toBeVisible();
  });

  test("renders reviews section", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator(".review-card");
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText("Elizabeth Bryan");
  });

  test("highlights the current day in hours table", async ({ page }) => {
    await page.goto("/");
    const today = new Intl.DateTimeFormat("en-CA", { weekday: "long" }).format(new Date());
    await expect(page.locator(`.hours-table__row[data-day="${today}"]`)).toHaveAttribute("data-current", "true");
  });
});
