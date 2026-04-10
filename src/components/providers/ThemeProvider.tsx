'use client';

import { createContext, useContext, useEffect, useState, useCallback, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';
const THEME_STORAGE_KEY = 'golperpata-theme';
const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

function getStoredThemePreference(): Theme | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
}

function getSystemThemeSnapshot(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(SYSTEM_THEME_QUERY).matches ? 'dark' : 'light';
}

function subscribeToSystemTheme(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);
  mediaQuery.addEventListener('change', onStoreChange);

  return () => {
    mediaQuery.removeEventListener('change', onStoreChange);
  };
}

function applyResolvedTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themePreference, setThemePreference] = useState<Theme | null>(getStoredThemePreference);
  const systemTheme = useSyncExternalStore<Theme>(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    () => 'light',
  );
  const isHydrated = useSyncExternalStore<boolean>(
    () => () => {},
    () => true,
    () => false,
  );
  const theme = themePreference ?? systemTheme;

  useEffect(() => {
    applyResolvedTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemePreference((prev) => {
      const current = prev ?? getSystemThemeSnapshot();
      const next = current === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_STORAGE_KEY, next);
      applyResolvedTheme(next);
      return next;
    });
  }, []);

  // Prevent flash of wrong theme
  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
