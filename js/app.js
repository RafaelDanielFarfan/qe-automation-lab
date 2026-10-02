// ================= APP =================
(function () {
'use strict';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const h = (tag, attrs = {}, ...kids) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  return el;
};

// ---------- language (ES / EN) ----------
const UI_KEY = 'qa-lab-lang';
let UI = (() => { try { const v = localStorage.getItem(UI_KEY); if (v === 'en' || v === 'es') return v; } catch (e) { /* ignore */ } return 'es'; })();
const tr = (es, en) => (UI === 'en' ? en : es);
const LANG_WORD = () => (UI === 'en' ? 'English' : 'Spanish');
const enUrl = u => (UI === 'en' ? u.replace('developer.mozilla.org/es/', 'developer.mozilla.org/en-US/').replace('docs.python.org/es/3/', 'docs.python.org/3/').replace('#acceso_a_caracteres', '#character_access') : u);
const roundLabel = r => (UI === 'en' ? (EN.rounds[r.k] || r.label) : r.label);
function phaseView(p) {
  if (UI !== 'en') return p;
  const e = EN.phases[p.n];
  return Object.assign({}, p, { title: e.title, prio: e.prio, hours: e.hours, goal: e.goal,
    groups: p.groups.map((g, i) => ({ name: e.groups[i][0], topics: e.groups[i][1] })),
    lessons: p.lessons.map((l, i) => Object.assign({}, l, e.lessons[i], { code: e.lessons[i].code || l.code })) });
}
function exView(x) {
  if (UI !== 'en') return x;
  const e = EN.ex[x.id] || {};
  const examples = (x.examples || []).map((ex, i) => ({ in: e.io?.[i]?.[0] ?? ex.in, out: e.io?.[i]?.[1] ?? ex.out, why: e.why?.[i] ?? '' }));
  let guide = x.guide;
  const g = GUIDES[x.id];
  if (g) {
    const map = (lang, src) => (src || []).map((t, i) => [e.tools?.[lang]?.[i]?.[0] ?? t[0], enUrl(t[1]), e.tools?.[lang]?.[i]?.[1] ?? t[2]]);
    const js = map('js', g.js), own = map('ts', g.ts);
    guide = { steps: e.steps || g.steps, java: map('java', g.java), python: map('python', g.python), js,
      ts: x.review ? own : [...js, ...own, ...TS_EXTRA.map((t, i) => [EN.tsExtra[i][0], t[1], EN.tsExtra[i][1]])] };
  }
  return Object.assign({}, x, { title: e.title || x.title, es: e.desc || x.es, hint: e.hint || x.hint, level: EN.levels[x.level] || x.level,
    examples: x.examples ? examples : undefined, rules: e.rules || x.rules, deliver: e.deliver || x.deliver, returns: e.returns || x.returns, guide });
}

// ---------- environment ----------
const IN_CLAUDE = typeof window.claude === 'object' && window.claude !== null;
let sample = null;
const CDN = {
  ts: ['https://cdn.jsdelivr.net/npm/typescript@5.6.3/lib/typescript.min.js', 'https://cdn.jsdelivr.net/npm/typescript@5.6.3/lib/typescript.js', 'https://unpkg.com/typescript@5.6.3/lib/typescript.js'],
  skulpt: [['https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js', 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js'],
           ['https://unpkg.com/skulpt@1.2.0/dist/skulpt.min.js', 'https://unpkg.com/skulpt@1.2.0/dist/skulpt-stdlib.js']],
  pyodide: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
  cheerpj: 'https://cjrtnc.leaningtech.com/4.3/loader.js'
};

// ---------- persistence (localStorage, per browser) ----------
const KEY = 'qa-automation-lab.v1';
const DEFAULT = { view: 'home', topics: {}, ex: {}, q: {}, qa: {}, code: {}, exId: 'evens', lang: 'java', filter: 'all', qFilter: 'all', rounds: ['intro', 'coding', 'playwright', 'selenium', 'framework', 'senior'] };
let state = load();
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return Object.assign(structuredClone(DEFAULT), JSON.parse(raw));
  } catch (e) { /* storage unavailable */ }
  return structuredClone(DEFAULT);
}
let saveTimer = null;
function save(now) {
  clearTimeout(saveTimer);
  const write = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } };
  if (now) write(); else saveTimer = setTimeout(write, 250);
}
addEventListener('pagehide', () => save(true));
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') save(true); });

// ---------- derived data ----------
const TOPICS = [];
PHASES.forEach(p => p.groups.forEach((g, gi) => g.topics.forEach((t, ti) => TOPICS.push({ id: `t${p.n}.${gi}.${ti}`, phase: p.n, label: t.replace(/^\+/, ''), added: t.startsWith('+') }))));
const TAG_LABEL = { coding: 'Coding', playwright: 'Playwright', selenium: 'Selenium + Java', python: 'Python + Pytest' };
const LANGS = [
  { k: 'java', label: 'Java' }, { k: 'python', label: 'Python' }, { k: 'ts', label: 'TypeScript' }, { k: 'js', label: 'JavaScript' }
];
const langsOf = ex => ex.only ? ex.only : LANGS.map(l => l.k).filter(k => ex[k] || (k === 'js' && ex.ts && !ex.review));
const PHASE_ROUND = { coding: 'coding', playwright: 'playwright', selenium: 'selenium', python: 'python', framework: 'framework', fundamentals: 'qa', cicd: 'cicd', senior: 'senior', mock: 'all' };

