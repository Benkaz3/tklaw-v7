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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: dict.menu.attorneys, href: getPath(lang, 'attorneys') },
    { label: dict.menu.practices, href: getPath(lang, 'practices') },
    { label: dict.menu.blog, href: getPath(lang, 'blog') },
  ];

  const switchLang = lang === 'vi' ? '/en' : '/vi';
  const switchLabel = lang === 'vi' ? 'EN' : 'VI';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[80px] transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 h-full flex items-center justify-between">
        {/* Left: Logo + Firm name */}
        <Link href={getPath(lang, 'home')} className="flex items-center gap-3">
          <Image
            src="/tklaw.png"
            alt={dict.logo.alt}
            width={36}
            height={36}
            className="flex-shrink-0"
          />
          <span
            className={`font-display text-sm tracking-wide uppercase transition-all duration-300 ${
              scrolled ? 'text-navy-900' : 'text-white'
            }`}
          >
            TK &amp; Associates
          </span>
        </Link>

        {/* Center: Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                scrolled
                  ? 'text-navy-700 hover:text-gold'
                  : 'text-white/80 hover:text-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">
          {/* Phone number — desktop only */}
          <a
            href="tel:+84913777995"
            className={`hidden md:flex items-center gap-2 font-body text-sm font-medium tracking-wide transition-all duration-300 ${
              scrolled ? 'text-gold-dark' : 'text-gold'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            091 377 7995
          </a>

          {/* Language switcher */}
          <Link
            href={switchLang}
            className={`font-body text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
              scrolled
                ? 'text-navy-700 hover:text-gold'
                : 'text-white/80 hover:text-gold'
            }`}
          >
            {switchLabel}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`md:hidden transition-all duration-300 ${
              scrolled ? 'text-navy-900' : 'text-white'
            }`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-navy-900 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-6 py-8 space-y-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg text-white font-body font-medium tracking-wide hover:text-gold transition-all duration-300 border-b border-gold/20 pb-3"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={getPath(lang, 'contact')}
            className="text-lg text-white font-body font-medium tracking-wide hover:text-gold transition-all duration-300 border-b border-gold/20 pb-3"
          >
            {dict.menu.contact}
          </Link>
          <a
            href="tel:+84913777995"
            className="flex items-center gap-2 text-gold font-body text-base font-medium pt-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            091 377 7995
          </a>
        </div>
      </div>
    </nav>
  );
}
