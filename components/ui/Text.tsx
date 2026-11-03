import { WithPlaceholders } from './Placeholder';
import { tg } from '@/lib/typograph';

/** Текст из /content: типограф + оформление заглушек [ … ]. */
export function T({ children }: { children: string }) {
  return <WithPlaceholders text={tg(children)} />;
}
