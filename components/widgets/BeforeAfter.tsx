'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { Chip } from '@/components/ui/Card';
import { Placeholder } from '@/components/ui/Placeholder';
import { cn } from '@/lib/utils';

import { allPairs, type Pair } from '@/content/pairs';

function Art({ kind, after }: { kind: Pair['kind']; after: boolean }) {
  if (kind === 'paint') {
    return (
      <div className="absolute inset-0" style={{ background: after ? 'linear-gradient(160deg,#050608,#15181e 55%,#07080a)' : 'linear-gradient(160deg,#2a2d33,#1b1d22 55%,#15171b)' }}>
        {!after && <div className="absolute inset-0 opacity-90" style={{ background: 'repeating-radial-gradient(circle at 30% 40%, rgb(255 255 255/.07) 0 2px, transparent 2px 10px), repeating-radial-gradient(circle at 70% 65%, rgb(255 255 255/.05) 0 1px, transparent 1px 8px)' }} />}
        {after && <><div className="absolute inset-0" style={{ background: 'linear-gradient(115deg, transparent 28%, rgb(255 255 255/.4) 46%, rgb(255 255 255/.06) 56%, transparent 66%)' }} /><div className="absolute inset-x-0 top-[62%] h-px bg-white/30" /></>}
      </div>
    );
  }
  if (kind === 'lamp') {
    return (
      <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect width="400" height="250" fill="#0d0f13" />
        {[110, 290].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx} cy="125" rx="78" ry="56" fill={after ? '#e9ecf1' : '#7a7550'} />
            <ellipse cx={cx} cy="125" rx="52" ry="38" fill={after ? '#fff' : '#5a5638'} />
            <circle cx={cx} cy="125" r="18" fill={after ? '#cfe6ff' : '#3f3c28'} />
            {!after && <ellipse cx={cx} cy="125" rx="78" ry="56" fill="#8a8466" opacity=".5" />}
          </g>
        ))}
      </svg>
    );
  }
  return (
    <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(45deg,#1d2026 0 6px,#171a1f 6px 12px)' }}>
      {!after && [[22, 30, 90], [58, 55, 70], [40, 75, 50], [75, 25, 60]].map(([x, y, s], i) => <span key={i} className="absolute rounded-full bg-[#5b4a36]/70 blur-[6px]" style={{ left: `${x}%`, top: `${y}%`, width: s, height: s * 0.7 }} />)}
    </div>
  );
}

export function BeforeAfter({ pairs = allPairs }: { pairs?: Pair[] }) {
  const [cur, setCur] = useState(pairs[0].id);
  const [pos, setPos] = useState(50); // % «после» видно слева
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const inView = useInView(box, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const pair = pairs.find((p) => p.id === cur)!;

  useEffect(() => {
    if (!inView || reduce) return;
    const s = animate(0, 1, { duration: 1.2, onUpdate: (t) => setPos(50 - Math.sin(t * Math.PI) * 15) });
    return () => s.stop();
  }, [inView, reduce]);

  const setFromX = (x: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5));
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5));
    else if (e.key === 'Home') setPos(0);
    else if (e.key === 'End') setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      {pairs.length > 1 && <div className="mb-4 flex flex-wrap gap-2">{pairs.map((p) => <Chip key={p.id} active={cur === p.id} onClick={() => setCur(p.id)}>{p.title}</Chip>)}</div>}
      <div ref={box} className="relative aspect-[16/10] w-full touch-pan-y select-none overflow-hidden rounded-[var(--radius-lg)] border border-line bg-coat shadow-[var(--shadow-card)] sm:aspect-[16/8]"
        onPointerDown={(e) => { drag.current = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); setFromX(e.clientX); }}
        onPointerMove={(e) => drag.current && setFromX(e.clientX)}
        onPointerUp={() => (drag.current = false)}>
        <Art kind={pair.kind} after={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}><Art kind={pair.kind} after /></div>
        <span className="absolute left-3 top-3 rounded-full bg-night/70 px-3 py-1 text-xs font-semibold text-chrome backdrop-blur">После</span>
        <span className="absolute right-3 top-3 rounded-full bg-night/70 px-3 py-1 text-xs font-semibold text-chrome backdrop-blur">До</span>
        <span className="absolute bottom-3 left-3 rounded-full bg-night/70 px-3 py-1 text-xs text-muted backdrop-blur">Пример</span>
        <div className="absolute inset-y-0 w-0.5 bg-white/80" style={{ left: `${pos}%` }}>
          <div role="slider" tabIndex={0} aria-label="Сравнение до и после" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} onKeyDown={onKey}
            className={cn('absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-wow-btn text-white shadow-lg')}>
            <span aria-hidden className="text-lg leading-none">↔</span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">Иллюстрация-пример. <Placeholder>фото работ — от клиента</Placeholder></p>
    </div>
  );
}
