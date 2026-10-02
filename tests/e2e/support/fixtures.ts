import { test as base, expect, type Page } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { AppShell } from '../pages/AppShell';
import { LabPage } from '../pages/LabPage';
import { RoutePage } from '../pages/RoutePage';
import { InterviewPage } from '../pages/InterviewPage';

const NM = join(process.cwd(), 'node_modules');

/** Serves CDN scripts (TypeScript, Skulpt, Pyodide) from node_modules so tests are hermetic and fast. */
async function mockCdn(page: Page) {
  const serve = (file: string, type = 'application/javascript') =>
    existsSync(file) ? { status: 200, body: readFileSync(file), contentType: type } : null;

  await page.context().route(/cdnjs\.cloudflare\.com\/ajax\/libs\/codemirror\//, async route => {
    const rel = new URL(route.request().url()).pathname.replace(/^.*\/codemirror\/[\d.]+\//, '');
    const file = rel === 'codemirror.min.js' ? join(NM, 'codemirror/lib/codemirror.js') : join(NM, 'codemirror', rel.replace(/\.min\.js$/, '.js'));
    const res = serve(file);
    return res ? route.fulfill(res) : route.abort();
  });
  await page.context().route(/cdn\.jsdelivr\.net|unpkg\.com/, async route => {
    const url = new URL(route.request().url());
    let file: string | null = null;
    let m: RegExpMatchArray | null;
    if (/typescript@[\d.]+\/lib\/typescript(\.min)?\.js$/.test(url.pathname)) file = join(NM, 'typescript/lib/typescript.js');
    else if ((m = url.pathname.match(/skulpt@[\d.]+\/dist\/(.+)$/))) file = join(NM, 'skulpt/dist', m[1]);
    else if ((m = url.pathname.match(/pyodide\/v[\d.]+\/full\/(.+)$/))) file = join(NM, 'pyodide', m[1]);
    if (!file) return route.continue();
    const type = file.endsWith('.wasm') ? 'application/wasm' : file.endsWith('.json') ? 'application/json' : file.endsWith('.zip') ? 'application/zip' : 'application/javascript';
    const res = serve(file, type);
    return res ? route.fulfill(res) : route.abort();
  });
  // fonts are irrelevant for behaviour
  await page.context().route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  // CheerpJ (real JVM in the browser) is a heavy hosted WASM runtime; block it so Java falls
  // back to the manual-instructions path and tests stay hermetic and fast.
  await page.context().route(/cjrtnc\.leaningtech\.com/, r => r.abort());
}

type Fixtures = {
  app: AppShell;
  lab: LabPage;
  route: RoutePage;
  interview: InterviewPage;
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    await mockCdn(page);
    await use(page);
  },
  app: async ({ page }, use) => {
    const app = new AppShell(page);
    await app.open();
    await use(app);
  },
  lab: async ({ app, page }, use) => {
    await app.goTo('Laboratorio');
    await use(new LabPage(page));
  },
  route: async ({ app, page }, use) => {
    await app.goTo('Ruta');
    await use(new RoutePage(page));
  },
  interview: async ({ app, page }, use) => {
    await app.goTo('Entrevista');
    await use(new InterviewPage(page));
  },
});

export { expect };
