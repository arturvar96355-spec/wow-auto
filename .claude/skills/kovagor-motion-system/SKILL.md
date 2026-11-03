---
name: kovagor-motion-system
description: Стандарты анимаций для сайтов Kovagor — Lenis, GSAP ScrollTrigger, Motion, reduced motion, производительность. Использовать при добавлении любой анимации, scroll-сцены, hover-эффекта или интерактивного перехода.
---

# Система анимаций Kovagor

Анимация должна ощущаться как работа дорогой студии, а не как набор эффектов. Мало, точно, плавно.

## 1. Базовые значения

| Что | Значение |
|---|---|
| Главная кривая | `cubic-bezier(0.22, 1, 0.36, 1)` (в Motion: `[0.22, 1, 0.36, 1]`) |
| Появление блока | opacity 0→1, y 32→0, blur 6px→0, 0.8 с, один раз, порог 15–20% |
| Stagger строк/слов | 40–60 мс |
| Hover карточки | translateY −4 px, тень/рамка, 250 мс |
| Магнитная кнопка | смещение ≤ 8 px, только `pointer: fine` |
| Count-up | 1.2–1.6 с, easeOut, tabular-nums |
| Смена состояния виджета | 300–500 мс, Motion `layout` / `AnimatePresence` |

Анимировать **только** `transform` и `opacity` (и `filter` точечно). Никогда не анимировать `width/height/top/left`.

## 2. Lenis + GSAP ScrollTrigger

`components/motion/SmoothScroll.tsx`:

```tsx
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
```

## 3. Scroll-сцена с pin (шаблон)

```tsx
useLayoutEffect(() => {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: 'top top', end: '+=250%', scrub: 0.6, pin: true },
    });
    tl.to('.step-1', { autoAlpha: 1 }).to('.film', { xPercent: -100 }, '<');
    // ...
    return () => tl.kill();
  });
  return () => mm.revert();
}, []);
```

- На мобильном (< 768 px) — без pin: те же шаги карточками, анимация при появлении.
- Высота pin — не больше 300% экрана, иначе сцена утомляет.
- В конце каждой сцены — понятный «выход» к следующему блоку.

## 4. Reduced motion — обязательно

- `@media (prefers-reduced-motion: reduce)`: выключить scrub, pin, параллакс, автодвижение, бесконечные анимации. Состояния переключаются мгновенно.
- В Motion: `useReducedMotion()` и `MotionConfig reducedMotion="user"` в корне.

## 5. Производительность

- Тяжёлые виджеты (большие SVG, canvas, 3D) — через `next/dynamic` с `ssr: false` и плейсхолдером той же высоты (без сдвига макета).
- `will-change` ставить только на время анимации.
- Цель: 60 fps на среднем ноутбуке, без «дёрганья» при скролле на iPhone. Проверять в DevTools → Performance.
- Бесконечные анимации (блики, «дыхание») останавливать, когда блок вне экрана (IntersectionObserver).

## 6. Чего не делать

- Не анимировать каждый элемент страницы.
- Не использовать bounce, elastic и «прыгающие» кривые.
- Не прятать важный текст до окончания анимации больше чем на 1 с.
- Не делать кастомный курсор, если промпт его не просит.
