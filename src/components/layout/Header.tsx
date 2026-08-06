'use client';

import React from 'react';
import { useUIPreferences } from '@/context/UIPreferencesContext';
import { ThemePreset, DensityType } from '@/types/preferences';
import { ProviderFactory } from '@/providers/ProviderFactory';
import { Palette, Layers, Database, Sparkles, SlidersHorizontal, Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const { preferences, setTheme, setColorMode, setDensity } = useUIPreferences();
  const activeProvider = ProviderFactory.getActiveProviderType();
  const isDark = preferences.colorMode === 'dark';

  return (
    <header className="h-16 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-[100] px-6 flex items-center justify-between">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            KEY360 Enterprise Portal
            {/* <span className="text-[10px] font-semibold px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">
              Syncfusion Dynamic Engine
            </span> */}
          </h1>
          {/* <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Metadata-Driven Architecture with .NET & MCP API Adapters</p> */}
        </div>
      </div>

      {/* Header Controls: Mode Toggle, Theme & Density */}
      <div className="flex items-center gap-3">
        {/* Dynamic Provider Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
          <Database className="w-3.5 h-3.5 text-blue-500" />
          <span className="font-semibold">{activeProvider.toUpperCase()} Provider</span>
        </div>

        {/* Clear Segmented Color Mode Toggle Switch */}
        <div className="flex items-center p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => setColorMode('light')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${!isDark
              ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200'
              : 'text-zinc-500 hover:text-zinc-200'
              }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            {/* <span>Light</span> */}
          </button>
          <button
            onClick={() => setColorMode('dark')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${isDark
              ? 'bg-zinc-900 text-white shadow-xs border border-zinc-700'
              : 'text-zinc-600 hover:text-zinc-900'
              }`}
          >
            <Moon className="w-3.5 h-3.5 text-blue-400" />
            {/* <span>Dark</span> */}
          </button>
        </div>

        {/* Syncfusion Theme Preset Selector */}
        {/* <div className="flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-zinc-400" />
          <select
            value={preferences.theme}
            onChange={(e) => setTheme(e.target.value as ThemePreset)}
            className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <option value="tailwind">Tailwind Theme</option>
            <option value="material">Material Theme</option>
            <option value="fluent">Fluent Theme</option>
            <option value="bootstrap">Bootstrap 5</option>
          </select>
        </div> */}

        {/* UI Density Control */}
        {/* <div className="hidden sm:flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
          <select
            value={preferences.density}
            onChange={(e) => setDensity(e.target.value as DensityType)}
            className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </div> */}
      </div>
    </header>
  );
};
