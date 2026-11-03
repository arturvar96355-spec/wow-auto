'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CarClass, Finish, ZoneId, carClasses, ppfFinishes, ppfPresets, ppfTotal, ppfZones } from '@/content/ppf';
import { Chip } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Placeholder } from '@/components/ui/Placeholder';
import { goToBooking } from '@/lib/booking-store';
import { formatRub } from '@/lib/typograph';

/** Пути зон: сверху (viewBox 220×440) и сбоку (viewBox 480×170). Парные зоны — несколько путей. */
const m = (d: string) => [d, `translate(220 0) scale(-1 1)|${d}`];
const TOP: Record<ZoneId, string[]> = {
  'front-bumper': ['M60 40 C70 22 90 14 110 14 C130 14 150 22 160 40 L160 56 C140 48 80 48 60 56Z'],
  headlights: m('M56 62 L84 54 L86 74 L58 80Z'),
  hood: ['M70 88 L150 88 L146 196 L74 196Z'],
  fenders: m('M46 90 L68 88 L72 196 L50 190Z'),
  mirrors: m('M30 196 L46 194 L46 208 L32 208Z'),
  pillars: m('M72 198 L82 198 L88 228 L76 228Z'),
  sills: m('M40 236 L50 236 L50 330 L40 330Z'),
  roof: ['M82 230 L138 230 L138 320 L82 320Z'],
  'rear-bumper': ['M52 388 C70 398 150 398 168 388 C160 414 140 426 110 427 C80 426 60 414 52 388Z'],
};
const SIDE: Record<ZoneId, string[]> = {
  'rear-bumper': ['M20 120 L20 96 C20 90 26 86 36 84 L56 82 L56 126 L28 128Z'],
  roof: ['M168 46 C176 40 190 38 210 38 L296 38 C308 38 316 42 324 48 L170 52Z'],
  pillars: ['M324 48 L372 76 L356 80 L312 56Z'],
  hood: ['M376 78 L430 84 L440 98 L378 94Z'],
  headlights: ['M436 90 L456 100 L454 110 L438 106Z'],
  'front-bumper': ['M440 108 L458 108 L460 126 L444 130 L438 112Z'],
  fenders: ['M378 98 L436 102 L438 122 L380 122Z'],
  mirrors: ['M334 62 L352 64 L350 76 L336 74Z'],
  sills: ['M130 122 L360 122 L360 131 L130 131Z'],
};

