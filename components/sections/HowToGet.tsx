import { MapPin, Navigation } from 'lucide-react';
import { howToGet } from '@/content/steps';
import { site } from '@/content/site';
import { Section } from '@/components/ui/Section';
import { Card, PhotoPlaceholder } from '@/components/ui/Card';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Text';

export function HowToGet({ id = 'kak-zaekhat', full }: { id?: string; full?: boolean }) {
  return (
    <Section id={id} eyebrow="Как заехать" title="Как найти въезд" lead={`${site.address}, ${site.district}.`}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {howToGet.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <Card className="h-full">
              <PhotoPlaceholder caption={s.photo} />
              <p className="mt-5 font-display text-sm text-wow">0{i + 1}</p>
              <h3 className="mt-1 font-display text-lg font-semibold"><T>{s.title}</T></h3>
              <p className="mt-2 text-[15px]"><T>{s.text}</T></p>
            </Card>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={site.mapsUrl}><MapPin size={18} strokeWidth={1.5} />Яндекс Карты</Button>
        <Button href={site.navigatorUrl} variant="ghost"><Navigation size={18} strokeWidth={1.5} />Навигатор</Button>
        {full && <Button href={site.phoneHref} variant="ghost">{site.phone}</Button>}
      </div>
    </Section>
  );
}