// ---------- navigation ----------
function show(view) {
  state.view = view; save();
  $$('.view').forEach(v => { v.hidden = v.id !== 'view-' + view; });
  $$('nav.tabs button').forEach(b => { if (b.dataset.view === view) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  if (view === 'lab') syncEditorHeight();
  if (typeof renderTutor === 'function' && $('#tutorShow')) { try { $('#tutorShow').hidden = view !== 'lab' || !$('.lab').classList.contains('tutor-off'); } catch (e) { /* boot */ } }
  try { history.replaceState(null, '', '#' + view); } catch (e) { /* sandboxed */ }
  window.scrollTo({ top: 0 });
}
$$('nav.tabs button').forEach(b => b.addEventListener('click', () => show(b.dataset.view)));
document.addEventListener('click', e => { const g = e.target.closest('[data-go]'); if (g) show(g.dataset.go); });

// ---------- progress ----------
function counts() {
  const tDone = TOPICS.filter(t => state.topics[t.id]).length;
  const eDone = EX.filter(x => state.ex[x.id]).length;
  const qDone = QUESTIONS.filter((_, i) => state.q[i]).length;
  return { tDone, eDone, qDone };
}
function renderProgress() {
  const c = counts();
  const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
  $('#stTopics').textContent = `${c.tDone}/${TOPICS.length}`;
  $('#stEx').textContent = `${c.eDone}/${EX.length}`;
  $('#stQ').textContent = `${c.qDone}/${QUESTIONS.length}`;
  $('#barTopics').style.width = pct(c.tDone, TOPICS.length) + '%';
  $('#barEx').style.width = pct(c.eDone, EX.length) + '%';
  $('#barQ').style.width = pct(c.qDone, QUESTIONS.length) + '%';
  const total = TOPICS.length + EX.length + QUESTIONS.length;
  const done = c.tDone + c.eDone + c.qDone;
  const exact = total ? done / total * 100 : 0;
  const shown = exact > 0 && exact < 10 ? exact.toFixed(1).replace(/\.0$/, '') : String(Math.round(exact));
  $('#topProgress').textContent = shown + tr('% completado', '% complete');
  $('#topProgress').title = tr(`${done} de ${total} elementos: ${c.tDone} temas, ${c.eDone} ejercicios, ${c.qDone} preguntas`, `${done} of ${total} items: ${c.tDone} topics, ${c.eDone} exercises, ${c.qDone} questions`);
  // requirement coverage
  const rl = $('#reqList'); rl.replaceChildren();
  for (const r of REQS) {
    const ts = TOPICS.filter(t => r.phases.includes(t.phase));
    const tags = PHASES.filter(p => r.phases.includes(p.n)).map(p => p.tag);
    const xs = EX.filter(x => tags.includes(x.tag));
    const done = ts.filter(t => state.topics[t.id]).length + xs.filter(x => state.ex[x.id]).length;
    const p = pct(done, ts.length + xs.length);
    rl.append(h('li', {},
      h('div', { class: 'req-row' },
        h('div', { class: 'label' }, h('span', { class: 'req-icon', text: r.k.slice(0, 2).toUpperCase() }), h('span', { text: tr(r.label, EN.reqs[REQS.indexOf(r)]) })),
        h('span', { class: 'pill ' + (p >= 80 ? 'pass' : p >= 30 ? 'warn' : ''), text: p + '%' })),
      h('div', { class: 'bar' }, h('i', { style: `width:${p}%` }))));
  }
  // phase meta
  for (const p of PHASES) {
    const el = $(`#phase-meta-${p.n}`); if (!el) continue;
    const ts = TOPICS.filter(t => t.phase === p.n);
    el.textContent = `${ts.filter(t => state.topics[t.id]).length}/${ts.length}`;
  }
}

// ---------- home ----------
function renderHome() {
  $('#lede').textContent = tr('Ruta intensiva en 9 fases. Cada tema sigue el mismo ciclo: concepto, ejemplo, ejercicio con compilador en el navegador, pregunta de entrevista y corrección. JavaScript, TypeScript y Python se ejecutan aquí mismo con tests automáticos. ', 'Intensive 9-phase path. Every topic follows the same cycle: concept, example, exercise with an in-browser compiler, interview question and correction. JavaScript, TypeScript and Python run right here with automated tests. ')
    + (sample ? tr('Java se compila y evalúa con Claude, que además revisa tu código como entrevistador.', 'Java is compiled and evaluated by Claude, which also reviews your code as an interviewer.') : tr('Java trae plantilla y solución de referencia para ejecutar con java Main.java.', 'Java comes with a template and a reference solution to run with java Main.java.'));
  const gl = $('#gapList'); gl.replaceChildren();
  GAPS.forEach((g, i) => gl.append(h('div', { class: 'gap' }, h('h3', { text: tr(g.t, EN.gaps[i][0]) }), h('p', { text: tr(g.d, EN.gaps[i][1]) }))));
  renderProgressTools();
}
function renderProgressTools() {
  const box = $('#progressTools'); box.replaceChildren();
  const msg = h('p', { class: 'note', id: 'ptMsg' });
  const area = h('textarea', { id: 'importArea', class: 'import', placeholder: tr('Pega aquí el JSON exportado…', 'Paste the exported JSON here…'), hidden: true, 'aria-label': tr('Progreso a importar', 'Progress to import') });
  const applyBtn = h('button', { class: 'btn', hidden: true, text: tr('Aplicar', 'Apply'), onclick: () => {
    try { state = Object.assign(structuredClone(DEFAULT), JSON.parse(area.value)); save(true); renderAll(); msg.textContent = tr('Progreso importado.', 'Progress imported.'); }
    catch (e) { msg.textContent = tr('El texto no es un JSON válido. Copia el contenido completo del archivo exportado.', 'The text is not valid JSON. Copy the full content of the exported file.'); }
  } });
  let armed = false;
  const resetBtn = h('button', { class: 'btn ghost', text: tr('Reiniciar progreso', 'Reset progress'), onclick: () => {
    if (!armed) { armed = true; resetBtn.textContent = tr('Confirmar: borrar todo', 'Confirm: delete everything'); setTimeout(() => { armed = false; resetBtn.textContent = tr('Reiniciar progreso', 'Reset progress'); }, 4000); return; }
    state = structuredClone(DEFAULT); save(true); renderAll(); msg.textContent = tr('Progreso reiniciado.', 'Progress reset.');
  } });
  box.append(
    h('div', { class: 'pt-row' },
      h('span', { class: 'note', text: tr('Tu progreso y tu código se guardan automáticamente en este navegador.', 'Your progress and code are saved automatically in this browser.') }),
      h('button', { class: 'btn', text: tr('Exportar progreso', 'Export progress'), onclick: exportProgress }),
      h('button', { class: 'btn', text: tr('Importar', 'Import'), onclick: () => { area.hidden = !area.hidden; applyBtn.hidden = area.hidden; } }),
      resetBtn),
    area, applyBtn, msg);
}
async function exportProgress() {
  const json = JSON.stringify(state, null, 2);
  const msg = $('#ptMsg');
  let copied = false;
  try { await navigator.clipboard.writeText(json); copied = true; } catch (e) { /* fallback below */ }
  if (!IN_CLAUDE) {
    try {
      const a = h('a', { href: URL.createObjectURL(new Blob([json], { type: 'application/json' })), download: 'qa-lab-progress.json' });
      document.body.append(a); a.click(); a.remove();
      msg.textContent = tr('Descargado qa-lab-progress.json', 'Downloaded qa-lab-progress.json') + (copied ? tr(' y copiado al portapapeles.', ' and copied to the clipboard.') : '.');
      return;
    } catch (e) { /* ignore */ }
  }
  msg.textContent = copied ? tr('Progreso copiado al portapapeles. Guárdalo en un archivo para importarlo en otro navegador.', 'Progress copied to the clipboard. Save it in a file to import it in another browser.') : tr('No se pudo copiar automáticamente.', 'Could not copy automatically.');
}

// ---------- route ----------
function renderRoute() {
  const list = $('#phaseList'); list.replaceChildren();
  for (const p of PHASES) {
    const P = phaseView(p);
    const body = h('div', { class: 'body' });
    body.append(h('p', { text: P.goal }));
    const topicsWrap = h('div', { class: 'topics' });
    P.groups.forEach((g, gi) => {
      const grp = h('div', { class: 'topic-group' }, h('h4', { text: g.name }));
      g.topics.forEach((t, ti) => {
        const id = `t${p.n}.${gi}.${ti}`;
        const cb = h('input', { type: 'checkbox', id: 'cb-' + id });
        cb.checked = !!state.topics[id];
        cb.addEventListener('change', () => { if (cb.checked) state.topics[id] = 1; else delete state.topics[id]; save(); renderProgress(); });
        const lab = h('label', { class: 'topic', for: 'cb-' + id }, cb, h('span', {}, t.replace(/^\+/, ''), t.startsWith('+') ? h('span', { class: 'new', text: tr('añadido', 'added') }) : null));
        grp.append(lab);
      });
      topicsWrap.append(grp);
    });
    body.append(topicsWrap);
    if (P.lessons?.length) {
      const ls = h('div', { class: 'lessons' });
      for (const l of P.lessons) ls.append(h('article', { class: 'lesson' }, h('h3', { text: l.t }), h('p', { text: l.p }), l.code ? h('pre', {}, h('code', { text: l.code })) : null, l.tip ? h('p', { class: 'tip', text: '→ ' + l.tip }) : null));
      body.append(ls);
    }
    const acts = h('div', { class: 'phase-actions' });
    if (EX.some(x => x.tag === p.tag)) acts.append(h('button', { class: 'btn primary', text: tr('Practicar ejercicios', 'Practice exercises'), onclick: () => { state.filter = p.tag; const first = EX.find(x => x.tag === p.tag); if (first) selectEx(first.id); renderExList(); show('lab'); } }));
    acts.append(h('button', { class: 'btn', text: p.tag === 'mock' ? tr('Ir al simulacro', 'Go to the mock interview') : tr('Preguntas de entrevista', 'Interview questions'), onclick: () => { state.qFilter = PHASE_ROUND[p.tag] || 'all'; renderQuestions(); show('interview'); } }));
    body.append(acts);
    const det = h('details', { class: 'phase', id: 'phase-' + p.n },
      h('summary', {}, h('span', { class: 'num', text: p.n }), h('span', {}, h('h3', { text: P.title }), h('span', { class: 'meta', text: tr(`Prioridad ${P.prio} · ${P.hours} · `, `Priority ${P.prio} · ${P.hours} · `) }, h('span', { id: 'phase-meta-' + p.n, class: 'meta' }), tr(' temas', ' topics'))),
        h('span', { class: 'pill ' + (/Muy/.test(p.prio) ? 'fail' : p.prio === 'Alta' ? 'warn' : ''), text: P.prio })),
      body);
    list.append(det);
  }
}

// ---------- lab ----------
let cur = EX.find(x => x.id === state.exId) || EX[0];
const code = $('#code');
const gutter = $('#gutter');

function renderFilters() {
  const f = $('#exFilters'); f.replaceChildren();
  for (const [k, label] of [['all', tr('Todos', 'All')], ...Object.entries(TAG_LABEL)]) {
    f.append(h('button', { 'aria-pressed': String(state.filter === k), text: label, onclick: () => { state.filter = k; save(); renderFilters(); renderExList(); } }));
  }
}
function renderExList() {
  const box = $('#exList'); box.replaceChildren();
  for (const [tag, label] of Object.entries(TAG_LABEL)) {
    if (state.filter !== 'all' && state.filter !== tag) continue;
    const items = EX.filter(x => x.tag === tag);
    if (!items.length) continue;
    box.append(h('div', { class: 'ex-group', text: `${label} · ${items.filter(x => state.ex[x.id]).length}/${items.length}` }));
    for (const x of items) {
      box.append(h('button', { class: 'ex-item', 'aria-current': String(x.id === cur.id), onclick: () => { selectEx(x.id); renderExList(); } },
        h('span', { class: 'st' + (state.ex[x.id] ? ' done' : '') }),
        h('span', {}, exView(x).title, h('small', { text: `${exView(x).level} · ${langsOf(x).map(k => LANGS.find(l => l.k === k).label).join(', ')}` }))));
    }
  }
}
function selectEx(id) {
  cur = EX.find(x => x.id === id) || EX[0];
  state.exId = cur.id;
  const ls = langsOf(cur);
  if (!ls.includes(state.lang)) state.lang = ls[0];
  save();
  renderExCard(); renderLangBar(); loadCode(); clearReport();
}
function langSpec(ex, lang) { return ex[lang] || (lang === 'js' ? ex.ts : null); }
function starterOf(ex, lang) {
  const s = langSpec(ex, lang);
  if (lang === 'js' && !ex.js && ex.ts) return ex.ts.starter.replace(/: [A-Za-z<>[\]|' ]+(?=[,)=])/g, '');
  return s ? s.starter : '';
}
function solutionOf(ex, lang) {
  if (lang === 'js') return ex.js?.solution || ex.ts?.solution || '';
  return langSpec(ex, lang)?.solution || '';
}
function signatureOf(ex, lang) {
  if (ex.review) return '';
  const src = starterOf(ex, lang);
  const re = { java: /^\s*public static [^;{]+?\([^)]*\)/m, python: /^(def \w+\([^)]*\)|class \w+)/m, ts: /^(async )?function [^{]+/m, js: /^(async )?function [^{]+/m }[lang];
  const m = re && src.match(re);
  return m ? m[0].trim() : '';
}
function testsOf(ex, lang) {
  if (lang === 'python') return ex.python?.tests || [];
  if (lang === 'js' || lang === 'ts') return ex.review ? [] : (ex.js?.tests || []);
  return [];
}
function renderExCard() {
  const c = $('#exCard'); c.replaceChildren();
  const x = exView(cur);
  c.append(
    h('div', { class: 'ex-head' }, h('span', { class: 'pill acc', text: TAG_LABEL[x.tag] }), h('span', { class: 'pill', text: x.level }),
      x.review ? h('span', { class: 'pill warn', text: tr('Revisión: sin tests automáticos', 'Review: no automated tests') }) : h('span', { class: 'pill pass', text: tr('Con tests automáticos', 'With automated tests') }),
      state.ex[x.id] ? h('span', { class: 'pill pass', text: tr('✓ Resuelto', '✓ Solved') }) : null),
    h('h2', { text: x.title }),
    h('p', { class: 'ex-desc', text: x.es }),
    ...(UI === 'en' ? [] : [h('div', { class: 'prompt-en' }, h('b', { text: 'Interview prompt' }), x.en)]));

  if (x.examples?.length) {
    const ex = h('div', { class: 'ex-section' }, h('h4', { text: tr('Ejemplos', 'Examples') }));
    const grid = h('div', { class: 'examples' });
    x.examples.forEach((e, i) => grid.append(h('div', { class: 'example' },
      h('div', { class: 'example-n', text: tr('Ejemplo ', 'Example ') + (i + 1) }),
      h('div', { class: 'io-label', text: tr('Entrada', 'Input') }), h('pre', { class: 'io', text: e.in }),
      h('div', { class: 'io-label', text: tr('Salida esperada', 'Expected output') }), h('pre', { class: 'io out', text: e.out }),
      e.why ? h('p', { class: 'why', text: e.why }) : null)));
    ex.append(grid); c.append(ex);
  }
  if (x.rules?.length) c.append(h('div', { class: 'ex-section' }, h('h4', { text: tr('Reglas y casos borde', 'Rules and edge cases') }), h('ul', { class: 'rules' }, x.rules.map(r => h('li', { text: r })))));
  if (x.deliver?.length) c.append(h('div', { class: 'ex-section' }, h('h4', { text: tr('Qué debe incluir tu solución', 'What your solution must include') }), h('ol', { class: 'rules' }, x.deliver.map(r => h('li', { text: r })))));
  c.append(h('div', { class: 'ex-section', id: 'sigBox' }));
  c.append(h('div', { class: 'ex-section', id: 'docsBox' }));
  c.append(h('div', { style: 'display:grid;gap:8px;margin-top:14px' },
      h('details', { class: 'reveal', id: 'hintDetails' }, h('summary', { text: tr('Pista: guía paso a paso', 'Hint: step-by-step guide') }),
        h('p', { class: 'hint', style: 'margin-top:6px', text: x.hint }),
        x.guide?.steps ? h('ol', { class: 'rules steps' }, x.guide.steps.map(s => h('li', { text: s }))) : null),
      h('details', { class: 'reveal', id: 'testsDetails' }, h('summary', { id: 'testsSummary' }), h('div', { id: 'testsList', class: 'tests', style: 'margin-top:8px' })),
      h('details', { class: 'reveal', id: 'solDetails' }, h('summary', { text: tr('Ver solución de referencia', 'Show reference solution') }), h('pre', { id: 'solPre' })),
      h('p', { class: 'hint' }, h('b', { text: 'Follow-up: ' }), x.follow)));
  updateSolution();
}
function updateSolution() {
  const pre = $('#solPre'); if (!pre) return;
  pre.textContent = solutionOf(cur, state.lang) || tr('Aún no hay solución para este lenguaje. Revisa la de otro lenguaje o pide revisión.', 'No solution for this language yet. Check another language or ask for a review.');
  const langLabel = LANGS.find(l => l.k === state.lang).label;
  const sig = signatureOf(cur, state.lang);
  const sb = $('#sigBox'); sb.replaceChildren();
  if (sig) {
    sb.append(h('h4', { text: tr('Tu función en ', 'Your function in ') + langLabel }), h('pre', { class: 'io sig', text: sig }));
    const xv = exView(cur);
    if (xv.returns?.[state.lang]) sb.append(h('p', { class: 'why', text: tr('Devuelve: ', 'Returns: ') + xv.returns[state.lang] }));
  }
  const docs = exView(cur).guide?.[state.lang] || [];
  const db = $('#docsBox'); db.replaceChildren();
  if (docs.length) {
    db.append(h('h4', { text: tr('Documentación para estudiar · ', 'Docs to study · ') + langLabel }),
      h('ul', { class: 'doc-links' }, docs.map(([name, url, desc]) => h('li', {},
        h('a', { href: url, target: '_blank', rel: 'noopener noreferrer' }, h('code', { text: name }), h('span', { class: 'ext', 'aria-hidden': 'true', text: '↗' })),
        desc ? h('span', { class: 'why', text: desc }) : null))));
  }
  const tests = testsOf(cur, state.lang);
  const td = $('#testsDetails');
  td.hidden = !tests.length;
  $('#testsSummary').textContent = tr(`Tests automáticos en ${langLabel} (${tests.length})`, `Automated tests in ${langLabel} (${tests.length})`);
  $('#testsList').replaceChildren(...tests.map(([e, v]) => h('div', { class: 'trow' }, h('span', { class: 'ic', text: '•' }), h('span', {}, e, h('div', { class: 'd', text: tr('debe devolver ', 'must return ') + v })))));
}
function engineLabel(lang) {
  if (lang === 'js') return 'Web Worker · tests';
  if (lang === 'ts') return cur.review ? tr('TypeScript compiler · sintaxis', 'TypeScript compiler · syntax') : 'TypeScript → JS · tests';
  if (lang === 'python') return cur.review ? tr('Python · sintaxis', 'Python · syntax') : (IN_CLAUDE ? 'Skulpt (Python 3) · tests' : 'Pyodide (CPython) · tests');
  return sample ? tr('Claude · compilación simulada', 'Claude · simulated compilation') : tr('CheerpJ · JVM real en el navegador', 'CheerpJ · real JVM in the browser');
}
function renderLangBar() {
  const bar = $('#langBar'); bar.replaceChildren();
  const ls = langsOf(cur);
  for (const l of LANGS) {
    bar.append(h('button', { 'aria-pressed': String(state.lang === l.k), disabled: !ls.includes(l.k), text: l.label, onclick: () => { stashCode(); state.lang = l.k; save(); renderLangBar(); loadCode(); clearReport(); updateSolution(); } }));
  }
  bar.append(h('span', { class: 'engine', text: engineLabel(state.lang) }));
  const runBtn = $('#runBtn');
  const runLabel = state.lang === 'java' ? tr('▶ Compilar y ejecutar', '▶ Compile and run') : (cur.review ? tr('▶ Verificar sintaxis', '▶ Check syntax') : tr('▶ Ejecutar tests', '▶ Run tests'));
  runBtn.firstChild.textContent = runLabel + ' ';
  $('#reviewBtn').hidden = !sample;
  $('#doneBtn').textContent = state.ex[cur.id] ? tr('Marcar como pendiente', 'Mark as pending') : tr('Marcar como resuelto', 'Mark as solved');
}
const codeKey = () => cur.id + ':' + state.lang;
function loadCode() {
  editor.set(state.code[codeKey()] ?? starterOf(cur, state.lang));
}
function stashCode() {
  const v = editor.get();
  if (v === starterOf(cur, state.lang)) delete state.code[codeKey()]; else state.code[codeKey()] = v;
  save();
}
function syncEditorHeight() {
  if (cm) { cm.refresh(); return; }
  const n = code.value.split('\n').length;
  gutter.textContent = Array.from({ length: n }, (_, i) => i + 1).join('\n');
  code.style.height = 'auto';
  code.style.height = Math.max(320, code.scrollHeight) + 'px';
}
code.addEventListener('input', () => { syncEditorHeight(); stashCode(); });
code.addEventListener('keydown', e => {
  const indent = (state.lang === 'js' || state.lang === 'ts') ? '  ' : '    ';
  const { selectionStart: s, selectionEnd: en, value: v } = code;
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); run(); return; }
  if (e.key === 'Tab') {
    e.preventDefault();
    const ls = v.lastIndexOf('\n', s - 1) + 1;
    if (e.shiftKey) {
      if (v.slice(ls, ls + indent.length) === indent) { code.setRangeText('', ls, ls + indent.length, 'end'); code.selectionStart = code.selectionEnd = Math.max(ls, s - indent.length); }
    } else code.setRangeText(indent, s, en, 'end');
    code.dispatchEvent(new Event('input'));
  } else if (e.key === 'Enter' && !e.shiftKey && s === en) {
    const ls = v.lastIndexOf('\n', s - 1) + 1;
    const line = v.slice(ls, s);
    let lead = line.match(/^\s*/)[0];
    if (/[{([:]\s*$/.test(line)) lead += indent;
    e.preventDefault();
    code.setRangeText('\n' + lead, s, en, 'end');
    code.dispatchEvent(new Event('input'));
  }
});
// ---------- CodeMirror (syntax highlighting + autocomplete); textarea is the fallback ----------
let cm = null;
let settingValue = false;
const CM_MODE = { java: 'text/x-java', python: { name: 'python', version: 3 }, ts: 'text/typescript', js: 'text/javascript' };
const editor = {
  get: () => (cm ? cm.getValue() : code.value),
  set: v => {
    if (cm) {
      settingValue = true;
      cm.setOption('mode', CM_MODE[state.lang]);
      const unit = state.lang === 'js' || state.lang === 'ts' ? 2 : 4;
      cm.setOption('indentUnit', unit); cm.setOption('tabSize', unit);
      cm.setValue(v); cm.clearHistory();
      settingValue = false;
    } else { code.value = v; syncEditorHeight(); }
  },
  focus: () => (cm ? cm.focus() : code.focus())
};
function hintFor(cmi) {
  const pos = cmi.getCursor(), line = cmi.getLine(pos.line);
  let start = pos.ch;
  while (start > 0 && /[\w$]/.test(line[start - 1])) start--;
  const word = line.slice(start, pos.ch);
  const afterDot = line[start - 1] === '.';
  if (!afterDot && word.length < 1) return null;
  const set = HINTS[state.lang] || HINTS.js;
  const pool = afterDot ? set.members : set.top;
  const lw = word.toLowerCase();
  const seen = new Set();
  const list = [];
  for (const it of pool) {
    const base = it.name.replace(/\(.*$/, '');
    if (!base.toLowerCase().startsWith(lw) || base === word || seen.has(it.name)) continue;
    seen.add(it.name);
    list.push({
      text: it.name, displayText: it.name,
      render: (el) => { el.append(document.createTextNode(it.name)); if (it.desc) el.append(h('span', { class: 'hint-desc', text: UI === 'en' ? (EN.hint[it.desc] || it.desc) : it.desc })); },
      hint: (c, data, comp) => {
        const hasArgs = /\(.+\)/.test(it.name);
        const ins = it.name.includes('(') ? base + '()' : it.name;
        c.replaceRange(ins, data.from, data.to);
        if (hasArgs) { const cur = c.getCursor(); c.setCursor({ line: cur.line, ch: cur.ch - 1 }); }
      }
    });
  }
  // identifiers already present in the code
  const words = new Set((cmi.getValue().match(/[A-Za-z_$][\w$]{2,}/g) || []));
  for (const w of words) {
    if (w.toLowerCase().startsWith(lw) && w !== word && !seen.has(w) && !afterDot) { seen.add(w); list.push({ text: w, displayText: w }); }
  }
  if (!list.length) return null;
  return { list: list.slice(0, 40), from: { line: pos.line, ch: start }, to: pos };
}
function initCodeMirror() {
  if (typeof window.CodeMirror !== 'function') return;
  try {
    cm = window.CodeMirror.fromTextArea(code, {
      lineNumbers: true, mode: CM_MODE[state.lang], indentUnit: 4, tabSize: 4, smartIndent: true,
      matchBrackets: true, autoCloseBrackets: true, styleActiveLine: true, viewportMargin: Infinity,
      inputStyle: 'textarea', spellcheck: false,
      extraKeys: {
        'Ctrl-Enter': () => run(), 'Cmd-Enter': () => run(),
        'Ctrl-Space': c => c.showHint({ hint: hintFor, completeSingle: false }),
        'Ctrl-/': 'toggleComment', 'Cmd-/': 'toggleComment',
        Tab: c => c.somethingSelected() ? c.indentSelection('add') : c.replaceSelection(' '.repeat(c.getOption('indentUnit')), 'end'),
        'Shift-Tab': c => c.indentSelection('subtract')
      }
    });
    cm.getInputField().setAttribute('aria-label', tr('Editor de código', 'Code editor'));
    cm.on('change', () => { if (!settingValue) stashCode(); });
    cm.on('inputRead', (c, change) => {
      const ch = change.text[0];
      if (change.origin !== '+input' || !ch || c.state.completionActive) return;
      const pos = c.getCursor(), line = c.getLine(pos.line).slice(0, pos.ch);
      if (ch === '.' || /[A-Za-z_]{2}$/.test(line)) c.showHint({ hint: hintFor, completeSingle: false });
    });
    $('#edBody').classList.add('cm-on');
    $('#edTips').hidden = false;
  } catch (e) { cm = null; }
}
initCodeMirror();
$('#resetBtn').addEventListener('click', () => { delete state.code[codeKey()]; save(); loadCode(); clearReport(); });
$('#doneBtn').addEventListener('click', () => { setDone(!state.ex[cur.id]); });
function setDone(v) {
  if (v) state.ex[cur.id] = 1; else delete state.ex[cur.id];
  save(); renderExList(); renderExCard(); renderLangBar(); renderProgress();
}

// ---------- report ----------
function clearReport() {
  setPill(tr('Sin ejecutar', 'Not run'), '');
  $('#testRows').replaceChildren(); $('#consoleOut').textContent = ''; $('#aiOut').replaceChildren();
}
function setPill(text, cls) { const p = $('#repPill'); p.textContent = text; p.className = 'pill ' + cls; }
function renderResults(results) {
  const rows = $('#testRows'); rows.replaceChildren();
  results.forEach(r => {
    const detail = r.pass ? `→ ${r.got}` : r.error ? `✖ ${r.error}` : tr(`esperado ${r.exp}, obtenido ${r.got}`, `expected ${r.exp}, got ${r.got}`);
    rows.append(h('div', { class: 'trow ' + (r.pass ? 'pass' : 'fail') }, h('span', { class: 'ic', text: r.pass ? '✓' : '✗' }), h('span', {}, r.expr, h('div', { class: 'd', text: detail }))));
  });
  const passed = results.filter(r => r.pass).length;
  if (!results.length) return;
  setPill(`${passed}/${results.length} tests`, passed === results.length ? 'pass' : 'fail');
  if (passed === results.length && !state.ex[cur.id]) setDone(true);
}

// ---------- runners ----------
function loadScript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = src; s.async = true;
    s.onload = res; s.onerror = () => rej(new Error(tr('No se pudo cargar ', 'Could not load ') + src));
    document.head.append(s);
  });
}
let tsReady = null;
function loadTS() {
  if (!tsReady) tsReady = (async () => {
    for (const u of CDN.ts) { try { await loadScript(u); if (window.ts) return window.ts; } catch (e) { /* next */ } }
    throw new Error(tr('No se pudo cargar el compilador de TypeScript. Revisa tu conexión.', 'Could not load the TypeScript compiler. Check your connection.'));
  })();
  return tsReady;
}
function jsWorkerMain() {
  const fmt = v => {
    try {
      if (typeof v === 'string') return v;
      if (v === undefined) return 'undefined';
      if (typeof v === 'function') return '[Function ' + (v.name || 'anonymous') + ']';
      if (v instanceof Error) return v.name + ': ' + v.message;
      if (v instanceof Map) return 'Map ' + JSON.stringify(Object.fromEntries(v));
      if (v instanceof Set) return 'Set ' + JSON.stringify([...v]);
      return JSON.stringify(v);
    } catch (e) { return String(v); }
  };
  const show = v => typeof v === 'string' ? JSON.stringify(v) : fmt(v);
  const deq = (a, b) => {
    if (a === b) return true;
    if (typeof a === 'number' && typeof b === 'number') return Math.abs(a - b) < 1e-9;
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      if (Array.isArray(a) !== Array.isArray(b)) return false;
      if (Array.isArray(a)) return a.length === b.length && a.every((x, i) => deq(x, b[i]));
      const ka = Object.keys(a), kb = Object.keys(b);
      return ka.length === kb.length && ka.every(k => Object.prototype.hasOwnProperty.call(b, k) && deq(a[k], b[k]));
    }
    return false;
  };
  const errText = e => (e && e.name ? e.name + ': ' + e.message : String(e));
  self.onmessage = async e => {
    const { code, prelude, tests } = e.data;
    const logs = [];
    const push = p => (...a) => logs.push(p + a.map(fmt).join(' '));
    console.log = push(''); console.info = push(''); console.warn = push('⚠ '); console.error = push('✖ ');
    const AsyncFn = Object.getPrototypeOf(async function () {}).constructor;
    let evalIn;
    try {
      evalIn = await new AsyncFn(prelude + '\n' + code + '\n;return (__s) => eval(__s);')();
    } catch (err) { self.postMessage({ fatal: errText(err), logs }); return; }
    await new Promise(r => setTimeout(r, 30));
    const results = [];
    for (const [expr, exp] of tests) {
      try {
        const got = await evalIn('(async () => (' + expr + '))()');
        const expected = evalIn('(' + exp + ')');
        results.push({ expr, exp, pass: deq(got, expected), got: show(got) });
      } catch (err) { results.push({ expr, exp, pass: false, error: errText(err) }); }
    }
    self.postMessage({ results, logs });
  };
}
const JS_WORKER_URL = URL.createObjectURL(new Blob(['(' + jsWorkerMain.toString() + ')()'], { type: 'text/javascript' }));
function runInWorker(codeStr, prelude, tests, timeout = 5000) {
  return new Promise(res => {
    const w = new Worker(JS_WORKER_URL);
    const t = setTimeout(() => { w.terminate(); res({ fatal: tr('Timeout: la ejecución superó ', 'Timeout: execution exceeded ') + timeout / 1000 + tr(' s (¿bucle infinito?)', ' s (infinite loop?)'), logs: [] }); }, timeout);
    w.onmessage = e => { clearTimeout(t); w.terminate(); res(e.data); };
    w.onerror = e => { e.preventDefault(); clearTimeout(t); w.terminate(); res({ fatal: e.message || tr('Error en el worker', 'Worker error'), logs: [] }); };
    w.postMessage({ code: codeStr, prelude: prelude || '', tests: tests || [] });
  });
}
function tsDiagnostics(ts, src) {
  const out = ts.transpileModule(src, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext }, reportDiagnostics: true, fileName: 'main.ts' });
  const diags = (out.diagnostics || []).map(d => {
    const msg = ts.flattenDiagnosticMessageText(d.messageText, '\n');
    if (d.file && d.start != null) { const { line, character } = d.file.getLineAndCharacterOfPosition(d.start); return `main.ts:${line + 1}:${character + 1} — ${msg}`; }
    return msg;
  });
  return { js: out.outputText, diags };
}

// Python
let pyWorker = null, pyLoaded = false;
function pyWorkerMain() {
  let py = null;
  self.onmessage = async e => {
    const { src, url, check } = e.data;
    try {
      if (!py) { importScripts(url + 'pyodide.js'); py = await loadPyodide({ indexURL: url }); }
    } catch (err) { self.postMessage({ loadError: String((err && err.message) || err) }); return; }
    const out = [];
    py.setStdout({ batched: s => out.push(s) });
    py.setStderr({ batched: s => out.push(s) });
    const g = py.globals.get('dict')();
    try {
      if (check) { g.set('__src', src); py.runPython('import ast\nast.parse(__src)', { globals: g }); }
      else await py.runPythonAsync(src, { globals: g });
      self.postMessage({ out: out.join('\n') });
    } catch (err) { self.postMessage({ out: out.join('\n'), error: String((err && err.message) || err) }); }
    finally { g.destroy(); }
  };
}
const PY_WORKER_URL = URL.createObjectURL(new Blob(['(' + pyWorkerMain.toString() + ')()'], { type: 'text/javascript' }));
function runPyodide(src, check) {
  return new Promise(res => {
    if (!pyWorker) pyWorker = new Worker(PY_WORKER_URL);
    const w = pyWorker;
    const limit = pyLoaded ? 8000 : 60000;
    const t = setTimeout(() => { w.terminate(); pyWorker = null; pyLoaded = false; res({ error: tr('Timeout: la ejecución superó ', 'Timeout: execution exceeded ') + limit / 1000 + tr(' s (¿bucle infinito?)', ' s (infinite loop?)') }); }, limit);
    w.onmessage = e => { clearTimeout(t); if (!e.data.loadError) pyLoaded = true; else { w.terminate(); pyWorker = null; } res(e.data); };
    w.onerror = e => { e.preventDefault(); clearTimeout(t); w.terminate(); pyWorker = null; res({ loadError: e.message || tr('Error cargando Pyodide', 'Error loading Pyodide') }); };
    w.postMessage({ src, url: CDN.pyodide, check });
  });
}
let skReady = null;
function loadSkulpt() {
  if (!skReady) skReady = (async () => {
    for (const [a, b] of CDN.skulpt) { try { await loadScript(a); await loadScript(b); if (window.Sk) return window.Sk; } catch (e) { /* next */ } }
    throw new Error(tr('No se pudo cargar el intérprete de Python.', 'Could not load the Python interpreter.'));
  })();
  return skReady;
}
async function runSkulpt(src, check) {
  const Sk = await loadSkulpt();
  let out = '';
  Sk.configure({
    output: t => { out += t; },
    read: x => { if (!Sk.builtinFiles || !Sk.builtinFiles.files[x]) throw new Error("File not found: '" + x + "'"); return Sk.builtinFiles.files[x]; },
    __future__: Sk.python3, execLimit: 6000
  });
  try {
    if (check) Sk.compile(src, '<main>.py', 'exec', true);
    else await Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, src, true));
    return { out };
  } catch (err) { return { out, error: err && err.toString ? err.toString() : String(err) }; }
}
let pyEngine = IN_CLAUDE ? 'skulpt' : 'pyodide';
async function runPython(src, check) {
  if (pyEngine === 'pyodide') {
    const r = await runPyodide(src, check);
    if (!r.loadError) return r;
    pyEngine = 'skulpt';
  }
  return runSkulpt(src, check);
}
function pyHarness(ex, userCode) {
  let s = (ex.python.prelude || '') + '\n' + userCode + '\n\n'
    + 'def __qa_check(i, got, exp):\n    print("@@T|" + str(i) + "|" + ("PASS" if got == exp else "FAIL") + "|" + repr(got))\n';
  (ex.python.tests || []).forEach(([e, x], i) => {
    s += 'try:\n    __qa_check(' + i + ', ' + e + ', ' + x + ')\nexcept Exception as __e:\n    print("@@T|' + i + '|ERROR|" + type(__e).__name__ + ": " + str(__e))\n';
  });
  return s;
}

