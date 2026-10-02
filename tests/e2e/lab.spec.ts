import { test, expect } from './support/fixtures';

const EVENS_JS = 'function filterEven(nums) {\n  return nums.filter(n => n % 2 === 0);\n}';
const EVENS_TS = 'function filterEven(nums: number[]): number[] {\n  return nums.filter(n => n % 2 === 0);\n}';
const EVENS_PY = 'def filter_even(nums):\n    return [n for n in nums if n % 2 == 0]';

test.describe('Lab – exercise statement', () => {
  test('shows examples with input and expected output', async ({ lab, page }) => {
    await lab.openExercise('Frecuencia de caracteres');
    const card = page.locator('#exCard');
    await expect(card.locator('.example')).toHaveCount(3);
    await expect(card.locator('.example').first()).toContainText('hello world');
    await expect(card.locator('.example').first().locator('pre.out')).toContainText('l: 3');
    await expect(card.getByText('Reglas y casos borde')).toBeVisible();
  });

  test('signature and test list follow the selected language', async ({ lab, page }) => {
    await lab.openExercise('Two Sum');
    await lab.selectLanguage('Python');
    await expect(page.locator('#sigBox pre')).toHaveText('def two_sum(nums, target)');
    await lab.selectLanguage('TypeScript');
    await expect(page.locator('#sigBox pre')).toContainText('function twoSum(nums: number[], target: number): number[]');
    await expect(page.locator('#testsSummary')).toHaveText('Tests automáticos en TypeScript (4)');
  });

  test('documentation links and step-by-step hint per language', async ({ lab, page }) => {
    await lab.openExercise('Frecuencia de caracteres');
    await lab.selectLanguage('Java');
    const docs = page.locator('#docsBox');
    await expect(docs.getByRole('heading')).toHaveText('Documentación para estudiar · Java');
    const link = docs.getByRole('link', { name: /Map\.merge/ });
    await expect(link).toHaveAttribute('href', /docs\.oracle\.com/);
    await expect(link).toHaveAttribute('target', '_blank');
    await lab.selectLanguage('Python');
    await expect(docs.getByRole('link', { name: /Counter/ })).toHaveAttribute('href', /docs\.python\.org/);
    await page.getByText('Pista: guía paso a paso').click();
    await expect(page.locator('#hintDetails ol li')).toHaveCount(5);
  });
});

test.describe('Lab – editor', () => {
  test('highlights syntax per language', async ({ lab, page }) => {
    await lab.openExercise('Filtrar pares sin mutar');
    await lab.selectLanguage('Java');
    await expect(page.locator('.CodeMirror .cm-keyword').first()).toBeVisible();
    await expect(page.locator('.CodeMirror .cm-keyword', { hasText: 'public' }).first()).toBeVisible();
    await lab.selectLanguage('Python');
    await expect(page.locator('.CodeMirror .cm-keyword', { hasText: 'def' }).first()).toBeVisible();
  });

  test('suggests API methods after a dot and inserts them', async ({ lab, page }) => {
    await lab.openExercise('Frecuencia de caracteres');
    await lab.selectLanguage('Java');
    await lab.typeAtEnd('\nfreq.mer');
    const hints = page.locator('.CodeMirror-hints');
    await expect(hints).toBeVisible();
    await expect(hints.locator('li').first()).toContainText('merge(key, value, fn)');
    await page.keyboard.press('Enter');
    await expect.poll(() => lab.value()).toContain('freq.merge()');
  });

  test('Ctrl+Space opens suggestions for keywords', async ({ lab, page }) => {
    await lab.openExercise('Filtrar pares sin mutar');
    await lab.selectLanguage('JavaScript');
    await lab.typeAtEnd('\ncon');
    await page.keyboard.press('Escape');
    await page.keyboard.press('Control+Space');
    await expect(page.locator('.CodeMirror-hints')).toContainText('console.log()');
  });
});

