# Crear datos por API y validar en UI

**Bloque:** playwright · **Nivel:** API

Usa el fixture request para crear un pedido con POST /api/orders (valida 201 y el id), luego abre /orders/{id} en la UI y verifica el estado 'Pending'. Limpia con DELETE al final.

> **Interview prompt:** Create test data through the API with APIRequestContext, verify it in the UI and clean up afterwards.

### Qué debe incluir tu solución

1. POST /api/orders con request.post y body { sku, qty }.
2. Assert: status 201 y que el body trae un id.
3. Abrir /orders/{id} y verificar el texto "Pending".
4. DELETE del pedido aunque el test falle (try/finally o una fixture).

<details><summary>Pista: guía paso a paso</summary>

const res = await request.post(url, { data }); expect(res.status()).toBe(201); const body = await res.json();

1. Usa la fixture request: await request.post(url, { data }).
2. Valida res.status() y lee el body con await res.json().
3. Navega a la página del pedido y valida el estado con getByTestId.
4. Envuelve la validación en try/finally y borra el pedido en el finally.

</details>

**Follow-up:** Why is seeding data via API better than via UI? How do you guarantee cleanup if the test fails?

## TypeScript

### Documentación para estudiar

- [`API testing`](https://playwright.dev/docs/api-testing) — APIRequestContext, request.post/get/delete.
- [`APIResponse`](https://playwright.dev/docs/api/class-apiresponse) — status(), json(), ok().

### Plantilla

```ts
import { test, expect } from '@playwright/test';

test('order created via API appears as Pending', async ({ page, request }) => {
  // 1. create via API
  // 2. verify in UI
  // 3. cleanup
});

```

<details><summary>Solución de referencia</summary>

```ts
test('order created via API appears as Pending', async ({ page, request }) => {
  const res = await request.post('/api/orders', { data: { sku: 'SKU-1', qty: 2 } });
  expect(res.status()).toBe(201);
  const { id } = await res.json();
  try {
    await page.goto('/orders/' + id);
    await expect(page.getByTestId('order-status')).toHaveText('Pending');
  } finally {
    await request.delete('/api/orders/' + id);
  }
});
// Mejor aún: una fixture 'order' que crea en setup y borra en teardown.
```

</details>
