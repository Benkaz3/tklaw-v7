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
    <section className="bg-linear-primary-secondary text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl mb-4">
          {cta.title}{' '}
          <span className="font-bold">{cta.highlight_title}</span>
        </h2>

        <p className="text-lg opacity-90 mb-8">{cta.subtitle}</p>

        <Link
          href={getPath(lang, 'contact')}
          className="bg-white text-primary px-6 py-3 rounded font-semibold inline-block"
        >
          {cta.button_text}
        </Link>
      </div>
    </section>
  );
}
