import { type Locator, type Page } from '@playwright/test';

export class TutorPanel {
  readonly root: Locator;
  readonly setup: Locator;
  readonly input: Locator;
  readonly send: Locator;
  readonly messages: Locator;
  readonly provider: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByRole('complementary', { name: 'Tutor IA' });
    this.setup = page.locator('#tutorSetup');
    this.input = page.getByRole('textbox', { name: 'Pregunta para el tutor' });
    this.send = this.root.getByRole('button', { name: 'Enviar' });
    this.messages = page.locator('#tutorMsgs .tmsg');
    this.provider = page.locator('#tutorProvider');
  }

  async configureGemini(key = 'AIzaFAKEKEYFORTESTS_1234567890') {
    await this.page.getByRole('textbox', { name: 'API key de Gemini' }).fill(key);
    await this.page.getByRole('button', { name: 'Guardar y activar' }).click();
  }

  async ask(question: string) {
    await this.input.fill(question);
    await this.send.click();
  }
}
