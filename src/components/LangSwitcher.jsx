// src/components/LangSwitcher.jsx
import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import CountryFlag from 'react-country-flag';
import SLUG_MAPPING from '../config/slugMapping';
import client from '../contentful'; // reuse your configured Contentful client

const LANGUAGES = {
  en: { countryCode: 'US', label: 'English' },
  vi: { countryCode: 'VN', label: 'Tiếng Việt' },
};

// Only handle Practice detail routes
const PRACTICE_MATCHERS = {
  vi: /^\/vi\/linh-vuc-hanh-nghe\/([^/]+)$/,
  en: /^\/en\/practices\/([^/]+)$/,
  base: { vi: '/vi/linh-vuc-hanh-nghe', en: '/en/practices' },
  contentType: 'practice',
};

// Get localized slug with Contentful client
async function getLocalizedPracticeSlug(currentSlug, fromLang, toLang) {
  try {
    // 1) find entry id by current slug + locale
    const res = await client.getEntries({
      content_type: PRACTICE_MATCHERS.contentType,
      'fields.slug': currentSlug,
      locale: fromLang,
      limit: 1,
    });
    const id = res?.items?.[0]?.sys?.id;
    if (!id) return null;

    // 2) load same entry in target locale and read fields.slug
    const entry = await client.getEntry(id, { locale: toLang });
    const slug = entry?.fields?.slug;
    return typeof slug === 'string' ? slug : null;
  } catch {
    return null;
  }
}

const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('preferredLanguage');
    if (stored && stored !== i18n.language) {
      handleLanguageChange(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((v) => !v);
  }, []);

  // Fallback for non-practice routes: map static segments
  const mapStaticPath = useCallback((toLang, currentPath) => {
    const segs = currentPath.split('/').filter(Boolean);
    if (segs.length === 0) return `/${toLang}`;
    const [, ...rest] = segs; // drop current lang
    let next = `/${toLang}`;
    rest.forEach((s) => {
      const mapped = (SLUG_MAPPING[toLang] && SLUG_MAPPING[toLang][s]) || s;
      next += `/${mapped}`;
    });
    return next || `/${toLang}`;
  }, []);

  // If on a practice detail page, resolve target-locale slug
  const maybeBuildPracticeUrl = useCallback(
    async (toLang, fromLang, currentPath) => {
      const m =
        fromLang === 'vi'
          ? PRACTICE_MATCHERS.vi.exec(currentPath)
          : PRACTICE_MATCHERS.en.exec(currentPath);
      if (!m) return null;

      const currentSlug = m[1];
      const targetSlug =
        (await getLocalizedPracticeSlug(currentSlug, fromLang, toLang)) ||
        currentSlug;

      return `${PRACTICE_MATCHERS.base[toLang]}/${targetSlug}`;
    },
    []
  );

  const handleLanguageChange = useCallback(
    async (toLang) => {
      if (toLang === i18n.language) {
        setIsDropdownOpen(false);
        return;
      }
      const fromLang = i18n.language === 'vi' ? 'vi' : 'en';

      // Practices → fetch localized slug
      const practiceUrl = await maybeBuildPracticeUrl(
        toLang,
        fromLang,
        location.pathname
      );

      // Otherwise, static mapping
      const targetPath =
        practiceUrl || mapStaticPath(toLang, location.pathname);

      i18n.changeLanguage(toLang);
      localStorage.setItem('preferredLanguage', toLang);
      navigate(targetPath, { replace: true });
      setIsDropdownOpen(false);
    },
    [i18n, location.pathname, navigate, mapStaticPath, maybeBuildPracticeUrl]
  );

  return (
    <div ref={dropdownRef} className='relative inline-block text-left'>
      <button
        onClick={toggleDropdown}
        className='flex items-center px-3 py-2 focus:outline-none text-black bg-white hover:bg-background rounded-sm transition duration-200'
        aria-haspopup='true'
        aria-expanded={isDropdownOpen}
      >
        <CountryFlag
          countryCode={LANGUAGES[i18n.language]?.countryCode || 'US'}
          svg
          style={{ width: '1.5em', height: '1.5em' }}
        />
        <FaChevronDown className='ml-2' />
      </button>
      {isDropdownOpen && (
        <div className='absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-sm z-50'>
          {Object.entries(LANGUAGES).map(([code, { label }]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className='block px-4 py-2 w-full text-left text-black hover:bg-gray-100 transition duration-200'
              aria-label={label}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LangSwitcher;
