'use client';

import React, { useState } from 'react';
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
  ChevronDown,
  Layers,
  FileCode2,
  Search,
  Folder,
  FileText,
  BarChart3
} from 'lucide-react';

export interface NavItem {
  id: string;
  name: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
  children?: NavItem[];
}

export interface NavGroup {
  groupName: string;
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    groupName: 'Project Management',
    items: [
      {
        id: 'projects',
        name: 'Project Hub',
        href: '/projects',
        icon: FolderKanban,
        // description: 'Gantt, Grid, Kanban & KPI Dashboard',
        // children: [
        //   { id: 'projects-wbs', name: 'WBS Gantt Schedule', href: '/projects#gantt', icon: BarChart3 },
        //   { id: 'projects-tasks', name: 'Task Kanban Board', href: '/projects#kanban', icon: Folder }
        // ]
      },
      {
        id: 'timesheets',
        name: 'Timesheets',
        href: '/timesheets',
        icon: Clock,
        description: 'Work hours, activities & billing'
      }
    ]
  },
  {
    groupName: 'Workforce & HR',
    items: [
      {
        id: 'employees',
        name: 'Employee Directory',
        href: '/employees',
        icon: Users,
        description: 'Workforce and skills'
      },
      {
        id: 'leaves',
        name: 'Leave Management',
        href: '/leaves',
        icon: CalendarDays,
        description: 'Approval Kanban & PTO tracking'
      }
    ]
  },
  {
    groupName: 'Documents & Engine',
    items: [
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
    ]
  }
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { preferences, toggleSidebar } = useUIPreferences();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'projects': true
  });
  const [filterQuery, setFilterQuery] = useState('');

  const toggleItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const matchesQuery = (item: NavItem, query: string): boolean => {
    if (!query) return true;
    const q = query.toLowerCase();
    const nameMatch = item.name.toLowerCase().includes(q);
    const childMatch = item.children?.some(c => matchesQuery(c, q)) ?? false;
    return nameMatch || childMatch;
  };

  const handleNavClick = () => {
    // Auto-close drawer on mobile when a link is clicked
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      if (preferences.sidebarOpen) {
        toggleSidebar();
      }
    }
  };

  const RenderNavItem: React.FC<{ item: NavItem; depth?: number }> = ({ item, depth = 0 }) => {
    const Icon = item.icon || FileText;
    const hasChildren = Boolean(item.children && item.children.length > 0);
    const isOpen = Boolean(openItems[item.id] || filterQuery);
    const isActive = item.href ? pathname === item.href || (pathname === '/' && item.id === 'projects') : false;

    return (
      <div className="space-y-0.5">
        <div
          title={item.description || item.name}
          className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-all text-xs font-medium cursor-pointer ${isActive
            ? 'bg-blue-600 text-white shadow-xs font-semibold'
            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70'
            }`}
          style={{ paddingLeft: `${Math.max(10, depth * 12 + 10)}px` }}
        >
          {item.href ? (
            <Link href={item.href} onClick={handleNavClick} className="flex items-center gap-2 flex-1 min-w-0">
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-blue-600'}`} />
              <span className="truncate">{item.name}</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2 flex-1 min-w-0" onClick={(e) => hasChildren && toggleItem(item.id, e)}>
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-blue-600'}`} />
              <span className="truncate">{item.name}</span>
            </div>
          )}

          {hasChildren && (
            <button
              onClick={(e) => toggleItem(item.id, e)}
              className={`p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                }`}
            >
              {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {hasChildren && isOpen && (
          <div className="ml-3 pl-2 border-l border-zinc-200 dark:border-zinc-800 space-y-0.5">
            {item.children?.map(child => (
              <RenderNavItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Collapsed Sidebar state (Hidden on mobile, w-14 icon bar on desktop)
  if (!preferences.sidebarOpen) {
    return (
      <div className="hidden md:flex w-14 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex-col items-center py-3 justify-between transition-all sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto shrink-0 z-30">
        <button
          onClick={toggleSidebar}
          className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer mb-2"
          title="Expand Sidebar"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center gap-3 flex-1">
          {navigationGroups.flatMap(g => g.items).map(item => {
            const Icon = item.icon || FileText;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href || '#'}
                title={item.name}
                className={`p-2 rounded-lg transition-all ${isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
              >
                <Icon className="w-4 h-4" />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Expanded Sidebar state (Overlay drawer on mobile < md, sticky w-60 column on md+)
  return (
    <>
      {/* Mobile Semi-Transparent Backdrop Overlay */}
      <div
        onClick={toggleSidebar}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden"
        aria-hidden="true"
      />

      <aside className="fixed inset-y-0 left-0 z-50 w-64 md:w-60 md:static border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 md:bg-zinc-50/80 md:dark:bg-zinc-950/80 md:backdrop-blur-md flex flex-col justify-between p-3 transition-all md:sticky md:top-16 h-full md:h-[calc(100vh-4rem)] overflow-y-auto shrink-0 shadow-xl md:shadow-none">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Domain Navigation
            </span>
            <button
              onClick={toggleSidebar}
              className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
              title="Collapse Sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="relative px-1">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter menu..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full text-xs pl-7 pr-2.5 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200 outline-none focus:border-blue-500 transition-all placeholder:text-zinc-400"
            />
          </div>

          <nav className="space-y-4 px-1">
            {navigationGroups.map(group => {
              const filteredItems = group.items.filter(item => matchesQuery(item, filterQuery));
              if (filteredItems.length === 0) return null;

              return (
                <div key={group.groupName} className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 py-0.5">
                    {group.groupName}
                  </div>
                  <div className="space-y-0.5">
                    {filteredItems.map(item => (
                      <RenderNavItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="p-2.5 bg-blue-50/70 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900/40 text-[11px] mt-4 md:mt-0">
          <div className="font-semibold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" /> Key360 Architecture
          </div>
          <p className="text-[10px] text-blue-700 dark:text-blue-300 mt-0.5 leading-tight">
            Metadata-driven dynamic layout engine.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;