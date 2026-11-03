import type { Metadata } from 'next';
import { HowToGet } from '@/components/sections/HowToGet';
import { Container } from '@/components/ui/Section';

export const metadata: Metadata = { title: 'Как заехать', description: 'Как найти въезд в WoW auto: Москва, Братиславская ул., 30.' };

export default function Page() {
  return (
    <>
      <div className="h-24 sm:h-32" />
      <Container><h1 className="sr-only">Как заехать</h1></Container>
      <HowToGet full />
    </>
  );
}
