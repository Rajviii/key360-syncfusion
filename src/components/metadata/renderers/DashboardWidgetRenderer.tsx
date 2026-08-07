'use client';

import React from 'react';
import { WidgetConfig, FieldSchema, PermissionType } from '@/types/metadata';
import { DynamicChart } from './DynamicChart';
import { DynamicGrid } from './DynamicGrid';
import { TrendingUp, Users, DollarSign, CheckCircle, Activity, Layers } from 'lucide-react';

interface DashboardWidgetRendererProps {
  widgets: WidgetConfig[];
  data: any[];
  fields: FieldSchema[];
  permissions?: PermissionType[];
}

export const DashboardWidgetRenderer: React.FC<DashboardWidgetRendererProps> = ({
  widgets = [],
  data = [],
  fields = [],
  permissions = []
}) => {
  const safeWidgets = Array.isArray(widgets) ? widgets : [];
  const safeData = Array.isArray(data) ? data : [];
  const safeFields = Array.isArray(fields) ? fields : [];

  // KPI Calculators
  const calculateKpiValue = (widget: WidgetConfig) => {
    const title = widget.title || '';
    if (title.includes('Budget')) {
      const sum = safeData.reduce((acc, curr) => acc + (Number(curr.budget) || 0), 0);
      return `$${sum.toLocaleString()}`;
    }
    if (title.includes('Active')) {
      return `${safeData.filter(d => d.status === 'In Progress' || d.status === 'Planning').length} Active`;
    }
    if (title.includes('Progress') || title.includes('Completion')) {
      const avg = Math.round(safeData.reduce((acc, curr) => acc + (Number(curr.progress) || 0), 0) / (safeData.length || 1));
      return `${avg}% Avg`;
    }
    return `${safeData.length} Total`;
  };

  const getKpiIcon = (title: string = '') => {
    if (title.includes('Budget')) return <DollarSign className="w-5 h-5 text-emerald-500" />;
    if (title.includes('Active')) return <Activity className="w-5 h-5 text-blue-500" />;
    if (title.includes('Progress') || title.includes('Completion')) return <TrendingUp className="w-5 h-5 text-purple-500" />;
    return <Layers className="w-5 h-5 text-amber-500" />;
  };

  return (
    <div className="w-full space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {safeWidgets.filter(w => w?.type === 'kpi').map(widget => (
          <div
            key={widget.id}
            className="bg-white dark:bg-zinc-900 rounded-xl p-3.5 sm:p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between"
          >
            <div>
              <p className="text-[11px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400">{widget.title}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                {calculateKpiValue(widget)}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3 h-3" /> +12.4% vs last period
              </p>
            </div>
            <div className="p-2.5 sm:p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-100 dark:border-zinc-800 shrink-0">
              {getKpiIcon(widget.title)}
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Grid Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {safeWidgets.filter(w => w?.type !== 'kpi').map(widget => {
          const colSpan = widget.span || 12;
          const spanClass =
            colSpan === 4
              ? 'lg:col-span-4'
              : colSpan === 6
              ? 'lg:col-span-6'
              : 'lg:col-span-12';

          return (
            <div key={widget.id} className={spanClass}>
              {widget.type === 'chart' && (
                <DynamicChart data={safeData} config={widget.chartConfig} />
              )}

              {widget.type === 'grid' && (
                <DynamicGrid
                  fields={safeFields}
                  data={safeData.slice(0, widget.limit || 5)}
                  config={widget.gridConfig}
                  permissions={permissions}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
