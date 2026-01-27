import { test, expect } from '@playwright/test';

test.describe('Pricing Smoke Test (No Auth)', () => {
  // Reset storage state to ensure we are logged out
  test.use({ storageState: { cookies: [], origins: [] } });

  test('pricing page loads and shows products', async ({ page }) => {
    console.log('Navigating to pricing page...');
    await page.goto('/course/pricing');
    
    // 1. Check title
    await expect(page).toHaveTitle(/Pricing/);
    
    // 2. Check header
    await expect(page.locator('h1')).toContainText('Invest in Your Future');
    
    // 3. Check for specific products (from our previous context)
    // Use .first() to handle cases where text appears multiple times (banner vs card)
    await expect(page.locator('text=Convergence: All-Access').first()).toBeVisible();
    await expect(page.locator('text=Engineering: Full Access').first()).toBeVisible();
    
    // 4. Check prices are visible (e.g., £599)
    await expect(page.locator('text=£599').first()).toBeVisible();
    
    // 5. Check buttons exist
    const buttons = page.getByRole('button', { name: /get/i });
    const count = await buttons.count();
    console.log(`Found ${count} purchase buttons`);
    expect(count).toBeGreaterThan(0);
    
    // 6. Click a button and verify it redirects to sign-in (since we are logged out)
    await buttons.first().click();
    await page.waitForURL(/sign-in/);
    expect(page.url()).toContain('sign-in');
    console.log('Correctly redirected to sign-in on purchase attempt');
  });

  test('dive club page loads', async ({ page }) => {
     await page.goto('/dive-club');
     await expect(page.locator('text=Dive Club Exclusive')).toBeVisible();
     await expect(page.locator('input[name="email"]')).toBeVisible();
  });
  
  test('ddg team page loads', async ({ page }) => {
     await page.goto('/ddg');
     await expect(page.locator('text=Hello, Colleague')).toBeVisible();
     await expect(page.locator('input[name="email"]')).toBeVisible();
  });
});
