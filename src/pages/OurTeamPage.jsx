import OurTeamSection from '../components/OurTeamSection';
import PageSeo from '../components/PageSeo';
import PageHero from '../components/PageHero';

const OurTeamPage = () => {
  return (
    <div>
      <PageSeo pageKey="OurTeamPage" />
      <PageHero />
      <OurTeamSection />
    </div>
  );
};

export default OurTeamPage;