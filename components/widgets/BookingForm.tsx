'use client';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Phone, Send } from 'lucide-react';
import { bookingServices } from '@/content/services';
import { carClasses } from '@/content/ppf';
import { site } from '@/content/site';
import { Chip } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Placeholder } from '@/components/ui/Placeholder';
import { buildMessage, messengerUrl } from '@/lib/booking';
import { setBooking, useBooking } from '@/lib/booking-store';
import Link from 'next/link';

const times = Array.from({ length: site.hours.close - site.hours.open }, (_, i) => `${site.hours.open + i}:00`);
const fieldCls = 'min-h-12 w-full rounded-2xl border border-line bg-night px-4 text-chrome placeholder:text-muted focus:border-wow focus:outline-none';

function nextDays() {
  const fmt = new Intl.DateTimeFormat('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' });
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return { id: String(i), label: i === 0 ? 'Сегодня' : i === 1 ? 'Завтра' : fmt.format(d) }; });
}

export function BookingForm() {
  const b = useBooking();
  const [days, setDays] = useState<{ id: string; label: string }[]>([]);
  const [day, setDay] = useState('0');
  const [time, setTime] = useState('');
  const [car, setCar] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => setDays(nextDays()), []);

  const service = b.service;
  const dayLabel = useMemo(() => days.find((d) => d.id === day)?.label ?? '', [days, day]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!service) er.service = 'Выберите услугу';
    if (name.trim().length < 2) er.name = 'Введите имя';
    if (phone.replace(/\D/g, '').length < 10) er.phone = 'Введите телефон полностью';
    setErr(er);
    if (Object.keys(er).length) return;
    const text = buildMessage({ service, carClass: b.carClass, car, day: dayLabel, time, name: name.trim(), phone, note: b.note });
    setDone(text);
    if (site.messenger.number) window.open(messengerUrl(site.messenger.number, text), '_blank', 'noopener');
  };
  const copy = async () => { try { await navigator.clipboard.writeText(done ?? ''); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* нет доступа к буферу */ } };

  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-coat p-5 shadow-[var(--shadow-card)] sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="py-4 text-center">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }} className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-wow-btn text-white"><Check size={32} /></motion.span>
            <h3 className="mt-5 font-display text-2xl font-bold">Заявка готова</h3>
            <p className="mx-auto mt-2 max-w-md">{site.messenger.number ? 'Открыли мессенджер с текстом заявки.' : <>Мессенджера для заявок пока нет: <Placeholder>номер WhatsApp — от клиента</Placeholder>. Позвоните или скопируйте текст.</>}</p>
            <pre className="mx-auto mt-5 max-w-md whitespace-pre-wrap rounded-2xl border border-line bg-night p-4 text-left text-sm text-text">{done}</pre>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href={site.phoneHref}><Phone size={18} strokeWidth={1.5} />Позвонить</Button>
              <Button variant="ghost" onClick={copy}><Copy size={18} strokeWidth={1.5} />{copied ? 'Скопировано' : 'Скопировать заявку'}</Button>
              <Button variant="ghost" onClick={() => setDone(null)}>Изменить</Button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="f-service" className="mb-2 block text-sm font-semibold text-chrome">Услуга</label>
                <select id="f-service" value={service} onChange={(e) => setBooking({ service: e.target.value })} aria-invalid={!!err.service} className={fieldCls}>
                  <option value="">Выберите</option>
                  {bookingServices.map((s) => <option key={s}>{s}</option>)}
                </select>
                {err.service && <p className="mt-1 text-sm text-wow" role="alert">{err.service}</p>}
                {b.note && <p className="mt-2 text-sm text-muted">Ваш выбор: {b.note}</p>}
              </div>
              <div>
                <label htmlFor="f-car" className="mb-2 block text-sm font-semibold text-chrome">Марка и модель</label>
                <input id="f-car" value={car} onChange={(e) => setCar(e.target.value)} placeholder="Например, Skoda Octavia" className={fieldCls} autoComplete="off" />
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-chrome">Класс авто</p>
              <div className="flex flex-wrap gap-2">{carClasses.map((c) => <Chip key={c.id} active={b.carClass === c.label} onClick={() => setBooking({ carClass: b.carClass === c.label ? '' : c.label })}>{c.label}</Chip>)}</div>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-chrome">Удобный день</p>
              <div className="flex flex-wrap gap-2">{days.map((d) => <Chip key={d.id} active={day === d.id} onClick={() => setDay(d.id)}>{d.label}</Chip>)}</div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="f-time" className="mb-2 block text-sm font-semibold text-chrome">Время</label>
                <select id="f-time" value={time} onChange={(e) => setTime(e.target.value)} className={fieldCls}><option value="">Любое</option>{times.map((t) => <option key={t}>{t}</option>)}</select>
              </div>
              <div>
                <label htmlFor="f-name" className="mb-2 block text-sm font-semibold text-chrome">Имя</label>
                <input id="f-name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!err.name} autoComplete="name" className={fieldCls} />
                {err.name && <p className="mt-1 text-sm text-wow" role="alert">{err.name}</p>}
              </div>
              <div>
                <label htmlFor="f-phone" className="mb-2 block text-sm font-semibold text-chrome">Телефон</label>
                <input id="f-phone" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7" aria-invalid={!!err.phone} autoComplete="tel" className={fieldCls} />
                {err.phone && <p className="mt-1 text-sm text-wow" role="alert">{err.phone}</p>}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" size="lg"><Send size={18} strokeWidth={1.5} />Отправить заявку</Button>
              <p className="max-w-sm text-sm">Цену назовём по телефону, и она не изменится. <Placeholder>согласовать формулировку</Placeholder></p>
            </div>
            <p className="text-xs text-muted">Нажимая кнопку, Вы соглашаетесь на <Link href="/privacy/" className="underline">обработку персональных данных</Link>.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
