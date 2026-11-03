import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const out = new Set();
function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx|md|mdx)$/.test(f))
      for (const m of readFileSync(p, 'utf8').matchAll(/\[([^\]\n]{3,120}?)\]/g))
        if (/[а-яё]/i.test(m[1])) out.add(m[1]);
  }
}
['content', 'components', 'app'].forEach((d) => { try { walk(d); } catch {} });
console.log([...out].sort().map((s) => `- [ ] ${s}`).join('\n'));
