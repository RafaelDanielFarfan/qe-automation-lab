# Mock de red: lista vacía y error 500

**Bloque:** playwright · **Nivel:** Avanzado

Con page.route, mockea GET /api/products: un test con lista vacía (muestra 'No products yet') y otro con status 500 (muestra 'Something went wrong' y botón Retry).

> **Interview prompt:** Use page.route to mock the products API: empty list state and a 500 error state.

### Qué debe incluir tu solución

1. page.route("**/api/products", …) registrado ANTES de page.goto.
2. Test 1: route.fulfill con status 200 y json [] → se ve "No products yet".
3. Test 2: status 500 → se ve "Something went wrong" y el botón "Retry" habilitado.

<details><summary>Pista: guía paso a paso</summary>

Registra el route ANTES de page.goto. route.fulfill({ status, json }).

1. Antes de page.goto, registra page.route con el patrón de la URL de la API.
2. Dentro del handler usa route.fulfill({ status, json }).
3. Navega a la página y valida el estado vacío o de error con expect.

</details>

**Follow-up:** When would you mock the backend and when would you hit the real API?

## TypeScript

### Documentación para estudiar

- [`Mock APIs`](https://playwright.dev/docs/mock) — page.route y route.fulfill.
- [`Network`](https://playwright.dev/docs/network) — Interceptar, modificar y abortar requests.

### Plantilla

```ts
import { test, expect } from '@playwright/test';

test('shows empty state', async ({ page }) => {
  // your code
});

test('shows error state on 500', async ({ page }) => {
  // your code
});

```

<details><summary>Solución de referencia</summary>

```ts
test('shows empty state', async ({ page }) => {
  await page.route('**/api/products', r => r.fulfill({ status: 200, json: [] }));
  await page.goto('/products');
  await expect(page.getByText('No products yet')).toBeVisible();
});

test('shows error state on 500', async ({ page }) => {
  await page.route('**/api/products', r => r.fulfill({ status: 500, json: { error: 'boom' } }));
  await page.goto('/products');
  await expect(page.getByText('Something went wrong')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry' })).toBeEnabled();
});
```

</details>
