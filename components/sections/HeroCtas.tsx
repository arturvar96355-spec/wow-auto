'use client';
import { Magnetic } from '@/components/motion/Magnetic';
import { Button } from '@/components/ui/Button';
import { goToBooking } from '@/lib/booking-store';

export function HeroCtas() {
  return (
    <>
      <Magnetic><Button size="lg" onClick={() => document.getElementById('kalkulyator')?.scrollIntoView({ behavior: 'smooth' })}>Рассчитать стоимость</Button></Magnetic>
      <Magnetic><Button size="lg" variant="ghost" onClick={() => goToBooking({ service: 'Тонировка' })}>Записаться сегодня</Button></Magnetic>
    </>
  );
}
