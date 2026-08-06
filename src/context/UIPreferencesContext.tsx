'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UIPreferences, UIPreferencesContextType, ThemePreset, ColorMode, DensityType } from '@/types/preferences';
import { ThemeService } from '@/services/themeService';

const defaultPreferences: UIPreferences = {
  theme: 'tailwind',
  colorMode: 'light',
  density: 'comfortable',
  defaultPageSize: 25,
  language: 'en',
  sidebarOpen: true
};

const UIPreferencesContext = createContext<UIPreferencesContextType | undefined>(undefined);

export const UIPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UIPreferences>(defaultPreferences);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('key360_color_mode') as ColorMode | null;
      const savedTheme = localStorage.getItem('key360_theme_preset') as ThemePreset | null;

      if (savedMode || savedTheme) {
        setPreferences(prev => ({
          ...prev,
          colorMode: savedMode || prev.colorMode,
          theme: savedTheme || prev.theme
        }));
      }
    }
  }, []);

  useEffect(() => {
    ThemeService.applyTheme(preferences.theme, preferences.colorMode);
  }, [preferences.theme, preferences.colorMode]);

  const setTheme = (theme: ThemePreset) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('key360_theme_preset', theme);
    }
    setPreferences(prev => ({ ...prev, theme }));
  };

  const setColorMode = (colorMode: ColorMode) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('key360_color_mode', colorMode);
    }
    setPreferences(prev => ({ ...prev, colorMode }));
  };

  const toggleColorMode = () => {
    const nextMode = preferences.colorMode === 'dark' ? 'light' : 'dark';
    setColorMode(nextMode);
  };

  const setDensity = (density: DensityType) => {
    setPreferences(prev => ({ ...prev, density }));
  };

  const setDefaultPageSize = (defaultPageSize: number) => {
    setPreferences(prev => ({ ...prev, defaultPageSize }));
  };

  const toggleSidebar = () => {
    setPreferences(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  };

  return (
    <UIPreferencesContext.Provider
      value={{
        preferences,
        setTheme,
        setColorMode,
        toggleColorMode,
        setDensity,
        setDefaultPageSize,
        toggleSidebar
      }}
    >
      {children}
    </UIPreferencesContext.Provider>
  );
};

export const useUIPreferences = () => {
  const context = useContext(UIPreferencesContext);
  if (!context) {
    throw new Error('useUIPreferences must be used within a UIPreferencesProvider');
  }
  return context;
};
