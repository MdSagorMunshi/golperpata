'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { useReadingMode } from '@/components/providers/ReadingModeProvider';

const navLinks = [
  { href: '/golpo', label: 'গল্প' },
  { href: '/lekhok', label: 'লেখক' },
  { href: '/khojo', label: 'খুঁজুন' },
  { href: '/rupantar', label: 'রূপান্তরক' },
  { href: '/likhun', label: 'এডিটর' },
  { href: '/about', label: 'সম্পর্কে' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isReadingMode } = useReadingMode();

  if (isReadingMode) return null;

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: 'var(--রং-কাগজ)',
        borderColor: 'var(--সীমা-হালকা)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="container mx-auto flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="গল্পের.পাতা হোমপেজ">
          <Image
            src="/images/logo.png"
            alt="গল্পের.পাতা লোগো"
            width={36}
            height={36}
            className="rounded transition-transform group-hover:scale-105"
          />
          <span
            className="text-lg hidden sm:block"
            style={{
              fontFamily: 'var(--ফন্ট-শিরোনাম)',
              color: 'var(--রং-কালি)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            গল্পের<span style={{ color: 'var(--রং-জাফরান)' }}>.</span>পাতা
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:opacity-80"
              style={{
                fontFamily: 'var(--ফন্ট-মূল)',
                color: 'var(--রং-কালি)',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Burger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded"
            style={{ color: 'var(--রং-কালি)' }}
            aria-label={mobileOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t"
            style={{
              backgroundColor: 'var(--রং-কাগজ)',
              borderColor: 'var(--সীমা-হালকা)',
            }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 px-2 rounded transition-colors"
                  style={{
                    color: 'var(--রং-কালি)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
