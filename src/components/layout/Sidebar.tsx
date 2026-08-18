'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIPreferences } from '@/context/UIPreferencesContext';
import {
  FolderKanban,
  Clock,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Layers,
  FileCode2,
  Search,
  FileText,
  BarChart3,
  ClipboardCheck,
  TrendingUp,
  Video
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
        href: '/dashboard',
        icon: FolderKanban,
        description: 'Metadata Engine Dashboard'
      },
      {
        id: 'project-reviews',
        name: 'Project Reviews',
        href: '/project-reviews',
        icon: ClipboardCheck,
        description: 'Stage gate approvals & audit logs'
      },
      {
        id: 'gantt',
        name: 'Gantt Schedule',
        href: '/gantt',
        icon: BarChart3,
        description: 'Interactive WBS Gantt schedule'
      }
    ]
  },
  {
    groupName: 'Workforce',
    items: [
      {
        id: 'timesheets',
        name: 'Timesheets',
        href: '/timesheets',
        icon: Clock,
        description: 'Specialized high-use custom view'
      }
    ]
  },
  {
    groupName: 'Documents',
    items: [
      {
        id: 'documents',
        name: 'Documents',
        href: '/documents',
        icon: FileCode2,
        description: 'Reviews, Redlining & Signing workflow'
      }
    ]
  },
  {
    groupName: 'Business',
    items: [
      {
        id: 'opportunities',
        name: 'Opportunities',
        href: '/opportunities',
        icon: TrendingUp,
        description: 'CRM Sales pipeline & deals'
      }
    ]
  },
  {
    groupName: 'Media',
    items: [
      {
        id: 'recordings',
        name: 'Recordings',
        href: '/recordings',
        icon: Video,
        description: 'Video archives & site captures'
      }
    ]
  }
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { preferences, toggleSidebar } = useUIPreferences();
  const isExpanded = preferences.sidebarOpen;
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
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      if (isExpanded) {
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
          title={item.name}
          className={`group flex items-center justify-between py-2 rounded-lg transition-colors text-xs font-medium cursor-pointer ${isExpanded ? 'px-2.5' : 'px-2 justify-center'
            } ${isActive
              ? 'bg-[#007a4d] text-white shadow-xs font-bold'
              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70'
            }`}
          style={{ paddingLeft: isExpanded ? `${Math.max(10, depth * 12 + 10)}px` : undefined }}
        >
          {item.href ? (
            <Link
              href={item.href}
              onClick={handleNavClick}
              className={`flex items-center gap-2.5 flex-1 min-w-0 ${!isExpanded ? 'justify-center' : ''}`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-[#007a4d] dark:group-hover:text-emerald-400'}`} />
              {isExpanded && (
                <span className="truncate transition-opacity duration-200">{item.name}</span>
              )}
            </Link>
          ) : (
            <div
              className={`flex items-center gap-2.5 flex-1 min-w-0 ${!isExpanded ? 'justify-center' : ''}`}
              onClick={(e) => hasChildren && toggleItem(item.id, e)}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-[#007a4d] dark:group-hover:text-emerald-400'}`} />
              {isExpanded && (
                <span className="truncate transition-opacity duration-200">{item.name}</span>
              )}
            </div>
          )}

          {hasChildren && isExpanded && (
            <button
              onClick={(e) => toggleItem(item.id, e)}
              className={`p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                }`}
            >
              {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {hasChildren && isOpen && isExpanded && (
          <div className="ml-3 pl-2 border-l border-zinc-200 dark:border-zinc-800 space-y-0.5">
            {item.children?.map(child => (
              <RenderNavItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isExpanded && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Animated Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 md:static border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-between p-2.5 transition-all duration-300 ease-in-out md:sticky md:top-16 h-full md:h-[calc(100vh-4rem)] shrink-0 overflow-x-hidden ${isExpanded
            ? 'w-64 md:w-60 translate-x-0'
            : '-translate-x-full md:translate-x-0 md:w-16'
          }`}
      >
        <div className="space-y-3">
          {/* Header Toggle Row */}
          <div className={`flex items-center py-1 ${isExpanded ? 'justify-between px-1' : 'justify-center'}`}>
            {isExpanded && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 truncate transition-opacity duration-200">
                Domain Navigation
              </span>
            )}
            <button
              onClick={toggleSidebar}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer shrink-0"
              title={isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
              <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${!isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Search Box */}
          {isExpanded && (
            <div className="relative px-1 transition-opacity duration-200">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter menu..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full text-xs pl-7 pr-2.5 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#007a4d] transition-all placeholder:text-zinc-400"
              />
            </div>
          )}

          {/* Nav Items Group */}
          <nav className="space-y-3">
            {navigationGroups.map(group => {
              const filteredItems = group.items.filter(item => matchesQuery(item, filterQuery));
              if (filteredItems.length === 0) return null;

              return (
                <div key={group.groupName} className="space-y-1">
                  {isExpanded && (
                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 py-0.5 truncate transition-opacity duration-200">
                      {group.groupName}
                    </div>
                  )}
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

        {/* Footer Architecture Card */}
        {/* {isExpanded && (
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs text-[11px] transition-opacity duration-200">
            <div className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#007a4d] dark:text-emerald-400" /> Key360 Architecture
            </div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-tight">
              Metadata-driven dynamic layout engine.
            </p>
          </div>
        )} */}
      </aside>
    </>
  );
};

export default Sidebar;