import { test, expect } from '@playwright/test';
import { navigateToLesson } from '../utils/helpers';

test.describe('Progress Tracking', () => {
  const testLesson = '00-introduction/01-welcome';

  test('lesson page loads with content', async ({ page }) => {
    await navigateToLesson(page, testLesson);
    
    // Verify lesson content is visible
    await expect(page.locator('article')).toBeVisible({ timeout: 10000 });
  });

  test('course page loads successfully', async ({ page }) => {
    await page.goto('/course');
    
    // Course page should show main content
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
  });

  test('lesson has navigation elements', async ({ page }) => {
    await navigateToLesson(page, testLesson);
    
    // Check for navigation (prev/next or breadcrumbs)
    const hasNavigation = await page.locator('nav').or(page.locator('a[href*="/course/"]')).first().isVisible({ timeout: 5000 }).catch(() => false);
    expect(hasNavigation).toBeTruthy();
  });
});
