'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const READING_INK_STORAGE_KEY = 'golperpata-reading-ink';

interface ReadingModeContextType {
  isReadingMode: boolean;
  isInkMode: boolean;
  toggleReadingMode: () => void;
  toggleInkMode: () => void;
}

const ReadingModeContext = createContext<ReadingModeContextType>({
  isReadingMode: false,
  isInkMode: false,
  toggleReadingMode: () => {},
  toggleInkMode: () => {},
});

function getInitialInkMode() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(READING_INK_STORAGE_KEY) === 'true';
}

export function ReadingModeProvider({ children }: { children: React.ReactNode }) {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isInkMode, setIsInkMode] = useState(getInitialInkMode);

  const toggleReadingMode = useCallback(() => {
    setIsReadingMode((prev) => {
      const next = !prev;
      document.documentElement.setAttribute('data-reading-mode', String(next));
      return next;
    });
  }, []);

  const toggleInkMode = useCallback(() => {
    setIsInkMode((prev) => {
      const next = !prev;
      localStorage.setItem(READING_INK_STORAGE_KEY, String(next));
      document.documentElement.setAttribute('data-reading-ink', String(next));
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-reading-ink', String(isInkMode));
  }, [isInkMode]);

  return (
    <ReadingModeContext.Provider value={{ isReadingMode, isInkMode, toggleReadingMode, toggleInkMode }}>
      {children}
    </ReadingModeContext.Provider>
  );
}

export function useReadingMode() {
  return useContext(ReadingModeContext);
}
