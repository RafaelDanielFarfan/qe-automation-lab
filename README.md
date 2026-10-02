# QA Automation Lab

An intensive, self-hosted study platform for **Senior Test Automation** interviews — Playwright, TypeScript/JavaScript, Python + Pytest, and Java + Selenium — with code runners that work directly in the browser and an end-to-end test suite written with Playwright.

> **Bilingual:** the whole site (UI, study path, exercises, hints, docs links and the AI tutor's answers) switches between Spanish and English with the **ES / EN** toggle in the header.

> 🇪🇸 Plataforma de estudio para preparar entrevistas de Senior Test Automation. Ruta en 9 fases, laboratorio con compiladores en el navegador, banco de preguntas en inglés y simulacro de entrevista. El progreso se guarda en el navegador (localStorage).

**Live demo:** `https://<your-user>.github.io/qa-automation-lab/`

---

## What's inside

| Section | What it does |
|---|---|
| **Inicio** | Progress dashboard, coverage against the job requirements, export / import / reset of progress. |
| **Ruta** | 9-phase study plan (Coding → Playwright → Selenium/Java → Python/Pytest → Framework architecture → QA fundamentals → CI/CD → Senior scenarios → Mock interview). 200+ checkable topics and lesson cards with code. |
| **Laboratorio** | 29 exercises. Pick a language, write code, run the tests. |
| **Entrevista** | 45 interview questions in English with key points and self-rating, plus a timed mock-interview drill. |

### In-browser runners

| Language | Engine | How it runs |
|---|---|---|
| JavaScript | Native, sandboxed in a **Web Worker** | Automatic tests, console capture, 5 s timeout kills infinite loops. |
| TypeScript | **TypeScript compiler** (loaded on demand) | Transpiled with syntax diagnostics, then executed in the same worker. Playwright exercises get a syntax check. |
| Python | **Pyodide** (real CPython in WebAssembly, in a worker) | Automatic tests via a generated harness; falls back to Skulpt. |
| Java | — | Template + reference solution; run locally with `java Main.java` (Java 11+). When opened inside Claude, Java is compiled and reviewed by Claude. |

The editor is **CodeMirror 5** (loaded from cdnjs) with syntax highlighting for Java, Python, TypeScript and JavaScript, bracket matching, auto-closing, comment toggling (`Ctrl+/`) and context-aware autocomplete with short descriptions (`Ctrl+Space`, or automatically after `.`). If the CDN is unavailable the page falls back to a plain textarea.

### AI tutor (side panel)

Next to the editor there is a chat tutor that sees the open exercise, the student's code and the last run result, and is instructed to guide with hints instead of handing out full solutions.

- **On GitHub Pages / locally:** bring your own **free Gemini API key** (Google AI Studio). The key is stored only in the browser's `localStorage`, is sent directly to Google over HTTPS, and is never part of exported progress. There is no backend, so the site owner pays nothing. Without a key, a button copies the full context and opens Gemini in a new tab.
- **Inside Claude:** the tutor uses the viewer's own Claude account.

Progress, code drafts per exercise/language, and interview answers are stored in `localStorage` and flushed on `pagehide`, so nothing is lost on reload.

---

## Run it locally

```bash
npm install
npm start            # http://localhost:4173
```

No build step: it's plain HTML, CSS and JavaScript.

## Tests

The app is tested with **Playwright + TypeScript**, using the same patterns the study plan teaches:

- **Page Object Model** — `tests/e2e/pages/` (`AppShell`, `LabPage`, `RoutePage`, `InterviewPage`)
- **Custom fixtures** — `tests/e2e/support/fixtures.ts` injects ready-to-use page objects (`{ lab }`, `{ route }`, `{ interview }`)
- **Hermetic network** — CDN requests for TypeScript, Pyodide and Skulpt are intercepted with `context.route()` and served from `node_modules`, so tests are fast and don't depend on third-party uptime
- **Projects** — desktop Chromium plus a mobile project (Pixel 7) filtered by the `@mobile` tag
- **Web-first assertions**, `expect.soft` for layout checks, `test.slow()` for WASM start-up
- **CI** — GitHub Actions runs type-checking and the suite on every push/PR, uploads the HTML report and traces as artifacts, and deploys to GitHub Pages only when the tests pass

```bash
npm test             # headless
npm run test:ui      # Playwright UI mode
npm run report       # open the last HTML report
```

Covered scenarios include: navigation and deep links, localStorage persistence across reloads, two-step reset, JSON import, JS/TS/Python runners (pass, fail, mutation detection, async code, syntax errors, exceptions, infinite-loop timeout), question filtering, self-rating, the timed drill, the editor (highlighting, autocomplete) and the AI tutor (Gemini API mocked with `page.route`: context sent, streaming answer, quota errors, key never exported).

---

## Project structure

```
index.html                 # app shell
css/styles.css             # design tokens, light + dark themes
js/
  data/plan.js             # phases, topics, lessons, added gaps
  data/exercises.js        # exercises, starters, tests, reference solutions
  data/questions.js        # interview questions and rounds
  data/hints.js            # editor autocomplete words per language
  data/en.js               # English translations of all content
  app.js                   # UI, persistence, runners (Web Worker, TS, Pyodide)
exercises/                 # every exercise exported as Markdown (generated)
scripts/
  export-exercises.mjs     # regenerates exercises/ from js/data/exercises.js
  build-single.mjs         # bundles everything into one self-contained HTML file
tests/e2e/                 # Playwright specs, page objects and fixtures
.github/workflows/ci.yml   # tests + GitHub Pages deploy
```

## Adding content

- **Exercise:** add an object to `EX` in `js/data/exercises.js` with `starter`, `tests` (`[expression, expected]`) and `solution` per language, then run `npm run export:exercises`.
- **Question:** add `{ r: 'playwright', q: '...', k: ['key point', ...] }` to `QUESTIONS`.
- **Topic or lesson:** edit `PHASES` in `js/data/plan.js`. Topics prefixed with `+` are shown as "añadido".

## Deploy

Push to `main` with GitHub Pages enabled (**Settings → Pages → Source: GitHub Actions**). The `deploy` job publishes the site after the tests pass.

## License

MIT © Maria Pereira
