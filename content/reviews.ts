export type Review = { id: string; text: string; name: string; tags: string[] };
const src = 'Отзыв на Яндекс Картах';
export const reviewSource = src;
export const reviews: Review[] = [
  { id: 'dmitriy', name: 'Дмитрий', text: 'Было похоже на питстоп в F1: набежала толпа и машина выезжает.', tags: ['tint', 'speed'] },
  { id: 'anton-price', name: 'Антон', text: 'Стоимость услуги была озвучена заблаговременно и осталась неизменной.', tags: ['price'] },
  { id: 'kirill', name: 'Кирилл', text: 'Переложили два варианта, металлизированную и керамику, разницу видно сразу', tags: ['athermal', 'tint'] },
  { id: 'marina', name: 'Марина', text: 'Пленка легла идеально, без пузырей и складок.', tags: ['ppf'] },
  { id: 'anton-heat', name: 'Антон', text: 'В салоне меньше стало жарить и температура в салоне в жаркие дни упала на 5-7 градусов.', tags: ['athermal'] },
  { id: 'aleksey', name: 'Алексей', text: 'Спасибо менеджеру за грамотную консультацию и отсутствие навязывания лишних услуг.', tags: ['price', 'tint'] },
  { id: 'anastasiya', name: 'Анастасия', text: 'за 3 года активного пользования машиной ничего не произошло', tags: ['ppf', 'tint'] },
  { id: 'anzhela', name: 'Анжела', text: 'Эдуард помог быстро подобрать пленку, сделали быстро и аккуратно', tags: ['tint', 'speed'] },
  { id: 'artem', name: 'Артём', text: 'Привожу уже не первую машину на тонировку, всё как всегда на высшем уровне!', tags: ['tint'] },
];
export const reviewsByTag = (tag: string, n = 3) => reviews.filter((r) => r.tags.includes(tag)).slice(0, n);
