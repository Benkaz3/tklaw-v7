import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPath } from '../config/routes';

const NotFoundPage = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'vi';

  const title = t('not_found_page.title');
  const linkText = t('not_found_page.link_text');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-3xl mt-4">{title || 'Page Not Found'}</h2>
      <Link to={getPath(language, 'home')} className="mt-4 text-blue-500 hover:underline">
        {linkText || 'Go Home'}
      </Link>
    </div>
  );
};

export default NotFoundPage;
