// Находит все заглушки: [текст] в строках и <Placeholder>текст</Placeholder> в JSX.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const out = new Set();
function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx|md|mdx)$/.test(f)) {
      const src = readFileSync(p, 'utf8');
      for (const m of src.matchAll(/\[([^\]\n]{3,120}?)\]/g))
        if (/[а-яё]/i.test(m[1]) && !/['"`{}()=;]|\.\.\.|\.map/.test(m[1]) && !m[1].includes(',')) out.add(m[1].trim());
      for (const m of src.matchAll(/ph\('([^']+)'\)/g)) out.add(m[1].trim());
      for (const m of src.matchAll(/<Placeholder>([^<{]{2,120})<\/Placeholder>/g)) out.add(m[1].trim());
    }
  }
}
['content', 'components', 'app'].forEach((d) => { try { walk(d); } catch {} });
console.log([...out].sort((a, b) => a.localeCompare(b, 'ru')).map((s) => `- [ ] ${s}`).join('\n'));
