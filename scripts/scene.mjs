import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
const browser = await chromium.launch({ executablePath: existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('pageerror', (e) => console.warn('pageerror', e.message));
page.on('console', (m) => m.type() === 'error' && console.warn('console.error', m.text()));
await page.goto((process.argv[2] ?? 'http://localhost:3100') + '/', { waitUntil: 'networkidle' });
const top = await page.evaluate(() => document.getElementById('kak-prohodit').getBoundingClientRect().top + scrollY);
for (const [i, off] of [0, 0.45, 1.0, 2.1].entries()) {
  await page.evaluate((y) => window.scrollTo(0, y), top + off * 900);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `shots/scene-${i}.png` });
}
await browser.close();
