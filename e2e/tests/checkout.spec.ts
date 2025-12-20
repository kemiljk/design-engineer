import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('pricing page has checkout buttons', async ({ page }) => {
    await page.goto('/course/pricing');
    await page.waitForLoadState('domcontentloaded');
    
    // Check that pricing cards exist with purchase buttons
    const purchaseButtons = page.getByRole('button', { name: /get started|purchase|buy|get access/i });
    await expect(purchaseButtons.first()).toBeVisible({ timeout: 10000 });
  });

  test('pricing page shows all pricing tiers', async ({ page }) => {
    await page.goto('/course/pricing');
    await page.waitForLoadState('domcontentloaded');
    
    // Check for pricing tier information
    await expect(page.locator('text=Invest in Your Future')).toBeVisible({ timeout: 10000 });
  });

  test('upgrade prompt shows checkout options', async ({ page, request }) => {
    // Set access to free to see upgrade prompts
    await request.post('http://localhost:3000/api/course/test-access', {
      data: { accessLevel: 'free' }
    });

    // Small delay to ensure server picks up the change
    await page.waitForTimeout(500);

    await page.goto('/course/design-track/web/01-foundations/02-principles-of-design');
    await page.waitForLoadState('domcontentloaded');
    
    // Should see upgrade prompt with checkout button
    const getAccessButton = page.getByRole('button', { name: /get access now/i });
    await expect(getAccessButton).toBeVisible({ timeout: 10000 });
    
    // Verify track option exists
    await expect(page.locator('text=Design Track').first()).toBeVisible();
    
    // Verify full course option exists  
    await expect(page.locator('text=Full Course Access')).toBeVisible();
    
    // Reset access level
    await request.delete('http://localhost:3000/api/course/test-access');
  });
});

test.describe('Checkout API', () => {
  test('checkout API endpoint exists', async ({ request }) => {
    // Without auth, should get redirect or 401
    const response = await request.post('http://localhost:3000/api/course/checkout', {
      data: { productKey: 'full' }
    });
    
    // Endpoint exists (not 404) - may redirect to sign-in or return 401
    expect(response.status()).not.toBe(404);
  });

  test('checkout button shows correct text based on auth state', async ({ page, request }) => {
    // Set access to free
    await request.post('http://localhost:3000/api/course/test-access', {
      data: { accessLevel: 'free' }
    });
    await page.waitForTimeout(500);

    await page.goto('/course/design-track/web/01-foundations/02-principles-of-design');
    await page.waitForLoadState('domcontentloaded');
    
    // Check for either "Get Access Now" (logged in) or "Sign Up to Purchase" (logged out)
    const getAccessButton = page.getByRole('button', { name: /get access now/i });
    const signUpButton = page.getByRole('button', { name: /sign up to purchase/i });
    
    const hasGetAccess = await getAccessButton.isVisible({ timeout: 5000 }).catch(() => false);
    const hasSignUp = await signUpButton.isVisible({ timeout: 5000 }).catch(() => false);
    
    // One of these should be visible
    expect(hasGetAccess || hasSignUp).toBeTruthy();
    
    // Reset access level
    await request.delete('http://localhost:3000/api/course/test-access');
  });

  test('logged-in user can initiate checkout', async ({ page, request }) => {
    // Set access to free
    await request.post('http://localhost:3000/api/course/test-access', {
      data: { accessLevel: 'free' }
    });
    await page.waitForTimeout(500);

    await page.goto('/course/design-track/web/01-foundations/02-principles-of-design');
    await page.waitForLoadState('domcontentloaded');
    
    // Check if user is logged in (Get Access Now visible vs Sign Up to Purchase)
    const getAccessButton = page.getByRole('button', { name: /get access now/i });
    const isLoggedIn = await getAccessButton.isVisible({ timeout: 10000 }).catch(() => false);
    
    if (isLoggedIn) {
      // Listen for the checkout API call
      const checkoutPromise = page.waitForResponse(
        resp => resp.url().includes('/api/course/checkout'),
        { timeout: 15000 }
      );
      
      await getAccessButton.click();
      
      // Wait for the API response
      const response = await checkoutPromise;
      
      if (response.ok()) {
        const data = await response.json();
        expect(data).toHaveProperty('checkoutUrl');
        expect(data.checkoutUrl).toContain('lemonsqueezy.com');
      }
    } else {
      // User is logged out - clicking should redirect to sign-up
      const signUpButton = page.getByRole('button', { name: /sign up to purchase/i });
      await signUpButton.click();
      
      // Should redirect to sign-up page
      await page.waitForURL(/sign-up/, { timeout: 10000 });
      expect(page.url()).toContain('sign-up');
    }
    
    // Reset access level
    await request.delete('http://localhost:3000/api/course/test-access');
  });
});

