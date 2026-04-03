'use client';

import { useState } from 'react';
import { useReadingMode } from '@/components/providers/ReadingModeProvider';

export function ReadingControls() {
  const [fontSize, setFontSize] = useState(115); // percentage (100 = 1rem)
  const { isReadingMode, toggleReadingMode } = useReadingMode();

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => Math.min(180, Math.max(80, prev + delta)));
  };

  return (
    <div
      className="flex items-center justify-center gap-4 py-3 mt-4 rounded"
      style={{
        backgroundColor: 'var(--রং-পুরনো-কাগজ)',
        border: '1px solid var(--সীমা-হালকা)',
      }}
    >
      {/* Font size control */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => changeFontSize(-10)}
          className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold transition-colors"
          style={{ color: 'var(--রং-কালি-মাঝারি)', border: '1px solid var(--সীমা-হালকা)' }}
          aria-label="ছোট অক্ষর"
          title="ছোট অক্ষর"
        >
          অ−
        </button>
        <span className="text-xs w-10 text-center" style={{ color: 'var(--রং-কালি-হালকা)' }}>
          {fontSize}%
        </span>
        <button
          onClick={() => changeFontSize(10)}
          className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold transition-colors"
          style={{ color: 'var(--রং-কালি-মাঝারি)', border: '1px solid var(--সীমা-হালকা)' }}
          aria-label="বড় অক্ষর"
          title="বড় অক্ষর"
        >
          অ+
        </button>
      </div>

      <div className="w-px h-5" style={{ backgroundColor: 'var(--সীমা-হালকা)' }} />

      {/* Reading mode */}
      <button
        onClick={toggleReadingMode}
        className="px-3 py-1 rounded text-xs font-medium transition-all"
        style={{
          color: isReadingMode ? '#fff' : 'var(--রং-কালি-মাঝারি)',
          backgroundColor: isReadingMode ? 'var(--রং-জাফরান)' : 'transparent',
          border: `1px solid ${isReadingMode ? 'var(--রং-জাফরান)' : 'var(--সীমা-হালকা)'}`,
        }}
        aria-label="পড়ার মোড"
      >
        {isReadingMode ? '✕ বন্ধ' : '📖 পড়ার মোড'}
      </button>

      <div className="w-px h-5" style={{ backgroundColor: 'var(--সীমা-হালকা)' }} />

      {/* Print */}
      <button
        onClick={() => window.print()}
        className="px-3 py-1 rounded text-xs font-medium transition-colors"
        style={{
          color: 'var(--রং-কালি-মাঝারি)',
          border: '1px solid var(--সীমা-হালকা)',
        }}
        aria-label="প্রিন্ট"
      >
        🖨 প্রিন্ট
      </button>
    </div>
  );
}
