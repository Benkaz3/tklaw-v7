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
    <section className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero_bg.webp)' }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          {hero.title.map((line: string, i: number) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="mb-8">
          {hero.subtitle.map((text: string, i: number) => (
            <p key={i} className="text-lg sm:text-xl opacity-80 mb-2">
              {text}
            </p>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={getPath(lang, 'contact')}
            className="bg-primary text-white px-6 py-3 rounded"
          >
            {hero.button_text}
          </Link>
          <Link
            href={getPath(lang, 'attorneys')}
            className="border border-white px-6 py-3 rounded"
          >
            {hero.meet_the_team}
          </Link>
        </div>
      </div>
    </section>
  );
}