// ---------- run ----------
let running = false;
async function run() {
  if (running) return;
  stashCode();
  const lang = state.lang, ex = cur, src = editor.get();
  if (lang === 'java') return sample ? askClaude('java') : runJavaCheerp();
  running = true; $('#runBtn').disabled = true;
  clearReport(); setPill(tr('Ejecutando…', 'Running…'), 'acc');
  const out = $('#consoleOut');
  try {
    if (lang === 'js' || lang === 'ts') {
      let js = src;
      if (lang === 'ts') {
        setPill(tr('Cargando TypeScript…', 'Loading TypeScript…'), 'acc');
        const ts = await loadTS();
        const r = tsDiagnostics(ts, src);
        if (r.diags.length) { out.textContent = r.diags.join('\n'); setPill(tr(`${r.diags.length} error(es) de sintaxis`, `${r.diags.length} syntax error(s)`), 'fail'); return; }
        js = r.js;
        if (ex.review) { setPill(tr('Sintaxis OK', 'Syntax OK'), 'pass'); out.textContent = tr('TypeScript compila sin errores de sintaxis.\nEste ejercicio no se ejecuta aquí (necesita un navegador real con Playwright).', 'TypeScript compiles with no syntax errors.\nThis exercise does not run here (it needs a real browser with Playwright).') + (sample ? tr('\nUsa “Revisar con Claude” para recibir feedback de entrevistador.', '\nUse “Review with Claude” to get interviewer feedback.') : tr('\nCompárala con la solución de referencia.', '\nCompare it with the reference solution.')); return; }
      }
      const spec = ex.js;
      const res = await runInWorker(js, spec?.prelude, spec?.tests);
      out.textContent = (res.logs || []).join('\n');
      if (res.fatal) { out.textContent += (out.textContent ? '\n' : '') + '✖ ' + res.fatal; setPill(tr('Error', 'Error'), 'fail'); return; }
      if (res.results?.length) renderResults(res.results); else setPill(tr('Ejecutado', 'Done'), 'pass');
    } else if (lang === 'python') {
      setPill(pyEngine === 'pyodide' && !pyLoaded ? tr('Cargando Python (primera vez ~10 s)…', 'Loading Python (first time ~10 s)…') : tr('Ejecutando…', 'Running…'), 'acc');
      if (ex.review) {
        const r = await runPython(src, true);
        if (r.error) { out.textContent = r.error; setPill(tr('Error de sintaxis', 'Syntax error'), 'fail'); }
        else { out.textContent = tr('Sintaxis correcta. Los tests con pytest no se ejecutan en el navegador.', 'Syntax is correct. pytest tests do not run in the browser.') + (sample ? tr(' Usa “Revisar con Claude”.', ' Use “Review with Claude”.') : tr(' Compárala con la solución de referencia o ejecútala localmente con pytest.', ' Compare it with the reference solution or run it locally with pytest.')); setPill(tr('Sintaxis OK', 'Syntax OK'), 'pass'); }
        return;
      }
      const r = await runPython(pyHarness(ex, src), false);
      const lines = (r.out || '').split('\n');
      const results = []; const logs = [];
      for (const l of lines) {
        const m = l.match(/^@@T\|(\d+)\|(PASS|FAIL|ERROR)\|(.*)$/);
        if (m) { const [e, x] = ex.python.tests[+m[1]]; results.push({ expr: e, exp: x, pass: m[2] === 'PASS', got: m[2] !== 'ERROR' ? m[3] : undefined, error: m[2] === 'ERROR' ? m[3] : undefined }); }
        else if (l !== '') logs.push(l);
      }
      out.textContent = logs.join('\n') + (r.error ? (logs.length ? '\n' : '') + '✖ ' + cleanPyError(r.error) : '');
      if (results.length) renderResults(results); else setPill(r.error ? tr('Error', 'Error') : tr('Ejecutado', 'Done'), r.error ? 'fail' : 'pass');
    }
  } catch (err) {
    out.textContent = '✖ ' + (err.message || err); setPill(tr('Error', 'Error'), 'fail');
  } finally { running = false; $('#runBtn').disabled = false; }
}
function cleanPyError(e) {
  const lines = String(e).trim().split('\n');
  const i = lines.findIndex(l => l.includes('File "<exec>"') || l.includes('File "<stdin>"'));
  return (i >= 0 ? lines.slice(i) : lines.slice(-4)).join('\n');
}
function javaLocalHelp(reason) {
  clearReport(); setPill(tr('Java local', 'Local Java'), 'warn');
  $('#consoleOut').textContent = [
    reason || tr('No se pudo cargar el entorno de Java en el navegador (¿conexión?).', 'Could not load the Java environment in the browser (connection issue?).'),
    tr('Opción rápida (Java 11+ sin compilar aparte):', 'Quick option (Java 11+, no separate compile step):'),
    tr('  1. Copia el código a un archivo Main.java', '  1. Copy the code into a Main.java file'),
    '  2. java Main.java',
    '',
    tr('En el repo: exercises/java/<ejercicio>/Main.java con plantilla y solución.', 'In the repo: exercises/<exercise>/README.md with template and solution.'),
    tr('Online: pega el código en onecompiler.com/java o jdoodle.com.', 'Online: paste the code into onecompiler.com/java or jdoodle.com.')
  ].join('\n');
  const copy = h('button', { class: 'btn', text: tr('Copiar código', 'Copy code'), onclick: async () => { try { await navigator.clipboard.writeText(editor.get()); copy.textContent = tr('Copiado', 'Copied'); } catch (e) { if (!cm) code.select(); copy.textContent = tr('Selecciónalo y copia con Ctrl+C', 'Select it and copy with Ctrl+C'); } } });
  $('#aiOut').append(copy);
}