test.describe('Lab – JavaScript runner', () => {
  test('the starter template fails the tests', async ({ lab }) => {
    await lab.openExercise('Filtrar pares sin mutar');
    await lab.selectLanguage('JavaScript');
    await lab.run();
    await expect(lab.resultPill).toHaveText("1/4 tests"); // only the "does not mutate" check passes
    await expect(lab.testRows.first()).toHaveClass(/fail/);
  });

  test('a correct solution passes and marks the exercise as solved', async ({ lab, page }) => {
    await lab.openExercise('Filtrar pares sin mutar');
    await lab.selectLanguage('JavaScript');
    await lab.write(EVENS_JS);
    await lab.run();
    await lab.expectAllPassed(4);
    await expect(page.locator('#exCard')).toContainText('Resuelto');
    await expect(lab.exercise('Filtrar pares sin mutar').locator('.st')).toHaveClass(/done/);
  });

  test('detects mutation of the input array', async ({ lab }) => {
    await lab.openExercise('Filtrar pares sin mutar');
    await lab.selectLanguage('JavaScript');
    await lab.write('function filterEven(nums) {\n  for (let i = nums.length - 1; i >= 0; i--) if (nums[i] % 2) nums.splice(i, 1);\n  return nums;\n}');
    await lab.run();
    await expect(lab.resultPill).toHaveText('3/4 tests');
  });

  test('captures console output', async ({ lab }) => {
    await lab.openExercise('Invertir un string');
    await lab.selectLanguage('JavaScript');
    await lab.write("function reverseString(s) { return [...s].reverse().join(''); }\nconsole.log('hello from the worker');");
    await lab.run();
    await expect(lab.consoleOut).toContainText('hello from the worker');
  });

  test('async exercises are awaited', async ({ lab }) => {
    await lab.openExercise('Retry asíncrono');
    await lab.selectLanguage('JavaScript');
    await lab.write('async function retry(fn, attempts = 3) {\n  let last;\n  for (let i = 0; i < attempts; i++) {\n    try { return await fn(); } catch (e) { last = e; }\n  }\n  throw last;\n}');
    await lab.run();
    await lab.expectAllPassed(3);
  });

  test('an infinite loop is stopped by the timeout', async ({ lab }) => {
    test.slow();
    await lab.openExercise('FizzBuzz');
    await lab.selectLanguage('JavaScript');
    await lab.write('function fizzBuzz(n) { while (true) {} }');
    await lab.run();
    await expect(lab.consoleOut).toContainText('Timeout', { timeout: 10_000 });
    await expect(lab.resultPill).toHaveText('Error');
  });

  test('Ctrl+Enter runs the tests', async ({ lab, page }) => {
    await lab.openExercise('Filtrar pares sin mutar');
    await lab.selectLanguage('JavaScript');
    await lab.write(EVENS_JS);
    await lab.editorInput.press('Control+Enter');
    await lab.expectAllPassed(4);
  });
});

test.describe('Lab – TypeScript runner', () => {
  test('transpiles and runs typed code', async ({ lab }) => {
    await lab.openExercise('Filtrar pares sin mutar');
    await lab.selectLanguage('TypeScript');
    await lab.write(EVENS_TS);
    await lab.run();
    await lab.expectAllPassed(4);
  });

  test('reports syntax errors with line numbers', async ({ lab }) => {
    await lab.openExercise('Filtrar pares sin mutar');
    await lab.selectLanguage('TypeScript');
    await lab.write('function filterEven(nums: number[]): number[] {\n  return nums.filter(n => n % 2 === 0;\n}');
    await lab.run();
    await expect(lab.resultPill).toContainText('error(es) de sintaxis');
    await expect(lab.consoleOut).toContainText('main.ts:2');
  });

  test('Playwright exercises get a syntax check', async ({ lab }) => {
    await lab.openExercise('Test de login con locators accesibles');
    await expect(lab.runButton).toContainText('Verificar sintaxis');
    await lab.run();
    await expect(lab.resultPill).toHaveText('Sintaxis OK');
  });
});

test.describe('Lab – Python runner', () => {
  test('runs Python tests with Pyodide', async ({ lab }) => {
    test.slow();
    await lab.openExercise('Filtrar pares sin mutar');
    await lab.selectLanguage('Python');
    await lab.write(EVENS_PY);
    await lab.run();
    await lab.expectAllPassed(3, 60_000);
  });

  test('shows Python exceptions in the console', async ({ lab }) => {
    test.slow();
    await lab.openExercise('Filtrar pares sin mutar');
    await lab.selectLanguage('Python');
    await lab.write('def filter_even(nums):\n    return nums[99]');
    await lab.run();
    await expect(lab.testRows.first()).toContainText('IndexError', { timeout: 60_000 });
  });
});

test.describe('Lab – Java without Claude', () => {
  test('explains how to run Java locally', async ({ lab }) => {
    await lab.openExercise('Filtrar pares sin mutar');
    await lab.selectLanguage('Java');
    await lab.run();
    await expect(lab.consoleOut).toContainText('java Main.java');
  });
});
