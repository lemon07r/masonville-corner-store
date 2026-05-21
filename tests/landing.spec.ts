import { test, expect } from "@playwright/test";

test.describe("Astraea Fabrication landing page", () => {
  test("serves metadata and structured data", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();

    await expect(page).toHaveTitle(/Astraea Fabrication/);

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toContain("countertop");

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBe("https://www.astraeafabrication.ca/");

    const ldJsonRaw = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(ldJsonRaw).toBeTruthy();
    const ldJson = JSON.parse(ldJsonRaw ?? "{}");
    expect(ldJson["@type"]).toBe("HomeAndConstructionBusiness");
    expect(ldJson.aggregateRating.reviewCount).toBeGreaterThan(0);
  });

  test("shows primary calls to action", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Get a Free Quote" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View Services" })).toBeVisible();
  });

  test("renders reviews section", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator(".review-card");
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText("Sarah Mitchell");
  });

  test("highlights the current day in hours table", async ({ page }) => {
    await page.goto("/");
    const today = new Intl.DateTimeFormat("en-CA", { weekday: "long" }).format(new Date());
    const row = page.locator(`.hours-table__row[data-day="${today}"]`);
    if (today !== "Sunday") {
      await expect(row).toHaveAttribute("data-current", "true");
    }
  });
});
