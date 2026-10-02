# Test de login con locators accesibles

**Bloque:** playwright · **Nivel:** Core

Escribe dos tests: login exitoso (redirige a /dashboard y muestra 'Welcome') y login con password incorrecto (muestra alerta de error). Usa getByRole/getByLabel y web-first assertions.

> **Interview prompt:** Write a happy-path and a negative login test using role/label locators and web-first assertions.

### Qué debe incluir tu solución

1. Test 1: llena Email y Password con getByLabel y hace clic en "Sign in" con getByRole.
2. Verifica que la URL termina en /dashboard con toHaveURL.
3. Verifica que se ve un heading con "Welcome".
4. Test 2: password incorrecto → un elemento con role="alert" con el mensaje de error.
5. Sin waitForTimeout ni sleeps.

<details><summary>Pista: guía paso a paso</summary>

expect(page).toHaveURL(/dashboard/), expect(locator).toBeVisible(). Nada de waitForTimeout.

1. Usa page.getByLabel("Email") y page.getByLabel("Password") con fill().
2. Haz clic con page.getByRole("button", { name: "Sign in" }).
3. Valida la navegación con await expect(page).toHaveURL(/dashboard/).
4. Para el error, valida page.getByRole("alert") con toContainText().

</details>

**Follow-up:** Why are web-first assertions better than expect(await locator.isVisible()).toBe(true)?

## TypeScript

### Documentación para estudiar

- [`Locators`](https://playwright.dev/docs/locators) — getByRole, getByLabel, getByText…
- [`Assertions`](https://playwright.dev/docs/test-assertions) — toHaveURL, toBeVisible, toContainText.
- [`Auto-waiting`](https://playwright.dev/docs/actionability) — Por qué no hacen falta sleeps.

### Plantilla

```ts
import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('valid credentials go to dashboard', async ({ page }) => {
    // your code
  });

  test('wrong password shows an error', async ({ page }) => {
    // your code
  });
});

```

<details><summary>Solución de referencia</summary>

```ts
test('valid credentials go to dashboard', async ({ page }) => {
  await page.getByLabel('Email').fill('qa@test.com');
  await page.getByLabel('Password').fill(process.env.QA_PASSWORD!);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
});

test('wrong password shows an error', async ({ page }) => {
  await page.getByLabel('Email').fill('qa@test.com');
  await page.getByLabel('Password').fill('wrong');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('alert')).toContainText(/invalid credentials/i);
  await expect(page).toHaveURL(/\/login/);
});
```

</details>
