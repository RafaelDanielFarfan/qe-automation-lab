import { expect, type Locator, type Page } from '@playwright/test';

export type Lang = 'Java' | 'Python' | 'TypeScript' | 'JavaScript';

export class LabPage {
  readonly editor: Locator;
  readonly editorInput: Locator;
  readonly runButton: Locator;
  readonly resultPill: Locator;
  readonly testRows: Locator;
  readonly consoleOut: Locator;
  readonly exerciseTitle: Locator;
  readonly resetButton: Locator;

  constructor(private readonly page: Page) {
    this.editor = page.locator('.CodeMirror');
    this.editorInput = page.locator('.CodeMirror textarea');
    this.runButton = page.locator('#runBtn');
    this.resultPill = page.locator('#repPill');
    this.testRows = page.locator('#testRows .trow');
    this.consoleOut = page.locator('#consoleOut');
    this.exerciseTitle = page.locator('#exCard h2');
    this.resetButton = page.getByRole('button', { name: 'Restaurar plantilla' });
  }

  exercise(title: string) {
    return this.page.locator('#exList').getByRole('button', { name: new RegExp(title) });
  }

  async openExercise(title: string) {
    await this.exercise(title).click();
    await expect(this.exerciseTitle).toHaveText(title);
  }

  async selectLanguage(lang: Lang) {
    const btn = this.page.locator('#langBar').getByRole('button', { name: lang, exact: true });
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
  }

  /** Replaces the whole editor content (CodeMirror API exposed for tests). */
  async write(code: string) {
    await this.page.evaluate(c => (window as any).__qaLab.setCode(c), code);
  }

  value(): Promise<string> {
    return this.page.evaluate(() => (window as any).__qaLab.getCode());
  }

  /** Types at the end of the document, like a real user. */
  async typeAtEnd(text: string) {
    await this.editor.click();
    await this.page.keyboard.press('Control+End');
    await this.page.keyboard.type(text, { delay: 20 });
  }

  async run() {
    await this.runButton.click();
  }

  async expectAllPassed(total: number, timeout = 30_000) {
    await expect(this.resultPill).toHaveText(`${total}/${total} tests`, { timeout });
  }
}
