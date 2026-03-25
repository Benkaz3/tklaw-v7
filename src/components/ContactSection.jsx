import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getPath } from '../config/routes';
import ErrorBoundary from './ErrorBoundary';


const ContactDetail = ({ label, value, href, type }) => {
  if (!value) {
    return null;
  }

  return (
    <p className=" text-text mb-2">
      <span className="font-bold">{label}:</span>
      {type === 'link' && href ? (
        <a href={href} className="text-primary font-bold hover:underline ml-1" target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      ) : (
        <span className="ml-1">{value}</span>
      )}
    </p>
  );
};

ContactDetail.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  href: PropTypes.string,
  type: PropTypes.oneOf(['text', 'link']),
};

ContactDetail.defaultProps = {
  value: '',
  href: '',
  type: 'text',
};

const ContactCard = ({ title, address, phone, email, language }) => {
  const { t } = useTranslation();

  const mapRoute = getPath(language, 'contact');

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 bg-card_background p-4 md:p-6 rounded-lg mx-auto transition-transform transform hover:scale-105">
      {title && (
        <h3 className="font-semibold mb-3 md:mb-4 text-text">
          {title}
        </h3>
      )}
      {address && (
        <p className=" text-text mb-4">{address}</p>
      )}

      <ContactDetail
        label={t('global.labels.phone_label', 'Phone')}
        value={phone}
        href={phone ? `tel:${phone}` : ''}
        type="link"
      />

      <ContactDetail
        label={t('global.labels.email_label', 'Email')}
        value={email}
        href={email ? `mailto:${email}` : ''}
        type="link"
      />

      {mapRoute && (
        <div className="mt-6 mb-2 md:mt-8 text-start">
          <Link
            to={mapRoute}
            className="inline-flex items-center justify-center uppercase text-primary font-medium py-3 px-6 transition duration-300 bg-transparent border border-primary rounded hover:bg-primary hover:text-white hover:shadow-lg transform hover:-translate-y-0.5"
            aria-label={t('global.labels.view_on_map_label', 'View on Map')}
          >
            <p>{t('global.labels.view_on_map_label', 'View on Map')}</p>
          </Link>
        </div>
      )}
    </div>
  );
};

ContactCard.propTypes = {
  title: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  language: PropTypes.string.isRequired,
};

ContactCard.defaultProps = {
  title: '',
  address: '',
  phone: '',
  email: '',
};

const ContactSection = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const contactDetails = useMemo(
    () => ({
      title: t('global.labels.contact_us_label', 'Contact Us'),
      officeAddress: t('global.office_address', 'Our office address is not available at the moment.'),
      phone: t('global.phone', ''), 
      email: t('global.email', ''),
    }),
    [t]
  );

  const hasContactInfo = contactDetails.phone || contactDetails.email || contactDetails.officeAddress;

  return (
    <ErrorBoundary fallback={<div className="py-12 bg-background text-center text-red-500">Unable to load contact information at this time.</div>}>
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto max-w-container-desktop px-4">
          {contactDetails.title ? (
            <h2 className="font-primary text-start md:text-center font-bold leading-tight mb-6 text-text">
              {contactDetails.title}
            </h2>
          ) : (
            <h2 className="font-primary text-start md:text-center lg:text-6xl font-bold leading-tight mb-6 text-text">
              {t('global.labels.default_contact_title', 'Get in Touch')}
            </h2>
          )}

          {hasContactInfo ? (
            <div className="flex flex-col md:flex-row justify-center items-start space-y-6 md:space-y-0 md:space-x-8">
              <ContactCard
                title={t('global.labels.office_address_label', 'Office Address')}
                address={contactDetails.officeAddress}
                phone={contactDetails.phone}
                email={contactDetails.email}
                language={language}
              />
            </div>
          ) : (
            <div className="text-center text-text">
              {t('global.labels.no_contact_info', 'Contact information is currently unavailable. Please try again later.')}
            </div>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default memo(ContactSection);