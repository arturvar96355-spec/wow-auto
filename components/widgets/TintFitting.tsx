'use client';
import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FRONT_LEGAL, GlassZone, tintLevels, tintZones } from '@/content/tint';
import { Chip } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Placeholder } from '@/components/ui/Placeholder';
import { T } from '@/components/ui/Text';
import { goToBooking } from '@/lib/booking-store';
import { formatRub } from '@/lib/typograph';

const WIN = 'M110 80 Q110 50 150 48 L560 48 Q640 48 676 100 L740 300 L110 300Z';

function Scene({ level }: { level: number }) {
  const id = useId().replace(/:/g, '');
  const opacity = 1 - (level / 100) * 0.95;
  return (
    <svg viewBox="0 0 800 372" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`Вид из салона через боковое стекло, светопропускание ${level}%`}>
      <defs>
        <clipPath id={`w${id}`}><path d={WIN} /></clipPath>
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8fbbe6" /><stop offset="1" stopColor="#dcebf6" /></linearGradient>
        <linearGradient id={`d${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#15171c" /><stop offset="1" stopColor="#08090b" /></linearGradient>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0.3" stopColor="#fff" stopOpacity="0" /><stop offset="0.5" stopColor="#fff" stopOpacity="0.12" /><stop offset="0.7" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <rect width="800" height="450" fill={`url(#d${id})`} />
      <g clipPath={`url(#w${id})`}>
        <rect width="800" height="450" fill={`url(#s${id})`} />
        <g fill="#a8b8c8"><rect x="120" y="150" width="70" height="150" /><rect x="200" y="120" width="60" height="180" /><rect x="400" y="140" width="80" height="160" /><rect x="560" y="110" width="70" height="190" /></g>
        <g fill="#6f7f92"><rect x="150" y="190" width="110" height="110" /><rect x="290" y="160" width="90" height="140" /><rect x="470" y="200" width="100" height="100" /><rect x="610" y="170" width="120" height="130" /></g>
        <g fill="#f2d98a" opacity=".8">{[0, 1, 2, 3, 4].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={300 + c * 26} y={175 + r * 24} width="12" height="14" />))}</g>
        <ellipse cx="260" cy="262" rx="46" ry="30" fill="#4d7a54" /><ellipse cx="520" cy="268" rx="56" ry="34" fill="#44704b" />
        <rect y="285" width="800" height="30" fill="#5b616b" />
        <motion.rect width="800" height="450" fill="#0b1a2a" initial={false} animate={{ opacity }} transition={{ duration: 0.25 }} />
        <rect width="800" height="450" fill={`url(#g${id})`} />
      </g>
      <path d={WIN} fill="none" stroke="#1b1e24" strokeWidth="14" />
      <path d={WIN} fill="none" stroke="rgb(255 255 255 / .12)" strokeWidth="1.5" />
      <rect y="300" width="800" height="80" fill="#0d0e12" /><rect y="300" width="800" height="3" fill="rgb(255 255 255 / .18)" />
    </svg>
  );
}

