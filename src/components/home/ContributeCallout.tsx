'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function ContributeCallout() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #8B5E3C 0%, #6B4423 50%, #4A2F16 100%)',
      }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(/images/paper-light.png)',
          backgroundSize: '300px',
        }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2
          className="text-3xl md:text-4xl mb-4"
          style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: '#E8DEC8' }}
        >
          আপনার পছন্দের গল্পটি এখানে নেই?
        </h2>

        <p
          className="max-w-xl mx-auto mb-8 text-base leading-relaxed"
          style={{ color: 'rgba(232, 222, 200, 0.85)', fontFamily: 'var(--ফন্ট-মূল)' }}
        >
          গল্পের.পাতা একটি সম্প্রদায়চালিত প্ল্যাটফর্ম। যেকেউ GitHub-এ Pull Request পাঠিয়ে
          নতুন গল্প যোগ করতে পারেন। আপনারও একটি প্রিয় গল্প থাকলে সেটি যোগ করুন —
          সব বাংলাভাষীর জন্য।
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={process.env.NEXT_PUBLIC_GITHUB_REPO_URL || 'https://github.com/MdSagorMunshi/golperpata'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#E8DEC8',
              border: '2px solid rgba(232, 222, 200, 0.3)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub-এ গল্প জমা দিন
          </a>
          <Link
            href="/rupantar"
            className="btn"
            style={{
              background: 'var(--রং-জাফরান)',
              color: '#fff',
              border: '2px solid var(--রং-জাফরান)',
            }}
          >
            রূপান্তরক ব্যবহার করুন
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
