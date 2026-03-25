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
    { label: dict.menu.contact, href: getPath(lang, 'contact') },
  ];

  const switchLang = lang === 'vi' ? '/en' : '/vi';
  const flagEmoji = lang === 'vi' ? '🇺🇸' : '🇻🇳';

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50 h-[72px]">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 h-full flex items-center justify-between">
        {/* Left: Logo + Office name */}
        <Link href={getPath(lang, 'home')} className="flex items-center gap-3">
          <Image src="/tklaw.png" alt={dict.logo.alt} width={40} height={40} />
          <div className="leading-tight">
            {dict.navbar.office_name.map((line, i) => (
              <span key={i} className="block text-sm font-semibold tracking-wide">
                {line}
              </span>
            ))}
          </div>
        </Link>

        {/* Right: Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={switchLang}
            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
          >
            {flagEmoji}
          </Link>
        </div>

        {/* Mobile: Hamburger + Language switcher */}
        <div className="flex items-center gap-4 md:hidden">
          <Link
            href={switchLang}
            className="text-sm font-medium text-gray-700 hover:text-primary"
          >
            {flagEmoji}
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
