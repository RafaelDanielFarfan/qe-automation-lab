import { type Locator, type Page } from '@playwright/test';

export class InterviewPage {
  readonly filter: Locator;
  readonly questions: Locator;
  readonly startMock: Locator;
  readonly mockMessages: Locator;
  readonly answerBox: Locator;
  readonly mockNext: Locator;

  constructor(private readonly page: Page) {
    this.filter = page.getByRole('combobox', { name: 'Filtrar preguntas' });
    this.questions = page.locator('#qList details.q');
    this.startMock = page.locator('#chatStart');
    this.mockMessages = page.locator('#msgs .msg');
    this.answerBox = page.locator('#chatIn');
    this.mockNext = page.locator('#chatSend');
  }

  question(text: string | RegExp): Locator {
    return this.questions.filter({ hasText: text });
  }
}
