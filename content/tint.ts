export type GlassZone = 'rear' | 'front-side' | 'windshield-strip' | 'all';
export const tintLevels = [5, 15, 20, 35, 50, 70, 80] as const; // % светопропускания

export const FRONT_LEGAL =
  'Для передних стёкол и лобового закон требует светопропускание не ниже [70% — проверить по ТР ТС 018/2011]. Подберём плёнку, которая проходит по ГОСТу.';

export const tintZones: { id: GlassZone; label: string; legal: boolean; time: string | null; priceFrom: number | null }[] = [
  { id: 'rear', label: 'Задняя полусфера', legal: false, time: 'около 40 минут', priceFrom: null },
  { id: 'front-side', label: 'Передние боковые', legal: true, time: '15–20 минут', priceFrom: null },
  { id: 'windshield-strip', label: 'Лобовое (полоса)', legal: true, time: null, priceFrom: null },
  { id: 'all', label: 'По кругу', legal: true, time: 'около часа', priceFrom: null },
];
