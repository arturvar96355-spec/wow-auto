import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode; href?: string; onClick?: () => void; variant?: 'primary' | 'ghost'; size?: 'md' | 'lg';
  className?: string; type?: 'button' | 'submit'; disabled?: boolean; 'aria-label'?: string;
};

export function Button({ children, href, onClick, variant = 'primary', size = 'md', className, type = 'button', disabled, ...rest }: Props) {
  const cls = cn(
    'gloss inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold transition-[transform,box-shadow,background-color,border-color] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:opacity-50',
    size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3 text-[15px]',
    variant === 'primary'
      ? 'bg-wow-btn text-white hover:shadow-[var(--shadow-glow)]'
      : 'border border-line bg-white/[0.03] text-chrome hover:border-white/30 hover:bg-white/[0.07]',
    className,
  );
  if (href) {
    const external = /^(https?:|tel:|mailto:)/.test(href);
    return external ? (
      <a href={href} className={cls} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>{children}</a>
    ) : (
      <Link href={href} className={cls} {...rest}>{children}</Link>
    );
  }
  return <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>{children}</button>;
}
