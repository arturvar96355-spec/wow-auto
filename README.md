# WoW auto — концепт сайта

Тонировка и защитные плёнки в Марьино. Статический сайт на Next.js 16 (`output: 'export'`).

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # статическая сборка в out/
npm run placeholders # список всех заглушек [ … ] — что запросить у клиента
```

Тексты, цены и контакты лежат в `content/`. Решения — в `DECISIONS.md`, план — в `docs/PLAN.md`.
Деплой: Cloudflare Pages (build `npm run build`, output `out`) или GitHub Pages (`NEXT_PUBLIC_BASE_PATH=/wow-auto`).
