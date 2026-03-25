import { useState, useCallback } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LangSwitcher from './LangSwitcher'
import logo from '../assets/logo-v6.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const language = i18n.language || 'en'
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), [])
  const getDynamicPath = useCallback(
    path => {
      const base = t(`menu.path.${path}`, { defaultValue: '' })
      return `/${language}${base ? `/${base}` : ''}`
    },
    [language, t]
  )
  const menuItems = ['attorneys', 'practices_and_sectors', 'blog', 'contact']
  const officeNameLines = t("navbar.office_name", { returnObjects: true });


  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        {/* top bar */}
        <div className="relative flex items-center justify-between py-2">
          {/* logo */}
          <Link to="/" className="flex-none">
            <img
              src={logo}
              alt={t('logo.alt')}
              title={t('logo.title')}
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* centered, responsive title */}
          <h2
            className="
              text-center
              whitespace-nowrap text-primary font-bold pointer-events-none
              text-base       /* 16px on smallest */
              sm:text-lg      /* ~19px ≥640px */
              md:text-xl      /* ~23px ≥768px */
              lg:text-2xl     /* ~28px ≥1024px */
            "
          >
            {officeNameLines.map((line, i) => (
              <span key={i} className="block md:inline">
                {line}
              </span>
            ))}
          </h2>

          {/* lang + burger */}
          <div className="flex items-center space-x-4">
            <LangSwitcher />
            <button
              onClick={toggleMenu}
              className="block lg:hidden focus:outline-none transition-transform duration-200 transform hover:scale-110"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>

        {/* desktop links */}
        <div className="hidden lg:flex justify-center space-x-6 border-t border-gray-200 py-2 max-w-max mx-auto">
          {menuItems.map(key => (
            <Link
              key={key}
              to={getDynamicPath(key)}
              className="transition-colors duration-300 hover:text-buttonBg"
            >
              {t(`menu.${key}`)}
            </Link>
          ))}
        </div>

        {/* mobile dropdown */}
        {isOpen && (
          <div className="lg:hidden bg-white text-black overflow-hidden transition-transform duration-300 ease-in-out">
            <div className="flex flex-col items-center space-y-4 py-4">
              {menuItems.map(key => (
                <Link
                  key={key}
                  to={getDynamicPath(key)}
                  onClick={toggleMenu}
                  className="font-bold transition-colors duration-300 hover:text-accent"
                >
                  {t(`menu.${key}`)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
