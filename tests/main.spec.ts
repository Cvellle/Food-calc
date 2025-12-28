import {test, expect} from '@playwright/test';

test('slow and visible test of meals list and navigation', async ({page}) => {
  // Go to main page
  await page.goto('http://localhost:3000');

  // Wait for loading text and then for it to disappear
  const loading = page.locator('text=Loading…');
  if (await loading.isVisible()) {
    await loading.waitFor({state: 'hidden'});
  }

  // Find meal headings, assert there is at least one
  const mealHeaders = page.locator('h3', {hasText: 'Meal name:'});
  const count = await mealHeaders.count();
  expect(count).toBeGreaterThan(0);

  // Pause for 1 second to watch meals rendered
  await page.waitForTimeout(1000);

  // Click the first "See meal" button
  const firstSeeMealBtn = page.locator('button', {hasText: 'See meal'}).first();
  await firstSeeMealBtn.click();

  // Wait for navigation to finish
  await page.waitForLoadState('networkidle');

  // Pause 1 second to watch the meal detail page
  await page.waitForTimeout(1000);

  // Check URL pattern for meal details
  await expect(page).toHaveURL(/\/meals\/\d+/);
});
