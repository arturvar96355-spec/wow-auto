import { typograph as t } from '@/lib/typograph';

export type Service = {
  id: string; title: string; short: string; href: string; time: string | null; priceFrom: number | null;
};

export const services: Service[] = [
  { id: 'tint', title: 'Тонировка', short: t('Задняя полусфера, по кругу, передние боковые, оптика, снятие.'), href: '/tonirovka/', time: 'от 15 минут', priceFrom: null },
  { id: 'athermal', title: 'Атермальная плёнка', short: t('Керамика на лобовое и боковые. Меньше жарит в салоне.'), href: '/atermalnaya-plenka/', time: null, priceFrom: null },
  { id: 'ppf', title: 'Защитная плёнка', short: t('Зоны риска, передок, полный кузов, фары, матовая броня.'), href: '/zashchitnaya-plenka/', time: 'бронь кузова — 1–2 дня', priceFrom: null },
  { id: 'polish', title: 'Полировка и керамика', short: t('Кузов и фары. Керамическое покрытие.'), href: '/polirovka-i-keramika/', time: null, priceFrom: null },
  { id: 'clean', title: 'Химчистка салона', short: t('Салон, багажник, потолок.'), href: '/himchistka/', time: null, priceFrom: null },
  { id: 'vinyl', title: 'Винил и антихром', short: t('Оклейка цветом, крыши и эмблем, антихром.'), href: '/ceny/#vinyl', time: null, priceFrom: null },
];

export type PriceGroup = { id: string; title: string; rows: string[] };
export const priceGroups: PriceGroup[] = [
  { id: 'tint', title: 'Тонировка', rows: ['Задняя полусфера', 'По кругу', 'Передние боковые', 'Оптика', 'Полоса на лобовое', 'Съёмная тонировка', 'Снятие тонировки'] },
  { id: 'athermal', title: 'Атермальные и керамические плёнки', rows: ['Передние боковые', 'Лобовое'] },
  { id: 'ppf', title: 'Защитные полиуретановые плёнки', rows: ['Зоны риска', 'Передок', 'Полный кузов', 'Фары', 'Матовая броня'] },
  { id: 'vinyl', title: 'Винил и антихром', rows: ['Оклейка винилом', 'Антихром', 'Оклейка крыши', 'Оклейка эмблем'] },
  { id: 'polish', title: 'Полировка и керамика', rows: ['Полировка кузова', 'Полировка фар', 'Керамика кузова', 'Керамика фар'] },
  { id: 'clean', title: 'Химчистка', rows: ['Химчистка салона'] },
  { id: 'other', title: 'Другое', rows: ['Ремонт сколов лобового стекла', 'Чехлы «Автопилот» с установкой', 'Мойка', 'Шиномонтаж'] },
];
export const bookingServices = [...services.map((s) => s.title), 'Консультация: сравнение плёнок', 'Другое'];
