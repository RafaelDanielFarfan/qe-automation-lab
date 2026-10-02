# Popups, iframes y descargas

**Bloque:** playwright · **Nivel:** Core

Tres tests: (1) un link abre una pestaña nueva con /terms; (2) rellenar un campo dentro de un iframe #payment; (3) descargar un CSV y validar el nombre del archivo.

> **Interview prompt:** Handle a new tab, an iframe and a file download in Playwright.

### Qué debe incluir tu solución

1. Popup: empieza a esperar waitForEvent("popup") antes del clic en "Terms" y valida la URL /terms.
2. Iframe: page.frameLocator("#payment") y llenar "Card number".
3. Descarga: waitForEvent("download") antes del clic en "Export CSV" y validar que el nombre termina en .csv.

<details><summary>Pista: guía paso a paso</summary>

Promise.all / waitForEvent('popup') antes del click; page.frameLocator('#payment'); waitForEvent('download').

1. Popup: const p = page.waitForEvent("popup"); luego el clic; luego await p.
2. Iframe: page.frameLocator("#payment") devuelve un locator dentro del frame.
3. Descarga: igual que el popup, pero con waitForEvent("download") y download.suggestedFilename().

</details>

**Follow-up:** Why must you start waiting for the popup before clicking?

## TypeScript

### Documentación para estudiar

- [`Pages y popups`](https://playwright.dev/docs/pages) — Múltiples pestañas y eventos popup.
- [`Frames`](https://playwright.dev/docs/frames) — frameLocator.
- [`Downloads`](https://playwright.dev/docs/downloads) — waitForEvent("download").

### Plantilla

```ts
import { test, expect } from '@playwright/test';

test('terms opens in a new tab', async ({ page }) => {});

test('fills card number inside iframe', async ({ page }) => {});

test('downloads report as CSV', async ({ page }) => {});

```

<details><summary>Solución de referencia</summary>

```ts
test('terms opens in a new tab', async ({ page }) => {
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Terms' }).click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(/\/terms/);
});

test('fills card number inside iframe', async ({ page }) => {
  const frame = page.frameLocator('#payment');
  await frame.getByLabel('Card number').fill('4242424242424242');
});

test('downloads report as CSV', async ({ page }) => {
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export CSV' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.csv$/);
});
```

</details>
