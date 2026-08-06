'use client';

import React, { useState } from 'react';
import { ModuleMetadata, ViewConfig } from '@/types/metadata';
import { useModuleQuery } from '@/hooks/useModuleQuery';
import { useModuleMutation } from '@/hooks/useModuleMutation';
import { DynamicGrid } from './renderers/DynamicGrid';
import { DynamicForm } from './renderers/DynamicForm';
import { DashboardWidgetRenderer } from './renderers/DashboardWidgetRenderer';
import { DynamicChart } from './renderers/DynamicChart';
import { DynamicGantt } from './renderers/DynamicGantt';
import { DynamicKanban } from './renderers/DynamicKanban';
import { DynamicPdfViewer } from './renderers/DynamicPdfViewer';
import { EventCalendar } from './renderers/EventCalendar';
import { LayoutDashboard, Table, GitBranch, Kanban, FilePlus, FileText, PieChart, ShieldAlert, CalendarDays } from 'lucide-react';

interface ViewSwitcherProps {
  metadata: ModuleMetadata;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ metadata }) => {
  const [activeViewId, setActiveViewId] = useState<string>(metadata.views[0]?.id || 'v-grid');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const activeView = metadata.views.find(v => v.id === activeViewId) || metadata.views[0];

  // TanStack Query for data fetching
  const { data: fetchResult, isLoading, error } = useModuleQuery(metadata.id, activeViewId);
  const { createRecord } = useModuleMutation(metadata.id);

  const data = (fetchResult?.data && fetchResult.data.length > 0)
    ? fetchResult.data
    : (metadata.mockData || []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'dashboard': return <LayoutDashboard className="w-4 h-4" />;
      case 'grid': return <Table className="w-4 h-4" />;
      case 'gantt': return <GitBranch className="w-4 h-4" />;
      case 'kanban': return <Kanban className="w-4 h-4" />;
      case 'schedule':
      case 'calendar': return <CalendarDays className="w-4 h-4" />;
      case 'chart': return <PieChart className="w-4 h-4" />;
      case 'form': return <FilePlus className="w-4 h-4" />;
      case 'pdf': return <FileText className="w-4 h-4" />;
      default: return <Table className="w-4 h-4" />;
    }
  };

  const handleFormSubmit = async (formData: Record<string, any>) => {
    await createRecord(formData);
    setIsFormOpen(false);
  };

  return (
    <div className="w-full space-y-3">
      {/* Streamlined Header & View Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{metadata.name}</h2>
          {/* <span className="text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 rounded-md border border-blue-200 dark:border-blue-800">
            {metadata.provider}
          </span> */}
          {/* <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Virtual Scrolling Active ({data.length} records)
          </span> */}
        </div>

        {/* View Navigation Tabs & Compact Add Action */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-lg border border-zinc-200 dark:border-zinc-700/80">
            {metadata.views.map(view => {
              const isActive = view.id === activeViewId;
              return (
                <button
                  key={view.id}
                  onClick={() => {
                    setActiveViewId(view.id);
                    setIsFormOpen(false);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${isActive
                    ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs border border-zinc-200 dark:border-zinc-700 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                >
                  {getIcon(view.type)}
                  {view.name}
                </button>
              );
            })}
          </div>

          {/* {metadata.permissions?.includes('create') && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <FilePlus className="w-3.5 h-3.5" />
              Add Record
            </button>
          )} */}
        </div>
      </div>

      {/* Dynamic Form Backdrop Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-2">
            <DynamicForm
              fields={metadata.fields}
              permissions={metadata.permissions}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}

      {/* View Content Renderer */}
      {isLoading ? (
        <div className="w-full h-64 flex items-center justify-center bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col items-center gap-3 text-zinc-500">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs">Loading metadata-driven view...</p>
          </div>
        </div>
      ) : activeView.type === 'dashboard' ? (
        <DashboardWidgetRenderer
          widgets={activeView.widgets || []}
          data={data}
          fields={metadata.fields}
          permissions={metadata.permissions}
        />
      ) : activeView.type === 'grid' ? (
        <DynamicGrid
          fields={metadata.fields}
          data={data}
          config={activeView.widgets?.[0]?.gridConfig}
          permissions={metadata.permissions}
          onAddRecord={() => setIsFormOpen(true)}
        />
      ) : activeView.type === 'gantt' ? (
        <DynamicGantt
          data={data}
          config={activeView.widgets?.[0]?.ganttConfig}
        />
      ) : activeView.type === 'kanban' ? (
        <DynamicKanban
          data={data}
          config={activeView.widgets?.[0]?.kanbanConfig}
        />
      ) : activeView.type === 'schedule' || activeView.type === 'calendar' ? (
        <EventCalendar data={data} />
      ) : activeView.type === 'chart' ? (
        <DynamicChart
          data={data}
          config={activeView.widgets?.[0]?.chartConfig}
        />
      ) : activeView.type === 'pdf' ? (
        <DynamicPdfViewer
          pdfUrl={activeView.widgets?.[0]?.pdfUrl}
          config={activeView.widgets?.[0]?.pdfConfig}
          customActions={activeView.customActions || metadata.customActions}
        />
      ) : activeView.type === 'form' ? (
        <DynamicForm
          fields={metadata.fields}
          permissions={metadata.permissions}
          onSubmit={handleFormSubmit}
        />
      ) : null}
    </div>
  );
};
