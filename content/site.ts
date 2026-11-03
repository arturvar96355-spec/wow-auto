import { typograph as t } from '@/lib/typograph';

/** Заглушка: строка в квадратных скобках — отображается компонентом <Placeholder>. */
export const ph = (s: string) => `[${s}]`;

export const site = {
  name: 'WoW auto',
  legalName: ph('юрлицо — от клиента'),
  tagline: t('Тонировка и защитные плёнки в Марьино'),
  lead: t('Покажем разницу плёнок до того, как Вы заплатите. Тонировка — от 15 минут, бесплатная мойка после работ'),
  address: 'Москва, Братиславская ул., 30',
  district: 'Марьино, ЮВАО',
  phone: '+7 (495) 150-20-10',
  phoneHref: 'tel:+74951502010',
  messenger: { kind: 'whatsapp' as const, number: null as string | null, placeholder: ph('номер WhatsApp — от клиента') },
  hours: { open: 9, close: 21, label: 'Ежедневно 9:00–21:00', note: ph('режим — уточнить') },
  payment: ph('способы оплаты — уточнить'),
  rating: { value: '5.0', marks: 949, reviews: 613 },
  mapsUrl: 'https://yandex.com/maps/org/wow_auto/1715708236/',
  reviewsUrl: 'https://yandex.com/maps/org/wow_auto/1715708236/reviews/',
  navigatorUrl: 'https://yandex.ru/maps/?text=' + encodeURIComponent('Москва, Братиславская ул., 30'),
  conceptNote: 'Концепт сайта, подготовлен для WoW auto студией Kovagor. Не является официальным сайтом компании',
} as const;

export const nav = [
  { href: '/tonirovka/', label: 'Тонировка' },
  { href: '/zashchitnaya-plenka/', label: 'Плёнка' },
  { href: '/atermalnaya-plenka/', label: 'Атермалка' },
  { href: '/polirovka-i-keramika/', label: 'Полировка' },
  { href: '/ceny/', label: 'Цены' },
  { href: '/kak-zaekhat/', label: 'Как заехать' },
] as const;
