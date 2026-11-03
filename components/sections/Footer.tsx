import Link from 'next/link';
import { nav, site } from '@/content/site';
import { Container } from '@/components/ui/Section';
import { Logo } from './Header';
import { WithPlaceholders } from '@/components/ui/Placeholder';

export function Footer() {
  return (
    <footer className="border-t border-line bg-coat pb-28 pt-14 md:pb-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 text-sm">Тонировка и защитные плёнки в Марьино.</p>
          </div>
          <div className="text-sm">
            <p className="mb-2 font-semibold text-chrome">Адрес</p>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-chrome">{site.address}</a>
            <p>{site.district}</p>
          </div>
          <div className="text-sm">
            <p className="mb-2 font-semibold text-chrome">Связь</p>
            <a href={site.phoneHref} className="tnum hover:text-chrome">{site.phone}</a>
            <p>{site.hours.label} <WithPlaceholders text={site.hours.note} /></p>
            <p>Оплата: <WithPlaceholders text={site.payment} /></p>
          </div>
          <nav aria-label="Разделы" className="text-sm">
            <p className="mb-2 font-semibold text-chrome">Разделы</p>
            <ul className="space-y-1">
              {nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-chrome">{n.label}</Link></li>)}
              <li><Link href="/privacy/" className="hover:text-chrome">Персональные данные</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-10 border-t border-line pt-6 text-xs text-muted">
          <p>Юрлицо: <WithPlaceholders text={site.legalName} /></p>
          <p className="mt-2">{site.conceptNote}</p>
        </div>
      </Container>
    </footer>
  );
}
