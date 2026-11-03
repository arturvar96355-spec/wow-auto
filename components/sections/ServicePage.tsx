import { Check } from 'lucide-react';
import { ServicePageData } from '@/content/pages';
import { reviewsByTag, reviews } from '@/content/reviews';
import { warranty } from '@/content/steps';
import { Container, Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/motion/Reveal';
import { Placeholder } from '@/components/ui/Placeholder';
import { T } from '@/components/ui/Text';
import { ReviewCards } from './Reviews';
import { BookingSection } from './BookingSection';
import { BeforeAfterLazy, FilmLampLazy, PpfCalculatorLazy, TintFittingLazy } from '@/components/widgets/lazy';
import { allPairs } from '@/content/pairs';
import { tg } from '@/lib/typograph';

export function ServicePage({ p }: { p: ServicePageData }) {
  const widget =
    p.widget === 'tint' ? <TintFittingLazy /> : p.widget === 'lamp' ? <FilmLampLazy /> : p.widget === 'ppf' ? <PpfCalculatorLazy /> :
    p.widget === 'ba-polish' ? <BeforeAfterLazy pairs={allPairs.filter((x) => x.id !== 'seat')} /> : <BeforeAfterLazy pairs={allPairs.filter((x) => x.id === 'seat')} />;
  const rev = reviewsByTag(p.tag).length ? reviewsByTag(p.tag) : reviews.slice(1, 4);
  return (
    <>
      <section className="relative overflow-hidden pb-6 pt-32 sm:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_80%_0%,rgb(255_59_48/0.14),transparent_70%)]" />
        <Container>
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-wow">{p.title}</p>
            <h1 className="max-w-4xl text-[clamp(2rem,5.4vw,4rem)] font-bold">{tg(p.h1)}</h1>
            <p className="mt-5 max-w-2xl text-lg">{tg(p.lead)}</p>
          </Reveal>
        </Container>
      </section>

      <Section id="interaktiv" title={p.widgetTitle}>{widget}</Section>

      <Section className="pt-0">
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <h2 className="font-display text-lg font-semibold">Что входит</h2>
            <ul className="mt-4 space-y-2.5">{p.includes.map((i) => <li key={i} className="flex gap-3"><Check size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-wow" />{tg(i)}</li>)}</ul>
          </Card>
          <Card>
            <h2 className="font-display text-lg font-semibold">Сколько занимает</h2>
            <p className="mt-1 text-sm text-muted">Обычно, по отзывам клиентов.</p>
            <dl className="mt-4 space-y-3">{p.time.map((t) => <div key={t.label} className="flex justify-between gap-4"><dt>{t.label}</dt><dd className="text-right text-chrome">{t.value ?? <Placeholder>время</Placeholder>}</dd></div>)}</dl>
            <p className="mt-5 border-t border-line pt-4">Цена: <Placeholder>от … ₽ — от клиента</Placeholder></p>
          </Card>
          <Card>
            <h2 className="font-display text-lg font-semibold">Гарантия</h2>
            <ul className="mt-4 space-y-3">{warranty.slice(0, 2).map((w) => <li key={w.title}><p className="font-semibold text-chrome"><T>{w.title}</T></p><p className="text-[15px]"><T>{w.text}</T></p></li>)}</ul>
          </Card>
        </div>
      </Section>

      <Section title="Что пишут клиенты"><ReviewCards items={rev} /></Section>
      <BookingSection />
    </>
  );
}
