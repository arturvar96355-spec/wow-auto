'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { nav, site } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { OpenBadge } from '@/components/ui/OpenBadge';
import { Container } from '@/components/ui/Section';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="WoW auto — на главную" className={`font-display text-xl font-bold tracking-tight text-chrome ${className ?? ''}`}>
      <span className="text-wow">WoW</span> auto
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? 'border-b border-line bg-night/85 backdrop-blur-xl' : 'border-b border-transparent'}`}>
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-20">
        <div className="flex flex-col">
          <Logo />
          <OpenBadge className="hidden text-xs sm:inline-flex lg:hidden xl:inline-flex" />
        </div>
        <nav aria-label="Основное" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="relative text-[15px] text-text transition-colors hover:text-chrome after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-wow after:transition-transform after:duration-300 hover:after:scale-x-100">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={site.phoneHref} className="hidden items-center gap-2 font-semibold tnum text-chrome xl:flex"><Phone size={16} strokeWidth={1.5} />{site.phone}</a>
          <Button href="/#zapis" className="max-sm:hidden">Записаться</Button>
          <button type="button" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-chrome lg:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>
      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-night px-4 pb-10 pt-6 lg:hidden">
          <nav aria-label="Мобильное" className="flex flex-col">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-line py-4 font-display text-xl text-chrome">{n.label}</Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <Button href={site.phoneHref} variant="ghost" size="lg">{site.phone}</Button>
            <Button href="/#zapis" size="lg" onClick={() => setOpen(false)}>Записаться</Button>
            <OpenBadge className="justify-center pt-2" />
          </div>
        </div>
      )}
    </header>
  );
}
