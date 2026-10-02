import { test, expect } from './support/fixtures';

test.describe('Progress persistence (localStorage)', () => {
  test('a checked topic survives a reload', async ({ route, page }) => {
    await route.openPhase(2);
    const topic = route.topic(2, 'Auto-waiting');
    await topic.check();
    await page.reload();
    await page.getByRole('navigation', { name: 'Secciones' }).getByRole('button', { name: 'Ruta' }).click();
    await route.openPhase(2);
    await expect(route.topic(2, 'Auto-waiting')).toBeChecked();
  });

  test('code drafts are saved per exercise and language', async ({ lab, page }) => {
    await lab.openExercise('Invertir un string');
    await lab.selectLanguage('JavaScript');
    await lab.write('// my draft\nfunction reverseString(s) { return s; }');
    await page.reload();
    await expect(lab.exerciseTitle).toHaveText('Invertir un string');
    await expect.poll(() => lab.value()).toContain('my draft');
    await lab.resetButton.click();
    await expect.poll(() => lab.value()).not.toContain('my draft');
  });

  test('reset requires a second confirmation click', async ({ route, app, page }) => {
    await route.openPhase(1);
    await route.topic(1, 'Arrays').check();
    await app.goTo('Inicio');
    const reset = page.getByRole('button', { name: 'Reiniciar progreso' });
    await reset.click();
    await expect(page.getByRole('button', { name: 'Confirmar: borrar todo' })).toBeVisible();
    await page.getByRole('button', { name: 'Confirmar: borrar todo' }).click();
    await expect(page.locator('#stTopics')).toHaveText(/^0\//);
  });

  test('progress can be imported from JSON', async ({ app, page }) => {
    await page.getByRole('button', { name: 'Importar' }).click();
    await page.getByRole('textbox', { name: 'Progreso a importar' }).fill(JSON.stringify({ ex: { evens: 1, reverse: 1 } }));
    await page.getByRole('button', { name: 'Aplicar' }).click();
    await expect(page.locator('#stEx')).toHaveText(/^2\//);
    await expect(app.progressPill).toHaveText('0.7% completado');
  });
});
