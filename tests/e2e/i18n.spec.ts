import { test, expect } from './support/fixtures';
import { TutorPanel } from './pages/TutorPanel';

test.describe('Language switch (ES / EN)', () => {
  test('switches the whole interface to English and remembers it', async ({ app, page }) => {
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    const nav = page.getByRole('navigation', { name: 'Sections' });
    await expect(nav.getByRole('button', { name: 'Lab', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('From concept to interview, writing code every day.');
    await expect(page.locator('#topProgress')).toContainText('complete');
    await page.reload();
    await expect(page.getByRole('navigation', { name: 'Sections' })).toBeVisible();
    await page.getByRole('button', { name: 'ES', exact: true }).click();
    await expect(page.getByRole('navigation', { name: 'Secciones' }).getByRole('button', { name: 'Laboratorio' })).toBeVisible();
  });

  test('translates the study path, exercises and docs links', async ({ app, page }) => {
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await page.getByRole('navigation', { name: 'Sections' }).getByRole('button', { name: 'Path' }).click();
    await page.locator('#phase-2 summary').click();
    await expect(page.locator('#phase-2')).toContainText('Master the main tool of the role');
    await expect(page.locator('#phase-2').getByRole('checkbox', { name: 'Dynamic elements' })).toBeVisible();

    await page.getByRole('navigation', { name: 'Sections' }).getByRole('button', { name: 'Lab' }).click();
    await page.locator('#exList').getByRole('button', { name: /Character frequency/ }).click();
    const card = page.locator('#exCard');
    await expect(card.locator('h2')).toHaveText('Character frequency');
    await expect(card).not.toContainText('null');
    await expect(card.getByText('Rules and edge cases')).toBeVisible();
    await expect(card.locator('.example').first()).toContainText('"l" appears 3 times');
    await page.locator('#langBar').getByRole('button', { name: 'JavaScript', exact: true }).click();
    await expect(page.locator('#docsBox h4')).toHaveText('Docs to study · JavaScript');
    await expect(page.locator('#docsBox a').first()).toHaveAttribute('href', /developer\.mozilla\.org\/en-US\//);
    await expect(page.locator('#runBtn')).toContainText('Run tests');
  });

  test('the tutor answers in English when the site is in English', async ({ app, page }) => {
    let system = '';
    await page.route(/generativelanguage\.googleapis\.com/, async r => {
      system = r.request().postDataJSON().system_instruction.parts[0].text;
      await r.fulfill({ status: 200, contentType: 'text/event-stream', body: 'data: ' + JSON.stringify({ candidates: [{ content: { parts: [{ text: 'Use a map.' }] } }] }) + '\n\n' });
    });
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await page.getByRole('navigation', { name: 'Sections' }).getByRole('button', { name: 'Lab' }).click();
    const tutor = page.getByRole('complementary', { name: 'AI Tutor' });
    await expect(tutor.getByText('Turn on the free tutor with Gemini')).toBeVisible();
    await page.getByRole('textbox', { name: 'Gemini API key' }).fill('AIzaFAKEKEYFORTESTS_1234567890');
    await page.getByRole('button', { name: 'Save and activate' }).click();
    await tutor.getByRole('button', { name: 'Give me a hint without the solution' }).click();
    await expect(page.locator('#tutorMsgs .tmsg').last()).toHaveText('Use a map.');
    expect(system).toContain('Always answer in English');
  });
});
