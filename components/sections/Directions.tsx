import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { services } from '@/content/services';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { Placeholder } from '@/components/ui/Placeholder';

export function Directions() {
  return (
    <Section id="napravleniya" eyebrow="Направления" title="Что делаем" lead="Цену «от» Вы увидите до звонка.">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <li key={s.id}>
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <Link href={s.href} className="gloss group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-coat p-6 shadow-[var(--shadow-card)] transition-[transform,border-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-white/25">
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <ArrowUpRight size={20} strokeWidth={1.5} className="text-muted transition-colors group-hover:text-wow" />
                </div>
                <p className="mt-3 flex-1 text-[15px]">{s.short}</p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
                  <span className="text-chrome">{s.priceFrom ? `от ${s.priceFrom} ₽` : <Placeholder>от … ₽</Placeholder>}</span>
                  <span className="flex items-center gap-1.5 text-muted"><Clock size={14} strokeWidth={1.5} />{s.time ?? <Placeholder>время</Placeholder>}</span>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
