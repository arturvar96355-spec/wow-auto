import { Section } from '@/components/ui/Section';
import { BookingForm } from '@/components/widgets/BookingForm';

export function BookingSection() {
  return (
    <Section id="zapis" eyebrow="Запись" title="Запишитесь на сегодня" lead="Выбор из калькулятора и примерки попадёт в заявку сам.">
      <BookingForm />
    </Section>
  );
}
