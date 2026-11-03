import type { Metadata } from 'next';
import { Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Badge, Card, Chip, PhotoPlaceholder } from '@/components/ui/Card';
import { Placeholder } from '@/components/ui/Placeholder';

export const metadata: Metadata = { title: 'Дизайн-система' };

const colors = [['night', '#07080A'], ['coat', '#111317'], ['line', '#23262D'], ['chrome', '#E9ECF1'], ['text', '#B7BDC8'], ['wow', '#FF3B30'], ['tint', '#0B1A2A']];

export default function Styleguide() {
  return (
    <Container className="space-y-16 pb-24 pt-32">
      <h1 className="text-4xl font-bold sm:text-5xl">Дизайн-система</h1>
      <section aria-labelledby="c"><h2 id="c" className="mb-4 text-2xl">Цвета</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {colors.map(([n, v]) => <div key={n}><div className="h-20 rounded-2xl border border-line" style={{ background: v }} /><p className="mt-2 text-sm text-chrome">{n}</p><p className="text-xs text-muted">{v}</p></div>)}
        </div></section>
      <section aria-labelledby="t"><h2 id="t" className="mb-4 text-2xl">Типографика</h2>
        <p className="font-display text-3xl font-bold text-chrome sm:text-5xl">Unbounded 700</p>
        <p className="mt-3 font-display text-2xl text-chrome">Заголовок второго уровня</p>
        <p className="mt-3 max-w-xl text-lg">Manrope 400. Основной текст: короткие предложения, конкретные факты. <span className="tnum">Цифры 0123456789 табличные.</span></p></section>
      <section aria-labelledby="b"><h2 id="b" className="mb-4 text-2xl">Кнопки и бейджи</h2>
        <div className="flex flex-wrap items-center gap-3"><Button>Записаться</Button><Button variant="ghost">Позвонить</Button><Button size="lg">Крупная</Button><Badge>5.0 · 949 оценок</Badge><Chip active>Активный чип</Chip><Chip>Чип</Chip></div></section>
      <section aria-labelledby="k"><h2 id="k" className="mb-4 text-2xl">Карточки</h2>
        <div className="grid gap-5 sm:grid-cols-3"><Card hover><h3 className="font-display text-lg">С бликом</h3><p className="mt-2">Подъём на 4 px и блик при наведении.</p></Card><Card><h3 className="font-display text-lg">Обычная</h3></Card><PhotoPlaceholder caption="[фото работ — от клиента]" /></div></section>
      <section aria-labelledby="f"><h2 id="f" className="mb-4 text-2xl">Поля и заглушки</h2>
        <div className="grid max-w-xl gap-4"><label className="text-sm text-chrome">Имя<input className="mt-2 min-h-12 w-full rounded-2xl border border-line bg-night px-4" /></label>
          <p>Цена: <Placeholder>от … ₽ — от клиента</Placeholder></p></div></section>
    </Container>
  );
}
