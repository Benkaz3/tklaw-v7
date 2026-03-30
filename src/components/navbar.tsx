'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionary';
import { getPath } from '@/lib/i18n';

interface NavbarProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: dict.menu.attorneys, href: getPath(lang, 'attorneys') },
    { label: dict.menu.practices, href: getPath(lang, 'practices') },
    { label: dict.menu.blog, href: getPath(lang, 'blog') },
  ];

  const switchLang = lang === 'vi' ? '/en' : '/vi';
  const switchLabel = lang === 'vi' ? 'EN' : 'VI';

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Top bar: Logo | Office Name | Lang + Burger */}
        <div className="relative flex items-center justify-between py-2">
          {/* Logo */}
          <Link href={getPath(lang, 'home')} className="flex-none">
            <Image
              src="/images/logo-v6.png"
              alt={dict.logo.alt}
              title={dict.logo.title}
              width={56}
              height={56}
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Centered office name */}
          <h2 className="text-center whitespace-nowrap text-primary font-bold pointer-events-none text-base sm:text-lg md:text-xl lg:text-2xl">
            {(dict.navbar.office_name as string[]).map((line, i) => (
              <span key={i} className="block md:inline">
                {line}
              </span>
            ))}
          </h2>

          {/* Lang switcher + burger */}
          <div className="flex items-center space-x-4">
            <Link
              href={switchLang}
              className="flex items-center px-3 py-2 text-black bg-white hover:bg-gray-100 rounded-sm transition duration-200"
            >
              {/* Flag icon */}
              <Image
                src={lang === 'vi' ? '/images/flag-vn.svg' : '/images/flag-us.svg'}
                alt={switchLabel}
                width={24}
                height={16}
                className="inline-block"
              />
              <svg className="ml-2 w-3 h-3" fill="currentColor" viewBox="0 0 10 6">
                <path d="M0 0l5 6 5-6z" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="block lg:hidden focus:outline-none transition-transform duration-200 transform hover:scale-110"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex justify-center space-x-6 border-t border-gray-200 py-2 max-w-max mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-300 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white text-black overflow-hidden transition-transform duration-300 ease-in-out">
          <div className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-bold transition-colors duration-300 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={getPath(lang, 'contact')}
              className="font-bold transition-colors duration-300 hover:text-accent"
            >
              {dict.menu.contact}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
