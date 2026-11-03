import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.lead,
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.svg' },
  openGraph: { title: `${site.name} — ${site.tagline}`, description: site.lead, locale: 'ru_RU', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#07080A', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