// ---------- Java (CheerpJ, real JVM in the browser, no server/Claude needed) ----------
let cjReady = null;
function loadCheerpJ() {
  if (!cjReady) cjReady = (async () => {
    await loadScript(CDN.cheerpj);
    if (typeof window.cheerpjInit !== 'function') throw new Error(tr('No se pudo cargar CheerpJ.', 'Could not load CheerpJ.'));
    await window.cheerpjInit({ version: 17, status: 'none' });
    return true;
  })();
  return cjReady;
}
function captureConsole(fn) {
  const buf = [];
  const orig = { log: console.log, info: console.info, warn: console.warn, error: console.error };
  const push = (...a) => buf.push(a.map(x => typeof x === 'string' ? x : String(x)).join(' '));
  console.log = push; console.info = push; console.warn = push; console.error = push;
  return Promise.resolve().then(fn).finally(() => Object.assign(console, orig)).then(exit => ({ exit, text: buf.join('\n').replace(/\n{3,}/g, '\n\n').trim() }));
}
let cjRunSeq = 0;
/** Generates a TestRunner.java that calls the user's static methods on Main and prints @@T markers, mirroring pyHarness. */
function javaTestHarness(ex, tests) {
  let s = 'import java.util.*;\n\nclass TestRunner {\n  public static void main(String[] args) {\n';
  tests.forEach(([expr, exp], i) => {
    s += '    try {\n'
      + '      String got = String.valueOf(' + expr + ');\n'
      + '      String exp = String.valueOf(' + exp + ');\n'
      + '      System.out.println("@@T|' + i + '|" + (got.equals(exp) ? "PASS" : "FAIL") + "|" + got);\n'
      + '    } catch (Throwable t) {\n'
      + '      System.out.println("@@T|' + i + '|ERROR|" + t);\n'
      + '    }\n';
  });
  s += '  }\n}\n';
  return s;
}
async function runJavaCheerp() {
  running = true; $('#runBtn').disabled = true;
  clearReport(); setPill(tr('Cargando JVM (primera vez puede tardar)…', 'Loading JVM (first time may take a while)…'), 'acc');
  const out = $('#consoleOut'); const src = editor.get(); const ex = cur;
  const tests = ex.java?.tests;
  try {
    await loadCheerpJ();
    setPill(tr('Compilando…', 'Compiling…'), 'acc');
    const dir = '/files/out' + (++cjRunSeq);
    window.cheerpOSAddStringFile('/str/Main.java', src);
    const srcFiles = ['/str/Main.java'];
    if (tests?.length) {
      window.cheerpOSAddStringFile('/str/TestRunner.java', javaTestHarness(ex, tests));
      srcFiles.push('/str/TestRunner.java');
    }
    const base = location.pathname.replace(/[^/]*$/, ''); // site may be deployed under a subpath (e.g. GitHub Pages project site)
    const javacJar = '/app' + base + 'vendor/cheerpj/javac-17.jar';
    const compiled = await captureConsole(() => window.cheerpjRunMain('com.sun.tools.javac.Main', javacJar, '-d', dir, ...srcFiles));
    if (compiled.exit !== 0) {
      out.textContent = (compiled.text || tr('Error de compilación', 'Compilation error')).replace(/\/str\/Main\.java/g, 'Main.java').replace(/\/str\/TestRunner\.java/g, 'TestRunner.java');
      setPill(tr('No compila', 'Does not compile'), 'fail');
      return;
    }
    setPill(tr('Ejecutando…', 'Running…'), 'acc');
    const ran = await captureConsole(() => window.cheerpjRunMain(tests?.length ? 'TestRunner' : 'Main', dir));
    if (tests?.length) {
      const lines = (ran.text || '').split('\n');
      const results = []; const logs = [];
      for (const l of lines) {
        const m = l.match(/^@@T\|(\d+)\|(PASS|FAIL|ERROR)\|(.*)$/);
        if (m) { const [e, x] = tests[+m[1]]; results.push({ expr: e, exp: x, pass: m[2] === 'PASS', got: m[2] !== 'ERROR' ? m[3] : undefined, error: m[2] === 'ERROR' ? m[3] : undefined }); }
        else if (l !== '') logs.push(l);
      }
      out.textContent = logs.join('\n');
      if (results.length) renderResults(results); else setPill(tr('Ejecutado', 'Done'), 'pass');
    } else {
      out.textContent = ran.text || tr('(sin salida)', '(no output)');
      const threw = /Exception in thread|^\s+at [\w$.]+\(/m.test(ran.text);
      setPill(threw ? tr('Excepción en ejecución', 'Threw at runtime') : tr('Ejecutado', 'Done'), threw ? 'fail' : 'pass');
    }
  } catch (e) {
    javaLocalHelp(tr('No se pudo ejecutar Java en el navegador: ', 'Could not run Java in the browser: ') + (e?.message || e));
  } finally { running = false; $('#runBtn').disabled = false; }
}
$('#runBtn').addEventListener('click', run);
$('#reviewBtn').addEventListener('click', () => askClaude('review'));

// ---------- Claude (only inside a Claude viewer) ----------
const LANG_NAME = { java: 'Java 21', python: 'Python 3', ts: 'TypeScript', js: 'JavaScript' };
async function askClaude(mode) {
  if (!sample || running) return;
  running = true; $('#runBtn').disabled = true; $('#reviewBtn').disabled = true;
  const ai = $('#aiOut'); ai.replaceChildren(h('span', { class: 'thinking', text: mode === 'java' ? tr('Compilando y evaluando…', 'Compiling and evaluating…') : tr('Revisando como entrevistador…', 'Reviewing as an interviewer…') }));
  if (mode === 'java') { setPill(tr('Compilando…', 'Compiling…'), 'acc'); $('#testRows').replaceChildren(); $('#consoleOut').textContent = ''; }
  const lang = state.lang;
  const prompt = [
    mode === 'java'
      ? 'You act as a strict Java 21 compiler + JVM and as a senior QA Automation interviewer.'
      : 'You act as a senior QA Automation interviewer reviewing a candidate solution.',
    'Exercise: ' + cur.en,
    'Context (Spanish): ' + cur.es,
    'Language: ' + LANG_NAME[lang],
    'Candidate code:\n```\n' + editor.get() + '\n```',
    mode === 'java'
      ? 'First decide exactly whether this compiles with javac (missing imports, types, semicolons count; external libraries like Selenium/TestNG/RestAssured are assumed on the classpath). If it compiles and has a main method, give the EXACT stdout it would print. Then judge correctness against the exercise, including edge cases.'
      : 'Judge correctness, edge cases, readability, idiomatic use of the language/framework and what a senior candidate would add.',
    'Respond ONLY with JSON of this shape: {"compiles": boolean, "errors": [{"line": number, "message": string}], "stdout": string, "correct": boolean, "score": number (0-10), "feedback": string (2-4 sentences in ' + LANG_WORD() + '), "issues": [string in ' + LANG_WORD() + '], "followUp": string (one interview follow-up question in English)}'
  ].join('\n\n');
  try {
    const r = await sample.json(prompt, { modelTier: 'default' });
    ai.replaceChildren();
    if (mode === 'java') {
      if (r.compiles === false) {
        $('#consoleOut').textContent = (r.errors || []).map(e => `Main.java:${e.line ?? '?'}: error: ${e.message}`).join('\n') || tr('Error de compilación', 'Compilation error');
        setPill(tr('No compila', 'Does not compile'), 'fail');
      } else {
        $('#consoleOut').textContent = r.stdout || tr('(sin salida)', '(no output)');
        setPill(r.correct ? tr('Correcto', 'Correct') : tr('Compila, pero revisa la lógica', 'Compiles, but check the logic'), r.correct ? 'pass' : 'warn');
      }
    }
    ai.append(h('div', { class: 'ai' },
      h('h4', { text: tr('Feedback del entrevistador', 'Interviewer feedback') }),
      h('div', { style: 'display:flex;gap:12px;align-items:baseline;flex-wrap:wrap' }, h('span', { class: 'score', text: (r.score ?? '–') + '/10' }), h('p', { text: r.feedback || '' })),
      r.issues?.length ? h('ul', {}, r.issues.map(i => h('li', { text: i }))) : null,
      r.followUp ? h('p', { style: 'margin-top:8px' }, h('b', { text: 'Follow-up: ' }), r.followUp) : null,
      h('p', { class: 'note', style: 'margin-top:8px', text: mode === 'java' ? tr('Compilación simulada por Claude, no un JVM real. Verifica localmente con java Main.java antes de la entrevista.', 'Compilation simulated by Claude, not a real JVM. Verify locally with java Main.java before the interview.') : '' })));
    if (r.correct && (r.score ?? 0) >= 7 && !state.ex[cur.id]) setDone(true);
  } catch (e) {
    ai.replaceChildren(h('p', { class: 'note', text: e?.code === 'not_granted' ? tr('Claude no tiene permiso en esta vista. Puedes seguir con los tests automáticos y la solución de referencia.', 'Claude has no permission in this view. You can keep using the automated tests and the reference solution.') : e?.code === 'rate_limited' ? tr('Demasiadas solicitudes seguidas. Espera un minuto y vuelve a intentarlo.', 'Too many requests in a row. Wait a minute and try again.') : tr('No se pudo obtener la revisión: ', 'Could not get the review: ') + (e?.message || e) }));
    if (mode === 'java') setPill(tr('Sin evaluación', 'Not evaluated'), 'warn');
  } finally { running = false; $('#runBtn').disabled = false; $('#reviewBtn').disabled = false; }
}

// ---------- interview ----------
function renderQFilter() {
  const sel = $('#qFilter'); sel.replaceChildren(h('option', { value: 'all', text: tr('Todas las rondas', 'All rounds') }), ...ROUNDS.map(r => h('option', { value: r.k, text: roundLabel(r) })));
  sel.value = state.qFilter;
  sel.onchange = () => { state.qFilter = sel.value; save(); renderQuestions(); };
}
function renderQuestions() {
  $('#qFilter').value = state.qFilter;
  const list = $('#qList'); list.replaceChildren();
  if (state.qFilter !== 'all') {
    const shown = QUESTIONS.filter(q => q.r === state.qFilter).length;
    const rl = ROUNDS.find(r => r.k === state.qFilter);
    list.append(h('div', { class: 'filter-note' },
      h('span', { text: tr(`Mostrando ${shown} de ${QUESTIONS.length} preguntas · ronda ${rl ? roundLabel(rl) : state.qFilter}`, `Showing ${shown} of ${QUESTIONS.length} questions · round ${rl ? roundLabel(rl) : state.qFilter}`) }),
      h('button', { class: 'btn', text: tr('Ver todas', 'Show all'), onclick: () => { state.qFilter = 'all'; save(); renderQuestions(); } })));
  }
  QUESTIONS.forEach((q, i) => {
    if (state.qFilter !== 'all' && q.r !== state.qFilter) return;
    const ta = h('textarea', { id: 'qa-' + i, placeholder: 'Write your answer in English, as you would say it…', 'aria-label': tr('Tu respuesta', 'Your answer') });
    ta.value = state.qa[i] || '';
    ta.addEventListener('input', () => { state.qa[i] = ta.value; save(); });
    const kp = h('ul', { class: 'keypoints', hidden: true }, q.k.map(k => h('li', { text: k })));
    const fb = h('div');
    const rate = h('div', { style: 'display:flex;gap:6px;align-items:center;flex-wrap:wrap' }, h('span', { class: 'note', text: tr('Autoevaluación:', 'Self-rating:') }),
      [1, 2, 3, 4, 5].map(n => h('button', { class: 'btn' + (state.q[i] === n ? ' primary' : ''), style: 'padding:4px 10px', text: n, 'aria-label': tr('Puntuar ', 'Rate ') + n, onclick: () => { state.q[i] = n; save(); renderQuestions(); renderProgress(); $('#q-' + i).open = true; } })));
    const actions = h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap' },
      h('button', { class: 'btn', text: tr('Ver puntos clave', 'Show key points'), onclick: () => { kp.hidden = !kp.hidden; } }),
      sample ? h('button', { class: 'btn primary', text: tr('Feedback de Claude', 'Feedback from Claude'), onclick: () => answerFeedback(q, ta.value, fb) }) : null);
    const rd = ROUNDS.find(r => r.k === q.r);
    list.append(h('details', { class: 'q', id: 'q-' + i },
      h('summary', {}, h('span', { class: 'pill ' + (state.q[i] ? (state.q[i] >= 4 ? 'pass' : 'warn') : ''), text: state.q[i] ? state.q[i] + '/5' : roundLabel(rd) }), h('span', { text: q.q })),
      h('div', { class: 'qbody' }, ta, actions, kp, fb, rate)));
  });
}
async function answerFeedback(q, answer, box) {
  if (!answer.trim()) { box.replaceChildren(h('p', { class: 'note', text: tr('Escribe primero tu respuesta.', 'Write your answer first.') })); return; }
  box.replaceChildren(h('span', { class: 'thinking', text: tr('Evaluando tu respuesta…', 'Evaluating your answer…') }));
  try {
    const r = await sample.json([
      'You are a senior QA Automation interviewer. Evaluate this candidate answer for a Senior Test Automation role (Playwright, JS/TS/Python, Java + Selenium).',
      'Question: ' + q.q, 'Expected key points: ' + q.k.join('; '), 'Candidate answer: ' + answer,
      'Respond ONLY with JSON: {"score": number 1-5, "strengths": [string in ' + LANG_WORD() + '], "gaps": [string in ' + LANG_WORD() + '], "betterAnswer": string (a strong 4-6 sentence answer in English), "englishTips": string (' + LANG_WORD() + ', about wording/grammar, empty if fine)}'
    ].join('\n\n'), { modelTier: 'default' });
    box.replaceChildren(h('div', { class: 'ai' },
      h('h4', { text: 'Feedback · ' + (r.score ?? '–') + '/5' }),
      r.strengths?.length ? h('p', {}, h('b', { text: tr('Bien: ', 'Good: ') }), r.strengths.join(' · ')) : null,
      r.gaps?.length ? h('p', { style: 'margin-top:4px' }, h('b', { text: tr('Falta: ', 'Missing: ') }), r.gaps.join(' · ')) : null,
      r.betterAnswer ? h('p', { style: 'margin-top:8px;font-style:italic', text: r.betterAnswer }) : null,
      r.englishTips ? h('p', { class: 'note', style: 'margin-top:6px', text: tr('Inglés: ', 'English: ') + r.englishTips }) : null));
  } catch (e) {
    box.replaceChildren(h('p', { class: 'note', text: e?.code === 'not_granted' ? tr('Claude no tiene permiso en esta vista.', 'Claude has no permission in this view.') : tr('No se pudo evaluar: ', 'Could not evaluate: ') + (e?.message || e) }));
  }
}

