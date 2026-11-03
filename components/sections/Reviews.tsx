import { Star } from 'lucide-react';
import { reviews, reviewSource, type Review } from '@/content/reviews';
import { site } from '@/content/site';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/motion/Reveal';
import { CountUp } from '@/components/motion/CountUp';
import { Button } from '@/components/ui/Button';
import { tg } from '@/lib/typograph';

export function ReviewCards({ items }: { items: Review[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((r, i) => (
        <Reveal key={r.id} delay={(i % 3) * 0.06} className="h-full">
          <Card hover className="flex h-full flex-col">
            <div className="flex gap-0.5 text-wow" role="img" aria-label="5 из 5">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} fill="currentColor" strokeWidth={0} />)}</div>
            <blockquote className="mt-4 flex-1 text-[17px] leading-relaxed text-chrome">«{tg(r.text)}»</blockquote>
            <p className="mt-5 text-sm"><span className="font-semibold text-chrome">{r.name}</span> · {reviewSource}</p>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}

export function Reviews({ items = reviews.filter((r) => r.id !== 'marina'), id = 'otzyvy' }: { items?: Review[]; id?: string }) {
  return (
    <Section id={id} eyebrow="Отзывы" title="Что пишут клиенты">
      <Reveal className="mb-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        <p className="font-display text-5xl font-bold text-chrome"><CountUp to={5} decimals={1} /></p>
        <p>{site.rating.marks} оценок на Яндекс Картах<br />{site.rating.reviews} отзывов</p>
      </Reveal>
      <ReviewCards items={items} />
      <div className="mt-10"><Button href={site.reviewsUrl} variant="ghost">Все {site.rating.reviews} отзывов на Яндекс Картах</Button></div>
    </Section>
  );
}
