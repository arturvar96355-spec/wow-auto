import type { Metadata } from 'next';
import { ServicePage } from '@/components/sections/ServicePage';
import { pages } from '@/content/pages';

const p = pages.find((x) => x.slug === 'polirovka-i-keramika')!;
export const metadata: Metadata = { title: p.title, description: p.lead };
export default function Page() { return <ServicePage p={p} />; }
