import { test, expect } from "@playwright/test";

test.describe("Temporary Access", () => {
  test("redemption flow works", async ({ page }) => {
    // 1. Visit course page as a free user (clear cookies)
    await page.context().clearCookies();
    await page.goto("/course");

    // 2. Locate the redemption card
    const redeemCard = page.locator("text=Have a Temporary Access Code?");
    await expect(redeemCard).toBeVisible();

    const input = page.getByTestId("access-code-input");
    const button = page.getByTestId("redeem-code-button");

    // 3. Enter invalid code
    // Mock the check API for invalid code
    await page.route(
      "**/api/course/temporary-access/check/INVALID",
      async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ isValid: false, reason: "Invalid Code" }),
        });
      },
    );

    await input.fill("INVALID");
    // Wait for debounce/validation
    await page.waitForTimeout(500); // Wait for potential debounce

    // Verify error badge if it appears on check
    // The component shows a badge if validated
    await expect(page.locator("text=Invalid Code")).toBeVisible();

    // 4. Enter valid code
    const VALID_CODE = "TESTCODE123";

    // Mock the check API for valid code
    await page.route(
      `**/api/course/temporary-access/check/${VALID_CODE}`,
      async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({
            isValid: true,
            codeData: {
              metadata: {
                code: VALID_CODE,
                status: "active",
                expires_at: new Date(Date.now() + 86400000).toISOString(),
              },
            },
          }),
        });
      },
    );

    // Mock the redeem API
    await page.route("**/api/course/temporary-access/redeem", async (route) => {
      // Verify payload
      const postData = route.request().postDataJSON();
      expect(postData.code).toBe(VALID_CODE);

      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          success: true,
          message: "Access code redeemed successfully!",
        }),
      });
    });

    await input.fill(VALID_CODE);
    await expect(page.locator("text=Valid Code")).toBeVisible();

    // 5. Click redeem
    await button.click();

    // 6. Verify success toast or state change
    // Since page might reload or UI might update, verify toast first
    await expect(
      page.locator("text=Access code redeemed successfully!"),
    ).toBeVisible();
  });
});
