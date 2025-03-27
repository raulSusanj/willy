import { test, expect } from '@playwright/test';

test('homepage displays correct message', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('This is the Willy vaccation app')).toBeVisible();
});
