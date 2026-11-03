import type { Metadata } from 'next';
import { priceGroups } from '@/content/services';
import { Container } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Placeholder } from '@/components/ui/Placeholder';
import { BookingSection } from '@/components/sections/BookingSection';
import { tg } from '@/lib/typograph';

export const metadata: Metadata = { title: 'Цены', description: 'Цены «от» на все услуги WoW auto на одной странице.' };

export default function Prices() {
  return (
    <>
      <section className="pb-6 pt-32 sm:pt-40">
        <Container>
          <h1 className="text-[clamp(2rem,5.4vw,4rem)] font-bold">Цены «от»</h1>
          <p className="mt-5 max-w-2xl text-lg">Все услуги на одной странице. Точную цену назовём по телефону. Цены в демо — <Placeholder>цены от клиента</Placeholder>.</p>
        </Container>
      </section>
      <section className="py-12">
        <Container className="grid gap-5 lg:grid-cols-2">
          {priceGroups.map((g) => (
            <Card key={g.id} className="scroll-mt-24" >
              <h2 id={g.id} className="scroll-mt-28 font-display text-xl font-semibold">{tg(g.title)}</h2>
              <ul className="mt-4 divide-y divide-line">
                {g.rows.map((r) => <li key={r} className="flex items-center justify-between gap-4 py-3"><span>{tg(r)}</span><Placeholder>от … ₽</Placeholder></li>)}
              </ul>
            </Card>
          ))}
        </Container>
      </section>
      <BookingSection />
    </>
  );
}
