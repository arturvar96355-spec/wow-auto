import { Hero } from '@/components/sections/Hero';
import { Perks } from '@/components/sections/Perks';
import { Directions } from '@/components/sections/Directions';
import { Process } from '@/components/sections/Process';
import { Warranty } from '@/components/sections/Warranty';
import { Reviews } from '@/components/sections/Reviews';
import { HowToGet } from '@/components/sections/HowToGet';
import { BookingSection } from '@/components/sections/BookingSection';
import { Section } from '@/components/ui/Section';
import { BeforeAfterLazy, FilmLampLazy, PpfCalculatorLazy, TintFittingLazy } from '@/components/widgets/lazy';

export default function Home() {
  return (
    <>
      <Hero />
      <Perks />
      <Section id="primerka" eyebrow="Примерка" title="Примерьте тонировку на стекло" lead="Выберите стёкла и степень затемнения. Увидите разницу до записи.">
        <TintFittingLazy />
      </Section>
      <Section id="lampa" eyebrow="Лампа" title="Сравните плёнки под лампой" lead="В студии мы кладём два образца рядом. Здесь можно сделать то же самое.">
        <FilmLampLazy />
      </Section>
      <Section id="kalkulyator" eyebrow="Калькулятор" title="Какую часть кузова защитить" lead="Выберите класс авто и зоны. Нажмите на схему или на пункт в списке.">
        <PpfCalculatorLazy />
      </Section>
      <Directions />
      <Process />
      <Section id="do-i-posle" eyebrow="До и после" title="Результат работы" lead="Потяните ползунок.">
        <BeforeAfterLazy />
      </Section>
      <Warranty />
      <Reviews />
      <HowToGet />
      <BookingSection />
    </>
  );
}
