'use client';
import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';

/** Lenis + GSAP грузятся лениво, после первой отрисовки: не тормозят старт страницы. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cleanup = () => {};
    let cancelled = false;
    const start = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => { gsap.ticker.remove(tick); lenis.destroy(); };
    };
    const id = setTimeout(start, 500);
    return () => {
      cancelled = true;
      clearTimeout(id);
      cleanup();
    };
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
