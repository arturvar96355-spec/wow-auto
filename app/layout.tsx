import type { Metadata, Viewport } from 'next';
import { Manrope, Unbounded } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { MobileBar } from '@/components/sections/MobileBar';
import { site } from '@/content/site';

const unbounded = Unbounded({ subsets: ['latin', 'cyrillic'], variable: '--font-unbounded', display: 'swap' });
const manrope = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--font-manrope', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.lead,
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.svg' },
  openGraph: { title: `${site.name} — ${site.tagline}`, description: site.lead, locale: 'ru_RU', type: 'website', images: ['/og.jpg'] },
};
export const viewport: Viewport = { themeColor: '#07080A', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${manrope.variable}`}>
      <body>
        <SmoothScroll>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-wow focus:px-4 focus:py-2 focus:text-white">К содержимому</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileBar />
        </SmoothScroll>
      </body>
    </html>
  );
}
