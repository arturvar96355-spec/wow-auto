import { cn } from '@/lib/utils';

export function Card({ children, className, hover }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={cn(
      'rounded-[var(--radius-card)] border border-line bg-coat p-6 shadow-[var(--shadow-card)]',
      hover && 'gloss transition-[transform,border-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-white/25',
      className,
    )}>{children}</div>
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-4 py-1.5 text-sm text-chrome', className)}>{children}</span>;
}

export function Chip({ active, children, onClick, className }: { active?: boolean; children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick}
      className={cn('min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200',
        active ? 'border-wow bg-wow/15 text-white' : 'border-line bg-white/[0.03] text-text hover:border-white/30 hover:text-chrome', className)}>
      {children}
    </button>
  );
}

export function PhotoPlaceholder({ caption, className }: { caption: string; className?: string }) {
  return (
    <div className={cn('flex aspect-[4/3] items-center justify-center rounded-[var(--radius-md)] border border-dashed border-muted/50 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.03)_0_10px,transparent_10px_20px)] p-4 text-center', className)}>
      <span className="placeholder">{caption}</span>
    </div>
  );
}
