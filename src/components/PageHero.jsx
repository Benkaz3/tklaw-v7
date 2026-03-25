import heroBg from '../assets/practices_hero_bg.webp';
import Breadcrumb from './Breadcrumb';

const PageHero = ({ ariaLabel, children }) => (
  <>
    <section
      className="relative h-80 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${heroBg})` }}
      role="img"
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0 bg-black opacity-50" aria-hidden="true" />
      {children}
    </section>
    <Breadcrumb />
  </>
);

export default PageHero;
