import type { Locale } from '@/lib/i18n';
import { isValidLocale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // Note: In Next.js 14, params may need to be awaited depending on the version
  const lang = params.lang;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang}>
      <body className="min-h-screen flex flex-col">
        <Navbar lang={lang as Locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang as Locale} dict={dict} />
      </body>
    </html>
  );
}
