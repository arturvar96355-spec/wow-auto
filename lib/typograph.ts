const NBSP = ' ';

/** Типографика для текстов из /content: неразрывные пробелы, тире, «ёлочки», тысячи. */
export function typograph(input: string): string {
  return input
    // кавычки-ёлочки
    .replace(/"([^"]*)"/g, '«$1»')
    // тире между словами
    .replace(/\s[-–]\s/g, `${NBSP}— `)
    // неразрывный пробел после предлогов и союзов из 1–2 букв
    .replace(/(^|[\s(«—])([а-яёА-ЯЁ]{1,2})\s+(?=\S)/g, (_, pre, w) => `${pre}${w}${NBSP}`)
    // число + единица
    .replace(/(\d)\s+(₽|%|°|минут|минуты|минуту|мин|часа|часов|час|ч|км|м|см|мм|лет|года|год|дней|дня|дн)(?![а-яё])/g, `$1${NBSP}$2`)
    // тысячи: 75000 -> 75 000 (только числа от 5 цифр, не внутри номеров вроде 018/2011)
    .replace(/(?<![\d/.,+-])\d{5,}(?![\d/])/g, (n) => n.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP))
    // пробелы перед тире в середине строки уже неразрывные; убираем дубли
    .replace(/ {2,}/g, NBSP);
}

export const tg = typograph;

/** Цена «от» в рублях или null → заглушка. */
export function formatRub(value: number): string {
  return `${new Intl.NumberFormat('ru-RU').format(value).replace(/\s/g, NBSP)}${NBSP}₽`;
}
