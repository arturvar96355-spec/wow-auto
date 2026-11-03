export type FilmId = 'regular' | 'metal' | 'ceramic';
export const films: {
  id: FilmId; label: string; heat: number; blurb: string;
  rows: { protect: string; gps: string; look: string; price: string };
}[] = [
  { id: 'regular', label: 'Обычная тонировочная', heat: 4,
    blurb: 'Затемняет стекло. От тепла защищает меньше других.',
    rows: { protect: 'Ниже', gps: '[уточнить]', look: '[уточнить]', price: '[от … ₽]' } },
  { id: 'metal', label: 'Металлизированная', heat: 3,
    blurb: 'Слой металла отражает часть тепла.',
    rows: { protect: 'Средняя', gps: '[уточнить у клиента]', look: '[уточнить]', price: '[от … ₽]' } },
  { id: 'ceramic', label: 'Керамическая атермальная', heat: 1,
    blurb: 'Керамика держит тепло снаружи и не мешает связи.',
    rows: { protect: 'Выше', gps: '[уточнить]', look: '[уточнить]', price: '[от … ₽]' } },
];
