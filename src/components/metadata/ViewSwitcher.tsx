'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { CreateStatusHistoryModal } from './CreateStatusHistoryModal';
import { LayoutDashboard, Table, GitBranch, Kanban, FilePlus, FileText, PieChart, ShieldAlert, CalendarDays } from 'lucide-react';

interface ViewSwitcherProps {
  metadata: ModuleMetadata;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ metadata }) => {
  const router = useRouter();
  const [activeViewId, setActiveViewId] = useState<string>(metadata.views[0]?.id || 'v-grid');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  // Status History Modal State
  const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false);
  const [selectedStatusRecord, setSelectedStatusRecord] = useState<any>(null);

  const activeView = metadata.views.find(v => v.id === activeViewId) || metadata.views[0];

  // TanStack Query for data fetching
  const { data: fetchResult, isLoading } = useModuleQuery(metadata.id, activeViewId);
  const { createRecord, updateRecord } = useModuleMutation(metadata.id);

  const [localData, setLocalData] = useState<any[]>([]);
  const fetched = fetchResult?.data && fetchResult.data.length > 0 ? fetchResult.data : null;
  const isFetchedValid = fetched && (metadata.id !== 'recordings' || (fetched[0] && fetched[0].code));
  const data = localData.length > 0
    ? localData
    : (isFetchedValid ? fetched! : (metadata.mockData || []));

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

  const handleAddRecord = () => {
    if (metadata.id === 'opportunities') {
      router.push('/opportunities/create');
    } else if (metadata.id === 'timesheets') {
      router.push('/timesheets/create');
    } else if (metadata.id === 'project-reviews') {
      router.push('/project-reviews/create');
    } else if (metadata.id === 'recordings') {
      router.push('/recordings/create');
    } else {
      setEditingRecord(null);
      setIsFormOpen(true);
    }
  };

  const handleEditRecord = (row: any) => {
    if (metadata.id === 'opportunities') {
      const targetId = row.id || row.code || '1';
      router.push(`/opportunities/edit/${targetId}`);
    } else if (metadata.id === 'timesheets') {
      const targetId = row.id || '101';
      router.push(`/timesheets/edit/${targetId}`);
    } else if (metadata.id === 'project-reviews') {
      const targetId = row.id || row.projectReviewId || 'PR-2026-001';
      router.push(`/project-reviews/edit/${targetId}`);
    } else if (metadata.id === 'recordings') {
      const targetId = row.code || row.id || '00000014';
      router.push(`/recordings/edit/${targetId}`);
    } else {
      setEditingRecord(row);
      setIsFormOpen(true);
    }
  };

  const handleCopyRecord = (row: any) => {
    if (metadata.id === 'recordings') {
      const targetId = row.code || row.id || '00000014';
      router.push(`/recordings/create?copyFrom=${targetId}`);
    } else {
      const copiedRecord = {
        ...row,
        id: `000000${Math.floor(15 + Math.random() * 85)}`,
        code: `000000${Math.floor(15 + Math.random() * 85)}`,
        description: `Copy of ${row.description || row.code}`,
        status: row.status || 'Issued',
        statusHistory: row.statusHistory || 'Issued'
      };
      setEditingRecord(copiedRecord);
      setIsFormOpen(true);
    }
  };

  const handleOpenStatusHistory = (row: any) => {
    setSelectedStatusRecord(row);
    setStatusModalOpen(true);
  };

  const handleSaveStatus = (updatedRecord: any, newStatusEntry: any) => {
    setLocalData(prev => {
      const source = prev.length > 0 ? prev : data;
      return source.map(r => (r.id === updatedRecord.id || r.code === updatedRecord.code ? updatedRecord : r));
    });
  };

  const handleFormSubmit = async (formData: Record<string, any>, actionType?: 'save' | 'saveAndNew' | 'saveAndClose') => {
    setLocalData(prev => {
      const source = prev.length > 0 ? prev : data;
      const exists = source.some(r => r.id === formData.id || r.code === formData.code);
      if (exists) {
        return source.map(r => (r.id === formData.id || r.code === formData.code ? formData : r));
      } else {
        return [formData, ...source];
      }
    });

    if (editingRecord && editingRecord.id === formData.id) {
      await updateRecord({ id: editingRecord.id, record: formData });
    } else {
      await createRecord(formData);
    }

    if (actionType === 'saveAndClose' || !actionType) {
      setIsFormOpen(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Streamlined Header & View Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{metadata.name}</h2>
        </div>

        {/* View Navigation Tabs */}
        <div className="flex items-center gap-2 max-w-full overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-lg border border-zinc-200 dark:border-zinc-700/80 shrink-0">
            {metadata.views.map(view => {
              const isActive = view.id === activeViewId;
              return (
                <button
                  key={view.id}
                  onClick={() => {
                    setActiveViewId(view.id);
                    setIsFormOpen(false);
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${isActive
                    ? 'bg-[#007a4d] text-white shadow-xs font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 font-medium'
                    }`}
                >
                  {getIcon(view.type)}
                  {view.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Form Backdrop Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800">
            <DynamicForm
              fields={metadata.fields}
              formSections={metadata.formSections}
              initialValues={editingRecord}
              permissions={metadata.permissions}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Create Status History Modal Popup */}
      {statusModalOpen && selectedStatusRecord && (
        <CreateStatusHistoryModal
          isOpen={statusModalOpen}
          onClose={() => setStatusModalOpen(false)}
          record={selectedStatusRecord}
          onSaveStatus={handleSaveStatus}
        />
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
          onAddRecord={handleAddRecord}
          onEditRecord={handleEditRecord}
          onCopyRecord={handleCopyRecord}
          onOpenStatusHistory={handleOpenStatusHistory}
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
          formSections={metadata.formSections}
          permissions={metadata.permissions}
          onSubmit={handleFormSubmit}
        />
      ) : null}
    </div>
  );
};
