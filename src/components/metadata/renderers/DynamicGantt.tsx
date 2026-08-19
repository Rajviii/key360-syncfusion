'use client';

import React, { useRef } from 'react';
import {
  GanttComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Edit,
  Selection,
  Toolbar,
  DayMarkers,
  Filter,
  Sort,
  Reorder,
  Resize,
  ColumnMenu,
  ExcelExport,
  PdfExport,
  ContextMenu
} from '@syncfusion/ej2-react-gantt';
import { GanttWidgetConfig } from '@/types/metadata';

interface DynamicGanttProps {
  data: any[];
  config?: GanttWidgetConfig;
}

export const DynamicGantt: React.FC<DynamicGanttProps> = ({ data, config }) => {
  const ganttRef = useRef<GanttComponent>(null);

  const taskId = config?.taskIdField || 'id';
  const taskName = config?.taskNameField || 'name';
  const startDate = config?.startDateField || 'startDate';
  const endDate = config?.endDateField || 'endDate';
  const duration = config?.durationField || 'duration';
  const progress = config?.progressField || 'progress';
  const dependency = config?.dependencyField || 'predecessor';
  const child = config?.childField || 'subtasks';
  const wbsCode = config?.wbsCodeField || 'wbsId';

  const taskFields = {
    id: taskId,
    name: taskName,
    startDate: startDate,
    endDate: endDate,
    duration: duration,
    progress: progress,
    dependency: dependency,
    child: child
  };

  // Custom Assignee Column Template (Matching Syncfusion Gantt Overview Demo)
  const assigneeTemplate = (props: any) => {
    const assigneeName = props.assignee || props.manager || 'Unassigned';
    const role = props.assigneeRole || 'Team Member';
    const initials = assigneeName
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    return (
      <div className="flex items-center gap-2 py-0.5">
        <div className="w-6 h-6 rounded-full bg-[#007a4d] text-white font-semibold text-[10px] flex items-center justify-center shadow-xs shrink-0">
          {initials}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate leading-tight">
            {assigneeName}
          </span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate leading-tight">
            {role}
          </span>
        </div>
      </div>
    );
  };

  // Custom Status Column Template (Matching Syncfusion Gantt Overview Demo)
  const statusTemplate = (props: any) => {
    const status = props.status || (props.progress === 100 ? 'Completed' : props.progress > 0 ? 'In Progress' : 'Open');
    
    let colorClasses = 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    let dotColor = 'bg-slate-400';

    if (status === 'Completed') {
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800';
      dotColor = 'bg-emerald-500';
    } else if (status === 'In Progress') {
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800';
      dotColor = 'bg-[#007a4d]';
    } else if (status === 'Open' || status === 'Planning') {
      colorClasses = 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-800';
      dotColor = 'bg-rose-500';
    } else if (status === 'On Hold') {
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800';
      dotColor = 'bg-amber-500';
    }

    return (
      <div className="flex items-center h-full min-w-0">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border leading-none shrink-0 shadow-2xs ${colorClasses}`}>
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
          <span>{status}</span>
        </span>
      </div>
    );
  };

  // Right Label Template next to Taskbars
  const rightLabelTemplate = (props: any) => {
    const name = props.taskData?.assignee || props.taskData?.name;
    if (!name) return null;
    return (
      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 rounded text-xs font-semibold shadow-xs border border-amber-300 dark:border-amber-800">
        <span>{name}</span>
      </div>
    );
  };

  const toolbarItems: any[] = [
    'Add',
    'Edit',
    'Update',
    'Delete',
    'Cancel',
    'ExpandAll',
    'CollapseAll',
    'ZoomIn',
    'ZoomOut',
    'ZoomToFit',
    'Search',
    'ExcelExport',
    'PdfExport'
  ];

  const handleToolbarClick = (args: any) => {
    if (!ganttRef.current) return;
    if (args.item.id.includes('excelexport')) {
      ganttRef.current.excelExport();
    } else if (args.item.id.includes('pdfexport')) {
      ganttRef.current.pdfExport();
    }
  };

  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    mode: 'Auto'
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm space-y-4">
      {/* Gantt Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Enterprise WBS Gantt Schedule Overview
          </h4>
          <p className="text-xs text-zinc-500 mt-0.5">
            Hierarchical task breakdown structure, predecessors, assignee avatars, and interactive timeline.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 rounded-md font-semibold border border-emerald-200 dark:border-emerald-800">
            WBS Level View
          </span>
        </div>
      </div>

      {/* Syncfusion Gantt Component */}
      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
        <GanttComponent
          ref={ganttRef}
          id="gantt-overview-component"
          dataSource={data}
          taskFields={taskFields}
          height="550px"
          treeColumnIndex={1}
          splitterSettings={{ position: '45%' }}
          allowSelection={true}
          allowSorting={true}
          allowFiltering={true}
          allowReordering={true}
          allowResizing={true}
          allowExcelExport={true}
          allowPdfExport={true}
          editSettings={editSettings as any}
          toolbar={toolbarItems}
          toolbarClick={handleToolbarClick}
          gridLines="Both"
          highlightWeekends={true}
          labelSettings={{
            rightLabel: rightLabelTemplate
          }}
        >
          <ColumnsDirective>
            <ColumnDirective field={wbsCode} headerText="WBS ID" width="90" isPrimaryKey={true} />
            <ColumnDirective field={taskName} headerText="Task / Product Release" width="230" />
            <ColumnDirective field="assignee" headerText="Assignee" width="170" template={assigneeTemplate} />
            <ColumnDirective field="status" headerText="Status" width="120" template={statusTemplate} />
            <ColumnDirective field={startDate} headerText="Start Date" width="110" format="yyyy-MM-dd" />
            <ColumnDirective field={endDate} headerText="End Date" width="110" format="yyyy-MM-dd" />
            <ColumnDirective field={duration} headerText="Duration (days)" width="110" />
            <ColumnDirective field={progress} headerText="Progress (%)" width="110" />
          </ColumnsDirective>
          <Inject
            services={[
              Edit,
              Selection,
              Toolbar,
              DayMarkers,
              Filter,
              Sort,
              Reorder,
              Resize,
              ColumnMenu,
              ExcelExport,
              PdfExport,
              ContextMenu
            ]}
          />
        </GanttComponent>
      </div>
    </div>
  );
};
