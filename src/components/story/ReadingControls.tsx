'use client';

import { useReadingMode } from '@/components/providers/ReadingModeProvider';

interface ReadingControlsProps {
  fontSize: number;
  onFontSizeChange: (delta: number) => void;
}

export function ReadingControls({ fontSize, onFontSizeChange }: ReadingControlsProps) {
  const { isReadingMode, isInkMode, toggleReadingMode, toggleInkMode } = useReadingMode();

  return (
    <div
      className="reading-controls flex items-center justify-center gap-4 py-3 mt-4 rounded flex-wrap"
      style={{
        backgroundColor: 'var(--রং-পুরনো-কাগজ)',
        border: '1px solid var(--সীমা-হালকা)',
      }}
    >
      {/* Font size control */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onFontSizeChange(-10)}
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
          onClick={() => onFontSizeChange(10)}
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

      {/* Ink mode */}
      <button
        onClick={toggleInkMode}
        className="px-3 py-1 rounded text-xs font-medium transition-all"
        style={{
          color: isInkMode ? '#fff' : 'var(--রং-কালি-মাঝারি)',
          backgroundColor: isInkMode ? 'var(--রং-মাটি)' : 'transparent',
          border: `1px solid ${isInkMode ? 'var(--রং-মাটি)' : 'var(--সীমা-হালকা)'}`,
        }}
        aria-label="ইঙ্ক মোড"
      >
        {isInkMode ? '✕ ইঙ্ক বন্ধ' : '✒️ ইঙ্ক মোড'}
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
