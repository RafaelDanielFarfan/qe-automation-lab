# playwright.config.ts para CI

**Bloque:** playwright · **Nivel:** Arquitectura

Escribe un config con: baseURL desde env, retries 2 solo en CI, workers 4 en CI, trace 'on-first-retry', screenshot solo en fallo, reporters html + junit, y proyectos setup → chromium y firefox con storageState.

> **Interview prompt:** Write a playwright.config.ts suitable for CI: env-based baseURL, CI retries, traces, reporters and setup project dependencies.

### Qué debe incluir tu solución

1. baseURL desde process.env.BASE_URL con un valor por defecto.
2. retries: 2 y workers: 4 solo cuando process.env.CI existe.
3. trace "on-first-retry", screenshot "only-on-failure".
4. reporter html + junit.
5. Proyectos: setup → chromium y firefox, ambos con storageState.

<details><summary>Pista: guía paso a paso</summary>

defineConfig({...}); process.env.CI; projects con dependencies: ['setup'].

1. Exporta defineConfig({...}).
2. Usa process.env.CI para decidir retries y workers.
3. En use: baseURL, trace, screenshot y video.
4. En projects: un proyecto setup y dos navegadores con dependencies: ["setup"] y storageState.

</details>

**Follow-up:** Why trace 'on-first-retry' instead of 'on'?

## TypeScript

### Documentación para estudiar

- [`Test configuration`](https://playwright.dev/docs/test-configuration) — Opciones globales y de use.
- [`Projects`](https://playwright.dev/docs/test-projects) — Navegadores y dependencias.
- [`Authentication`](https://playwright.dev/docs/auth) — storageState con proyecto setup.

### Plantilla

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // your config
});

```

<details><summary>Solución de referencia</summary>

```ts
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [['html', { open: 'never' }], ['junit', { outputFile: 'results/junit.xml' }]],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    { name: 'chromium', dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' } },
    { name: 'firefox', dependencies: ['setup'],
      use: { ...devices['Desktop Firefox'], storageState: '.auth/user.json' } },
  ],
});
```

</details>
