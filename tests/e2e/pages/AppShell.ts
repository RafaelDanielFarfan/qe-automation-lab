import { expect, type Locator, type Page } from '@playwright/test';

export type Section = 'Inicio' | 'Ruta' | 'Laboratorio' | 'Entrevista';

export class AppShell {
  readonly nav: Locator;
  readonly progressPill: Locator;

  constructor(private readonly page: Page) {
    this.nav = page.getByRole('navigation', { name: 'Secciones' });
    this.progressPill = page.locator('#topProgress');
  }

  async open(hash = '') {
    await this.page.goto('/' + (hash ? '#' + hash : ''));
    await expect(this.nav).toBeVisible();
  }

  async goTo(section: Section) {
    const tab = this.nav.getByRole('button', { name: section, exact: true });
    await tab.click();
    await expect(tab).toHaveAttribute('aria-current', 'page');
  }

  section(id: 'home' | 'route' | 'lab' | 'interview') {
    return this.page.locator('#view-' + id);
  }

  async clearStorage() {
    await this.page.evaluate(() => localStorage.clear());
    await this.page.reload();
  }
}
