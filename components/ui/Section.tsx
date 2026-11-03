import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';
import { tg } from '@/lib/typograph';

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-10', className)}>{children}</div>;
}

export function Section({ id, eyebrow, title, lead, children, className }: {
  id?: string; eyebrow?: string; title?: string; lead?: string; children?: React.ReactNode; className?: string;
}) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-16 sm:py-24', className)}>
      <Container>
        {(title || eyebrow) && (
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-wow">{eyebrow}</p>}
            {title && <h2 className="text-[clamp(1.75rem,4.2vw,3rem)] font-bold">{tg(title)}</h2>}
            {lead && <p className="mt-4 text-lg text-text">{tg(lead)}</p>}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
