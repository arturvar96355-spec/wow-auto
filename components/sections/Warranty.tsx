import { ShieldCheck, ScanEye, Armchair } from 'lucide-react';
import { warranty } from '@/content/steps';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/motion/Reveal';
import { T } from '@/components/ui/Text';

const icons = [ShieldCheck, ScanEye, Armchair];

export function Warranty() {
  return (
    <Section id="garantiya" eyebrow="Гарантия" title="Что мы обещаем" lead="Только то, что можем подтвердить: гарантию и контрольный осмотр.">
      <div className="grid gap-5 md:grid-cols-3">
        {warranty.map((w, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={w.title} delay={i * 0.08}>
              <Card hover className="h-full">
                <Icon size={28} strokeWidth={1.5} className="text-wow" />
                <h3 className="mt-5 font-display text-lg font-semibold"><T>{w.title}</T></h3>
                <p className="mt-2"><T>{w.text}</T></p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
