'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useKey360Theme, Key360Theme } from '@/context/ThemeContext';
import { Palette, Check, ChevronDown } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useKey360Theme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeOptions: { id: Key360Theme; label: string; bg: string; color: string }[] = [
    { id: 'green', label: 'Key360 Classic Green', bg: 'bg-emerald-700', color: '#15803d' },
    { id: 'emerald', label: 'Key360 Mint Emerald', bg: 'bg-teal-600', color: '#059669' },
    { id: 'dark', label: 'Key360 Dark Forest', bg: 'bg-zinc-800', color: '#18181b' }
  ];

  const currentOption = themeOptions.find(t => t.id === theme) || themeOptions[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs border border-white/20 transition-all cursor-pointer shadow-2xs"
        title="Customize Key360 Theme"
      >
        <Palette className="w-3.5 h-3.5" />
        <span className="hidden sm:inline font-mono">{currentOption.label}</span>
        <ChevronDown className="w-3 h-3 text-white/80" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 mb-1 border-b border-zinc-100 dark:border-zinc-800">
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Select Key360 Theme</p>
          </div>

          <div className="space-y-1">
            {themeOptions.map(opt => {
              const isSelected = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTheme(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold border border-emerald-200 dark:border-emerald-800'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full ${opt.bg} shrink-0 border border-black/10`} />
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
