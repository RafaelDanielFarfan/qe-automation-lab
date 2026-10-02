# Page Object + fixture

**Bloque:** playwright · **Nivel:** Framework

Crea LoginPage (locators como propiedades readonly, método login) y una fixture loginPage con test.extend. Reescribe el test de login usándola.

> **Interview prompt:** Build a LoginPage object and expose it as a custom fixture with test.extend; use it in a test.

### Qué debe incluir tu solución

1. Clase LoginPage con locators readonly creados en el constructor.
2. Métodos async goto() y login(email, password).
3. Fixture loginPage creada con test.extend que hace goto antes de entregar el objeto.
4. Un test que usa la fixture y deja el assert en el test, no en el Page Object.

<details><summary>Pista: guía paso a paso</summary>

Los locators se definen en el constructor; las acciones son async; los asserts quedan en el test.

1. Declara los locators como propiedades readonly y créalos en el constructor.
2. Escribe métodos async que agrupen acciones (login).
3. Crea la fixture con base.extend: instancia la página, llama goto() y luego await use(lp).
4. Importa ese test en tus specs y pide { loginPage } como parámetro.

</details>

**Follow-up:** Where do you put assertions: Page Object or test? Defend your choice.

## TypeScript

### Documentación para estudiar

- [`Page Object Models`](https://playwright.dev/docs/pom) — Patrón oficial con ejemplo completo.
- [`Fixtures`](https://playwright.dev/docs/test-fixtures) — test.extend y use().
- [`Classes en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/classes.html) — readonly y parameter properties.

### Plantilla

```ts
import { test as base, expect, Page, Locator } from '@playwright/test';

export class LoginPage {
  // locators

  constructor(private readonly page: Page) {
    // init locators
  }

  async goto() {}

  async login(email: string, password: string) {}
}

type Fixtures = { loginPage: LoginPage };

export const test = base.extend<Fixtures>({
  // loginPage fixture
});

test('user logs in', async ({ loginPage, page }) => {
  // your code
});

```

<details><summary>Solución de referencia</summary>

```ts
export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly error: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.submit = page.getByRole('button', { name: 'Sign in' });
    this.error = page.getByRole('alert');
  }
  async goto() { await this.page.goto('/login'); }
  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await use(lp);
  },
});

test('user logs in', async ({ loginPage, page }) => {
  await loginPage.login('qa@test.com', 'Secret123!');
  await expect(page).toHaveURL(/dashboard/);
});
```

</details>
