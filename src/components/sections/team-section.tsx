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

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default async function TeamSection({ lang, dict }: TeamSectionProps) {
  const entries = await getEntries('author', { locale: lang });
  const count = entries.items.length;

  const gridCols =
    count <= 1
      ? 'grid-cols-1'
      : count === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          {dict.homepage.our_team_section.title}
        </h2>
        <p className="text-lg text-gray-600">
          {dict.homepage.our_team_section.subtitle}
        </p>
      </div>

      <div className={`grid ${gridCols} gap-8 justify-items-center`}>
        {entries.items.map((entry: any) => {
          const { name, slug, title, photo } = entry.fields;
          const photoUrl = photo?.fields?.file?.url;

          return (
            <div key={entry.sys.id} className="text-center">
              {photoUrl ? (
                <Image
                  src={photoUrl.startsWith('//') ? `https:${photoUrl}` : photoUrl}
                  alt={name}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 object-cover w-[120px] h-[120px]"
                />
              ) : (
                <div className="w-[120px] h-[120px] rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-4">
                  {getInitials(name)}
                </div>
              )}
              <h3 className="text-xl font-semibold">{name}</h3>
              {title && <p className="text-gray-600 mb-2">{title}</p>}
              <Link
                href={getPath(lang, 'attorneyProfile', slug)}
                className="text-primary font-medium hover:underline"
              >
                {dict.homepage.our_team_section.link_text}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
