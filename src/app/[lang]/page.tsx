import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import HeroSection from '@/components/sections/hero-section';
import PracticesSection from '@/components/sections/practices-section';
import CTASection from '@/components/sections/cta-section';
import BlogSection from '@/components/sections/blog-section';
import TeamSection from '@/components/sections/team-section';
import ContactSection from '@/components/sections/contact-section';
import FAQSection from '@/components/sections/faq-section';
import TestimonialsSection from '@/components/sections/testimonials-section';

type Props = { params: { lang: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildMetadata('HomePage', params.lang as Locale);
}

export default async function HomePage({ params }: Props) {
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      <HeroSection lang={lang} dict={dict} />
      <PracticesSection lang={lang} dict={dict} />
      <TestimonialsSection dict={dict} />
      <CTASection lang={lang} dict={dict} />
      <TeamSection lang={lang} dict={dict} />
      <BlogSection lang={lang} dict={dict} />
      <ContactSection lang={lang} dict={dict} />
      <FAQSection dict={dict} />
    </>
  );
}
