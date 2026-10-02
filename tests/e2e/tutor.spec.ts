import { test, expect } from './support/fixtures';
import { TutorPanel } from './pages/TutorPanel';

const GEMINI = /generativelanguage\.googleapis\.com\/v1beta\/models\/.+:streamGenerateContent/;
const sse = (...chunks: string[]) =>
  chunks.map(t => 'data: ' + JSON.stringify({ candidates: [{ content: { parts: [{ text: t }] } }] }) + '\r\n\r\n').join('');

test.describe('Tutor IA (Gemini, bring your own key)', () => {
  test('asks for a free API key when not configured', async ({ lab, page }) => {
    const tutor = new TutorPanel(page);
    await expect(tutor.setup).toBeVisible();
    await expect(tutor.setup.getByRole('link', { name: /AI Studio/ })).toHaveAttribute('href', 'https://aistudio.google.com/apikey');
    await expect(tutor.input).toBeDisabled();
    await expect(tutor.setup.getByRole('link', { name: 'Copiar contexto y abrir Gemini' })).toHaveAttribute('href', /gemini\.google\.com/);
  });

  test('sends exercise context and code, and streams the answer', async ({ lab, page }) => {
    let captured: { headers: Record<string, string>; body: any } | null = null;
    await page.route(GEMINI, async route => {
      captured = { headers: route.request().headers(), body: route.request().postDataJSON() };
      await route.fulfill({ status: 200, contentType: 'text/event-stream', body: sse('Usa **`Map.merge()`** para contar.\n', '```java\nfreq.merge(c, 1, Integer::sum);\n```') });
    });
    await lab.openExercise('Frecuencia de caracteres');
    await lab.selectLanguage('Java');
    await lab.write('// mi intento\nMap<Character, Integer> freq = new HashMap<>();');
    const tutor = new TutorPanel(page);
    await tutor.configureGemini();
    await expect(tutor.provider).toContainText('Gemini');
    await tutor.ask('¿Qué método uso?');

    const answer = tutor.messages.last();
    await expect(answer).toContainText('para contar');
    await expect(answer.locator('strong code').first()).toHaveText('Map.merge()');
    await expect(answer.locator('pre')).toContainText('freq.merge(c, 1, Integer::sum);');

    expect(captured).not.toBeNull();
    expect(captured!.headers['x-goog-api-key']).toBe('AIzaFAKEKEYFORTESTS_1234567890');
    const lastTurn = captured!.body.contents.at(-1).parts[0].text as string;
    expect(lastTurn).toContain('Frecuencia de caracteres');
    expect(lastTurn).toContain('// mi intento');
    expect(lastTurn).toContain('¿Qué método uso?');
    expect(captured!.body.system_instruction.parts[0].text).toContain('NO entregues la solución completa');
  });

  test('quick prompts send a question with one click', async ({ lab, page }) => {
    await page.route(GEMINI, r => r.fulfill({ status: 200, contentType: 'text/event-stream', body: sse('Piensa en un mapa.') }));
    const tutor = new TutorPanel(page);
    await tutor.configureGemini();
    await tutor.root.getByRole('button', { name: 'Dame una pista sin la solución' }).click();
    await expect(tutor.messages.first()).toHaveText('Dame una pista sin la solución');
    await expect(tutor.messages.last()).toHaveText('Piensa en un mapa.');
  });

  test('shows a friendly message when the free quota is exhausted', async ({ lab, page }) => {
    await page.route(GEMINI, r => r.fulfill({ status: 429, contentType: 'application/json', body: JSON.stringify({ error: { message: 'Quota exceeded' } }) }));
    const tutor = new TutorPanel(page);
    await tutor.configureGemini();
    await tutor.ask('Hola');
    await expect(tutor.messages.last()).toContainText('límite gratuito');
  });

  test('the API key is never included in exported progress', async ({ lab, page }) => {
    const tutor = new TutorPanel(page);
    await tutor.configureGemini('AIzaSECRET_SHOULD_NOT_LEAK_123456');
    const exported = await page.evaluate(() => JSON.stringify((window as any).__qaLab.state()));
    expect(exported).not.toContain('AIzaSECRET');
  });

  test('can be hidden and shown again', async ({ lab, page }) => {
    const tutor = new TutorPanel(page);
    await page.getByRole('button', { name: 'Ocultar tutor' }).click();
    await expect(tutor.root).toBeHidden();
    await page.reload();
    await expect(tutor.root).toBeHidden();
    await page.getByRole('button', { name: '💬 Tutor IA' }).click();
    await expect(tutor.root).toBeVisible();
  });
});
