'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with Ken Burns */}
      <div className="absolute inset-0 ken-burns">
        <Image
          src="/images/hero-bg.png"
          alt="পুরনো পড়ার টেবিল — প্রদীপ, বই, কালি-কলম"
          fill
          className="object-cover"
          priority
          quality={85}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(26, 18, 8, 0.55)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Site Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="leading-tight"
          style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
        >
          <span
            className="block text-5xl md:text-7xl lg:text-8xl"
            style={{ color: '#E8DEC8' }}
          >
            গল্পের
          </span>
          <span
            className="block text-6xl md:text-8xl lg:text-9xl mt-1"
            style={{ color: 'var(--রং-জাফরান)' }}
          >
            পাতা
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 text-base md:text-lg tracking-widest"
          style={{
            color: '#E8DEC8',
            fontFamily: 'var(--ফন্ট-মূল)',
            letterSpacing: '0.08em',
          }}
        >
          বাংলা সাহিত্যের উন্মুক্ত ভান্ডার
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-3 text-sm md:text-base"
          style={{ color: 'rgba(232, 222, 200, 0.7)', fontFamily: 'var(--ফন্ট-মূল)' }}
        >
          সম্পূর্ণ বিনামূল্যে · কোনো বিজ্ঞাপন নেই · সবার জন্য উন্মুক্ত
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/golpo"
            className="btn btn--primary text-base"
            style={{ borderRadius: '4px' }}
          >
            গল্প পড়ুন
          </a>
          <a
            href="/khojo"
            className="btn text-base"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#E8DEC8',
              border: '2px solid rgba(232, 222, 200, 0.3)',
            }}
          >
            খুঁজুন
          </a>
        </motion.div>
      </div>

      {/* Floating Quill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-32 right-8 md:right-24 float-quill hidden md:block"
      >
        <Image
          src="/images/quill.png"
          alt=""
          width={80}
          height={160}
          aria-hidden="true"
          className="opacity-60"
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p
          className="text-xs mb-2"
          style={{ color: 'rgba(232, 222, 200, 0.5)', fontFamily: 'var(--ফন্ট-মূল)' }}
        >
          নিচে যান
        </p>
        <div className="bounce" style={{ color: 'rgba(232, 222, 200, 0.5)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
