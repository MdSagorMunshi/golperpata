'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Story } from '@/types/story';
import { ReadingControls } from './ReadingControls';

interface StoryReaderProps {
  story: Story;
}

export function StoryReader({ story }: StoryReaderProps) {
  const fm = story.frontmatter;

  return (
    <article className="py-8 md:py-12">
      <div className="container mx-auto px-4" style={{ maxWidth: 'var(--max-width-reading)' }}>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          {/* Category */}
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="ink-badge ink-badge--saffron">
              {fm.বিষয়শ্রেণী}
            </span>
            {fm.এআই_নির্মিত && <span className="ink-badge ink-badge--ai">🤖 AI নির্মিত</span>}
          </div>

          {/* Title */}
          <h1
            className="mt-4 text-3xl md:text-5xl leading-tight"
            style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
          >
            {fm.শিরোনাম}
          </h1>

          {/* Author line */}
          <div className="mt-4 flex items-center justify-center gap-3 text-base" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
            <Link
              href={`/lekhok/${encodeURIComponent(fm.লেখক)}`}
              className="font-medium"
              style={{ color: 'var(--রং-জাফরান)' }}
            >
              {fm.লেখক}
            </Link>
            {fm.প্রকাশকাল && (
              <>
                <span>·</span>
                <span>{fm.প্রকাশকাল}</span>
              </>
            )}
            <span>·</span>
            <span>{story.readTimeText}</span>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {fm.ট্যাগ?.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag)}`}
                className="ink-badge text-xs transition-colors hover:border-[var(--রং-জাফরান)]"
              >
                {tag}
              </Link>
            ))}
          </div>
        </motion.header>

        {/* Alpona divider */}
        <div className="alpona-divider" aria-hidden="true" />

        {/* Reading Controls */}
        <ReadingControls />

        {/* Story Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="story-body mt-8"
          style={{
            fontFamily: 'var(--ফন্ট-মূল)',
            fontSize: '1.15rem',
            lineHeight: '2.0',
            color: 'var(--রং-কালি)',
          }}
        >
          {/* Render content as pre-formatted + paragraphs */}
          {story.content.split('\n\n').map((para, i) => {
            const trimmed = para.trim();
            if (!trimmed) return null;

            // Heading detection
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={i} className="text-xl md:text-2xl mt-10 mb-4" style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-জাফরান)' }}>
                  {trimmed.replace(/^## /, '')}
                </h2>
              );
            }

            // Blockquote detection
            if (trimmed.startsWith('> ')) {
              return (
                <blockquote key={i}>
                  {trimmed.split('\n').map((line, j) => (
                    <span key={j}>
                      {line.replace(/^> ?/, '')}
                      {j < trimmed.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </blockquote>
              );
            }

            // Horizontal rule
            if (trimmed === '---') {
              return <hr key={i} />;
            }

            // Regular paragraph
            return (
              <p key={i} className="mb-5">
                {trimmed.split('\n').map((line, j) => (
                  <span key={j}>
                    {renderInlineMarkdown(line)}
                    {j < trimmed.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            );
          })}
        </motion.div>

        {/* Footer divider */}
        <div className="alpona-divider mt-12" aria-hidden="true" />

        {/* Source */}
        {fm.উৎস && (
          <p
            className="text-center text-sm mt-4"
            style={{ color: 'var(--রং-কালি-হালকা)' }}
          >
            উৎস: {fm.উৎস}
          </p>
        )}
      </div>
    </article>
  );
}

/** Simple inline markdown renderer (bold, italic, links) */
function renderInlineMarkdown(text: string): React.ReactNode {
  // Bold
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Em-dash dialogue
    if (part.startsWith('—') || part.startsWith('— ')) {
      return <span key={i} style={{ paddingLeft: '1.5rem', display: 'inline' }}>{part}</span>;
    }
    return part;
  });
}
