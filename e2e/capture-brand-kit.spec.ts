import { test, expect } from '@playwright/test';

test('capture brand system assets', async ({ page }) => {
  // Set viewport to a standardized size for consistent screenshots
  await page.setViewportSize({ width: 1280, height: 1600 });
  
  // Navigate to brand page
  await page.goto('/brand');
  
  // Wait for animations to settle
  await page.waitForTimeout(1000);

  // Capture the full page for context
  await page.screenshot({ path: 'public/brand-assets/full-page.png', fullPage: true });

  // Capture Master Logo Section
  const masterLogo = page.locator('section').filter({ hasText: 'The Mark' });
  await masterLogo.screenshot({ path: 'public/brand-assets/01-master-logo.png' });

  // Capture Construction/Anatomy Section (New)
  const anatomy = page.locator('section').filter({ hasText: 'Construction' });
  await anatomy.screenshot({ path: 'public/brand-assets/02-anatomy.png' });

  // Capture The System Section
  const system = page.locator('section').filter({ hasText: 'Track × Platform' });
  await system.screenshot({ path: 'public/brand-assets/03-system.png' });
  
  // Capture Scalability Section
  const scalability = page.locator('section').filter({ hasText: 'Scalability' });
  await scalability.screenshot({ path: 'public/brand-assets/04-scalability.png' });
  
  // Capture Colour Section
  const colour = page.locator('section').filter({ hasText: 'Colour' });
  await colour.screenshot({ path: 'public/brand-assets/05-colour.png' });

  // Theme variation capture
  // Click "Invert Theme"
  await page.getByRole('button', { name: 'Invert Theme' }).click();
  await page.waitForTimeout(500); // Wait for transition
  
  // Capture Dark Mode Anatomy
  await anatomy.screenshot({ path: 'public/brand-assets/02-anatomy-dark.png' });
});

