'use client';

import Link from 'next/link';
import { useReadingMode } from '@/components/providers/ReadingModeProvider';

const footerLinks = [
  { href: '/golpo', label: 'গল্প' },
  { href: '/lekhok', label: 'লেখক' },
  { href: '/khojo', label: 'খুঁজুন' },
  { href: '/rupantar', label: 'রূপান্তরক' },
  { href: '/likhun', label: 'এডিটর' },
  { href: '/about', label: 'সম্পর্কে' },
  { href: '/terms', label: 'শর্তাবলি' },
  { href: '/privacy', label: 'গোপনীয়তা' },
  {
    href: process.env.NEXT_PUBLIC_GITHUB_REPO_URL || 'https://github.com/MdSagorMunshi/golperpata',
    label: 'GitHub ↗',
    external: true,
  },
];

export function Footer() {
  const { isReadingMode } = useReadingMode();

  if (isReadingMode) return null;

  return (
    <footer
      className="border-t mt-12"
      style={{
        backgroundColor: 'var(--রং-পুরনো-কাগজ)',
        borderColor: 'var(--সীমা-হালকা)',
      }}
    >
      <div className="container mx-auto px-4 py-6">
        {/* Links row */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-4">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:opacity-80"
              style={{
                color: 'var(--রং-কালি)',
                fontWeight: 600,
                fontSize: '0.85rem',
                fontFamily: 'var(--ফন্ট-মূল)',
              }}
              {...('external' in link && link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mx-auto max-w-xs mb-4" style={{ background: 'var(--সীমা-হালকা)' }} />

        {/* Credits */}
        <div className="text-center">
          <p
            className="text-sm mb-1"
            style={{ color: 'var(--রং-কালি)', fontFamily: 'var(--ফন্ট-মূল)', fontWeight: 500 }}
          >
            তৈরি করেছেন <a href="https://github.com/MdSagorMunshi" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--রং-জাফরান)', fontWeight: 700 }}>Ryan Shelby</a> · MIT লাইসেন্স
          </p>
          <p
            className="text-xs"
            style={{ color: 'var(--রং-কালি-মাঝারি)', fontWeight: 500 }}
          >
            © {new Date().getFullYear()} গল্পের.পাতা — সম্পূর্ণ বিনামূল্যে · বিজ্ঞাপনমুক্ত
          </p>
        </div>
      </div>
    </footer>
  );
}
