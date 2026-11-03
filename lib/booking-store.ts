'use client';
import { useSyncExternalStore } from 'react';

export type BookingState = { service: string; carClass: string; note: string };
let state: BookingState = { service: '', carClass: '', note: '' };
const listeners = new Set<() => void>();

export function setBooking(patch: Partial<BookingState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}
export function useBooking() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; },
    () => state,
    () => state,
  );
}
/** Предзаполняет форму и прокручивает к записи. */
export function goToBooking(patch: Partial<BookingState>) {
  setBooking(patch);
  document.getElementById('zapis')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
