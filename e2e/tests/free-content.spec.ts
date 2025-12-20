import { test, expect } from '@playwright/test';
import { FREE_LESSONS, navigateToLesson, verifyHasAccess } from '../utils/helpers';

test.describe('Free Content Access', () => {
  test('can access introduction lessons', async ({ page }) => {
    const introLessons = FREE_LESSONS.filter(l => l.startsWith('00-introduction'));
    
    for (const lesson of introLessons) {
      await navigateToLesson(page, lesson);
      await verifyHasAccess(page);
      await expect(page.locator('article')).toBeVisible();
    }
  });

  test('can access first lesson of each track', async ({ page }) => {
    const firstLessons = FREE_LESSONS.filter(l => !l.startsWith('00-introduction'));
    
    for (const lesson of firstLessons) {
      await navigateToLesson(page, lesson);
      await verifyHasAccess(page);
    }
  });

  test('track index pages are accessible', async ({ page }) => {
    for (const track of ['design-track', 'engineering-track', 'convergence']) {
      await page.goto(`/course/${track}`);
      await expect(page.locator('article')).toBeVisible();
    }
  });
});
