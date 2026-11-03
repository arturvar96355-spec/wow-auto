import { site } from '@/content/site';

export default function Home() {
  return (
    <main className="mx-auto max-w-[var(--container-page)] px-4 py-24">
      <h1 className="text-4xl font-bold">{site.tagline}</h1>
      <p className="mt-4 max-w-xl">{site.lead}</p>
    </main>
  );
}
