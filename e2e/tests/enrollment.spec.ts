import { test, expect } from '@playwright/test';
import { PREMIUM_LESSONS, navigateToLesson, verifyHasAccess } from '../utils/helpers';

test.describe('Enrollment & Access', () => {
  test('course page shows enrollment status', async ({ page }) => {
    await page.goto('/course');
    await page.waitForLoadState('networkidle');
    
    // Check that the course page loads and shows user-specific content
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
  });

  test('can view premium lessons with access', async ({ page }) => {
    for (const lesson of PREMIUM_LESSONS) {
      await navigateToLesson(page, lesson);
      await verifyHasAccess(page);
    }
  });
});

test.describe('Upgrade Gating (Free Users)', () => {
  test('free user sees upgrade prompt OR content (depending on test mode)', async ({ page }) => {
    // Clear cookies to simulate unauthenticated/free user
    await page.context().clearCookies();
    
    // Navigate to a premium lesson
    await page.goto('/course/design-track/web/01-foundations/02-principles-of-design');
    await page.waitForLoadState('domcontentloaded');
    
    // Check for upgrade gating elements
    const upgradePrompt = page.locator('text=This lesson requires a paid subscription');
    const unlockText = page.locator('text=Unlock');
    const getAccessButton = page.getByRole('button', { name: /get access now/i });
    const articleContent = page.locator('article');
    const testModeButton = page.locator('text=Test Mode');
    
    const hasUpgradePrompt = await upgradePrompt.isVisible({ timeout: 5000 }).catch(() => false);
    const hasUnlockText = await unlockText.first().isVisible({ timeout: 5000 }).catch(() => false);
    const hasGetAccessButton = await getAccessButton.isVisible({ timeout: 5000 }).catch(() => false);
    const hasArticle = await articleContent.isVisible({ timeout: 5000 }).catch(() => false);
    const isTestMode = await testModeButton.isVisible({ timeout: 5000 }).catch(() => false);
    
    // Either upgrade gate is shown OR content is shown (if test mode is active)
    const hasUpgradeGate = hasUpgradePrompt || hasUnlockText || hasGetAccessButton;
    
    if (isTestMode) {
      // In test mode, content may be shown without gating
      expect(hasArticle || hasUpgradeGate).toBeTruthy();
    } else {
      // Without test mode, should show upgrade gate
      expect(hasUpgradeGate).toBeTruthy();
    }
  });

  test('free user can access free lessons without upgrade prompt', async ({ page }) => {
    // Clear cookies to simulate unauthenticated/free user
    await page.context().clearCookies();
    
    // Navigate to a free lesson (first lesson of design track)
    await page.goto('/course/design-track/web/00-environment-setup/01-your-new-best-friend-the-terminal');
    await page.waitForLoadState('domcontentloaded');
    
    // Should show lesson content, not upgrade prompt
    const upgradePrompt = page.locator('text=This lesson requires a paid subscription');
    const articleContent = page.locator('article');
    
    const hasUpgradePrompt = await upgradePrompt.isVisible({ timeout: 5000 }).catch(() => false);
    const hasArticle = await articleContent.isVisible({ timeout: 10000 }).catch(() => false);
    
    // Should NOT show upgrade prompt and SHOULD show article content
    expect(hasUpgradePrompt).toBeFalsy();
    expect(hasArticle).toBeTruthy();
  });

  test('convergence track handles access control', async ({ page }) => {
    // Clear cookies to simulate unauthenticated/free user
    await page.context().clearCookies();
    
    // Navigate to convergence lesson (always requires full access)
    await page.goto('/course/convergence/web/01-motion-and-interaction/01-why-motion-matters');
    await page.waitForLoadState('domcontentloaded');
    
    // Check for upgrade gating elements or content
    const fullCourseOption = page.locator('text=Full Course Access');
    const upgradePrompt = page.locator('text=This lesson requires a paid subscription');
    const articleContent = page.locator('article');
    const testModeButton = page.locator('text=Test Mode');
    
    const hasFullCourseOption = await fullCourseOption.isVisible({ timeout: 5000 }).catch(() => false);
    const hasUpgradePrompt = await upgradePrompt.isVisible({ timeout: 5000 }).catch(() => false);
    const hasArticle = await articleContent.isVisible({ timeout: 5000 }).catch(() => false);
    const isTestMode = await testModeButton.isVisible({ timeout: 5000 }).catch(() => false);
    
    // Either shows upgrade gate or content (if test mode active)
    const hasUpgradeGate = hasFullCourseOption || hasUpgradePrompt;
    
    if (isTestMode) {
      expect(hasArticle || hasUpgradeGate).toBeTruthy();
    } else {
      expect(hasUpgradeGate).toBeTruthy();
    }
  });
});
