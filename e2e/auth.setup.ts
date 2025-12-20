import { test as setup, expect } from '@playwright/test';
import { clerk } from '@clerk/testing/playwright';
import path from 'path';
import fs from 'fs';

const authFile = path.join(__dirname, '.auth/user.json');

// Test user email - should be a real user in your Clerk dev instance
const TEST_USER_EMAIL = process.env.E2E_CLERK_USER_EMAIL || '';

setup('authenticate', async ({ page }) => {
  // Check if we have valid auth already
  if (fs.existsSync(authFile)) {
    try {
      const authData = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
      if (authData.cookies && authData.cookies.length > 0) {
        // Try to use existing auth
        await page.goto('/course');
        const hasProgress = await page.locator('text=Your Progress').isVisible({ timeout: 5000 }).catch(() => false);
        const hasH1 = await page.locator('h1').isVisible({ timeout: 5000 }).catch(() => false);
        
        if (hasProgress || hasH1) {
          console.log('✅ Using existing auth state\n');
          return;
        }
      }
    } catch {
      // Continue with fresh login
    }
  }
  
  // If we have a test user email, use Clerk's automated sign-in
  if (TEST_USER_EMAIL) {
    console.log(`\n🔐 Signing in as ${TEST_USER_EMAIL} via Clerk testing...\n`);
    
    // Navigate to a page that loads Clerk
    await page.goto('/');
    await clerk.loaded({ page });
    
    // Sign in using Clerk's testing helper (bypasses email verification!)
    await clerk.signIn({
      page,
      emailAddress: TEST_USER_EMAIL,
    });
    
    // Verify we're logged in
    await page.goto('/course');
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 });
    
    await page.context().storageState({ path: authFile });
    console.log('✅ Auth state saved via Clerk testing!\n');
    return;
  }
  
  // Fallback to manual login
  console.log('\n🔐 No E2E_CLERK_USER_EMAIL set. Please log in manually...\n');
  console.log('💡 Tip: Set E2E_CLERK_USER_EMAIL in .env.local for automated sign-in\n');
  
  await page.goto('/sign-in');
  await page.waitForSelector('[data-clerk-component]', { timeout: 10000 });
  
  await page.waitForURL(url => 
    !url.pathname.includes('sign-in') && !url.pathname.includes('sign-up'),
    { timeout: 120000 }
  );
  
  await page.goto('/course');
  await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 });
  
  await page.context().storageState({ path: authFile });
  console.log('✅ Auth state saved!\n');
});
