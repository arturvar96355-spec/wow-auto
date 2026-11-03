/** Видимая заглушка под данные клиента. Принимает текст без скобок. */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="placeholder">[{children}]</span>;
}

/** Рендерит строку, в которой заглушки записаны как [текст], — заглушки оформляются стилем. */
export function WithPlaceholders({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('[') && p.endsWith(']') ? <Placeholder key={i}>{p.slice(1, -1)}</Placeholder> : <span key={i}>{p}</span>,
      )}
    </>
  );
}
