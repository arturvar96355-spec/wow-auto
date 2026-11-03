'use client';
import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

export function CountUp({ to, decimals = 0, className }: { to: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const fmt = (v: number) => v.toFixed(decimals).replace('.', decimals ? '.' : '');
  /** Меняем nodeValue у существующего текстового узла: так LCP не перезапускается на каждом кадре. */
  const set = (t: string) => { const n = ref.current?.firstChild; if (n) n.nodeValue = t; };
  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) { set(fmt(to)); return; }
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => { set(fmt(v)); } });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to, reduce]);
  return <span ref={ref} className={`tnum ${className ?? ''}`}>{fmt(to)}</span>;
}
