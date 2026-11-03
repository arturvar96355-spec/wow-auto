export type ServicePageData = {
  slug: string; title: string; h1: string; lead: string; widget: 'tint' | 'lamp' | 'ppf' | 'ba-polish' | 'ba-clean';
  widgetTitle: string; includes: string[]; time: { label: string; value: string | null }[]; tag: string; service: string;
};

export const pages: ServicePageData[] = [
  { slug: 'tonirovka', title: 'Тонировка', h1: 'Тонировка в Марьино', tag: 'tint', service: 'Тонировка', widget: 'tint',
    lead: 'Примерьте затемнение на стекло и увидьте цену «от» до звонка.', widgetTitle: 'Примерка тонировки',
    includes: ['Задняя полусфера', 'По кругу', 'Передние боковые', 'Тонировка оптики', 'Полоса на лобовое', 'Съёмная тонировка', 'Снятие тонировки'],
    time: [{ label: 'Два передних стекла', value: '15–20 минут' }, { label: 'Задняя полусфера', value: 'около 40 минут' }, { label: 'По кругу', value: 'около часа' }] },
  { slug: 'zashchitnaya-plenka', title: 'Защитная плёнка', h1: 'Защитные плёнки на кузов', tag: 'ppf', service: 'Защитная плёнка', widget: 'ppf',
    lead: 'Выберите зоны на схеме. Цену «от» покажем после того, как заполним прайс.', widgetTitle: 'Калькулятор защитной плёнки',
    includes: ['Зоны риска', 'Передок', 'Полный кузов', 'Фары', 'Матовая броня'],
    time: [{ label: 'Бронирование кузова', value: '1–2 дня' }] },
  { slug: 'atermalnaya-plenka', title: 'Атермальная плёнка', h1: 'Атермальная плёнка: меньше жарит в салоне', tag: 'athermal', service: 'Атермальная плёнка', widget: 'lamp',
    lead: 'Сравните обычную, металлизированную и керамическую плёнку.', widgetTitle: 'Лампа: сравнение плёнок',
    includes: ['Атермальные плёнки', 'Керамические плёнки', 'Передние боковые', 'Лобовое'],
    time: [{ label: 'Время работ', value: null }] },
  { slug: 'polirovka-i-keramika', title: 'Полировка и керамика', h1: 'Полировка и керамика кузова и фар', tag: 'polish', service: 'Полировка и керамика', widget: 'ba-polish',
    lead: 'Вернём блеск лаку и фарам. Керамика защитит результат.', widgetTitle: 'До и после',
    includes: ['Полировка кузова', 'Полировка фар', 'Керамическое покрытие кузова', 'Керамическое покрытие фар', 'Материалы: Ceramic Pro 9H, Aquapel'],
    time: [{ label: 'Время работ', value: null }] },
  { slug: 'himchistka', title: 'Химчистка салона', h1: 'Химчистка салона', tag: 'clean', service: 'Химчистка салона', widget: 'ba-clean',
    lead: 'Цену «от» и состав работ укажем до визита.', widgetTitle: 'До и после',
    includes: ['Салон', 'Багажник', 'Потолок'],
    time: [{ label: 'Время работ', value: null }] },
];
