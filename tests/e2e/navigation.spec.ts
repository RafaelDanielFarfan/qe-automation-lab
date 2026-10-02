import { test, expect } from './support/fixtures';

test.describe('Navigation', () => {
  test('shows the home dashboard by default @mobile', async ({ app, page }) => {
    await expect(app.section('home')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('entrevista');
    await expect(page.locator('#reqList li')).toHaveCount(3);
  });

  test('switches between sections from the top navigation', async ({ app }) => {
    for (const [label, id] of [['Ruta', 'route'], ['Laboratorio', 'lab'], ['Entrevista', 'interview'], ['Inicio', 'home']] as const) {
      await app.goTo(label);
      await expect(app.section(id)).toBeVisible();
    }
  });

  test('theme switch toggles light/dark and persists', async ({ app, page }) => {
    const html = page.locator('html');
    await page.getByRole('button', { name: 'Oscuro' }).click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'dark');
    await expect(page.getByRole('button', { name: 'Oscuro' })).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: 'Claro' }).click();
    await expect(html).toHaveAttribute('data-theme', 'light');
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe('rgb(246, 248, 252)');
  });

  test('supports deep links with a hash', async ({ page }) => {
    await page.goto('/#interview');
    await expect(page.locator('#view-interview')).toBeVisible();
    await expect(page.locator('#view-home')).toBeHidden();
  });

  test('has no horizontal scroll on phones @mobile', async ({ app, page }) => {
    for (const label of ['Inicio', 'Ruta', 'Laboratorio', 'Entrevista'] as const) {
      await app.goTo(label);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect.soft(overflow, `horizontal overflow in ${label}`).toBeLessThanOrEqual(0);
    }
  });
});
