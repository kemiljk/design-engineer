import { Page, expect, APIRequestContext } from '@playwright/test';

export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
}

export async function navigateToLesson(page: Page, lessonPath: string) {
  await page.goto(`/course/${lessonPath}`);
  await waitForPageLoad(page);
}

export async function markLessonComplete(page: Page) {
  const completeBtn = page.getByRole('button', { name: /mark as complete/i });
  await completeBtn.click();
  await expect(page.getByRole('button', { name: /completed/i })).toBeVisible();
}

export async function verifyHasAccess(page: Page) {
  await expect(page.locator('text=Premium Content')).not.toBeVisible();
  await expect(page.locator('text=requires a paid subscription')).not.toBeVisible();
}

export async function verifyNoAccess(page: Page) {
  await expect(page.locator('text=Premium Content')).toBeVisible();
}

export async function verifyUpgradeGate(page: Page) {
  const upgradePrompt = page.locator('text=This lesson requires a paid subscription');
  const unlockText = page.locator('text=Unlock');
  const getAccessButton = page.getByRole('button', { name: /get access now/i });
  
  const hasUpgradePrompt = await upgradePrompt.isVisible({ timeout: 5000 }).catch(() => false);
  const hasUnlockText = await unlockText.first().isVisible({ timeout: 2000 }).catch(() => false);
  const hasGetAccessButton = await getAccessButton.isVisible({ timeout: 2000 }).catch(() => false);
  
  return hasUpgradePrompt || hasUnlockText || hasGetAccessButton;
}

export async function verifyContent(page: Page) {
  const articleContent = page.locator('article');
  return articleContent.isVisible({ timeout: 5000 }).catch(() => false);
}

export async function getProgressStats(page: Page) {
  const response = await page.request.get('/api/course/progress');
  return response.json();
}

// ============================================
// Test Access Level Control
// ============================================
export type TestAccessLevel = 
  | 'free' 
  | 'design_web' 
  | 'design_ios' 
  | 'design_android'
  | 'engineering_web' 
  | 'engineering_ios' 
  | 'engineering_android'
  | 'full';

export async function setTestAccessLevel(
  request: APIRequestContext, 
  level: TestAccessLevel | null
): Promise<void> {
  const response = await request.post('http://localhost:3000/api/course/test-access', {
    data: { accessLevel: level }
  });
  if (!response.ok()) {
    throw new Error(`Failed to set test access level: ${response.status()}`);
  }
}

export async function resetTestAccessLevel(request: APIRequestContext): Promise<void> {
  await request.delete('http://localhost:3000/api/course/test-access');
}

export async function getTestAccessLevel(request: APIRequestContext): Promise<{
  override: string | null;
  effectiveLevel: string;
}> {
  const response = await request.get('http://localhost:3000/api/course/test-access');
  return response.json();
}

// ============================================
// Lesson Path Constants
// ============================================
export const FREE_LESSONS = [
  '00-introduction/01-welcome',
  '00-introduction/02-what-is-design-engineering',
  '00-introduction/03-choosing-your-path',
  '00-introduction/04-how-this-course-works',
  'design-track/web/01-foundations/01-what-is-visual-design',
  'engineering-track/web/01-html-fundamentals/01-what-is-html',
];

export const PREMIUM_LESSONS = [
  'design-track/web/01-foundations/02-principles-of-design',
  'engineering-track/web/01-html-fundamentals/02-document-structure',
  'convergence/web/01-motion-and-interaction/01-why-motion-matters',
];

// Track-specific premium lessons for access testing
export const DESIGN_WEB_LESSONS = [
  'design-track/web/01-foundations/02-principles-of-design',
  'design-track/web/01-foundations/03-gestalt-principles',
];

export const ENGINEERING_WEB_LESSONS = [
  'engineering-track/web/01-html-fundamentals/02-document-structure',
  'engineering-track/web/02-css-fundamentals/01-what-is-css',
];

export const CONVERGENCE_LESSONS = [
  'convergence/web/01-motion-and-interaction/01-why-motion-matters',
  'convergence/web/01-motion-and-interaction/02-principles-of-ui-animation',
];

export const WEB_DESIGN_LESSONS = [
  'design-track/web/01-foundations/01-what-is-visual-design',
  'design-track/web/01-foundations/02-principles-of-design',
];

export async function completeLessonViaAPI(page: Page, lessonPath: string) {
  await page.request.post('/api/course/progress', {
    data: { lessonPath, status: 'completed', timeSpent: 60 }
  });
}
