import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-32 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-4">Такой страницы нет.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-wow px-6 py-3 font-semibold text-white">На главную</Link>
    </main>
  );
}
