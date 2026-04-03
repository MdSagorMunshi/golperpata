'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { toBengaliNumeral, badgeTilt } from '@/lib/utils';

interface TagCloudProps {
  tags: Map<string, number>;
}

function getTagSize(count: number): string {
  if (count >= 200) return '1.35rem';
  if (count >= 50) return '1.15rem';
  if (count >= 10) return '1rem';
  return '0.85rem';
}

export function TagCloud({ tags }: TagCloudProps) {
  const sortedTags = Array.from(tags.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  if (sortedTags.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <h2
          className="text-center text-3xl mb-2"
          style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
        >
          বিষয় অনুযায়ী
        </h2>
        <div className="alpona-divider mb-10" aria-hidden="true" />

        <div className="flex flex-wrap justify-center gap-3">
          {sortedTags.map(([tag, count], i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/tag/${encodeURIComponent(tag)}`}
                className="ink-badge transition-colors hover:border-[var(--রং-জাফরান)] hover:text-[var(--রং-জাফরান)]"
                style={{
                  fontSize: getTagSize(count),
                  transform: `rotate(${badgeTilt(tag)}deg)`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                {tag}
                <span className="text-xs opacity-60">
                  {toBengaliNumeral(count)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
