'use client';
import { useEffect, useState } from 'react';
import { site } from '@/content/site';

function mskHour() {
  return Number(new Intl.DateTimeFormat('ru-RU', { hour: 'numeric', hour12: false, timeZone: 'Europe/Moscow' }).format(new Date()));
}

export function OpenBadge({ className }: { className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const upd = () => { const h = mskHour(); setOpen(h >= site.hours.open && h < site.hours.close); };
    upd();
    const id = setInterval(upd, 60_000);
    return () => clearInterval(id);
  }, []);
  const label = open === null ? site.hours.label : open ? `Открыто до ${site.hours.close}:00` : `Закрыто · откроемся в ${site.hours.open}:00`;
  return (
    <span className={`inline-flex items-center gap-2 text-sm text-text ${className ?? ''}`}>
      <span className={`h-2 w-2 rounded-full ${open === false ? 'bg-muted' : 'bg-emerald-400'}`} aria-hidden />
      {label}
    </span>
  );
}