// mock interview: AI chat when available, timed drill otherwise
let chatTurns = [], chatBusy = false, drill = null, drillTimer = null;
function renderRounds() {
  const box = $('#rounds'); box.replaceChildren();
  for (const r of ROUNDS) {
    const cb = h('input', { type: 'checkbox', id: 'rd-' + r.k });
    cb.checked = state.rounds.includes(r.k);
    cb.addEventListener('change', () => { state.rounds = ROUNDS.map(x => x.k).filter(k => $('#rd-' + k).checked); save(); });
    box.append(h('label', { for: 'rd-' + r.k }, cb, roundLabel(r)));
  }
}
function addMsg(role, text) {
  const m = h('div', { class: 'msg ' + (role === 'assistant' ? 'ai-m' : 'me'), text });
  $('#msgs').append(m); $('#msgs').scrollTop = 1e9; return m;
}
function setupMock() {
  const ai = !!sample;
  $('#mockTitle').textContent = ai ? tr('Mock interview con Claude', 'Mock interview with Claude') : tr('Simulacro cronometrado', 'Timed drill');
  $('#mockDesc').textContent = ai
    ? tr('Claude hace de entrevistador senior, una pregunta a la vez y en inglés. Responde como en la entrevista real y al final pide la evaluación.', 'Claude acts as a senior interviewer, one question at a time, in English. Answer as in the real interview and ask for the evaluation at the end.')
    : tr('Preguntas al azar de las rondas elegidas, 3 minutos por respuesta. Al terminar ves los puntos clave y te autoevalúas.', 'Random questions from the selected rounds, 3 minutes per answer. Afterwards you see the key points and rate yourself.');
  $('#chatSummary').hidden = !ai;
  $('#chatStart').textContent = ai ? tr('Empezar entrevista', 'Start interview') : tr('Empezar simulacro', 'Start drill');
  $('#chatSend').textContent = ai ? tr('Enviar respuesta', 'Send answer') : tr('Siguiente', 'Next');
}
$('#chatStart').addEventListener('click', () => sample ? startChat() : startDrill());
$('#chatSend').addEventListener('click', () => sample ? sendChat() : nextDrill());
$('#chatSummary').addEventListener('click', () => sendChat('Please end the interview now. Give the final evaluation in ' + LANG_WORD() + ': score 1-5 per round covered, top 3 strengths, top 3 gaps, and a focused 7-day study plan.'));
$('#chatIn').addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); $('#chatSend').click(); } });

