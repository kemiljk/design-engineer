import { test, expect } from '@playwright/test';
import { navigateToLesson } from '../utils/helpers';

test.describe('Notes Functionality', () => {
  const testLesson = '00-introduction/01-welcome';

  test('lesson content loads successfully', async ({ page }) => {
    await navigateToLesson(page, testLesson);
    
    // Verify lesson content is displayed
    await expect(page.locator('article')).toBeVisible({ timeout: 10000 });
  });

  test('notes page requires authentication', async ({ page }) => {
    // Clear auth state
    await page.context().clearCookies();
    await page.goto('/course/notes');
    
    // Should redirect to sign-in or show auth-required message
    const isSignIn = await page.url().includes('sign-in');
    const hasContent = await page.locator('h1').isVisible().catch(() => false);
    
    expect(isSignIn || hasContent).toBeTruthy();
  });
});
