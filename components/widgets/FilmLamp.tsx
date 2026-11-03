'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { films } from '@/content/films';
import { Button } from '@/components/ui/Button';
import { WithPlaceholders } from '@/components/ui/Placeholder';
import { goToBooking } from '@/lib/booking-store';
import { cn } from '@/lib/utils';
import { tg } from '@/lib/typograph';
import { CircleCheck } from 'lucide-react';

const glassFill = { regular: '#1c242e', metal: '#8d98a6', ceramic: '#27496b' } as const;

export function FilmLamp() {
  const [id, setId] = useState<(typeof films)[number]['id']>('regular');
  const f = films.find((x) => x.id === id)!;
  const beam = 0.15 + f.heat * 0.14;

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-coat shadow-[var(--shadow-card)]">
      <div role="tablist" aria-label="Тип плёнки" className="grid grid-cols-3 border-b border-line">
        {films.map((x) => (
          <button key={x.id} role="tab" aria-selected={x.id === id} onClick={() => setId(x.id)}
            className={cn('min-h-14 px-2 py-3 text-xs font-semibold transition-colors sm:text-sm', x.id === id ? 'bg-wow/15 text-white shadow-[inset_0_-2px_0_var(--color-wow)]' : 'text-text hover:text-chrome')}>
            {x.label}
          </button>
        ))}
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative border-b border-line p-4 lg:border-b-0 lg:border-r">
          <svg viewBox="0 0 640 280" className="w-full" role="img" aria-label={`Лампа светит через плёнку «${f.label}». Нагрев салона: ${f.heat} из 5`}>
            <defs>
              <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffe9b0" stopOpacity=".9" /><stop offset="1" stopColor="#ffb35a" stopOpacity=".1" /></linearGradient>
              <linearGradient id="room" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ff6a3d" /><stop offset="1" stopColor="#ff3b30" stopOpacity=".2" /></linearGradient>
            </defs>
            <rect x="20" y="95" width="46" height="70" rx="12" fill="#23262d" stroke="#3a3f49" />
            <circle cx="70" cy="130" r="9" fill="#ffe9b0" />
            <polygon points="76,110 300,40 300,220 76,150" fill="url(#beam)" opacity=".75" />
            <motion.rect x="300" y="30" width="16" height="200" rx="3" initial={false} animate={{ fill: glassFill[id] }} transition={{ duration: 0.4 }} stroke="rgb(255 255 255 / .35)" />
            <rect x="300" y="30" width="16" height="200" rx="3" fill="#fff" opacity=".08" />
            <motion.polygon points="316,40 556,70 556,200 316,220" fill="url(#room)" initial={false} animate={{ opacity: beam }} transition={{ duration: 0.5 }} />
            <rect x="316" y="40" width="240" height="180" fill="none" stroke="#23262d" strokeWidth="2" />
            <text x="330" y="256" fontSize="13" fill="#8a91a0">салон</text>
            <text x="20" y="190" fontSize="13" fill="#8a91a0">лампа</text>
            <g transform="translate(560 55)">
              <rect width="26" height="150" rx="13" fill="#0b0c0f" stroke="#3a3f49" />
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.rect key={i} x="5" y={125 - i * 28} width="16" height="22" rx="4" initial={false}
                  animate={{ fill: i < f.heat ? '#ff3b30' : '#1b1e24' }} transition={{ duration: 0.4, delay: i * 0.05 }} />
              ))}
            </g>
            <text x="330" y="24" fontSize="12" fill="#e9ecf1">нагрев салона</text>
            <text x="592" y="200" fontSize="11" fill="#8a91a0">ниже</text>
            <text x="592" y="72" fontSize="11" fill="#8a91a0">выше</text>
          </svg>
          <p className="mt-3 text-sm text-muted">Шкала относительная: без градусов и процентов.</p>
        </div>

        <div className="p-5 sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <h3 className="font-display text-lg font-semibold">{f.label}</h3>
              <p className="mt-2 text-[15px]">{tg(f.blurb)}</p>
              <dl className="mt-5 divide-y divide-line text-[15px]">
                {([['Защита от тепла', f.rows.protect], ['Связь и GPS', f.rows.gps], ['Внешний вид', f.rows.look], ['Цена', f.rows.price]] as const).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2.5"><dt>{k}</dt><dd className="text-right text-chrome"><WithPlaceholders text={v} /></dd></div>
                ))}
              </dl>
              {id === 'ceramic' && (
                <figure className="mt-5 rounded-2xl border border-line bg-white/[0.03] p-4">
                  <blockquote className="text-chrome">«{tg('В салоне меньше стало жарить и температура в салоне в жаркие дни упала на 5-7 градусов.')}»</blockquote>
                  <figcaption className="mt-2 flex items-center gap-1.5 text-sm"><CircleCheck size={15} className="text-wow" />Антон · из отзыва клиента на Яндекс Картах</figcaption>
                </figure>
              )}
            </motion.div>
          </AnimatePresence>
          <Button className="mt-6 w-full" onClick={() => goToBooking({ service: 'Консультация: сравнение плёнок', note: `интересует: ${f.label}` })}>Сравнить вживую в студии</Button>
        </div>
      </div>
    </div>
  );
}
