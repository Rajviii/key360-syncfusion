'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Building2,
  Database,
  LayoutGrid,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Headphones,
  ChevronDown,
  ChevronRight,
  LogOut,
  Sparkles
} from 'lucide-react';

export default function SelectSitePage() {
  const router = useRouter();
  const {
    user,
    organizations,
    dataZones,
    portals,
    organization,
    dataZone,
    portal,
    selectWorkspaceContext,
    logout
  } = useAuth();

  const [selectedOrgId, setSelectedOrgId] = useState<string>(organization?.id || organizations[0]?.id || 'india-dev');

  // Filter Data Zones matching selected Organization
  const availableDataZones = dataZones.filter(dz => dz.organizationId === selectedOrgId);
  const [selectedDataZoneId, setSelectedDataZoneId] = useState<string>(
    dataZone?.organizationId === selectedOrgId ? dataZone.id : availableDataZones[0]?.id || 'ops-zone'
  );

  // Filter Portals matching selected Data Zone
  const availablePortals = portals.filter(p => p.dataZoneId === selectedDataZoneId);
  const [selectedPortalId, setSelectedPortalId] = useState<string>(
    portal?.dataZoneId === selectedDataZoneId ? portal.id : availablePortals[0]?.id || 'crm-actions'
  );

  const [rememberSelection, setRememberSelection] = useState<boolean>(true);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  // Update DataZone and Portal selection when Organization changes
  const handleOrgChange = (orgId: string) => {
    setSelectedOrgId(orgId);
    const validDZs = dataZones.filter(dz => dz.organizationId === orgId);
    const newDZId = validDZs[0]?.id || '';
    setSelectedDataZoneId(newDZId);

    const validPortals = portals.filter(p => p.dataZoneId === newDZId);
    setSelectedPortalId(validPortals[0]?.id || '');
  };

  // Update Portal when Data Zone changes
  const handleDataZoneChange = (dzId: string) => {
    setSelectedDataZoneId(dzId);
    const validPortals = portals.filter(p => p.dataZoneId === dzId);
    setSelectedPortalId(validPortals[0]?.id || '');
  };

  const selectedOrg = organizations.find(o => o.id === selectedOrgId);
  const selectedDZ = dataZones.find(dz => dz.id === selectedDataZoneId);
  const selectedP = portals.find(p => p.id === selectedPortalId);

  const handleContinue = () => {
    if (selectedOrgId && selectedDataZoneId && selectedPortalId) {
      selectWorkspaceContext(selectedOrgId, selectedDataZoneId, selectedPortalId, rememberSelection);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f6f3] dark:bg-[#070c09] flex flex-col font-sans transition-colors duration-200">
      {/* Header Bar */}
      <header className="h-16 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="h-8 w-auto flex items-center justify-center">
            <img src="/Key360-Logo.png" alt="Key360 Logo" className="h-8 w-auto object-contain" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              KEY360 Enterprise
            </h1>
            <p className="text-[10px] text-zinc-500 font-medium leading-none">Metadata-Driven WAPP</p>
          </div>
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-[#007a4d] text-white text-xs font-bold flex items-center justify-center shadow-xs">
              {user?.initials || 'RP'}
            </div>
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 hidden sm:inline-block">
              {user?.name || 'Rajvi Prajapati'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-1 z-50 text-xs">
              <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{user?.name}</p>
                <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                className="w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2 cursor-pointer font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        {/* Executive Outer Border Box Container Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 sm:p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Select Workspace Context
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Choose your Organization, Data Zone, and Portal to load targeted metadata views.
            </p>
          </div>

          {/* Active Context Breadcrumb Summary */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
              <span className="text-zinc-500 font-medium">Selected Path:</span>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-bold">
                {selectedOrg?.name || 'Organization'}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-bold">
                {selectedDZ?.code || 'Data Zone'}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="px-2.5 py-1 rounded-md bg-[#007a4d] text-white shadow-xs font-bold">
                {selectedP?.code || 'Portal'}
              </span>
            </div>
          </div>

          {/* Step 1: Organization Cards */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#007a4d]" /> 1. Organization
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {organizations.map((org) => {
                const isSelected = selectedOrgId === org.id;
                return (
                  <button
                    key={org.id}
                    type="button"
                    onClick={() => handleOrgChange(org.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-[#007a4d] ring-2 ring-[#007a4d]/20 shadow-sm'
                        : 'bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{org.name}</p>
                      <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{org.code}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#007a4d] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Data Zone Cards */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#007a4d]" /> 2. Data Zone
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {availableDataZones.map((dz) => {
                const isSelected = selectedDataZoneId === dz.id;
                return (
                  <button
                    key={dz.id}
                    type="button"
                    onClick={() => handleDataZoneChange(dz.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-[#007a4d] ring-2 ring-[#007a4d]/20 shadow-sm'
                        : 'bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-xs font-extrabold font-mono px-2 py-0.5 rounded ${
                        isSelected ? 'bg-[#007a4d] text-white' : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                      }`}>
                        {dz.code}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#007a4d]" />}
                    </div>
                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-2">
                      {dz.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Portal Cards */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-[#007a4d]" /> 3. Portal
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availablePortals.map((p) => {
                const isSelected = selectedPortalId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPortalId(p.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-[#007a4d] ring-2 ring-[#007a4d]/20 shadow-sm'
                        : 'bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{p.code}</h4>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#007a4d]" />}
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{p.name}</p>
                    {p.description && (
                      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-2 font-normal">
                        {p.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberSelection}
                onChange={(e) => setRememberSelection(e.target.checked)}
                className="w-4 h-4 text-[#007a4d] rounded border-zinc-300 focus:ring-[#007a4d] cursor-pointer"
              />
              <span>Remember context selection</span>
            </label>

            <button
              onClick={handleContinue}
              disabled={!selectedOrgId || !selectedDataZoneId || !selectedPortalId}
              className="py-3 px-6 bg-[#007a4d] hover:bg-[#00623e] active:bg-[#005032] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>Continue to Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Support */}
        <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <button
            onClick={() => alert('Help & Support documentation for KEY360 Enterprise WAPP')}
            className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer font-medium"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help & Support</span>
          </button>

          <button
            onClick={() => alert('Contacting system administrator...')}
            className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer font-medium"
          >
            <Headphones className="w-4 h-4" />
            <span>Contact Administrator</span>
          </button>
        </div>
      </main>
    </div>
  );
}
