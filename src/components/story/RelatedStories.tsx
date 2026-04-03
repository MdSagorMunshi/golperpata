'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { StoryMeta } from '@/types/story';

interface RelatedStoriesProps {
  stories: StoryMeta[];
}

export function RelatedStories({ stories }: RelatedStoriesProps) {
  if (stories.length === 0) return null;

  return (
    <section className="py-12 related-stories" style={{ backgroundColor: 'var(--রং-পুরনো-কাগজ)' }}>
      <div className="container mx-auto px-4">
        <h2
          className="text-center text-2xl mb-2"
          style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
        >
          আরও পড়ুন
        </h2>
        <div className="alpona-divider mb-8" aria-hidden="true" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stories.map((story, i) => (
            <motion.div
              key={story.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
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
                  <p className="text-xs line-clamp-2 mb-3" style={{ color: 'var(--রং-কালি-হালকা)' }}>
                    {story.excerpt}
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
    </section>
  );
}
