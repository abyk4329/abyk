import { test, expect } from '@playwright/test';

// Basic flow adapted to current app – calc opens calculator UI then sales, then simulate payment
// We use the QA overlay with ?qa=1 to collect click logs

test('זרימה: בית → חישוב → תשלום (דמה) → תודה', async ({ page }) => {
  const base = process.env.E2E_BASE_URL || 'http://localhost:3000';
  await page.goto(base + '/?qa=1');

  // Go to calculator button
  const calcBtn = page.getByRole('button', { name: /מחשבון קוד העושר/i });
  await expect(calcBtn).toBeVisible();
  await calcBtn.click();

  // Calculator screen appears – fill date inputs (the app uses 3 inputs: יום/חודש/שנה)
  await expect(page.getByText('מחשבון קוד העושר')).toBeVisible();
  const day = page.getByTestId('day-input');
  const month = page.getByTestId('month-input');
  const year = page.getByTestId('year-input');
  await day.fill('13');
  await month.fill('03');
  await year.fill('1991');

  // Submit calculation
  const submit = page.getByRole('button', { name: /אני רוצה לגלות את הקוד/i });
  await submit.click();

  // Sales page: simulate payment button exists
  const simulate = page.getByRole('button', { name: /סימולציית תשלום \(בדיקה\)/i });
  await expect(simulate).toBeVisible();
  await simulate.click();

  // Thank-you page: verify content and link presence
  await expect(page.getByText(/תודה על הרכישה/i)).toBeVisible();
  const viewSite = page.getByRole('button', { name: /צפייה באתר/i });
  await expect(viewSite).toBeVisible();

  // Click to interpretations
  await viewSite.click();
  await expect(page).toHaveURL(/\/interpretations\?code=/);

  // Back to thank-you
  await page.goBack();
  await expect(page).toHaveURL(/\/thank-you\?code=/);
});
