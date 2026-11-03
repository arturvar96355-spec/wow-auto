import type { Metadata } from 'next';
import { Container } from '@/components/ui/Section';
import { Placeholder } from '@/components/ui/Placeholder';

export const metadata: Metadata = { title: 'Персональные данные' };

export default function Privacy() {
  return (
    <Container className="pb-24 pt-36">
      <h1 className="text-4xl font-bold">Обработка персональных данных</h1>
      <p className="mt-6 max-w-2xl text-lg"><Placeholder>политика — от клиента</Placeholder></p>
    </Container>
  );
}
