'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Story } from '@/types/story';
import { toBengaliNumeral } from '@/lib/utils';
import { ReadingControls } from './ReadingControls';

interface StoryReaderProps {
  story: Story;
}

type StoryBlock =
  | { key: string; type: 'heading'; text: string }
  | { key: string; type: 'blockquote'; text: string }
  | { key: string; type: 'hr' }
  | { key: string; type: 'paragraph'; text: string; isLeadParagraph: boolean; isDialogue: boolean };

export function StoryReader({ story }: StoryReaderProps) {
  const fm = story.frontmatter;
  const [fontSize, setFontSize] = useState(115);
  const [currentPage, setCurrentPage] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const pageTopRef = useRef<HTMLDivElement>(null);
  const hasPaginatedRef = useRef(false);

  const storyBlocks = useMemo(() => parseStoryBlocks(story.content), [story.content]);
  const pageCharacterBudget = useMemo(
    () => getPageCharacterBudget(viewportWidth, fontSize),
    [fontSize, viewportWidth],
  );
  const pagedBlocks = useMemo(
    () => paginateStoryBlocks(storyBlocks, pageCharacterBudget),
    [pageCharacterBudget, storyBlocks],
  );
  const totalPages = pagedBlocks.length;
  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages - 1, 0));
  const visibleBlocks = isPrinting
    ? storyBlocks
    : pagedBlocks[safeCurrentPage] ?? storyBlocks;

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => Math.min(180, Math.max(80, prev + delta)));
  };

  const goToPage = useCallback((page: number) => {
    hasPaginatedRef.current = true;
    setCurrentPage(Math.max(0, Math.min(totalPages - 1, page)));
  }, [totalPages]);

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);

    return () => {
      window.removeEventListener('resize', updateViewportWidth);
    };
  }, []);

  useEffect(() => {
    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => setIsPrinting(false);

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  useEffect(() => {
    if (totalPages < 2) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToPage(safeCurrentPage + 1);
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPage(safeCurrentPage - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToPage, safeCurrentPage, totalPages]);

  useEffect(() => {
    if (!hasPaginatedRef.current || isPrinting) return;

    pageTopRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [isPrinting, safeCurrentPage]);

  return (
    <article className="py-8 md:py-12">
      <div className="story-container container mx-auto px-4" style={{ maxWidth: 'var(--max-width-reading)' }}>
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
        <ReadingControls fontSize={fontSize} onFontSizeChange={changeFontSize} />

        {!isPrinting && totalPages > 1 && (
          <div className="story-pagination mt-4" aria-label="গল্পের পৃষ্ঠা নিয়ন্ত্রণ">
            <p className="story-pagination__status">
              পৃষ্ঠা {toBengaliNumeral(safeCurrentPage + 1)} / {toBengaliNumeral(totalPages)}
            </p>
            <div className="story-pagination__buttons">
              <button
                type="button"
                className="btn"
                onClick={() => goToPage(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 0}
                aria-label="আগের পৃষ্ঠা"
              >
                ← আগের পৃষ্ঠা
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => goToPage(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages - 1}
                aria-label="পরের পৃষ্ঠা"
              >
                পরের পৃষ্ঠা →
              </button>
            </div>
          </div>
        )}

        {/* Story Body */}
        <motion.div
          ref={pageTopRef}
          key={isPrinting ? 'print-view' : `page-${safeCurrentPage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="story-body story-page mt-8"
          style={{
            fontFamily: 'var(--ফন্ট-মূল)',
            fontSize: `${fontSize}%`,
            lineHeight: '2.0',
            color: 'var(--রং-কালি)',
          }}
        >
          {visibleBlocks.map((block) => renderStoryBlock(block))}
        </motion.div>

        {!isPrinting && totalPages > 1 && (
          <div className="story-pagination mt-6" aria-label="গল্পের পৃষ্ঠা নিয়ন্ত্রণ নিচে">
            <p className="story-pagination__status">
              পৃষ্ঠা {toBengaliNumeral(safeCurrentPage + 1)} / {toBengaliNumeral(totalPages)}
            </p>
            <div className="story-pagination__buttons">
              <button
                type="button"
                className="btn"
                onClick={() => goToPage(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 0}
                aria-label="আগের পৃষ্ঠা"
              >
                ← আগের পৃষ্ঠা
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => goToPage(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages - 1}
                aria-label="পরের পৃষ্ঠা"
              >
                পরের পৃষ্ঠা →
              </button>
            </div>
          </div>
        )}

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

function renderStoryBlock(block: StoryBlock): React.ReactNode {
  if (block.type === 'heading') {
    return (
      <h2
        key={block.key}
        className="text-xl md:text-2xl mt-10 mb-4"
        style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-জাফরান)' }}
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === 'blockquote') {
    return (
      <blockquote key={block.key}>
        {block.text.split('\n').map((line, index, lines) => (
          <span key={`${block.key}-${index}`}>
            {line.replace(/^> ?/, '')}
            {index < lines.length - 1 && <br />}
          </span>
        ))}
      </blockquote>
    );
  }

  if (block.type === 'hr') {
    return <hr key={block.key} />;
  }

  return (
    <p
      key={block.key}
      className={`mb-5 ${block.isLeadParagraph ? 'story-paragraph--lead' : ''}`}
      data-dialogue={block.isDialogue || undefined}
    >
      {block.text.split('\n').map((line, index, lines) => (
        <span key={`${block.key}-${index}`}>
          {renderInlineMarkdown(line)}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

function parseStoryBlocks(content: string): StoryBlock[] {
  let leadParagraphAssigned = false;

  return content
    .split('\n\n')
    .reduce<StoryBlock[]>((blocks, para, index) => {
      const trimmed = para.trim();
      if (!trimmed) return blocks;

      if (trimmed.startsWith('## ')) {
        blocks.push({ key: `heading-${index}`, type: 'heading', text: trimmed.replace(/^## /, '') });
        return blocks;
      }

      if (trimmed.startsWith('> ')) {
        blocks.push({ key: `blockquote-${index}`, type: 'blockquote', text: trimmed });
        return blocks;
      }

      if (trimmed === '---') {
        blocks.push({ key: `hr-${index}`, type: 'hr' });
        return blocks;
      }

      const isLeadParagraph = !leadParagraphAssigned;
      leadParagraphAssigned = true;

      blocks.push({
        key: `paragraph-${index}`,
        type: 'paragraph',
        text: trimmed,
        isLeadParagraph,
        isDialogue: trimmed.split('\n').every((line) => line.trim().startsWith('—')),
      });

      return blocks;
    }, []);
}

function paginateStoryBlocks(blocks: StoryBlock[], pageCharacterBudget: number): StoryBlock[][] {
  const splitThreshold = Math.max(320, Math.round(pageCharacterBudget * 0.72));
  const expandedBlocks = blocks.flatMap((block) => splitStoryBlock(block, splitThreshold));
  const pages: StoryBlock[][] = [];
  let currentPage: StoryBlock[] = [];
  let currentWeight = 0;

  for (const block of expandedBlocks) {
    const blockWeight = estimateBlockWeight(block);

    if (currentPage.length > 0 && currentWeight + blockWeight > pageCharacterBudget) {
      pages.push(currentPage);
      currentPage = [];
      currentWeight = 0;
    }

    currentPage.push(block);
    currentWeight += blockWeight;
  }

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages.length > 0 ? pages : [blocks];
}

function splitStoryBlock(block: StoryBlock, maxCharacters: number): StoryBlock[] {
  if (block.type === 'hr' || !('text' in block) || block.text.length <= maxCharacters) {
    return [block];
  }

  const chunks = splitTextPreservingWhitespace(block.text, maxCharacters);
  if (chunks.length <= 1) {
    return [block];
  }

  return chunks.map((chunk, index) => {
    if (block.type === 'paragraph') {
      return {
        ...block,
        key: `${block.key}-${index}`,
        text: chunk,
        isLeadParagraph: block.isLeadParagraph && index === 0,
      };
    }

    return {
      ...block,
      key: `${block.key}-${index}`,
      text: chunk,
    };
  });
}

function splitTextPreservingWhitespace(text: string, maxCharacters: number): string[] {
  const tokens = text.match(/\S+\s*/g);
  if (!tokens) return [text];

  const chunks: string[] = [];
  let currentChunk = '';

  for (const token of tokens) {
    if (currentChunk.length > 0 && currentChunk.length + token.length > maxCharacters) {
      chunks.push(currentChunk.trim());
      currentChunk = '';
    }

    currentChunk += token;
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks.length > 0 ? chunks : [text];
}

function estimateBlockWeight(block: StoryBlock): number {
  if (block.type === 'hr') {
    return 220;
  }

  if (block.type === 'heading') {
    return block.text.length + 180;
  }

  if (block.type === 'blockquote') {
    return Math.round(block.text.length * 1.15) + 220;
  }

  return block.text.length + 120;
}

function getPageCharacterBudget(viewportWidth: number, fontSize: number): number {
  const baseBudget = viewportWidth < 640
    ? 900
    : viewportWidth < 1024
      ? 1250
      : 1650;

  return Math.max(480, Math.round(baseBudget * (115 / fontSize)));
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
