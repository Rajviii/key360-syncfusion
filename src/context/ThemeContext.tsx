'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Key360Theme = 'green' | 'emerald' | 'dark';

interface ThemeContextType {
  theme: Key360Theme;
  setTheme: (theme: Key360Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'green',
  setTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Key360Theme>('green');

  useEffect(() => {
    const saved = localStorage.getItem('key360-theme') as Key360Theme;
    if (saved && (saved === 'green' || saved === 'emerald' || saved === 'dark')) {
      setThemeState(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'green');
    }
  }, []);

  const setTheme = (newTheme: Key360Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('key360-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useKey360Theme = () => useContext(ThemeContext);
