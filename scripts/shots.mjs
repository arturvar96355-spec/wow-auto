import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';
const url = process.argv[2] ?? 'http://localhost:3000';
const path = process.argv[3] ?? '/';
const name = process.argv[4] ?? 'home';
const widths = (process.argv[5] ?? '360,390,768,1024,1440,1920').split(',').map(Number);
mkdirSync('shots', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined) });
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  page.on('pageerror', (e) => console.warn('pageerror', e.message));
  page.on('console', (m) => m.type() === 'error' && console.warn('console.error', m.text()));
  await page.goto(url + path, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `shots/${name}-${w}.png`, fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  if (overflow) console.warn(`⚠ горизонтальный скролл на ${w}px`);
  await page.close();
}
await browser.close();
