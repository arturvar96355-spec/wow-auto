'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

function HeroCar() {
  return (
    <svg viewBox="0 0 900 340" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id="hb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a2e36" /><stop offset="0.45" stopColor="#14161b" /><stop offset="1" stopColor="#07080a" /></linearGradient>
        <linearGradient id="hg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0b1a2a" /><stop offset="1" stopColor="#16324f" /></linearGradient>
        <linearGradient id="hl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="0.5" stopColor="#fff" stopOpacity="0.28" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <path d="M30 250 C30 225 45 212 75 206 L205 190 C245 140 300 108 380 104 L560 104 C640 106 690 150 730 186 L820 198 C860 204 880 224 880 250 L880 268 C880 280 870 286 858 286 L42 286 C34 286 30 278 30 268Z" fill="url(#hb)" stroke="rgb(255 255 255 / .12)" />
      <path d="M268 186 C300 140 340 120 392 118 L470 118 L470 186Z M486 118 L560 118 C610 120 650 150 684 186 L486 186Z" fill="url(#hg)" stroke="rgb(255 255 255 / .1)" />
      <path d="M70 212 L820 200" stroke="url(#hl)" strokeWidth="3" fill="none" />
      <path d="M60 240 L850 236" stroke="rgb(255 255 255 / .06)" strokeWidth="2" fill="none" />
      <circle cx="210" cy="288" r="58" fill="#050607" /><circle cx="700" cy="288" r="58" fill="#050607" />
      <circle cx="210" cy="288" r="42" fill="#0e1014" stroke="rgb(255 255 255 / .18)" strokeWidth="2" /><circle cx="700" cy="288" r="42" fill="#0e1014" stroke="rgb(255 255 255 / .18)" strokeWidth="2" />
      <circle cx="210" cy="288" r="16" fill="#23262d" /><circle cx="700" cy="288" r="16" fill="#23262d" />
      <path d="M840 214 L874 224 L872 236 L836 230Z" fill="#e9ecf1" opacity=".85" />
      <path d="M32 222 L52 218 L52 236 L32 238Z" fill="#ff3b30" />
      <ellipse cx="450" cy="326" rx="430" ry="14" fill="#000" opacity=".6" />
    </svg>
  );
}

/** Силуэт авто: параллакс при скролле + блик, который чуть следует за курсором (≤ 30 px). */
export function HeroArt() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const parY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 90]);
  const mx = useSpring(useMotionValue(0), { stiffness: 40, damping: 20, mass: 1.4 });

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    const on = (e: PointerEvent) => mx.set((e.clientX / window.innerWidth - 0.5) * 60);
    window.addEventListener('pointermove', on);
    return () => window.removeEventListener('pointermove', on);
  }, [mx, reduce]);

  return (
    <motion.div aria-hidden style={{ y: parY }} className="absolute bottom-[2%] right-[-30%] -z-10 h-[40%] w-[150%] opacity-90 sm:bottom-[4%] sm:right-[-14%] sm:top-[34%] sm:h-auto sm:w-[68%] lg:top-[30%]">
      <HeroCar />
      <motion.div style={{ x: mx }} className="absolute inset-0 overflow-hidden"><div className="hero-sweep" /></motion.div>
    </motion.div>
  );
}
