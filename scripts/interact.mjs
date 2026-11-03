import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
const base = process.argv[2] ?? 'http://localhost:3100';
const browser = await chromium.launch({ executablePath: existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', (e) => errs.push('pageerror ' + e.message));
page.on('console', (m) => m.type() === 'error' && errs.push('console ' + m.text()));
const ok = (c, msg) => console.log((c ? 'PASS ' : 'FAIL ') + msg);
await page.goto(base + '/', { waitUntil: 'networkidle' });

// Примерка
await page.locator('#tint-level').scrollIntoViewIfNeeded();
await page.locator('#tint-level').focus();
for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowLeft');
ok((await page.locator('#tint-level').inputValue()) === '0', 'ползунок: клавиатура ← ×3 → 5%');
await page.getByRole('button', { name: 'Передние боковые' }).first().click();
await page.waitForTimeout(500);
ok(await page.getByText(/018\/2011/).first().isVisible(), 'передние стёкла: показана норма-заглушка');
await page.getByRole('button', { name: 'Записаться на тонировку' }).click();
await page.waitForTimeout(900);
ok((await page.locator('#f-service').inputValue()) === 'Тонировка', 'примерка → форма: услуга предзаполнена');
ok(await page.getByText(/Передние боковые, светопропускание 5%/).isVisible(), 'примерка → форма: выбор в заявке');

// Лампа
await page.getByRole('tab', { name: 'Керамическая атермальная' }).click();
await page.waitForTimeout(700);
ok(await page.getByText(/из отзыва клиента/).isVisible(), 'лампа: цитата под керамикой');

// Калькулятор
await page.getByRole('button', { name: 'Весь кузов' }).click();
ok(await page.getByText('Выбрано: 9').isVisible(), 'калькулятор: пресет «Весь кузов» = 9 зон');
await page.getByRole('button', { name: 'Капот', exact: true }).first().focus();
await page.keyboard.press('Enter');
ok(await page.getByText('Выбрано: 8').isVisible(), 'калькулятор: зона SVG с клавиатуры (Enter) снимается');
ok(await page.getByText('Цена — после осмотра').isVisible(), 'калькулятор: цены null → «после осмотра»');

// До и после
const slider = page.getByRole('slider', { name: 'Сравнение до и после' });
await slider.scrollIntoViewIfNeeded(); await page.waitForTimeout(1800);
await slider.focus(); await page.keyboard.press('Home');
ok((await slider.getAttribute('aria-valuenow')) === '0', 'до/после: Home → 0');
await page.keyboard.press('End');
ok((await slider.getAttribute('aria-valuenow')) === '100', 'до/после: End → 100');

// Форма
await page.locator('#zapis').scrollIntoViewIfNeeded();
await page.getByRole('button', { name: 'Отправить заявку' }).click();
ok(await page.getByText('Введите имя').isVisible(), 'форма: валидация имени');
await page.fill('#f-name', 'Иван'); await page.fill('#f-phone', '+7 900 123-45-67');
await page.getByRole('button', { name: 'Отправить заявку' }).click();
await page.waitForTimeout(900);
ok(await page.getByText('Заявка готова').isVisible(), 'форма: состояние успеха');
ok((await page.locator('pre').innerText()).includes('Телефон: +7 900 123-45-67'), 'форма: текст заявки собран');

// Навигация/меню на мобильном
const m = await browser.newPage({ viewport: { width: 390, height: 800 } });
await m.goto(base + '/', { waitUntil: 'networkidle' });
await m.getByRole('button', { name: 'Открыть меню' }).click();
ok(await m.getByRole('link', { name: 'Тонировка' }).first().isVisible(), 'моб. меню открывается');
await m.keyboard.press('Escape');
ok(!(await m.getByLabel('Мобильное').isVisible().catch(() => false)), 'моб. меню закрывается по Esc');

console.log(errs.length ? 'ОШИБКИ КОНСОЛИ:\n' + errs.join('\n') : 'Ошибок в консоли нет');
await browser.close();
