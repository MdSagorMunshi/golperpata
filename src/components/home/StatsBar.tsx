'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { toBengaliNumeral } from '@/lib/utils';

interface StatsBarProps {
  stats: {
    totalStories: number;
    totalAuthors: number;
    totalCategories: number;
  };
}

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {toBengaliNumeral(count)}{suffix}
    </span>
  );
}

const statItems = [
  { key: 'stories', icon: '📖', label: 'টি গল্প', field: 'totalStories' as const },
  { key: 'authors', icon: '✍️', label: 'জন লেখক', field: 'totalAuthors' as const },
  { key: 'categories', icon: '🏷️', label: 'টি বিষয়শ্রেণী', field: 'totalCategories' as const },
  { key: 'free', icon: '✅', label: 'সম্পূর্ণ বিনামূল্যে', field: null },
];

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="py-6 border-y"
      style={{
        backgroundColor: 'var(--রং-পুরনো-কাগজ)',
        borderColor: 'var(--সীমা-হালকা)',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {statItems.map((item) => (
            <div key={item.key} className="flex flex-col items-center gap-0.5">
              <span className="text-xl" aria-hidden="true">{item.icon}</span>
              <span
                className="text-2xl md:text-3xl"
                style={{
                  fontFamily: 'var(--ফন্ট-শিরোনাম)',
                  color: 'var(--রং-জাফরান)',
                  fontWeight: 700,
                }}
              >
                {item.field ? (
                  <AnimatedCounter end={stats[item.field]} />
                ) : (
                  '✓'
                )}
              </span>
              <span
                className="text-sm"
                style={{
                  fontFamily: 'var(--ফন্ট-মূল)',
                  color: 'var(--রং-কালি)',
                  fontWeight: 500,
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