function Zones({ map, view, selected, toggle, shimmer }: { map: Record<ZoneId, string[]>; view: 'top' | 'side'; selected: ZoneId[]; toggle: (z: ZoneId) => void; shimmer: boolean }) {
  return (
    <>
      {ppfZones.map(({ id, label }) => {
        const on = selected.includes(id);
        return (
          <g key={id} role="button" tabIndex={0} aria-pressed={on} aria-label={label} className={`cursor-pointer outline-none ${on ? 'film-zone' : ''}`}
            onClick={() => toggle(id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(id); } }}>
            {map[id].map((p, i) => {
              const [tr, d] = p.includes('|') ? p.split('|') : [undefined, p];
              return <path key={i} d={d} transform={tr} fill={on ? `url(#film-${view})` : 'rgb(255 255 255 / .05)'} stroke={on ? '#ff3b30' : 'rgb(255 255 255 / .28)'} strokeWidth="1.5" className="transition-[fill,stroke] duration-300 hover:fill-[rgb(255_59_48/0.28)]" />;
            })}
          </g>
        );
      })}
      <defs>
        <linearGradient id={`film-${view}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={view === 'top' ? 0 : 480} y2={view === 'top' ? 440 : 0}>
          <stop offset="0" stopColor="#c8261d" /><stop offset="0.45" stopColor="#ff3b30" /><stop offset="0.55" stopColor="#ffb0a8" /><stop offset="0.65" stopColor="#ff3b30" /><stop offset="1" stopColor="#c8261d" />
          {shimmer && <animateTransform attributeName="gradientTransform" type="translate" from={view === 'top' ? '0 -440' : '-480 0'} to={view === 'top' ? '0 440' : '480 0'} dur="3.2s" repeatCount="indefinite" />}
        </linearGradient>
      </defs>
    </>
  );
}

export function PpfCalculator() {
  const [cls, setCls] = useState<CarClass>('crossover');
  const [sel, setSel] = useState<ZoneId[]>(ppfPresets[0].zones);
  const [finish, setFinish] = useState<Finish>('gloss');
  const reduce = useReducedMotion();
  const toggle = (z: ZoneId) => setSel((s) => (s.includes(z) ? s.filter((x) => x !== z) : [...s, z]));
  const total = ppfTotal(cls, sel);
  const preset = ppfPresets.find((p) => p.zones.length === sel.length && p.zones.every((z) => sel.includes(z)))?.id;
  const clsLabel = carClasses.find((c) => c.id === cls)!.label;
  const zoneLabels = ppfZones.filter((z) => sel.includes(z.id)).map((z) => z.label);
  const sy = cls === 'sedan' ? 1.04 : cls === 'suv' ? 0.95 : 1;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-[var(--radius-lg)] border border-line bg-coat p-5 shadow-[var(--shadow-card)] sm:p-6">
        <p className="mb-3 text-sm font-semibold text-chrome">1. Класс авто</p>
        <div className="flex flex-wrap gap-2">{carClasses.map((c) => <Chip key={c.id} active={cls === c.id} onClick={() => setCls(c.id)}>{c.label}</Chip>)}</div>

        <p className="mb-3 mt-7 text-sm font-semibold text-chrome">2. Что оклеить</p>
        <div className="mb-4 flex flex-wrap gap-2">{ppfPresets.map((p) => <Chip key={p.id} active={preset === p.id} onClick={() => setSel(p.zones)}>{p.label}</Chip>)}</div>
        <div className="grid items-center gap-4 sm:grid-cols-[160px_1fr]">
          <svg viewBox="0 0 220 440" className="mx-auto max-h-[300px] w-full transition-transform duration-500" style={{ transform: `scaleY(${sy})` }} role="img" aria-label="Схема авто сверху">
            <path d="M110 14 C150 14 172 40 174 90 L178 340 C178 390 150 424 110 426 C70 424 42 390 42 340 L46 90 C48 40 70 14 110 14Z" fill="#0d0e12" stroke="#23262d" strokeWidth="2" />
            <path d="M82 200 L138 200 L142 226 L78 226Z M64 234 L76 234 L76 318 L66 316Z M156 234 L144 234 L144 318 L154 316Z M80 322 L140 322 L134 346 L86 346Z" fill="#0b1a2a" opacity=".8" />
            <Zones map={TOP} view="top" selected={sel} toggle={toggle} shimmer={!reduce} />
          </svg>
          <svg viewBox="0 0 480 170" className="w-full" role="img" aria-label="Схема авто сбоку">
            <path d="M20 120 L20 96 C20 88 28 84 40 82 L120 74 C140 50 170 38 220 38 L300 38 C335 38 355 60 372 74 L430 80 C446 82 456 92 458 104 L460 120 C460 128 454 132 446 132 L30 132 C24 132 20 128 20 120Z" fill="#0d0e12" stroke="#23262d" strokeWidth="2" />
            <path d="M178 50 L300 50 L346 74 L150 76Z" fill="#0b1a2a" opacity=".8" />
            <Zones map={SIDE} view="side" selected={sel} toggle={toggle} shimmer={!reduce} />
            <circle cx="100" cy="132" r="26" fill="#050607" stroke="#23262d" strokeWidth="2" /><circle cx="390" cy="132" r="26" fill="#050607" stroke="#23262d" strokeWidth="2" />
          </svg>
        </div>

        <fieldset className="mt-6">
          <legend className="sr-only">Зоны плёнки</legend>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-3">
            {ppfZones.map((z) => (
              <label key={z.id} className="flex min-h-11 cursor-pointer items-center gap-2.5">
                <input type="checkbox" checked={sel.includes(z.id)} onChange={() => toggle(z.id)} className="h-4 w-4 accent-[#ff3b30]" />{z.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-coat p-5 shadow-[var(--shadow-card)] sm:p-6">
        <p className="mb-3 text-sm font-semibold text-chrome">3. Тип плёнки</p>
        <div className="flex flex-wrap gap-2">{ppfFinishes.map((f) => <Chip key={f.id} active={finish === f.id} onClick={() => setFinish(f.id)}>{f.label}</Chip>)}</div>
        <p className="mt-2 text-sm text-muted">Марки: <Placeholder>марки — уточнить</Placeholder></p>

        <p className="mb-3 mt-7 text-sm font-semibold text-chrome">Выбрано: {sel.length}</p>
        <ul className="flex min-h-[2.5rem] flex-wrap gap-2">
          <AnimatePresence>
            {ppfZones.filter((z) => sel.includes(z.id)).map((z) => (
              <motion.li key={z.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.25 }}>
                <button type="button" onClick={() => toggle(z.id)} aria-label={`Убрать: ${z.label}`} className="min-h-9 rounded-full border border-wow/50 bg-wow/10 px-3 text-sm text-chrome">{z.label} ×</button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="mt-6 border-t border-line pt-5" aria-live="polite">
          <p className="text-sm">Итого</p>
          <AnimatePresence mode="wait" initial={false}>
            {total != null ? (
              <motion.p key={total} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.25 }} className="mt-1 font-display text-3xl font-bold text-chrome tnum">от {formatRub(total)}</motion.p>
            ) : (
              <motion.p key="null" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-chrome">
                {sel.length ? <>Цена — после осмотра. <Placeholder>цены от клиента</Placeholder></> : 'Выберите зоны на схеме'}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <Button className="mt-6 w-full" disabled={!sel.length}
          onClick={() => goToBooking({ service: 'Защитная плёнка', carClass: clsLabel, note: `${ppfFinishes.find((f) => f.id === finish)!.label.toLowerCase()} плёнка: ${zoneLabels.join(', ')}` })}>
          Записаться на осмотр
        </Button>
      </aside>
    </div>
  );
}
