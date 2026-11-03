import { Phone, CalendarCheck } from 'lucide-react';
import { site } from '@/content/site';

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-night/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <a href={site.phoneHref} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line font-semibold text-chrome"><Phone size={18} strokeWidth={1.5} />Позвонить</a>
      <a href="#zapis" className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-wow-btn font-semibold text-white"><CalendarCheck size={18} strokeWidth={1.5} />Записаться</a>
    </div>
  );
}
