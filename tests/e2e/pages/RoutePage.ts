import { type Locator, type Page } from '@playwright/test';

export class RoutePage {
  constructor(private readonly page: Page) {}

  phase(n: number): Locator {
    return this.page.locator('#phase-' + n);
  }

  async openPhase(n: number) {
    await this.phase(n).locator('summary').click();
  }

  topic(n: number, label: string): Locator {
    return this.phase(n).getByRole('checkbox', { name: label, exact: true });
  }
}
