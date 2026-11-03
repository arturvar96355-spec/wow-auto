export type BookingData = {
  service: string; carClass: string; car: string; day: string; time: string; name: string; phone: string; note: string;
};

export function buildMessage(d: BookingData): string {
  const lines = [
    'Здравствуйте! Хочу записаться в WoW auto.',
    `Услуга: ${d.service || 'не выбрана'}`,
    d.note && `Выбор на сайте: ${d.note}`,
    `Авто: ${[d.carClass, d.car].filter(Boolean).join(', ') || 'не указано'}`,
    `Когда: ${[d.day, d.time].filter(Boolean).join(', ') || 'не указано'}`,
    `Имя: ${d.name}`,
    `Телефон: ${d.phone}`,
  ];
  return lines.filter(Boolean).join('\n');
}

export function messengerUrl(number: string, text: string) {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}
