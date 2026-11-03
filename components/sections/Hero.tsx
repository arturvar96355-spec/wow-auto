import { Star } from 'lucide-react';
import { site } from '@/content/site';
import { SplitText } from '@/components/motion/SplitText';
import { CountUp } from '@/components/motion/CountUp';
import { Badge } from '@/components/ui/Card';
import { Container } from '@/components/ui/Section';
import { HeroArt } from './HeroArt';
import { HeroCtas } from './HeroCtas';

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-32 pt-32 sm:items-center sm:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_75%_65%,rgb(255_59_48/0.16),transparent_70%),radial-gradient(80%_60%_at_20%_0%,rgb(30_40_60/0.5),transparent_70%)]" />
      <HeroArt />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-night to-transparent" />
      <Container className="relative">
        <div>
          <a href={site.reviewsUrl} target="_blank" rel="noopener noreferrer">
            <Badge className="gap-2.5">
              <Star size={15} fill="#ff3b30" strokeWidth={0} />
              <span className="tnum"><CountUp to={5} decimals={1} /> · <CountUp to={site.rating.marks} /> оценок на Яндекс Картах</span>
            </Badge>
          </a>
        </div>
        <h1 className="mt-6 max-w-[15ch] text-[clamp(2rem,5.2vw,4.5rem)] font-bold leading-[1.06] sm:max-w-[16ch]">
          <SplitText text="Тонировка и защитные плёнки в Марьино" delay={0.1} />
        </h1>
        <p className="fade-up mt-6 max-w-xl text-lg text-text sm:text-xl" style={{ animationDelay: '0.5s' }}>{site.lead}.</p>
        <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: '0.65s' }}><HeroCtas /></div>
      </Container>
    </section>
  );
}
