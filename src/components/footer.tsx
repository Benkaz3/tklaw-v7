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

  const quickLinks = [
    { label: lang === 'vi' ? 'Trang ch\u1EE7' : 'Home', href: getPath(lang, 'home') },
    { label: dict.menu.practices, href: getPath(lang, 'practices') },
    { label: dict.menu.blog, href: getPath(lang, 'blog') },
    { label: dict.menu.attorneys, href: getPath(lang, 'attorneys') },
  ];

  return (
    <footer className="bg-navy-900 text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-5 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Firm info */}
          <div>
            <h3 className="font-display text-xl tracking-wide uppercase">
              TK &amp; Associates
            </h3>
            <div className="w-12 h-0.5 bg-gold mt-3 mb-5" />
            <p className="text-warm-300 text-sm leading-relaxed">
              {lang === 'vi'
                ? 'V\u0103n ph\u00F2ng Lu\u1EADt s\u01B0 TK & Li\u00EAn Danh \u0111\u01B0\u1EE3c S\u1EDF T\u01B0 ph\u00E1p TP.HCM c\u1EA5p gi\u1EA5y ph\u00E9p ho\u1EA1t \u0111\u1ED9ng t\u1EEB n\u0103m 2014. Ch\u00FAng t\u00F4i chuy\u00EAn cung c\u1EA5p d\u1ECBch v\u1EE5 t\u01B0 v\u1EA5n ph\u00E1p l\u00FD, tranh t\u1EE5ng v\u00E0 \u0111\u1EA1i di\u1EC7n ngo\u00E0i t\u1ED1 t\u1EE5ng cho c\u00E1c v\u1EA5n \u0111\u1EC1 ph\u00E1p l\u00FD.'
                : 'TK & Associates Law Office was licensed by the Ho Chi Minh City Department of Justice in 2014. We provide litigation, legal consulting, and out-of-court representation across a wide range of legal matters.'}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold mb-4 font-body font-medium">
              {lang === 'vi' ? 'Liên k\u1EBFt nhanh' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 hover:text-gold text-sm transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold mb-4 font-body font-medium">
              {lang === 'vi' ? 'Liên h\u1EC7' : 'Contact'}
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-warm-300 leading-relaxed">
                {dict.global.office_address}
              </p>
              <a
                href="tel:+84913777995"
                className="block text-warm-300 hover:text-gold transition-all duration-300"
              >
                {dict.global.phone}
              </a>
              <a
                href={`mailto:${dict.global.email}`}
                className="block text-warm-300 hover:text-gold transition-all duration-300"
              >
                {dict.global.email}
              </a>
              <p className="text-warm-300">
                {dict.businessInfo.officeHours}
              </p>
            </div>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold mb-4 font-body font-medium">
              {lang === 'vi' ? 'Theo d\u00F5i ch\u00FAng t\u00F4i' : 'Follow Us'}
            </h4>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-warm-300 hover:text-gold transition-all duration-300"
              aria-label="Facebook"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-warm-400">
            &copy; {year} {dict.global.footer_copy_statement}
          </p>
          <Link
            href={getPath(lang, 'policies')}
            className="text-xs text-warm-400 hover:text-gold transition-all duration-300"
          >
            {dict.menu.policies}
          </Link>
        </div>
      </div>
    </footer>
  );
}
