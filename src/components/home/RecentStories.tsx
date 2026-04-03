'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { StoryMeta } from '@/types/story';

interface RecentStoriesProps {
  stories: StoryMeta[];
}

export function RecentStories({ stories }: RecentStoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 260;
    scrollRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  if (stories.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="py-16"
      style={{ backgroundColor: 'var(--রং-পুরনো-কাগজ)' }}
    >
      <div className="container mx-auto px-4">
        <h2
          className="text-center text-3xl mb-2"
          style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
        >
          সদ্য যোগ হয়েছে
        </h2>
        <div className="alpona-divider mb-10" aria-hidden="true" />

        {/* Carousel */}
        <div className="relative">
          {/* Scroll arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hidden md:flex"
            style={{
              background: 'var(--রং-কার্ড)',
              border: '1px solid var(--সীমা-হালকা)',
              boxShadow: 'var(--ছায়া-কার্ড)',
              color: 'var(--রং-কালি-মাঝারি)',
            }}
            aria-label="আগের গল্প"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hidden md:flex"
            style={{
              background: 'var(--রং-কার্ড)',
              border: '1px solid var(--সীমা-হালকা)',
              boxShadow: 'var(--ছায়া-কার্ড)',
              color: 'var(--রং-কালি-মাঝারি)',
            }}
            aria-label="পরের গল্প"
          >
            →
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-5 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {stories.map((story, i) => (
              <motion.div
                key={story.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.1, 0.5) }}
                className="snap-start shrink-0"
                style={{ width: '240px' }}
              >
                <Link href={`/golpo/${story.slug}`}>
                  <div className="paper-card p-5 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="ink-badge ink-badge--saffron text-xs self-start">
                        {story.category}
                      </span>
                      {story.isAI && <span className="ink-badge ink-badge--ai text-xs self-start">🤖 AI</span>}
                    </div>
                    <h3
                      className="text-base mb-1 line-clamp-2"
                      style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-কালি)' }}
                    >
                      {story.title}
                    </h3>
                    <p className="text-xs mb-2" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
                      {story.author}
                    </p>
                    <p className="text-xs mt-auto" style={{ color: 'var(--রং-কালি-হালকা)' }}>
                      {story.readTimeText}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
