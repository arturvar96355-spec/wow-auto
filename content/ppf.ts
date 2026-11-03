export type CarClass = 'sedan' | 'crossover' | 'suv';
export type ZoneId = 'hood' | 'front-bumper' | 'headlights' | 'fenders' | 'mirrors' | 'pillars' | 'sills' | 'rear-bumper' | 'roof';

export const carClasses: { id: CarClass; label: string }[] = [
  { id: 'sedan', label: 'Седан / хэтчбек' },
  { id: 'crossover', label: 'Кроссовер' },
  { id: 'suv', label: 'Внедорожник / минивэн' },
];
export const ppfZones: { id: ZoneId; label: string }[] = [
  { id: 'hood', label: 'Капот' },
  { id: 'front-bumper', label: 'Передний бампер' },
  { id: 'headlights', label: 'Фары' },
  { id: 'fenders', label: 'Передние крылья' },
  { id: 'mirrors', label: 'Зеркала' },
  { id: 'pillars', label: 'Стойки' },
  { id: 'sills', label: 'Пороги' },
  { id: 'rear-bumper', label: 'Задний бампер' },
  { id: 'roof', label: 'Крыша' },
];
export const ppfPresets: { id: string; label: string; zones: ZoneId[] }[] = [
  { id: 'risk', label: 'Зоны риска', zones: ['hood', 'front-bumper', 'headlights', 'mirrors', 'pillars'] },
  { id: 'front', label: 'Передок', zones: ['hood', 'front-bumper', 'headlights', 'fenders'] },
  { id: 'full', label: 'Весь кузов', zones: ppfZones.map((z) => z.id) },
];
export const ppfFinishes = [
  { id: 'gloss', label: 'Глянцевая' },
  { id: 'matte', label: 'Матовая' },
] as const;
export type Finish = (typeof ppfFinishes)[number]['id'];

/** Цена по классу × зона. По умолчанию null — цены от клиента. */
export const ppfPrices: Record<CarClass, Partial<Record<ZoneId, number | null>>> = {
  sedan: {}, crossover: {}, suv: {},
};
export const ppfMatteExtra: number | null = null;

export function ppfTotal(cls: CarClass, zones: ZoneId[]): number | null {
  if (zones.length === 0) return null;
  let sum = 0;
  for (const z of zones) {
    const p = ppfPrices[cls][z];
    if (p == null) return null;
    sum += p;
  }
  return sum;
}
