import {test, expect} from '@playwright/test';

test('slow and visible test of meals list and navigation', async ({page}) => {
  await page.goto('http://localhost:3000');

  const loading = page.locator('text=Loading…');
  if (await loading.isVisible()) {
    await loading.waitFor({state: 'hidden'});
  }

  const mealHeaders = page.locator('h3', {hasText: 'Meal name:'});
  const count = await mealHeaders.count();
  expect(count).toBeGreaterThan(0);

  await page.waitForTimeout(1000);

  const firstSeeMealBtn = page.locator('button', {hasText: 'See meal'}).first();
  await firstSeeMealBtn.click();

  // Wait for navigation to finish
  await page.waitForLoadState('networkidle');

  await page.waitForTimeout(1000);

  await expect(page).toHaveURL(/\/meals\/\d+/);
});
