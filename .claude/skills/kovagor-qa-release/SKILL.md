---
name: kovagor-qa-release
description: Проверка качества и выпуск сайта-концепта Kovagor — скриншоты Playwright на всех ширинах, Lighthouse, чек-лист приёмки, статическая сборка и деплой на Cloudflare Pages. Использовать после каждой крупной секции и перед сдачей.
---

# Проверка и выпуск

## 1. Скриншоты после каждой крупной секции

Playwright уже установлен в окружении (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`). Не запускай `playwright install`.

`scripts/shots.mjs`:

```js
import { chromium } from 'playwright';
const url = process.argv[2] ?? 'http://localhost:3000';
const widths = [360, 390, 768, 1024, 1440, 1920];
const browser = await chromium.launch();
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `shots/home-${w}.png`, fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  if (overflow) console.warn(`⚠ горизонтальный скролл на ${w}px`);
  await page.close();
}
await browser.close();
```

Запуск: `npm run dev` в фоне → `node scripts/shots.mjs`. **Открой скриншоты 390 и 1440 и посмотри на них** (Read tool). Исправь всё, что выглядит хуже, чем в хорошей студии.

Смотреть на:
- выравнивание и ритм отступов;
- переносы заголовков (одно слово на строке — плохо);
- контраст текста на фото;
- не перекрывает ли нижняя мобильная панель контент;
- заглушки видны и аккуратны.

## 2. Lighthouse

```bash
npx lighthouse http://localhost:3000 --form-factor=mobile --screenEmulation.mobile \
  --only-categories=performance,accessibility,best-practices --output=json --output-path=./lh.json --quiet \
  --chrome-flags="--headless --no-sandbox" --chrome-path=/opt/pw-browsers/chromium
```

Минимум (mobile): Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95. SEO снижен из-за noindex — это нормально. Если путь к Chromium другой — найди его через `ls /opt/pw-browsers`.

## 3. Чек-лист приёмки

- [ ] Все факты из части А промпта; всё прочее — видимые `[заглушки]`
- [ ] Нет выдуманных отзывов, цифр, сроков, гарантий
- [ ] «Вы/Вам/Ваш» с заглавной; типограф прогнан по всем текстам
- [ ] Hero-анимация, reveal секций, минимум одна scroll-сцена с pin/scrub
- [ ] Все виджеты работают мышью, тачем и с клавиатуры (Tab, Enter, стрелки, Esc)
- [ ] `prefers-reduced-motion` отключает тяжёлое движение
- [ ] 360 px — без горизонтального скролла
- [ ] Формы: валидация, состояние успеха, правильный текст заявки
- [ ] noindex, robots.txt, метка концепта
- [ ] Нет логотипов чужих брендов
- [ ] Lighthouse в норме
- [ ] `README.md` (запуск, сборка, деплой, список заглушек), `DECISIONS.md`, `content/credits.ts` (источники стоковых фото)

## 4. Статическая сборка

`next.config.ts`:

```ts
const config = { output: 'export', images: { unoptimized: true }, trailingSlash: true };
export default config;
```

`npm run build` → папка `out/`. Проверка: `npx serve out` и пройти по всем страницам.

## 5. Деплой (бесплатно)

**Cloudflare Pages** (основной вариант):
1. Создать репозиторий на GitHub и отправить код.
2. В Cloudflare → Workers & Pages → Create → Pages → Connect to Git.
3. Framework preset: Next.js (Static HTML Export). Build command: `npm run build`. Output: `out`.
4. Адрес вида `wowauto-concept.pages.dev`. В названии проекта не использовать бренд клиента целиком, если он против; по умолчанию: `<клиент>-concept`.

**Запасной — GitHub Pages:** GitHub Actions с `actions/upload-pages-artifact` для папки `out`. Если сайт не в корне домена — задать `basePath` в `next.config.ts`.

**Vercel** — только как запасной: из России открывается нестабильно.

После деплоя: открыть ссылку с телефона через мобильный интернет **без VPN** и проверить загрузку, шрифты, виджеты и форму.
