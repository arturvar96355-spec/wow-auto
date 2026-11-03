'use client';
import dynamic from 'next/dynamic';

const Skel = ({ h }: { h: string }) => <div style={{ minHeight: h }} className="animate-pulse rounded-[var(--radius-lg)] border border-line bg-coat" aria-hidden />;

export const TintFittingLazy = dynamic(() => import('./TintFitting').then((m) => m.TintFitting), { ssr: false, loading: () => <Skel h="620px" /> });
export const FilmLampLazy = dynamic(() => import('./FilmLamp').then((m) => m.FilmLamp), { ssr: false, loading: () => <Skel h="520px" /> });
export const PpfCalculatorLazy = dynamic(() => import('./PpfCalculator').then((m) => m.PpfCalculator), { ssr: false, loading: () => <Skel h="640px" /> });
export const BeforeAfterLazy = dynamic(() => import('./BeforeAfter').then((m) => m.BeforeAfter), { ssr: false, loading: () => <Skel h="420px" /> });