async function startChat() {
  if (!state.rounds.length) { $('#chatNote').textContent = tr('Elige al menos una ronda.', 'Pick at least one round.'); return; }
  $('#msgs').replaceChildren(); chatTurns = [];
  const labels = state.rounds.map(k => ROUNDS.find(r => r.k === k).label).join(', ');
  const intro = 'You are a senior technical interviewer hiring a Senior Test Automation Engineer (5+ years; Playwright; JavaScript/TypeScript/Python; Java and Selenium). Run a realistic mock interview in English covering these rounds in order: ' + labels + '. Rules: ask exactly ONE question per message; after each candidate answer give 1-2 sentences of feedback with a score from 1 to 5, then ask the next question; go deeper with follow-ups when the answer is shallow; for coding rounds ask small live-coding problems the candidate can write in plain text. Start now with a short greeting and the first question.';
  chatTurns.push({ role: 'user', content: intro });
  $('#chatSend').disabled = false; $('#chatSummary').disabled = false;
  await streamTurn();
}
async function sendChat(text) {
  if (chatBusy || !chatTurns.length) return;
  const t = text || $('#chatIn').value.trim();
  if (!t) return;
  if (!text) { addMsg('user', t); $('#chatIn').value = ''; }
  chatTurns.push({ role: 'user', content: t });
  await streamTurn();
}
async function streamTurn() {
  chatBusy = true; $('#chatSend').disabled = true; $('#chatNote').textContent = '';
  const m = addMsg('assistant', 'Thinking…');
  try {
    const r = await sample(chatTurns, { onText: ({ text }) => { m.textContent = text; $('#msgs').scrollTop = 1e9; }, cache: false, modelTier: 'default' });
    m.textContent = r.text; chatTurns.push({ role: 'assistant', content: r.text });
  } catch (e) {
    chatTurns.pop();
    m.textContent = e?.text || '';
    $('#chatNote').textContent = e?.code === 'not_granted' ? tr('Claude no tiene permiso en esta vista; usa el banco de preguntas.', 'Claude has no permission in this view; use the question bank.') : e?.code === 'rate_limited' ? tr('Demasiadas solicitudes. Espera un momento y reenvía.', 'Too many requests. Wait a moment and resend.') : tr('Se interrumpió la respuesta: ', 'The answer was interrupted: ') + (e?.message || e);
  } finally { chatBusy = false; $('#chatSend').disabled = false; }
}

