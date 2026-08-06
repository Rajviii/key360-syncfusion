'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIPreferences } from '@/context/UIPreferencesContext';
import {
  FolderKanban,
  Clock,
  Users,
  CalendarDays,
  Code2,
  ChevronLeft,
  ChevronRight,
  Layers,
  FileCode2
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { preferences, toggleSidebar } = useUIPreferences();

  const navigationItems = [
    {
      id: 'projects',
      name: 'Project Hub',
      href: '/projects',
      icon: FolderKanban,
      description: 'Gantt, Grid, Kanban & KPI Dashboard'
    },
    {
      id: 'timesheets',
      name: 'Timesheets',
      href: '/timesheets',
      icon: Clock,
      description: 'Work hours, activities & billing'
    },
    {
      id: 'employees',
      name: 'Employee Directory',
      href: '/employees',
      icon: Users,
      description: 'Workforce, skills & resume PDF'
    },
    {
      id: 'leaves',
      name: 'Leave Management',
      href: '/leaves',
      icon: CalendarDays,
      description: 'Approval Kanban & PTO tracking'
    },
    {
      id: 'documents',
      name: 'Document Register',
      href: '/documents',
      icon: FileCode2,
      description: 'PDF Redlining, Comments & Custom Actions'
    },
    {
      id: 'playground',
      name: 'Schema Sandbox',
      href: '/playground',
      icon: Code2,
      description: 'Live JSON Metadata Playground'
    }
  ];

  if (!preferences.sidebarOpen) {
    return (
      <div className="w-16 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center py-4 justify-between transition-all sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto shrink-0">
        <button
          onClick={toggleSidebar}
          className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center gap-4">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`p-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
        </div>
        <div />
      </div>
    );
  }

  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/70 backdrop-blur-md flex flex-col justify-between p-4 transition-all sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto shrink-0">
      <div className="space-y-6">
        {/* Navigation Header */}
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Domain Modules
          </span>
          <button
            onClick={toggleSidebar}
            className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname === '/' && item.id === 'projects');

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-start gap-3 p-3 rounded-xl transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'
                }`}
              >
                <Icon className={`w-5 h-5 mt-0.5 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-blue-600'}`} />
                <div>
                  <div className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>{item.name}</div>
                  <div className={`text-[10px] ${isActive ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/40 text-xs">
        <div className="font-semibold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-blue-600" /> Key360 Architecture
        </div>
        <p className="text-[11px] text-blue-700 dark:text-blue-300 mt-1 leading-relaxed">
          Zero hardcoded UI views. Data & components driven dynamically by JSON schemas.
        </p>
      </div>
    </aside>
  );
};
export default Sidebar;