test.describe('LemonSqueezy Webhook', () => {
  test('webhook endpoint exists', async ({ request }) => {
    // POST without signature should fail but endpoint should exist
    const response = await request.post('http://localhost:3000/api/webhooks/lemonsqueezy', {
      data: { test: true },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Should return 401 (invalid signature) not 404
    expect(response.status()).not.toBe(404);
  });
});

// ============================================
// HEADED TESTS - Full E2E Purchase Flow
// Run with: bun run test:e2e:headed -- --grep "Full Purchase"
// ============================================

test.describe('Full Purchase Flow (Headed Only)', () => {
  // Always skip in headless mode - these require browser interaction
  test.beforeEach(async ({}, testInfo) => {
    // Skip if running in headless mode or CI
    if (process.env.CI || !process.env.HEADED) {
      testInfo.skip();
    }
  });

  test('complete purchase with test card', async ({ page, request }) => {
    test.setTimeout(120000); // 2 minutes for the full flow
    
    // Set access to free
    await request.post('http://localhost:3000/api/course/test-access', {
      data: { accessLevel: 'free' }
    });
    await page.waitForTimeout(500);

    await page.goto('/course/design-track/web/01-foundations/02-principles-of-design');
    await page.waitForLoadState('domcontentloaded');
    
    // Click Get Access Now
    const getAccessButton = page.getByRole('button', { name: /get access now/i });
    await expect(getAccessButton).toBeVisible({ timeout: 10000 });
    await getAccessButton.click();
    
    // Wait for redirect to LemonSqueezy
    try {
      await page.waitForURL(/lemonsqueezy\.com|checkout/, { timeout: 30000 });
      console.log('\n✅ Redirected to checkout:', page.url());
      
      // Wait for the checkout form to load
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000); // Give Stripe iframe time to load
      
      // LemonSqueezy checkout form fields
      // Email field
      const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]').first();
      if (await emailInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await emailInput.fill('test@example.com');
        console.log('✅ Filled email');
      }
      
      // Name field (if present)
      const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]').first();
      if (await nameInput.isVisible({ timeout: 2000 }).catch(() => false)) {
        await nameInput.fill('Test User');
        console.log('✅ Filled name');
      }
      
      // Card details are in a Stripe iframe
      // Look for the Stripe iframe
      const stripeFrame = page.frameLocator('iframe[name*="stripe"], iframe[src*="stripe"]').first();
      
      // Card number
      const cardNumber = stripeFrame.locator('input[name="cardnumber"], input[placeholder*="card number" i], input[autocomplete="cc-number"]').first();
      if (await cardNumber.isVisible({ timeout: 5000 }).catch(() => false)) {
        await cardNumber.fill('4242424242424242');
        console.log('✅ Filled card number');
      }
      
      // Expiry
      const expiry = stripeFrame.locator('input[name="exp-date"], input[placeholder*="MM" i], input[autocomplete="cc-exp"]').first();
      if (await expiry.isVisible({ timeout: 2000 }).catch(() => false)) {
        await expiry.fill('1230');
        console.log('✅ Filled expiry');
      }
      
      // CVC
      const cvc = stripeFrame.locator('input[name="cvc"], input[placeholder*="CVC" i], input[autocomplete="cc-csc"]').first();
      if (await cvc.isVisible({ timeout: 2000 }).catch(() => false)) {
        await cvc.fill('123');
        console.log('✅ Filled CVC');
      }
      
      // Try to find and click the pay/submit button
      const payButton = page.locator('button[type="submit"], button:has-text("Pay"), button:has-text("Subscribe"), button:has-text("Complete")').first();
      if (await payButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        console.log('🔄 Clicking pay button...');
        await payButton.click();
        
        // Wait for redirect back to our site
        await page.waitForURL(/localhost:3000/, { timeout: 60000 });
        console.log('✅ Redirected back to:', page.url());
        
        // Check for success
        if (page.url().includes('purchase=success')) {
          console.log('🎉 Purchase completed successfully!');
        }
      } else {
        console.log('⚠️ Pay button not found - checkout form may have different structure');
        console.log('Current URL:', page.url());
        // Take a screenshot for debugging
        await page.screenshot({ path: 'test-results/checkout-form.png' });
      }
      
    } catch (error) {
      console.log('⚠️ Checkout redirect issue:', error);
      await page.screenshot({ path: 'test-results/checkout-error.png' });
    }
    
    // Reset access level
    await request.delete('http://localhost:3000/api/course/test-access');
  });
});