function TopView({ zone }: { zone: GlassZone }) {
  const rear = zone === 'rear' || zone === 'all';
  const front = zone === 'front-side' || zone === 'all';
  const strip = zone === 'windshield-strip';
  const on = 'fill-[rgb(100_160_230/0.55)] stroke-wow';
  const off = 'fill-white/[0.04] stroke-white/20';
  const mir = (d: string, cls: string) => (<><path d={d} className={`${cls} transition-colors duration-300`} strokeWidth="1.5" /><path d={d} transform="translate(220 0) scale(-1 1)" className={`${cls} transition-colors duration-300`} strokeWidth="1.5" /></>);
  return (
    <svg viewBox="0 0 220 440" className="mx-auto h-full max-h-[360px]" role="img" aria-label="Схема стёкол авто сверху">
      <path d="M110 14 C150 14 172 40 174 90 L178 340 C178 390 150 424 110 426 C70 424 42 390 42 340 L46 90 C48 40 70 14 110 14Z" className="fill-coat stroke-line" strokeWidth="2" />
      <path d="M82 200 L138 200 L142 226 L78 226Z" className={`${off} transition-colors`} strokeWidth="1.5" />
      <path d="M82 200 L138 200 L139 208 L81 208Z" className={`${strip ? on : off} transition-colors duration-300`} strokeWidth="1.5" />
      {mir('M64 234 L76 234 L76 276 L64 272Z', front ? on : off)}
      {mir('M64 280 L76 280 L76 318 L66 316Z', rear ? on : off)}
      <path d="M80 322 L140 322 L134 346 L86 346Z" className={`${rear ? on : off} transition-colors duration-300`} strokeWidth="1.5" />
      <rect x="80" y="230" width="60" height="88" rx="10" className="fill-white/[0.03] stroke-white/10" />
    </svg>
  );
}

export function TintFitting() {
  const [zone, setZone] = useState<GlassZone>('rear');
  const [idx, setIdx] = useState(3);
  const level = tintLevels[idx];
  const z = tintZones.find((x) => x.id === zone)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-coat shadow-[var(--shadow-card)]">
        <div className="gloss relative aspect-[16/10] w-full sm:aspect-[16/9]">
          <Scene level={level} />
          <div className="pointer-events-none absolute right-4 top-4 rounded-2xl border border-white/10 bg-night/70 px-4 py-2 backdrop-blur">
            <p className="text-xs uppercase tracking-widest text-muted">Светопропускание</p>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p key={level} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.2 }} className="font-display text-3xl font-bold text-chrome tnum">{level}%</motion.p>
            </AnimatePresence>
          </div>
        </div>
        <div className="space-y-5 p-5 sm:p-6">
          <div role="group" aria-label="Стёкла" className="flex flex-wrap gap-2">
            {tintZones.map((t) => <Chip key={t.id} active={zone === t.id} onClick={() => setZone(t.id)}>{t.label}</Chip>)}
          </div>
          <div>
            <label htmlFor="tint-level" className="mb-2 flex justify-between text-sm"><span>Насколько темно</span><span className="tnum text-chrome">{level}%</span></label>
            <input id="tint-level" type="range" min={0} max={tintLevels.length - 1} step={1} value={idx} onChange={(e) => setIdx(Number(e.target.value))}
              aria-valuetext={`${level}%`} className="h-11 w-full cursor-pointer accent-[#ff3b30]" />
            <div className="mt-1 flex justify-between text-xs text-muted tnum" aria-hidden>{tintLevels.map((l) => <span key={l}>{l}</span>)}</div>
          </div>
          <AnimatePresence initial={false}>
            {z.legal && (
              <motion.p key="legal" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden rounded-2xl border border-line bg-white/[0.03] p-4 text-sm">
                <T>{FRONT_LEGAL}</T>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <aside className="flex flex-col gap-5 rounded-[var(--radius-lg)] border border-line bg-coat p-5 shadow-[var(--shadow-card)] sm:p-6">
        <div className="h-[280px] lg:h-[300px]"><TopView zone={zone} /></div>
        <dl className="space-y-3 border-t border-line pt-5 text-[15px]">
          <div className="flex justify-between gap-4"><dt>Обычно занимает</dt><dd className="text-right text-chrome">{z.time ?? <Placeholder>время</Placeholder>}</dd></div>
          <div className="flex justify-between gap-4"><dt>Цена</dt><dd className="text-right text-chrome">{z.priceFrom ? `от ${formatRub(z.priceFrom)}` : <Placeholder>от … ₽</Placeholder>}</dd></div>
        </dl>
        <Button className="mt-auto w-full" onClick={() => goToBooking({ service: 'Тонировка', note: `${z.label}, светопропускание ${level}%` })}>Записаться на тонировку</Button>
      </aside>
    </div>
  );
}
