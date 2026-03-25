import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPath } from '../config/routes';

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'en';

  const titles = Array.isArray(t('homepage.hero.title', { returnObjects: true }))
  ? t('homepage.hero.title', { returnObjects: true })
  : [];

  const subtitles = Array.isArray(t('homepage.hero.subtitle', { returnObjects: true }))
    ? t('homepage.hero.subtitle', { returnObjects: true })
    : [];

  const buttons = [
    {
      key: 'primary',
      to: getPath(language, 'contact'),
      text: t('homepage.hero.button_text'),
      ariaLabel: t('homepage.hero.button_text'),
      classes:
        'relative inline-flex items-center justify-center uppercase text-white font-medium py-3 px-6 transition duration-300 bg-primary rounded hover:shadow-lg transform hover:-translate-y-0.5',
    },
    {
      key: 'secondary',
      to: getPath(language, 'attorneys'),
      text: t('homepage.hero.meet_the_team', { defaultValue: 'Meet the Team' }),
      ariaLabel: t('homepage.hero.meet_team_text'),
      classes:
        'relative inline-flex items-center justify-center uppercase text-primary font-medium py-3 px-6 transition duration-300 bg-transparent border border-primary rounded hover:bg-primary hover:text-white hover:shadow-lg transform hover:-translate-y-0.5',
    },
  ];

  return (
    <header className="bg-card_background flex flex-col items-center justify-center pb-16 pt-24 md:pt-28 lg:pt-36">
      <div className="relative z-10 max-w-4xl text-center px-6 md:px-12 lg:px-16 transition duration-300 fade-in">
        <div className='mb-6'>
          {titles.map((title, index) => (
            <h1 key={index} className="
                              font-primary capitalize font-bold leading-tight text-text
                              text-lg
                              sm:text-xl
                              md:text-2xl
                              lg:text-3xl
                              ">
              {title}
            </h1>
          ))}
        </div>
        {subtitles.map((paragraph, index) => (
          <p key={index} className=" text-text mb-8 text-justify">
            {paragraph}
          </p>
        ))}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          {buttons.map(({ key, to, text, ariaLabel, classes }) => (
            <Link
              key={key}
              to={to}
              className={classes}
              aria-label={ariaLabel}
            >
              <span className="capitalize">{text}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default HeroSection;