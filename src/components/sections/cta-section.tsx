import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionary';
import { getPath } from '@/lib/i18n';
import Link from 'next/link';

interface CtaSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export default function CtaSection({ lang, dict }: CtaSectionProps) {
  const cta = dict.homepage.cta_section;

  return (
    <section className="bg-navy-900 grain section-padding">
      <div className="max-w-3xl mx-auto text-center">
        {/* Gold line */}
        <div className="gold-line-center mb-8" />

        {/* Heading */}
        <h2 className="font-display text-display-lg text-white">
          {cta.title}{' '}
          <em className="text-gold not-italic">{cta.highlight_title}</em>
        </h2>

        {/* Subtitle */}
        <p className="text-warm-300/70 mt-4 text-lg font-body">
          {cta.subtitle}
        </p>

        {/* Phone number */}
        <a
          href={`tel:${dict.businessInfo.hotline.replace(/\s/g, '')}`}
          className="mt-8 block text-gold text-display-md font-display font-bold hover:text-gold-light transition-colors"
        >
          {dict.businessInfo.hotline}
        </a>

        {/* CTA button */}
        <Link
          href={getPath(lang, 'contact')}
          className="mt-6 inline-block bg-gold text-navy-900 font-body font-semibold text-sm tracking-wide uppercase px-8 py-4 hover:bg-gold-light transition-colors"
        >
          {cta.button_text}
        </Link>
      </div>
    </section>
  );
}
