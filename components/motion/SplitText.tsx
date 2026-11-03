/** Заголовок по словам: маска снизу вверх, stagger 50 мс. Чистый CSS — рисуется до гидратации. */
export function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(/\s+/);
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
          <span className="split-word" style={{ animationDelay: `${delay + i * 0.05}s` }}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </span>
  );
}