function startDrill() {
  const pool = QUESTIONS.map((q, i) => ({ q, i })).filter(x => state.rounds.includes(x.q.r));
  if (!pool.length) { $('#chatNote').textContent = tr('Elige al menos una ronda.', 'Pick at least one round.'); return; }
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  drill = { items: pool.slice(0, 8), pos: -1, phase: 'answer' };
  $('#msgs').replaceChildren(); $('#chatSend').disabled = false;
  nextDrill();
}
function nextDrill() {
  if (!drill) return;
  clearInterval(drillTimer);
  const curItem = drill.items[drill.pos];
  if (curItem && drill.phase === 'answer') {
    const ans = $('#chatIn').value.trim();
    if (ans) { addMsg('user', ans); state.qa[curItem.i] = ans; save(); }
    $('#chatIn').value = '';
    const kp = addMsg('assistant', 'Key points:\n• ' + curItem.q.k.join('\n• '));
    kp.append(h('div', { style: 'display:flex;gap:6px;margin-top:8px;flex-wrap:wrap' }, h('span', { text: tr('¿Cómo te fue?', 'How did it go?') }),
      [1, 2, 3, 4, 5].map(n => h('button', { class: 'btn', style: 'padding:2px 9px', text: n, onclick: ev => { state.q[curItem.i] = n; save(); renderProgress(); renderQuestions(); ev.target.parentElement.replaceChildren(h('span', { text: tr('Guardado: ', 'Saved: ') + n + '/5' })); } }))));
    drill.phase = 'review';
    $('#chatSend').textContent = drill.pos + 1 < drill.items.length ? tr('Siguiente pregunta', 'Next question') : tr('Terminar', 'Finish');
    return;
  }
  drill.pos++;
  if (drill.pos >= drill.items.length) {
    addMsg('assistant', tr('Simulacro terminado. Repasa las preguntas con puntuación baja en el banco de la izquierda.', 'Drill finished. Review the low-scored questions in the bank on the left.'));
    drill = null; $('#chatSend').disabled = true; $('#chatNote').textContent = ''; return;
  }
  drill.phase = 'answer';
  const it = drill.items[drill.pos];
  addMsg('assistant', `Q${drill.pos + 1}/${drill.items.length} · ${roundLabel(ROUNDS.find(r => r.k === it.q.r))}\n${it.q.q}`);
  $('#chatSend').textContent = tr('Enviar y ver puntos clave', 'Send and show key points');
  let left = 180;
  const tick = () => { $('#chatNote').textContent = tr('Tiempo: ', 'Time: ') + `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`; if (left-- <= 0) { clearInterval(drillTimer); $('#chatNote').textContent = tr('Tiempo. Cierra tu respuesta.', 'Time. Wrap up your answer.'); } };
  tick(); drillTimer = setInterval(tick, 1000);
  $('#chatIn').focus();
}

