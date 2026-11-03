'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/** Магнитная обёртка для CTA. Только pointer: fine, смещение ≤ 8 px. */
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width / 2)) * 0.15)));
    y.set(Math.max(-8, Math.min(8, (e.clientY - (r.top + r.height / 2)) * 0.15)));
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={move} onPointerLeave={leave} className={`inline-block ${className ?? ''}`}>
      {children}
    </motion.div>
  );
}
