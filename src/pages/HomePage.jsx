import HeroSection from '../components/HeroSection';
import PracticesSection from '../components/PracticesSection';
import CTASection from '../components/CTASection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import FAQSection from '../components/FAQs';
import PageSeo from '../components/PageSeo';

const sections = [
  HeroSection,
  PracticesSection,
  CTASection,
  BlogSection,
  ContactSection,
  FAQSection,
];

function HomePage() {
  return (
    <>
      <PageSeo pageKey="HomePage" />

      {sections.map((Section, index) => (
        <Section key={index} data-aos="fade-up" />
      ))}
    </>
  );
}

export default HomePage;