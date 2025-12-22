import { test, expect } from '@playwright/test';
import {
  setTestAccessLevel,
  resetTestAccessLevel,
  verifyUpgradeGate,
  verifyContent,
  FREE_LESSONS,
  DESIGN_WEB_LESSONS,
  ENGINEERING_WEB_LESSONS,
  CONVERGENCE_LESSONS,
} from '../utils/helpers';

test.describe('Access Control - Free Tier', () => {
  test.beforeAll(async ({ request }) => {
    await setTestAccessLevel(request, 'free');
  });

  test.afterAll(async ({ request }) => {
    await resetTestAccessLevel(request);
  });

  test('free users can access introduction lessons', async ({ page }) => {
    for (const lesson of FREE_LESSONS.filter(l => l.startsWith('00-introduction'))) {
      await page.goto(`/course/${lesson}`);
      await page.waitForLoadState('domcontentloaded');
      
      const hasContent = await verifyContent(page);
      expect(hasContent).toBeTruthy();
    }
  });

  test('free users can access first lesson of each track', async ({ page }) => {
    const firstLessons = [
      'design-track/web/00-environment-setup/01-your-new-best-friend-the-terminal',
      'engineering-track/web/01-html-fundamentals/01-what-is-html',
    ];
    
    for (const lesson of firstLessons) {
      await page.goto(`/course/${lesson}`);
      await page.waitForLoadState('domcontentloaded');
      
      const hasContent = await verifyContent(page);
      expect(hasContent).toBeTruthy();
    }
  });

  test('free users see upgrade gate on premium design lessons', async ({ page }) => {
    await page.goto(`/course/${DESIGN_WEB_LESSONS[0]}`);
    await page.waitForLoadState('domcontentloaded');
    
    const hasGate = await verifyUpgradeGate(page);
    expect(hasGate).toBeTruthy();
  });

  test('free users see upgrade gate on premium engineering lessons', async ({ page }) => {
    await page.goto(`/course/${ENGINEERING_WEB_LESSONS[0]}`);
    await page.waitForLoadState('domcontentloaded');
    
    const hasGate = await verifyUpgradeGate(page);
    expect(hasGate).toBeTruthy();
  });

  test('free users see upgrade gate on convergence lessons', async ({ page }) => {
    await page.goto(`/course/${CONVERGENCE_LESSONS[0]}`);
    await page.waitForLoadState('domcontentloaded');
    
    const hasGate = await verifyUpgradeGate(page);
    expect(hasGate).toBeTruthy();
  });
});

test.describe('Access Control - Design Web Only', () => {
  test.beforeAll(async ({ request }) => {
    await setTestAccessLevel(request, 'design_web');
  });

  test.afterAll(async ({ request }) => {
    await resetTestAccessLevel(request);
  });

  test('design_web users can access design web lessons', async ({ page }) => {
    await page.goto(`/course/${DESIGN_WEB_LESSONS[0]}`);
    await page.waitForLoadState('domcontentloaded');
    
    const hasContent = await verifyContent(page);
    const hasGate = await verifyUpgradeGate(page);
    
    // Should have content, not upgrade gate
    expect(hasContent).toBeTruthy();
    expect(hasGate).toBeFalsy();
  });

  test('design_web users see upgrade gate on engineering lessons', async ({ page }) => {
    await page.goto(`/course/${ENGINEERING_WEB_LESSONS[0]}`);
    await page.waitForLoadState('domcontentloaded');
    
    const hasGate = await verifyUpgradeGate(page);
    expect(hasGate).toBeTruthy();
  });

  test('design_web users see upgrade gate on convergence lessons', async ({ page }) => {
    await page.goto(`/course/${CONVERGENCE_LESSONS[0]}`);
    await page.waitForLoadState('domcontentloaded');
    
    const hasGate = await verifyUpgradeGate(page);
    expect(hasGate).toBeTruthy();
  });
});

test.describe('Access Control - Engineering Web Only', () => {
  test.beforeAll(async ({ request }) => {
    await setTestAccessLevel(request, 'engineering_web');
  });

  test.afterAll(async ({ request }) => {
    await resetTestAccessLevel(request);
  });

  test('engineering_web users can access engineering web lessons', async ({ page }) => {
    await page.goto(`/course/${ENGINEERING_WEB_LESSONS[0]}`);
    await page.waitForLoadState('domcontentloaded');
    
    const hasContent = await verifyContent(page);
    const hasGate = await verifyUpgradeGate(page);
    
    expect(hasContent).toBeTruthy();
    expect(hasGate).toBeFalsy();
  });

  test('engineering_web users see upgrade gate on design lessons', async ({ page }) => {
    await page.goto(`/course/${DESIGN_WEB_LESSONS[0]}`);
    await page.waitForLoadState('domcontentloaded');
    
    const hasGate = await verifyUpgradeGate(page);
    expect(hasGate).toBeTruthy();
  });

  test('engineering_web users see upgrade gate on convergence lessons', async ({ page }) => {
    await page.goto(`/course/${CONVERGENCE_LESSONS[0]}`);
    await page.waitForLoadState('domcontentloaded');
    
    const hasGate = await verifyUpgradeGate(page);
    expect(hasGate).toBeTruthy();
  });
});

test.describe('Access Control - Full Access', () => {
  test.beforeAll(async ({ request }) => {
    await setTestAccessLevel(request, 'full');
  });

  test.afterAll(async ({ request }) => {
    await resetTestAccessLevel(request);
  });

  test('full access users can access all design lessons', async ({ page }) => {
    await page.goto(`/course/${DESIGN_WEB_LESSONS[0]}`);
    await page.waitForLoadState('domcontentloaded');
    
    const hasContent = await verifyContent(page);
    const hasGate = await verifyUpgradeGate(page);
    
    expect(hasContent).toBeTruthy();
    expect(hasGate).toBeFalsy();
  });

  test('full access users can access all engineering lessons', async ({ page }) => {
    await page.goto(`/course/${ENGINEERING_WEB_LESSONS[0]}`);
    await page.waitForLoadState('domcontentloaded');
    
    const hasContent = await verifyContent(page);
    const hasGate = await verifyUpgradeGate(page);
    
    expect(hasContent).toBeTruthy();
    expect(hasGate).toBeFalsy();
  });

  test('full access users can access convergence lessons', async ({ page }) => {
    await page.goto(`/course/${CONVERGENCE_LESSONS[0]}`);
    await page.waitForLoadState('domcontentloaded');
    
    const hasContent = await verifyContent(page);
    const hasGate = await verifyUpgradeGate(page);
    
    expect(hasContent).toBeTruthy();
    expect(hasGate).toBeFalsy();
  });
});

test.describe('Access Control API', () => {
  test('can get current test access level', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/course/test-access');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data).toHaveProperty('effectiveLevel');
  });

  test('can set and reset test access level', async ({ request }) => {
    // Set to free
    await setTestAccessLevel(request, 'free');
    let response = await request.get('http://localhost:3000/api/course/test-access');
    let data = await response.json();
    expect(data.override).toBe('free');

    // Reset
    await resetTestAccessLevel(request);
    response = await request.get('http://localhost:3000/api/course/test-access');
    data = await response.json();
    expect(data.override).toBeNull();
  });

  test('rejects invalid access levels', async ({ request }) => {
    const response = await request.post('http://localhost:3000/api/course/test-access', {
      data: { accessLevel: 'invalid_level' }
    });
    expect(response.status()).toBe(400);
  });
});
