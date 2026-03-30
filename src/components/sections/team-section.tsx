import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionary';
import { getPath } from '@/lib/i18n';
import { getEntries } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';

interface TeamSectionProps {
  lang: Locale;
  dict: Dictionary;
}

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

export default async function TeamSection({ lang, dict }: TeamSectionProps) {
  const entries = await getEntries('author', { locale: lang });

  return (
    <section className="bg-navy-900 grain section-padding text-white">
      <div className="section-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-gold/80 font-body mb-2">
            OUR PEOPLE
          </p>
          <h2 className="font-display text-display-md text-white">
            {dict.homepage.our_team_section.title}
          </h2>
          <p className="text-warm-300/60 mt-3 font-body">
            {dict.homepage.our_team_section.subtitle}
          </p>
          <div className="gold-line-center mt-6" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.items.map((entry: any) => {
            const { name, slug, title, photo } = entry.fields;
            const photoUrl = photo?.fields?.file?.url;

            return (
              <div
                key={entry.sys.id}
                className="group relative overflow-hidden rounded-lg bg-navy-800 border border-transparent group-hover:border-gold/20 transition-colors"
              >
                {/* Photo area */}
                <div className="relative h-72 bg-gradient-to-br from-navy-700 to-navy-600">
                  {photoUrl ? (
                    <Image
                      src={photoUrl.startsWith('//') ? `https:${photoUrl}` : photoUrl}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-6xl text-gold/10">
                        {getInitial(name)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info bar */}
                <div className="p-6">
                  <h3 className="font-display text-xl text-white group-hover:text-gold transition-colors">
                    {name}
                  </h3>
                  {title && (
                    <p className="text-warm-300/60 text-sm mt-1 font-body">{title}</p>
                  )}
                  <Link
                    href={getPath(lang, 'attorneyProfile', slug)}
                    className="mt-3 inline-block text-gold text-sm font-body tracking-wide"
                  >
                    {dict.homepage.our_team_section.link_text} &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
