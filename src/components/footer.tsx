import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionary';
import { getPath } from '@/lib/i18n';

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Footer({ lang, dict }: FooterProps) {
  const year = new Date().getFullYear();

  const links = [
    { label: dict.menu.contact, href: getPath(lang, 'contact') },
    { label: dict.menu.attorneys, href: getPath(lang, 'attorneys') },
    { label: dict.menu.policies, href: getPath(lang, 'policies') },
    { label: dict.menu.practices, href: getPath(lang, 'practices') },
  ];

  return (
    <footer className="py-8 px-4 lg:px-12 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Links row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social media */}
        <div className="flex justify-center mb-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-500">
          &copy; {year} {dict.global.footer_copy_statement}
        </p>
      </div>
    </footer>
  );
}