// ---------- Tutor IA (Claude inside Claude; Gemini with the student's own free key elsewhere) ----------
const GEMINI_KEY = 'qa-lab-gemini';
const GEMINI_MODELS = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.8-flash'];
const TUTOR_HIDDEN_KEY = 'qa-lab-tutor-hidden';
let tutorTurns = [];          // [{ role: 'user' | 'assistant', text }]
let tutorBusy = false;
let tutorAbort = null;
function geminiCfg() {
  try { const v = JSON.parse(localStorage.getItem(GEMINI_KEY) || 'null'); if (v && v.key) return v; } catch (e) { /* ignore */ }
  return null;
}
function tutorProvider() {
  if (sample) return 'claude';
  if (!IN_CLAUDE && geminiCfg()) return 'gemini';
  return 'none';
}
function tutorSystem() {
  return UI === 'en' ? [
    'You are a senior QA Automation tutor preparing a candidate for a Senior Test Automation interview (Playwright, JavaScript/TypeScript/Python, Java + Selenium).',
    'Always answer in English, clear and brief (about 150 words max unless asked for more).',
    'Do NOT give the full solution to the exercise unless explicitly asked; guide with hints, questions and the exact name of the methods or classes to use, with their official documentation when helpful.',
    'If there are errors in the code, point to the line and explain the cause. Use short ``` code blocks when you show code.',
    'When useful, mention how to phrase it in the interview.'
  ].join(' ') : [
    'Eres un tutor senior de QA Automation que prepara a una candidata para una entrevista de Senior Test Automation (Playwright, JavaScript/TypeScript/Python, Java + Selenium).',
    'Responde siempre en español, claro y breve (máximo ~150 palabras salvo que pidan más).',
    'NO entregues la solución completa del ejercicio a menos que la pidan explícitamente; guía con pistas, preguntas y el nombre exacto de los métodos o clases a usar, con su documentación oficial cuando ayude.',
    'Si hay errores en el código, señala la línea y explica la causa. Usa bloques de código cortos con ``` cuando muestres código.',
    'Cuando sea útil, menciona cómo lo explicaría en inglés en la entrevista.'
  ].join(' ');
}
function tutorContext() {
  const x = exView(cur);
  const en = UI === 'en';
  const langLabel = LANGS.find(l => l.k === state.lang).label;
  const examples = (x.examples || []).map((e, i) => en ? `Example ${i + 1}: input ${e.in} → output ${e.out}` : `Ejemplo ${i + 1}: entrada ${e.in} → salida ${e.out}`).join('\n');
  const result = [$('#repPill').textContent, $('#consoleOut').textContent, ...$$('#testRows .trow').map(r => r.textContent)].filter(Boolean).join('\n').slice(0, 1500);
  return [
    en ? '[Lab context]' : '[Contexto del laboratorio]',
    (en ? 'Exercise: ' : 'Ejercicio: ') + `${x.title} (${TAG_LABEL[x.tag]}, ${x.level})`,
    (en ? 'Statement: ' : 'Enunciado: ') + x.es,
    `Interview prompt: ${x.en}`,
    examples,
    x.rules ? (en ? 'Rules: ' : 'Reglas: ') + x.rules.join(' | ') : '',
    x.deliver ? (en ? 'Must include: ' : 'Debe incluir: ') + x.deliver.join(' | ') : '',
    (en ? 'Selected language: ' : 'Lenguaje seleccionado: ') + langLabel,
    (en ? "Student's current code:" : 'Código actual de la estudiante:') + '\n```\n' + editor.get().slice(0, 6000) + '\n```',
    result ? (en ? 'Last run result:\n' : 'Último resultado de ejecución:\n') + result : (en ? 'The code has not been run yet.' : 'Aún no ha ejecutado el código.')
  ].filter(Boolean).join('\n');
}
function renderInline(target, src) {
  for (const tok of src.split(/(`[^`]+`|\*\*.+?\*\*|\*[^*\s][^*]*\*)/)) {
    if (!tok) continue;
    if (tok.startsWith('`') && tok.endsWith('`') && tok.length > 1) target.append(h('code', { text: tok.slice(1, -1) }));
    else if (tok.startsWith('**') && tok.endsWith('**') && tok.length > 4) renderInline(target.appendChild(h('strong')), tok.slice(2, -2));
    else if (tok.startsWith('*') && tok.endsWith('*') && tok.length > 2) renderInline(target.appendChild(h('em')), tok.slice(1, -1));
    else target.append(document.createTextNode(tok));
  }
}
// tiny, safe markdown renderer (code fences, inline code, bold, bullet lists)
function renderMd(text) {
  const frag = document.createDocumentFragment();
  const parts = String(text).split(/```[\w-]*\n?/);
  parts.forEach((part, i) => {
    if (i % 2 === 1) { frag.append(h('pre', {}, h('code', { text: part.replace(/\n$/, '') }))); return; }
    let list = null;
    for (const raw of part.split('\n')) {
      const line = raw.trimEnd();
      if (!line.trim()) { list = null; continue; }
      const bullet = line.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)$/);
      const target = bullet ? (list ||= frag.appendChild(h('ul'))).appendChild(h('li')) : (list = null, frag.appendChild(h('p')));
      const src = bullet ? bullet[1] : line;
      renderInline(target, src);
    }
  });
  return frag;
}
function tutorMsg(role, text) {
  const el = h('div', { class: 'tmsg ' + (role === 'user' ? 'user' : role === 'error' ? 'err' : 'bot') });
  if (role === 'assistant') el.append(renderMd(text)); else el.textContent = text;
  $('#tutorMsgs').append(el); $('#tutorMsgs').scrollTop = 1e9;
  return el;
}
const tutorChips = () => UI === 'en' ? ['Explain the statement in other words', 'Give me a hint without the solution', 'Why are my tests failing?', 'Review my code', 'Which methods should I use?', 'What would they ask me about this in the interview?'] : ['Explícame el enunciado con otras palabras', 'Dame una pista sin la solución', '¿Por qué fallan mis tests?', 'Revisa mi código', '¿Qué métodos debería usar?', '¿Qué me preguntarían en la entrevista sobre esto?'];
function renderTutor() {
  const prov = tutorProvider();
  const hidden = (() => { try { return localStorage.getItem(TUTOR_HIDDEN_KEY) === '1'; } catch (e) { return false; } })();
  $('.lab').classList.toggle('tutor-off', hidden);
  $('#tutorShow').hidden = !hidden || state.view !== 'lab';
  $('#tutorProvider').textContent = prov === 'claude' ? tr('Con Claude · usa tu cuenta de Claude', 'With Claude · uses your Claude account') : prov === 'gemini' ? tr('Con Gemini · ', 'With Gemini · ') + geminiCfg().model : tr('Sin configurar', 'Not configured');
  $('#tutorSettingsBtn').hidden = prov !== 'gemini';
  $('#tutorChips').replaceChildren(...tutorChips().map(t => h('button', { type: 'button', text: t, onclick: () => tutorAsk(t) })));
  const setup = $('#tutorSetup');
  const ready = prov !== 'none';
  setup.hidden = ready;
  $('#tutorIn').disabled = !ready; $('#tutorSend').disabled = !ready || tutorBusy;
  $$('#tutorChips button').forEach(b => { b.disabled = !ready; });
  if (!ready) renderTutorSetup(setup);
  if (!$('#tutorMsgs').children.length) {
    $('#tutorMsgs').append(h('div', { class: 'tutor-empty' },
      h('p', { text: tr('Pregunta lo que necesites sobre el ejercicio abierto. El tutor ve el enunciado, tu código y el último resultado.', 'Ask anything about the open exercise. The tutor sees the statement, your code and the last result.') }),
      h('p', { text: tr('Está configurado para guiarte con pistas, no para darte la solución completa (pídela explícitamente si la quieres).', 'It is set up to guide you with hints, not to hand you the full solution (ask for it explicitly if you want it).') })));
  }
}
function renderTutorSetup(box) {
  box.replaceChildren();
  if (IN_CLAUDE) {
    box.append(h('h4', { text: tr('El tutor no está disponible en esta vista', 'The tutor is not available in this view') }),
      h('p', { text: tr('Dentro de Claude el tutor usa tu cuenta; parece que no está habilitado aquí. Puedes copiar tu pregunta con el contexto y pegarla en cualquier chat.', 'Inside Claude the tutor uses your account; it seems to be disabled here. You can copy your question with the context and paste it into any chat.') }),
      copyOpenButton());
    return;
  }
  const keyIn = h('input', { type: 'password', id: 'geminiKey', placeholder: tr('Pega tu API key de Gemini', 'Paste your Gemini API key'), autocomplete: 'off', 'aria-label': tr('API key de Gemini', 'Gemini API key') });
  const modelSel = h('select', { id: 'geminiModel', 'aria-label': tr('Modelo de Gemini', 'Gemini model') }, GEMINI_MODELS.map(m => h('option', { value: m, text: m })));
  const msg = h('p', { class: 'note' });
  box.append(
    h('h4', { text: tr('Activa el tutor gratis con Gemini', 'Turn on the free tutor with Gemini') }),
    h('ol', {},
      h('li', {}, tr('Entra a ', 'Go to '), h('a', { href: 'https://aistudio.google.com/apikey', target: '_blank', rel: 'noopener noreferrer', text: 'Google AI Studio → API keys' }), tr(' con tu cuenta de Google.', ' with your Google account.')),
      h('li', { text: tr('Crea una API key (el plan gratuito no pide tarjeta).', 'Create an API key (the free plan needs no card).') }),
      h('li', { text: tr('Pégala aquí y guarda.', 'Paste it here and save.') })),
    keyIn, modelSel,
    h('div', { class: 'row' },
      h('button', { class: 'btn primary', type: 'button', text: tr('Guardar y activar', 'Save and activate'), onclick: () => {
        const key = keyIn.value.trim();
        if (key.length < 20) { msg.textContent = tr('Esa clave parece incompleta. Cópiala completa desde AI Studio.', 'That key looks incomplete. Copy the whole key from AI Studio.'); return; }
        try { localStorage.setItem(GEMINI_KEY, JSON.stringify({ key, model: modelSel.value })); } catch (e) { msg.textContent = tr('Este navegador no permite guardar la clave.', 'This browser does not allow saving the key.'); return; }
        renderTutor();
      } })),
    h('p', { class: 'note', text: tr('La clave se guarda solo en este navegador y se envía directamente a Google; este sitio no tiene servidor. No la subas al repositorio. En el plan gratuito Google puede usar el contenido para mejorar sus productos.', 'The key is stored only in this browser and sent directly to Google; this site has no server. Do not commit it to the repository. On the free plan Google may use the content to improve its products.') }),
    msg,
    h('p', { class: 'note', text: tr('¿Sin clave? También puedes copiar tu pregunta con todo el contexto y abrir Gemini:', 'No key? You can also copy your question with all the context and open Gemini:') }),
    copyOpenButton());
}
function copyOpenButton() {
  const a = h('a', { class: 'btn', href: IN_CLAUDE ? 'https://claude.ai/new' : 'https://gemini.google.com/app', target: '_blank', rel: 'noopener noreferrer', text: IN_CLAUDE ? tr('Copiar contexto y abrir Claude', 'Copy context and open Claude') : tr('Copiar contexto y abrir Gemini', 'Copy context and open Gemini') });
  a.addEventListener('click', () => {
    const q = $('#tutorIn').value.trim() || tr('Ayúdame con este ejercicio sin darme la solución completa.', 'Help me with this exercise without giving me the full solution.');
    const text = tutorSystem() + '\n\n' + tutorContext() + tr('\n\nPregunta: ', '\n\nQuestion: ') + q;
    try { navigator.clipboard.writeText(text).then(() => { $('#tutorNote').textContent = tr('Contexto copiado: pégalo en el chat que se abrió.', 'Context copied: paste it into the chat that opened.'); }, () => { $('#tutorNote').textContent = tr('No se pudo copiar automáticamente.', 'Could not copy automatically.'); }); } catch (e) { /* ignore */ }
  });
  return a;
}
async function tutorAsk(textArg) {
  const prov = tutorProvider();
  const text = (textArg || $('#tutorIn').value).trim();
  if (!text || tutorBusy || prov === 'none') return;
  $('.tutor-empty')?.remove();
  $('#tutorIn').value = '';
  tutorMsg('user', text);
  tutorTurns.push({ role: 'user', text });
  tutorBusy = true; $('#tutorSend').disabled = true; $('#tutorNote').textContent = '';
  const bubble = tutorMsg('assistant', '');
  bubble.append(h('span', { class: 'thinking', text: tr('Pensando…', 'Thinking…') }));
  // the latest user turn carries fresh context (exercise, code, last result)
  const turns = tutorTurns.map((t, i) => ({ role: t.role, text: i === tutorTurns.length - 1 ? tutorContext() + tr('\n\nPregunta: ', '\n\nQuestion: ') + t.text : t.text }));
  const paint = full => { bubble.replaceChildren(renderMd(full)); $('#tutorMsgs').scrollTop = 1e9; };
  try {
    const answer = prov === 'claude' ? await askClaudeTutor(turns, paint) : await askGemini(turns, paint);
    paint(answer || tr('(sin respuesta)', '(no answer)'));
    tutorTurns.push({ role: 'assistant', text: answer || '' });
  } catch (e) {
    tutorTurns.pop();
    bubble.remove();
    tutorMsg('error', e.message || String(e));
  } finally { tutorBusy = false; $('#tutorSend').disabled = false; tutorAbort = null; }
}
async function askClaudeTutor(turns, onPartial) {
  const input = turns.map((t, i) => ({ role: t.role, content: i === 0 ? tutorSystem() + '\n\n' + t.text : t.text }));
  try {
    const r = await sample(input, { onText: ({ text }) => onPartial(text), cache: false, modelTier: 'default' });
    return r.text;
  } catch (e) {
    if (e?.code === 'not_granted') throw new Error(tr('Claude no tiene permiso en esta vista.', 'Claude has no permission in this view.'));
    if (e?.code === 'rate_limited') throw new Error(tr('Demasiadas preguntas seguidas. Espera un momento.', 'Too many questions in a row. Wait a moment.'));
    throw new Error(tr('No se pudo obtener respuesta: ', 'Could not get an answer: ') + (e?.message || e));
  }
}
async function askGemini(turns, onPartial) {
  const cfg = geminiCfg();
  tutorAbort = new AbortController();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(cfg.model)}:streamGenerateContent?alt=sse`;
  let res;
  try {
    res = await fetch(url, {
      method: 'POST', signal: tutorAbort.signal,
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': cfg.key },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: tutorSystem() }] },
        contents: turns.map(t => ({ role: t.role === 'assistant' ? 'model' : 'user', parts: [{ text: t.text }] })),
        generationConfig: { temperature: 0.4, maxOutputTokens: 1200 }
      })
    });
  } catch (e) { throw new Error(tr('No se pudo conectar con Gemini. Revisa tu conexión.', 'Could not connect to Gemini. Check your connection.')); }
  if (!res.ok) {
    let detail = '';
    try { detail = (await res.json())?.error?.message || ''; } catch (e) { /* ignore */ }
    if (res.status === 400 || res.status === 401 || res.status === 403) throw new Error(tr('Gemini rechazó la clave o el modelo (', 'Gemini rejected the key or the model (') + res.status + tr('). Revisa la configuración. ', '). Check the settings. ') + detail);
    if (res.status === 404) throw new Error(tr('El modelo ', 'The model ') + cfg.model + tr(' no está disponible para tu clave. Elige otro en Configurar.', ' is not available for your key. Pick another one in Settings.'));
    if (res.status === 429) throw new Error(tr('Llegaste al límite gratuito de Gemini por ahora. Espera un rato o cambia de modelo.', 'You reached the Gemini free limit for now. Wait a while or switch models.'));
    throw new Error(tr('Error de Gemini (', 'Gemini error (') + res.status + '). ' + detail);
  }
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '', full = '';
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let i;
    while ((i = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
      if (!line.startsWith('data:')) continue;
      try {
        const j = JSON.parse(line.slice(5));
        const piece = (j.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('');
        if (piece) { full += piece; onPartial(full); }
      } catch (e) { /* partial line */ }
    }
  }
  return full;
}
$('#tutorSend').addEventListener('click', () => tutorAsk());
$('#tutorIn').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); tutorAsk(); } });
$('#tutorNew').addEventListener('click', () => { tutorAbort?.abort(); tutorTurns = []; $('#tutorMsgs').replaceChildren(); $('#tutorNote').textContent = ''; renderTutor(); });
$('#tutorHide').addEventListener('click', () => { try { localStorage.setItem(TUTOR_HIDDEN_KEY, '1'); } catch (e) { /* ignore */ } renderTutor(); });
$('#tutorShow').addEventListener('click', () => { try { localStorage.removeItem(TUTOR_HIDDEN_KEY); } catch (e) { /* ignore */ } renderTutor(); });
$('#tutorSettingsBtn').addEventListener('click', () => {
  let armed = $('#tutorSettingsBtn').dataset.armed === '1';
  if (!armed) { $('#tutorSettingsBtn').dataset.armed = '1'; $('#tutorSettingsBtn').textContent = tr('¿Quitar clave?', 'Remove key?'); setTimeout(() => { $('#tutorSettingsBtn').dataset.armed = ''; $('#tutorSettingsBtn').textContent = tr('Configurar', 'Settings'); }, 4000); return; }
  try { localStorage.removeItem(GEMINI_KEY); } catch (e) { /* ignore */ }
  $('#tutorSettingsBtn').dataset.armed = ''; $('#tutorSettingsBtn').textContent = tr('Configurar', 'Settings');
  renderTutor();
});

// ---------- theme ----------
const THEME_KEY = 'qa-lab-theme';
const systemDark = () => window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
function currentTheme() {
  const t = document.documentElement.getAttribute('data-theme');
  return t === 'light' || t === 'dark' ? t : (systemDark() ? 'dark' : 'light');
}
function applyTheme(t, persist) {
  document.documentElement.setAttribute('data-theme', t);
  if (persist) { try { localStorage.setItem(THEME_KEY, t); } catch (e) { /* ignore */ } }
  $$('[data-theme-set]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.themeSet === t)));
}
$$('[data-theme-set]').forEach(b => b.addEventListener('click', () => applyTheme(b.dataset.themeSet, true)));
applyTheme(currentTheme(), false);

// ---------- language switch ----------
function applyStatic() {
  document.documentElement.lang = UI;
  $$('[data-en]').forEach(el => {
    if (el.dataset.es === undefined) el.dataset.es = el.textContent;
    el.textContent = UI === 'en' ? el.dataset.en : el.dataset.es;
  });
  for (const [attr, enKey, esKey] of [['aria-label', 'enAria', 'esAria'], ['placeholder', 'enPh', 'esPh'], ['title', 'enTitle', 'esTitle']]) {
    $$('[data-' + enKey.replace(/[A-Z]/g, c => '-' + c.toLowerCase()) + ']').forEach(el => {
      if (el.dataset[esKey] === undefined) el.dataset[esKey] = el.getAttribute(attr) || '';
      el.setAttribute(attr, UI === 'en' ? el.dataset[enKey] : el.dataset[esKey]);
    });
  }
  if (cm) cm.getInputField().setAttribute('aria-label', tr('Editor de código', 'Code editor'));
  $$('[data-lang-set]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.langSet === UI)));
}
function setLang(l) {
  if (l !== 'es' && l !== 'en') return;
  UI = l;
  try { localStorage.setItem(UI_KEY, l); } catch (e) { /* ignore */ }
  applyStatic();
  stashCode();
  renderAll();
  $$('nav.tabs button').forEach(b => { if (b.dataset.view === state.view) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
}
$$('[data-lang-set]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.langSet)));

// ---------- boot ----------
function renderAll() {
  cur = EX.find(x => x.id === state.exId) || EX[0];
  renderHome(); renderRoute(); renderFilters(); renderExList(); renderExCard(); renderLangBar(); loadCode(); clearReport();
  renderQFilter(); renderQuestions(); renderRounds(); setupMock(); renderProgress(); renderTutor();
}
applyStatic();
renderAll();
const hash = (location.hash || '').replace('#', '');
show(['home', 'route', 'lab', 'interview'].includes(hash) ? hash : state.view);

if (IN_CLAUDE && typeof window.claude.use === 'function') {
  window.claude.use('sample').then(s => {
    if (!s) return;
    sample = s;
    document.documentElement.classList.add('has-ai');
    renderLangBar(); renderQuestions(); setupMock(); renderHome(); renderTutor();
  }).catch(() => {});
}
// expose for automated tests
window.__qaLab = { state: () => state, KEY, lang: () => UI, getCode: () => editor.get(), setCode: v => { editor.set(v); stashCode(); }, hasCodeMirror: () => !!cm };
})();
