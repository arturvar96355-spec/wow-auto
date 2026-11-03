import { Phone, ShieldCheck, ScanEye, Droplets } from 'lucide-react';
import { perks } from '@/content/steps';
import { Container } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { T } from '@/components/ui/Text';

const icons = { phone: Phone, shield: ShieldCheck, eye: ScanEye, droplets: Droplets };

export function Perks() {
  return (
    <section className="border-y border-line bg-coat/60 py-10">
      <Container>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <li key={p.title}>
                <Reveal delay={i * 0.06} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-white/[0.03] text-wow"><Icon size={22} strokeWidth={1.5} /></span>
                  <div>
                    <p className="font-display text-sm font-semibold text-chrome"><T>{p.title}</T></p>
                    <p className="mt-1 text-sm"><T>{p.text}</T></p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
