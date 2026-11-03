export type Pair = { id: string; title: string; kind: 'paint' | 'lamp' | 'seat' };
export const allPairs: Pair[] = [
  { id: 'paint', title: 'Полировка кузова', kind: 'paint' },
  { id: 'lamp', title: 'Фары', kind: 'lamp' },
  { id: 'seat', title: 'Химчистка', kind: 'seat' },
];
