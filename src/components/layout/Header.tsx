'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUIPreferences } from '@/context/UIPreferencesContext';
import { useAuth } from '@/context/AuthContext';
import { ThemeSelector } from './ThemeSelector';
import {
  Sun,
  Moon,
  Menu,
  X,
  Building2,
  Database,
  LayoutGrid,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  LogOut,
  Layers
} from 'lucide-react';

export const Header: React.FC = () => {
  const router = useRouter();
  const { preferences, setColorMode, toggleSidebar } = useUIPreferences();
  const {
    user,
    organization,
    dataZone,
    portal,
    organizations,
    dataZones,
    portals,
    selectWorkspaceContext,
    switchSite,
    logout
  } = useAuth();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'org' | 'dz' | 'portal' | null>(null);

  const isDark = preferences.colorMode === 'dark';

  const availableDZs = dataZones.filter(dz => dz.organizationId === (organization?.id || organizations[0]?.id));
  const availablePortals = portals.filter(p => p.dataZoneId === (dataZone?.id || availableDZs[0]?.id));

  const handleSwitchOrg = (orgId: string) => {
    const validDZs = dataZones.filter(dz => dz.organizationId === orgId);
    const firstDZ = validDZs[0]?.id || '';
    const validPortals = portals.filter(p => p.dataZoneId === firstDZ);
    const firstPortal = validPortals[0]?.id || '';
    selectWorkspaceContext(orgId, firstDZ, firstPortal, true);
    setActiveDropdown(null);
  };

  const handleSwitchDZ = (dzId: string) => {
    const validPortals = portals.filter(p => p.dataZoneId === dzId);
    const firstPortal = validPortals[0]?.id || '';
    selectWorkspaceContext(organization?.id || organizations[0]?.id, dzId, firstPortal, true);
    setActiveDropdown(null);
  };

  const handleSwitchPortal = (portalId: string) => {
    selectWorkspaceContext(
      organization?.id || organizations[0]?.id,
      dataZone?.id || availableDZs[0]?.id,
      portalId,
      true
    );
    setActiveDropdown(null);
  };

  const handleSwitchSite = () => {
    setShowProfileMenu(false);
    switchSite();
    router.push('/select-site');
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
    router.push('/login');
  };

  return (
    <header className="h-16 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md sticky top-0 z-[100] px-3 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Hamburger, Brand & Interactive Context Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
          title="Toggle Navigation Menu"
          aria-label="Toggle Navigation Menu"
        >
          {preferences.sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <div className="h-7 w-auto flex items-center justify-center">
            <img src="/Key360-Logo.png" alt="Key360 Logo" className="h-7 w-auto object-contain" />
          </div>
          <span className="text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-zinc-100 hidden lg:inline-block tracking-tight">
            KEY360
          </span>
        </div>

        {/* Vertical Divider */}
        <div className="hidden sm:block w-px h-5 bg-zinc-200 dark:border-zinc-800 shrink-0 mx-1" />

        {/* Interactive Context Switcher Breadcrumb Row */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-1 min-w-0 overflow-x-auto no-scrollbar py-1">
          {/* Organization Pill Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'org' ? null : 'org')}
              className="flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 rounded-lg text-xs font-semibold border border-zinc-200/80 dark:border-zinc-700 transition-colors cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="max-w-[110px] sm:max-w-[130px] truncate">{organization?.name || 'Organization'}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {activeDropdown === 'org' && (
              <div className="absolute left-0 mt-1.5 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-1 z-50 text-xs">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
                  Select Organization
                </div>
                {organizations.map(o => (
                  <button
                    key={o.id}
                    onClick={() => handleSwitchOrg(o.id)}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between cursor-pointer ${organization?.id === o.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                  >
                    <span>{o.name}</span>
                    <span className="text-[10px] text-zinc-400">{o.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />

          {/* Data Zone Pill Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'dz' ? null : 'dz')}
              className="flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 rounded-lg text-xs font-semibold border border-zinc-200/80 dark:border-zinc-700 transition-colors cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="max-w-[110px] sm:max-w-[130px] truncate">{dataZone?.code || 'Data Zone'}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {activeDropdown === 'dz' && (
              <div className="absolute left-0 mt-1.5 w-56 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-1 z-50 text-xs">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
                  Select Data Zone ({organization?.name})
                </div>
                {availableDZs.map(dz => (
                  <button
                    key={dz.id}
                    onClick={() => handleSwitchDZ(dz.id)}
                    className={`w-full text-left px-3 py-2 text-xs cursor-pointer ${dataZone?.id === dz.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                  >
                    <div className="font-semibold">{dz.code}</div>
                    <div className="text-[10px] text-zinc-400">{dz.name}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />

          {/* Portal Pill Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'portal' ? null : 'portal')}
              className="flex items-center gap-1 px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="max-w-[120px] sm:max-w-[140px] truncate">{portal?.code || 'Portal'}</span>
              <ChevronDown className="w-3 h-3 text-emerald-200" />
            </button>

            {activeDropdown === 'portal' && (
              <div className="absolute left-0 mt-1.5 w-60 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-1 z-50 text-xs">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
                  Select Portal ({dataZone?.code})
                </div>
                {availablePortals.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSwitchPortal(p.id)}
                    className={`w-full text-left px-3 py-2 text-xs cursor-pointer ${portal?.id === p.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                  >
                    <div className="font-bold text-zinc-900 dark:text-zinc-100">{p.code}</div>
                    <div className="text-[10px] text-zinc-500 truncate">{p.name}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Controls: Mode Toggle, Theme Selector & User Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-2">
        {/* Key360 Theme Switcher Dropdown */}
        <ThemeSelector />

        {/* Segmented Color Mode Toggle Switch */}
        <div className="flex items-center p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => setColorMode('light')}
            className={`flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${!isDark
                ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200'
                : 'text-zinc-500 hover:text-zinc-200'
              }`}
            title="Light Mode"
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
          </button>
          <button
            onClick={() => setColorMode('dark')}
            className={`flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${isDark
                ? 'bg-zinc-900 text-white shadow-xs border border-zinc-700'
                : 'text-zinc-600 hover:text-zinc-900'
              }`}
            title="Dark Mode"
          >
            <Moon className="w-3.5 h-3.5 text-zinc-400" />
          </button>
        </div>

        {/* User Profile Dropdown Pill */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 pr-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-700 dark:bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
              {user?.initials || 'RP'}
            </div>
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 hidden sm:inline-block max-w-[100px] truncate">
              {user?.name || 'Rajvi Prajapati'}
            </span>
            <ChevronDown className="w-3 h-3 text-zinc-500" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-1 z-[120] text-xs">
              <div className="px-3.5 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{user?.name || 'Rajvi Prajapati'}</p>
                <p className="text-[10px] text-zinc-500 truncate mt-0.5">{user?.email || 'rajvi.prajapati@key360.com'}</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-medium border border-emerald-100 dark:border-emerald-900/50">
                  {user?.role || 'Enterprise Admin'}
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={handleSwitchSite}
                  className="w-full text-left px-3.5 py-2 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2.5 cursor-pointer font-medium"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Switch Workspace Context</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3.5 py-2 text-red-600 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2.5 cursor-pointer font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
