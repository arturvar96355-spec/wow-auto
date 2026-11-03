'use client';
import { useLayoutEffect, useRef } from 'react';
import { steps } from '@/content/steps';
import { Container } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { T } from '@/components/ui/Text';

function Glass({ filmRef }: { filmRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] border border-line bg-gradient-to-br from-[#1c2430] via-[#101a26] to-[#0a1018] shadow-[var(--shadow-card)] [clip-path:polygon(0_6%,8%_0,92%_0,100%_100%,0_100%)]">
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgb(255_255_255/0.08)_48%,transparent_60%)]" />
      <div ref={filmRef} data-film className="absolute inset-0 border-l-2 border-wow bg-gradient-to-r from-[#050a12]/95 to-[#0b1a2a]/90">
        <div aria-hidden className="absolute left-0 top-0 h-full w-0 -translate-x-1/2">
          <div className="absolute left-1/2 top-[8%] h-[84%] w-2 -translate-x-1/2 rounded-full bg-chrome shadow-[0_0_24px_rgb(255_59_48/0.6)]" />
          <div className="absolute left-1/2 top-[44%] h-10 w-6 -translate-x-1/2 rounded-lg bg-wow" />
        </div>
      </div>
    </div>
  );
}

export function Process() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    let revert = () => {};
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-step]', el);
        gsap.set(items, { autoAlpha: 0, y: 24 });
        gsap.set('[data-film]', { xPercent: 100 });
        const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: el, start: 'top top', end: '+=250%', scrub: 0.6, pin: true, anticipatePin: 1 } });
        items.forEach((it, i) => {
          tl.to(it, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, i);
          if (i > 0) tl.to(items[i - 1], { autoAlpha: 0.28, duration: 0.3 }, i);
        });
        tl.to('[data-film]', { xPercent: 0, duration: items.length - 0.2, ease: 'none' }, 0.4);
        tl.to({}, { duration: 0.4 });
        return () => { tl.scrollTrigger?.kill(); tl.kill(); };
      });
      revert = () => mm.revert();
    })();
    return () => { cancelled = true; revert(); };
  }, []);

  return (
    <section id="kak-prohodit" ref={root} className="relative scroll-mt-0">
      {/* Десктоп: pin + scrub */}
      <div className="process-pin hidden min-h-screen items-center md:flex">
        <Container className="grid w-full items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-wow">Как проходит</p>
            <h2 className="mb-10 text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold">Пять шагов от консультации до осмотра</h2>
            <Glass />
          </div>
          <ol className="space-y-7">
            {steps.map((s) => (
              <li key={s.n} data-step className="flex gap-5">
                <span className="font-display text-3xl font-bold text-wow tnum">{s.n}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-1.5 max-w-md"><T>{s.text}</T></p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </div>
      {/* Мобильный и reduced motion: карточки без pin */}
      <div className="process-cards py-16 md:hidden">
        <Container>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-wow">Как проходит</p>
          <h2 className="mb-8 text-[clamp(1.75rem,6vw,2.5rem)] font-bold">Пять шагов от консультации до осмотра</h2>
          <ol className="space-y-4">
            {steps.map((s) => (
              <li key={s.n}>
                <Reveal>
                  <div className="rounded-[var(--radius-card)] border border-line bg-coat p-5">
                    <span className="font-display text-2xl font-bold text-wow tnum">{s.n}</span>
                    <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1.5 text-[15px]"><T>{s.text}</T></p>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full w-full origin-left animate-[film-fill_1.2s_var(--ease-out-expo)_both] bg-wow" /></div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}
