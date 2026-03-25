import { FaFacebook} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPath } from '../config/routes';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'en';

  const menuItems = [
    { key: 'contact', routeKey: 'contact' },
    { key: 'attorneys', routeKey: 'attorneys' },
    { key: 'policies', routeKey: 'policies' },
    { key: 'practices', routeKey: 'practices' },
  ];

  const socialMedia = [
    { icon: FaFacebook, url: 'https://www.facebook.com', label: 'Facebook' },
  ];

  return (
    <footer className="py-8 px-4 lg:px-12 mt-12 relative z-10">
      <div className="container mx-auto flex flex-col items-start space-y-4">
        <div className="flex flex-wrap items-start gap-6">
          {menuItems.map(({ key, routeKey }) => (
            <Link
              key={key}
              to={getPath(language, routeKey)}
              className="hover:text-accent transition duration-300"
            >
              {t(`menu.${key}`)}
            </Link>
          ))}
        </div>
        <div className="flex space-x-4 text-center">
          {socialMedia.map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition duration-300"
              aria-label={label}
            >
              <Icon size={32} />
            </a>
          ))}
        </div>
        <div className="text-center border-t border-accent opacity-50 pt-4 w-full">
          <p>
            &copy; {new Date().getFullYear()} {t('global.footer_copy_statement')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;