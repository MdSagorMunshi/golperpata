'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { StoryMeta } from '@/types/story';
import { toBengaliNumeral } from '@/lib/utils';

interface FeaturedStoriesProps {
  stories: StoryMeta[];
}

function StoryCard({ story, large = false }: { story: StoryMeta; large?: boolean }) {
  return (
    <Link href={`/golpo/${story.slug}`}>
      <motion.article
        whileHover={{ y: -4 }}
        className="paper-card h-full p-6 cursor-pointer"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: large ? '320px' : '200px',
        }}
      >
        {/* Category badge */}
        <div className="mb-3 flex items-center gap-2">
          <span className="ink-badge ink-badge--saffron text-xs">
            {story.category}
          </span>
          {story.isAI && <span className="ink-badge ink-badge--ai text-xs">🤖 AI</span>}
        </div>

        {/* Title */}
        <h3
          className={`mb-2 transition-colors ${large ? 'text-2xl md:text-3xl' : 'text-lg'}`}
          style={{
            fontFamily: 'var(--ফন্ট-শিরোনাম)',
            color: 'var(--রং-কালি)',
          }}
        >
          {story.title}
        </h3>

        {/* Author */}
        <p
          className="text-sm mb-3"
          style={{ color: 'var(--রং-কালি-মাঝারি)', fontFamily: 'var(--ফন্ট-মূল)' }}
        >
          {story.author}
          {story.publicationYear && ` · ${story.publicationYear}`}
        </p>

        {/* Excerpt */}
        <p
          className={`mb-4 ${large ? 'text-base' : 'text-sm'} line-clamp-3`}
          style={{ color: 'var(--রং-কালি-মাঝারি)', lineHeight: '1.7' }}
        >
          {story.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-auto flex items-center gap-3 text-xs" style={{ color: 'var(--রং-কালি-হালকা)' }}>
          <span>{story.readTimeText}</span>
        </div>

        {/* Tags */}
        <div className="mt-3 flex gap-2 flex-wrap">
          {story.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="ink-badge text-xs">
              {tag}
            </span>
          ))}
        </div>
      </motion.article>
    </Link>
  );
}

export function FeaturedStories({ stories }: FeaturedStoriesProps) {
  if (stories.length === 0) return null;

  const [main, ...side] = stories;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2
          className="text-center text-3xl mb-2"
          style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-কালি)' }}
        >
          বিশেষ গল্প
        </h2>
        <div className="alpona-divider mb-10" aria-hidden="true" />

        {/* Grid: 1 large + 2 small */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main featured */}
          <div className="lg:col-span-3">
            <StoryCard story={main} large />
          </div>

          {/* Side stories */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {side.map((story, i) => (
              <motion.div
                key={story.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * (i + 1) }}
              >
                <StoryCard story={story} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* View all link */}
        <div className="text-center mt-8">
          <Link
            href="/golpo"
            className="btn"
          >
            সব গল্প দেখুন →
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
