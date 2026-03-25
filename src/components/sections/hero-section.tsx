import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionary';
import { getPath } from '@/lib/i18n';
import Link from 'next/link';

interface HeroSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export default function HeroSection({ lang, dict }: HeroSectionProps) {
  const hero = dict.homepage.hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero grain overflow-hidden">
      {/* Decorative scales of justice watermark */}
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 text-gold opacity-[0.03]"
        viewBox="0 0 200 200"
        fill="currentColor"
        aria-hidden="true"
      >
        <rect x="98" y="20" width="4" height="160" rx="2" />
        <circle cx="100" cy="20" r="8" />
        <line x1="40" y1="70" x2="160" y2="70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 70 L20 120 Q20 140 50 140 Q80 140 80 120 Z" />
        <path d="M160 70 L140 120 Q140 140 170 140 Q200 140 200 120 Z" />
        <rect x="80" y="170" width="40" height="6" rx="3" />
        <rect x="70" y="176" width="60" height="4" rx="2" />
      </svg>

      <div className="relative z-10 max-w-content mx-auto px-5 md:px-8 text-center flex flex-col items-center">
        {/* Gold accent line */}
        <div className="w-12 h-[2px] bg-gold mb-6" />

        {/* Tagline */}
        <p className="text-xs tracking-[0.3em] uppercase text-gold/80 font-body mb-8">
          ESTABLISHED 2014 &middot; HO CHI MINH CITY
        </p>

        {/* Main headline */}
        <h1>
          {hero.title.map((line: string, i: number) => (
            <span key={i} className="block font-display text-display-xl text-white font-bold">
              {i === 1 ? (
                <span className="text-gold">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-lg text-warm-300/80 font-body max-w-2xl leading-relaxed">
          {hero.subtitle[0]}
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href={getPath(lang, 'contact')}
            className="bg-gold text-navy-900 font-body font-semibold text-sm tracking-wide uppercase px-8 py-4 hover:bg-gold-light transition-colors"
          >
            {hero.button_text}
          </Link>
          <Link
            href={getPath(lang, 'attorneys')}
            className="border border-white/30 text-white font-body text-sm tracking-wide uppercase px-8 py-4 hover:border-gold hover:text-gold transition-colors"
          >
            {hero.meet_the_team}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-[1px] h-16 bg-white/20" />
        <span className="block w-1.5 h-1.5 rounded-full bg-gold animate-pulse-slow" />
      </div>
    </section>
  );
}
