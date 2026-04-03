'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import type { StoryMeta } from '@/types/story';
import { toBengaliNumeral } from '@/lib/utils';

interface SearchClientProps {
  stories: StoryMeta[];
}

export function SearchClient({ stories }: SearchClientProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StoryMeta[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(() => {
    return new Fuse(stories, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'author', weight: 2 },
        { name: 'tags', weight: 1.5 },
        { name: 'excerpt', weight: 0.5 },
        { name: 'category', weight: 1 },
      ],
      threshold: 0.35,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [stories]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);

    // Direct match first
    const direct = stories.filter(
      (s) =>
        s.title.includes(query) ||
        s.author.includes(query)
    );

    if (direct.length > 0) {
      setResults(direct);
    } else {
      // Fuzzy search
      const fuseResults = fuse.search(query);
      setResults(fuseResults.map((r) => r.item));
    }
  }, [query, stories, fuse]);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search input */}
      <div className="relative mb-8">
        <input
          ref={inputRef}
          type="search"
          placeholder="শিরোনাম, লেখকের নাম, বিষয়..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-4 rounded text-lg"
          style={{
            background: 'var(--রং-কার্ড)',
            border: '2px solid var(--সীমা-মাঝারি)',
            color: 'var(--রং-কালি)',
            fontFamily: 'var(--ফন্ট-মূল)',
            boxShadow: 'var(--ছায়া-কার্ড)',
          }}
          autoComplete="off"
          aria-label="গল্প খুঁজুন"
        />
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
          style={{ color: 'var(--রং-কালি-বিবর্ণ)' }}
          aria-hidden="true"
        >
          🔍
        </span>
      </div>

      {/* Results */}
      {hasSearched && (
        <p className="text-sm mb-4" style={{ color: 'var(--রং-কালি-হালকা)' }}>
          {results.length > 0
            ? `${toBengaliNumeral(results.length)} টি ফলাফল`
            : 'কোনো ফলাফল পাওয়া যায়নি'}
        </p>
      )}

      <AnimatePresence mode="popLayout">
        {results.map((story) => (
          <motion.div
            key={story.slug}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Link href={`/golpo/${story.slug}`}>
              <div
                className="paper-card p-5"
                style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
              >
                <div className="flex items-start justify-between">
                  <h3
                    className="text-lg"
                    style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-কালি)' }}
                  >
                    {story.title}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {story.isAI && <span className="ink-badge ink-badge--ai text-xs">🤖 AI</span>}
                    <span className="ink-badge ink-badge--saffron text-xs">
                      {story.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm" style={{ color: 'var(--রং-জাফরান)' }}>
                  {story.author}
                  {story.publicationYear && ` · ${story.publicationYear}`}
                </p>
                <p className="text-sm line-clamp-2" style={{ color: 'var(--রং-কালি-হালকা)' }}>
                  {story.excerpt}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Empty state prompt */}
      {!hasSearched && (
        <div className="text-center py-12">
          <p className="text-lg" style={{ color: 'var(--রং-কালি-বিবর্ণ)', fontFamily: 'var(--ফন্ট-শিরোনাম)' }}>
            কী খুঁজছেন?
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--রং-কালি-বিবর্ণ)' }}>
            লেখকের নাম, গল্পের শিরোনাম, বা বিষয় লিখুন
          </p>
        </div>
      )}
    </div>
  );
}
