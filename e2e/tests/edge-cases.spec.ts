import { test, expect } from '@playwright/test';

test.describe('Edge Cases', () => {
  test('invalid lesson shows 404', async ({ page }) => {
    await page.goto('/course/non-existent/path');
    await expect(page.locator('text=Not Found').or(page.locator('text=404'))).toBeVisible();
  });

  test('course page loads', async ({ page }) => {
    await page.goto('/course');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('pricing page loads', async ({ page }) => {
    await page.goto('/course/pricing');
    await expect(page.locator('text=Invest in Your Future')).toBeVisible();
  });

  test('FAQ page loads', async ({ page }) => {
    await page.goto('/course/faq');
    await expect(page.locator('text=Frequently Asked Questions')).toBeVisible();
  });
});
