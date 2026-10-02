// Builds dist/qa-automation-lab.html: one self-contained file (CSS + JS inlined).
// Usage: node scripts/build-single.mjs [--fragment]
//   --fragment  omits <!doctype>/<html>/<head>/<body> (for hosts that add their own skeleton)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const fragment = process.argv.includes('--fragment');
const read = p => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
let html = read('index.html');

html = html.replace('<link rel="stylesheet" href="css/styles.css">', () => '<style>\n' + read('css/styles.css') + '</style>');
html = html.replace(/<script src="(js\/[^"]+)"><\/script>/g, (_, src) => '<script>\n' + read(src).replace(/<\/script/gi, '<\\/script') + '\n</script>');

if (fragment) {
  const title = html.match(/<title>.*?<\/title>/)[0];
  const links = [...html.matchAll(/<link rel="(?:preconnect|stylesheet)"[^>]*>/g)].map(m => m[0]).join('\n');
  const style = html.match(/<style>[\s\S]*?<\/style>/)[0];
  const body = html.slice(html.indexOf('<body>') + 6, html.lastIndexOf('</body>'));
  html = [title, links, style, body.trim()].join('\n');
}

mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
const out = new URL('../dist/' + (fragment ? 'fragment.html' : 'qa-automation-lab.html'), import.meta.url);
writeFileSync(out, html);
console.log('Built', out.pathname, (html.length / 1024).toFixed(0) + ' KB');
