// Regenerates exercises/<id>/README.md from js/data/exercises.js so every
// exercise can also be studied and run locally, outside the browser.
// Usage: node scripts/export-exercises.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import vm from 'node:vm';

const src = readFileSync(new URL('../js/data/exercises.js', import.meta.url), 'utf8');
const ctx = {};
vm.runInNewContext(src + '\n;globalThis.__EX = EX;', ctx);
const EX = ctx.__EX;

const LANGS = [['java', 'Java', 'java'], ['python', 'Python', 'python'], ['ts', 'TypeScript', 'ts'], ['js', 'JavaScript', 'js']];
const root = new URL('../exercises/', import.meta.url);
rmSync(root, { recursive: true, force: true });
mkdirSync(root, { recursive: true });

const index = ['# Ejercicios', '', 'Generado desde `js/data/exercises.js` con `npm run export:exercises`.', '', '| # | Ejercicio | Bloque | Nivel | Lenguajes |', '|---|---|---|---|---|'];
EX.forEach((x, i) => {
  const dir = new URL(`${String(i + 1).padStart(2, '0')}-${x.id}/`, root);
  mkdirSync(dir, { recursive: true });
  const langs = LANGS.filter(([k]) => x[k]);
  const md = [`# ${x.title}`, '', `**Bloque:** ${x.tag} · **Nivel:** ${x.level}`, '', x.es, '', `> **Interview prompt:** ${x.en}`, '',
    ...(x.examples || []).flatMap((e, j) => [`### Ejemplo ${j + 1}`, '', '**Entrada**', '', '```', e.in, '```', '', '**Salida esperada**', '', '```', e.out, '```', '', ...(e.why ? [e.why, ''] : [])]),
    ...(x.rules ? ['### Reglas y casos borde', '', ...x.rules.map(r => '- ' + r), ''] : []),
    ...(x.deliver ? ['### Qué debe incluir tu solución', '', ...x.deliver.map((r, j) => `${j + 1}. ${r}`), ''] : []),
    `<details><summary>Pista: guía paso a paso</summary>\n\n${x.hint}\n\n${(x.guide?.steps || []).map((s, j) => `${j + 1}. ${s}`).join('\n')}\n\n</details>`, '', `**Follow-up:** ${x.follow}`, ''];
  for (const [k, label, fence] of langs) {
    const docs = x.guide?.[k] || [];
    md.push(`## ${label}`, '', ...(docs.length ? ['### Documentación para estudiar', '', ...docs.map(([n, u, d]) => `- [\`${n}\`](${u})${d ? ' — ' + d : ''}`), ''] : []), '### Plantilla', '', '```' + fence, x[k].starter, '```', '');
    if (x[k].tests) md.push('### Tests', '', ...x[k].tests.map(([e, v]) => `- \`${e}\` → \`${v}\``), '');
    if (x[k].solution) md.push('<details><summary>Solución de referencia</summary>', '', '```' + fence, x[k].solution, '```', '', '</details>', '');
  }
  writeFileSync(new URL('README.md', dir), md.join('\n'));
  index.push(`| ${i + 1} | [${x.title}](./${String(i + 1).padStart(2, '0')}-${x.id}/README.md) | ${x.tag} | ${x.level} | ${langs.map(l => l[1]).join(', ')} |`);
});
writeFileSync(new URL('README.md', root), index.join('\n') + '\n');
console.log('Exported', EX.length, 'exercises');
