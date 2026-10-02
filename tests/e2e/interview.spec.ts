import { test, expect } from './support/fixtures';

test.describe('Interview', () => {
  test('filters questions by round and can reset the filter', async ({ interview, page }) => {
    const all = await interview.questions.count();
    await interview.filter.selectOption('playwright');
    const filtered = await interview.questions.count();
    expect(filtered).toBeGreaterThan(0);
    expect(filtered).toBeLessThan(all);
    await expect(interview.question('BrowserContext')).toBeVisible();
    await page.getByRole('button', { name: 'Ver todas' }).click();
    await expect(interview.questions).toHaveCount(all);
    await expect(interview.question('Tell me about yourself')).toBeVisible();
  });

  test('self-rating a question counts as practiced', async ({ interview, page }) => {
    const q = interview.question('Explain the test pyramid.');
    await q.locator('summary').click();
    await q.getByRole('button', { name: 'Ver puntos clave' }).click();
    await expect(q.getByRole('listitem').first()).toBeVisible();
    await q.getByRole('button', { name: 'Puntuar 4' }).click();
    await expect(page.locator('#qList details.q').filter({ hasText: 'Explain the test pyramid.' }).locator('summary .pill')).toHaveText('4/5');
  });

  test('timed drill walks through questions', async ({ interview }) => {
    await interview.startMock.click();
    await expect(interview.mockMessages.first()).toContainText('Q1/');
    await interview.answerBox.fill('My answer in English.');
    await interview.mockNext.click();
    await expect(interview.mockMessages.last()).toContainText('Key points');
  });
});
