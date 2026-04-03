'use client';

import { createContext, useContext, useState, useCallback } from 'react';

interface ReadingModeContextType {
  isReadingMode: boolean;
  toggleReadingMode: () => void;
}

const ReadingModeContext = createContext<ReadingModeContextType>({
  isReadingMode: false,
  toggleReadingMode: () => {},
});

export function ReadingModeProvider({ children }: { children: React.ReactNode }) {
  const [isReadingMode, setIsReadingMode] = useState(false);

  const toggleReadingMode = useCallback(() => {
    setIsReadingMode((prev) => {
      const next = !prev;
      document.documentElement.setAttribute('data-reading-mode', String(next));
      return next;
    });
  }, []);

  return (
    <ReadingModeContext.Provider value={{ isReadingMode, toggleReadingMode }}>
      {children}
    </ReadingModeContext.Provider>
  );
}

export function useReadingMode() {
  return useContext(ReadingModeContext);
}
