'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { StoryMeta, Category, SortOrder } from '@/types/story';
import { CATEGORIES } from '@/types/story';
import { toBengaliNumeral } from '@/lib/utils';

interface BrowseClientProps {
  stories: StoryMeta[];
  tags: Map<string, number>;
}

export function BrowseClient({ stories, tags: _tags }: BrowseClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = [...stories];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((s) => s.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.author.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortOrder === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title, 'bn'));
    } else if (sortOrder === 'popular') {
      result.sort((a, b) => b.viewCount - a.viewCount);
    } else {
      result.sort((a, b) => {
        if (!a.dateAdded || !b.dateAdded) return 0;
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      });
    }

    return result;
  }, [stories, selectedCategory, sortOrder, searchQuery]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
        {/* Search */}
        <input
          type="search"
          placeholder="গল্প খুঁজুন..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded text-base"
          style={{
            background: 'var(--রং-কার্ড)',
            border: '1px solid var(--সীমা-হালকা)',
            color: 'var(--রং-কালি)',
            fontFamily: 'var(--ফন্ট-মূল)',
          }}
        />

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`ink-badge text-xs cursor-pointer transition-all ${selectedCategory === 'all' ? 'ink-badge--saffron' : ''}`}
          >
            সব
          </button>
          {CATEGORIES.slice(0, 8).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`ink-badge text-xs cursor-pointer transition-all ${selectedCategory === cat ? 'ink-badge--saffron' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          className="px-3 py-2 rounded text-sm"
          style={{
            background: 'var(--রং-কার্ড)',
            border: '1px solid var(--সীমা-হালকা)',
            color: 'var(--রং-কালি)',
            fontFamily: 'var(--ফন্ট-মূল)',
          }}
        >
          <option value="recent">সদ্য যোগ হয়েছে</option>
          <option value="alphabetical">বর্ণানুক্রমে</option>
          <option value="popular">জনপ্রিয়</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm mb-6" style={{ color: 'var(--রং-কালি-হালকা)' }}>
        মোট {toBengaliNumeral(filtered.length)} টি গল্প
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((story) => (
            <motion.div
              key={story.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={`/golpo/${story.slug}`}>
                <div className="paper-card p-5 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="ink-badge ink-badge--saffron text-xs">{story.category}</span>
                      {story.isAI && <span className="ink-badge ink-badge--ai text-xs">🤖 AI</span>}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--রং-কালি-হালকা)' }}>
                      {story.readTimeText}
                    </span>
                  </div>

                  <h3
                    className="text-lg mb-1 line-clamp-2"
                    style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-কালি)' }}
                  >
                    {story.title}
                  </h3>

                  <p className="text-sm mb-2" style={{ color: 'var(--রং-জাফরান)' }}>
                    {story.author}
                    {story.publicationYear && ` · ${story.publicationYear}`}
                  </p>

                  <p className="text-sm line-clamp-3 mb-3" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
                    {story.excerpt}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {story.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="ink-badge text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg" style={{ color: 'var(--রং-কালি-মাঝারি)', fontFamily: 'var(--ফন্ট-শিরোনাম)' }}>
            কোনো গল্প পাওয়া যায়নি
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--রং-কালি-হালকা)' }}>
            অন্য কিছু দিয়ে খুঁজে দেখুন
          </p>
        </div>
      )}
    </div>
  );
}
