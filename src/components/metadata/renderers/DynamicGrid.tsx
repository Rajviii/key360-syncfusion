'use client';

import React, { useRef, useState, useMemo } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Sort,
  Filter,
  Group,
  Reorder,
  Toolbar,
  ExcelExport,
  PdfExport,
  ColumnChooser,
  Edit,
  Aggregate,
  AggregateColumnsDirective,
  AggregateColumnDirective,
  AggregateDirective,
  AggregatesDirective,
  Inject,
  VirtualScroll,
  ContextMenu,
  Resize,
  Freeze
} from '@syncfusion/ej2-react-grids';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject as ChartInject,
  ColumnSeries,
  LineSeries,
  AreaSeries,
  BarSeries,
  StackingColumnSeries,
  StackingBarSeries,
  StackingLineSeries,
  StackingAreaSeries,
  ScatterSeries,
  Category,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip
} from '@syncfusion/ej2-react-charts';
import { DynamicGantt } from './DynamicGantt';
import { FieldSchema, GridWidgetConfig, PermissionType } from '@/types/metadata';
import { LayoutGrid, BarChart2, Calendar, CalendarOff, Search, Plus, Trash2, Edit3, X, RefreshCw, Copy, Save, FileSpreadsheet } from 'lucide-react';

interface DynamicGridProps {
  fields: FieldSchema[];
  data: any[];
  config?: GridWidgetConfig;
  permissions?: PermissionType[];
  onAddRecord?: () => void;
  onEditRecord?: (row: any) => void;
  onCopyRecord?: (row: any) => void;
  onDeleteRecord?: (id: any) => void;
  onOpenStatusHistory?: (row: any) => void;
}

export const DynamicGrid: React.FC<DynamicGridProps> = ({
  fields,
  data,
  config = {},
  permissions = ['create', 'edit', 'delete', 'export'],
  onAddRecord,
  onEditRecord,
  onCopyRecord,
  onDeleteRecord,
  onOpenStatusHistory
}) => {
  const gridRef = useRef<GridComponent>(null);

  // Generic View Switcher State (Grid | Chart | Gantt)
  const [activeInlineView, setActiveInlineView] = useState<'grid' | 'chart' | 'gantt'>('grid');

  // Chart Integration States
  const [chartType, setChartType] = useState<string>('Column');
  const [chartXField, setChartXField] = useState<string>('');
  const [chartYField, setChartYField] = useState<string>('');
  const [chartData, setChartData] = useState<any[]>([]);

  const visibleFields = fields.filter(f => f.showInGrid !== false);
  const numericFields = fields.filter(f => f.showInGrid !== false && (f.controlType === 'number' || f.controlType === 'currency' || f.controlType === 'rating'));
  const categoryFields = fields.filter(f => f.showInGrid !== false && (f.controlType === 'text' || f.controlType === 'select' || f.controlType === 'autocomplete'));

  const canExport = permissions.includes('export');
  const canCreate = permissions.includes('create');
  const canEdit = permissions.includes('edit');
  const canDelete = permissions.includes('delete');

  // Determine if current module dataset contains valid Gantt date/duration fields
  const hasGanttFields = useMemo(() => {
    if (!data || data.length === 0) return false;
    const sample = data[0];
    const dateKeys = ['startDate', 'endDate', 'duration', 'workDate', 'dueDate', 'lastUpdateDate', 'reviewDate'];
    return dateKeys.some(k => k in sample && sample[k] !== undefined && sample[k] !== null);
  }, [data]);

  // Formatted Gantt dataset mapping when applicable
  const ganttData = useMemo(() => {
    if (!hasGanttFields) return [];
    return data.map((item, idx) => ({
      id: item.id || item.code || idx + 1,
      name: item.name || item.projectName || item.description || item.code || `Item ${idx + 1}`,
      startDate: item.startDate || item.workDate || item.reviewDate || '2026-08-01',
      endDate: item.endDate || item.dueDate || item.lastUpdateDate || '2026-08-30',
      duration: item.duration || 10,
      progress: item.progress || item.actualPercentComplete || 50,
      assignee: item.assignee || item.manager || item.projectManager || item.employee || item.owner || 'Unassigned',
      status: item.status || item.currentStatus || item.overallStatus || 'In Progress'
    }));
  }, [data, hasGanttFields]);

  // Generic Grid Toolbar Items with Custom Template for View Buttons
  const toolbarItems: any[] = [
    {
      template: () => (
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-lg border border-zinc-200 dark:border-zinc-700/80 mr-2 my-0.5">
          <button
            type="button"
            onClick={() => setActiveInlineView('grid')}
            title="Grid View"
            className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeInlineView === 'grid'
                ? 'bg-[#007a4d] text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const selectedRecords = gridRef.current ? gridRef.current.getSelectedRecords() : [];
              const recordsToChart = selectedRecords.length > 0 ? selectedRecords : data;
              const defaultX = categoryFields[0] || visibleFields[0];
              const defaultY = numericFields[0] || visibleFields[1] || visibleFields[0];
              setChartXField(defaultX?.key || visibleFields[0]?.key || 'name');
              setChartYField(defaultY?.key || visibleFields[1]?.key || 'id');
              setChartData(recordsToChart);
              setActiveInlineView('chart');
            }}
            title="Chart View"
            className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeInlineView === 'chart'
                ? 'bg-[#007a4d] text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Chart</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveInlineView('gantt')}
            title="Gantt View"
            className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeInlineView === 'gantt'
                ? 'bg-[#007a4d] text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Gantt</span>
          </button>
        </div>
      ),
      id: 'view_switcher_group'
    }
  ];

  // Standard Editing & Export Options
  if (canCreate) toolbarItems.push('Add');
  if (canEdit) toolbarItems.push('Edit');
  if (canDelete) toolbarItems.push('Delete');
  if (canCreate) toolbarItems.push({ text: '', tooltipText: 'Copy / Duplicate', prefixIcon: 'e-copy', id: 'copy_record' });
  if (canEdit || canCreate) {
    toolbarItems.push('Update');
    toolbarItems.push('Cancel');
  }
  if (canExport && config.allowExcelExport !== false) toolbarItems.push('ExcelExport');
  if (canExport && config.allowPdfExport !== false) toolbarItems.push('PdfExport');
  if (config.allowColumnChooser !== false) toolbarItems.push('ColumnChooser');
  toolbarItems.push('Search');

  const handleToolbarClick = (args: any) => {
    const itemId = args.item?.id || '';

    if (itemId === 'copy_record') {
      const selected = gridRef.current?.getSelectedRecords();
      if (selected && selected.length > 0 && onCopyRecord) {
        onCopyRecord(selected[0]);
      } else if (onAddRecord) {
        onAddRecord();
      }
    } else if (itemId.includes('excelexport')) {
      gridRef.current?.excelExport();
    } else if (itemId.includes('pdfexport')) {
      gridRef.current?.pdfExport();
    }
  };

  const getEditType = (controlType?: string) => {
    switch (controlType) {
      case 'number':
      case 'currency':
        return 'numericedit';
      case 'date':
        return 'datepickeredit';
      case 'datetime':
        return 'datetimepickeredit';
      case 'select':
      case 'dropdown':
      case 'multiselect':
      case 'autocomplete':
        return 'dropdownedit';
      case 'checkbox':
      case 'switch':
        return 'booleanedit';
      default:
        return 'defaultedit';
    }
  };

  const getEditParams = (field: FieldSchema) => {
    if (field.options && field.options.length > 0) {
      return {
        params: {
          dataSource: field.options,
          fields: { text: 'label', value: 'value' }
        }
      };
    }
    return undefined;
  };

  // Right-Click Context Menu with Full Nested Chart Options
  const contextMenuItems = [
    { text: 'Edit Record', target: '.e-content', id: 'edit_record' },
    { text: 'Copy Record', target: '.e-content', id: 'copy_record' },
    { text: 'Delete Record', target: '.e-content', id: 'delete_record' },
    { text: 'Create Status History', target: '.e-content', id: 'create_status' },
    {
      text: 'Chart',
      target: '.e-content',
      id: 'chart_menu',
      items: [
        {
          text: 'Line Chart',
          id: 'chart_Line_grp',
          items: [
            { text: 'Line', id: 'chart_Line' },
            { text: 'Stacked Line', id: 'chart_StackingLine' },
            { text: '100% Stacked Line', id: 'chart_StackingLine100' }
          ]
        },
        {
          text: 'Area Chart',
          id: 'chart_Area_grp',
          items: [
            { text: 'Area', id: 'chart_Area' },
            { text: 'Stacked Area', id: 'chart_StackingArea' },
            { text: '100% Stacked Area', id: 'chart_StackingArea100' }
          ]
        },
        {
          text: 'Column Chart',
          id: 'chart_Column_grp',
          items: [
            { text: 'Column', id: 'chart_Column' },
            { text: 'Stacked Column', id: 'chart_StackingColumn' },
            { text: '100% Stacked Column', id: 'chart_StackingColumn100' }
          ]
        },
        {
          text: 'Bar Chart',
          id: 'chart_Bar_grp',
          items: [
            { text: 'Bar', id: 'chart_Bar' },
            { text: 'Stacked Bar', id: 'chart_StackingBar' },
            { text: '100% Stacked Bar', id: 'chart_StackingBar100' }
          ]
        },
        { text: 'Pie Chart', id: 'chart_Pie' }
      ]
    }
  ];

  const handleContextMenuClick = (args: any) => {
    if (args.item.id && args.item.id.startsWith('chart_') && !args.item.id.endsWith('_grp')) {
      const selectedType = args.item.id.replace('chart_', '');
      const selectedRecords = gridRef.current ? gridRef.current.getSelectedRecords() : [];
      const recordsToChart = selectedRecords.length > 0 ? selectedRecords : data;

      const defaultX = categoryFields[0] || visibleFields[0];
      const defaultY = numericFields[0] || visibleFields[1] || visibleFields[0];

      setChartXField(defaultX?.key || visibleFields[0]?.key || 'name');
      setChartYField(defaultY?.key || visibleFields[1]?.key || 'id');
      setChartType(selectedType);
      setChartData(recordsToChart);
      setActiveInlineView('chart');
    } else if (args.item.id === 'edit_record' && onEditRecord) {
      onEditRecord(args.rowData);
    } else if (args.item.id === 'copy_record' && onCopyRecord) {
      onCopyRecord(args.rowData);
    } else if (args.item.id === 'delete_record' && onDeleteRecord) {
      onDeleteRecord(args.rowData.id || args.rowData.code);
    } else if (args.item.id === 'create_status' && onOpenStatusHistory) {
      onOpenStatusHistory(args.rowData);
    }
  };

  const aggregateFields = visibleFields.filter(f => f.aggregate);
  const activeChartData = chartData.length > 0 ? chartData : data;

  return (
    <div className="w-full flex flex-col h-[calc(100vh-160px)] sm:h-[calc(100vh-170px)] min-h-[420px] sm:min-h-[580px] overflow-hidden">
      {/* 1. Grid View Render */}
      {activeInlineView === 'grid' && (
        <div className="overflow-x-auto overflow-y-hidden flex-1 h-full w-full">
          <GridComponent
            ref={gridRef}
            dataSource={data}
            toolbar={toolbarItems}
            toolbarClick={handleToolbarClick}
            selectionSettings={{ type: 'Multiple', mode: 'Row', checkboxOnly: false, persistSelection: true }}
            recordDoubleClick={(args: any) => {
              if (onEditRecord && args.rowData) {
                onEditRecord(args.rowData);
              }
            }}
            actionBegin={(args: any) => {
              if (args.requestType === 'add' && onAddRecord) {
                args.cancel = true;
                onAddRecord();
              } else if (args.requestType === 'beginEdit' && onEditRecord && args.rowData) {
                args.cancel = true;
                onEditRecord(args.rowData);
              }
            }}
            allowPaging={config.allowPaging !== false}
            pageSettings={{ pageSize: config.pageSize || 25, pageSizes: [10, 25, 50, 100] }}
            allowSorting={config.allowSorting !== false}
            allowFiltering={config.allowFiltering !== false}
            filterSettings={{ type: 'Excel' }}
            editSettings={{
              allowEditing: canEdit,
              allowAdding: canCreate,
              allowDeleting: canDelete,
              mode: config.editMode || 'Normal',
              newRowPosition: 'Bottom'
            }}
            allowGrouping={config.allowGrouping !== false}
            groupSettings={{ showDropArea: true }}
            allowReordering={true}
            allowResizing={true}
            showColumnChooser={config.allowColumnChooser !== false}
            allowExcelExport={config.allowExcelExport !== false}
            allowPdfExport={config.allowPdfExport !== false}
            enableVirtualization={config.virtualScrolling !== false}
            frozenColumns={config.frozenColumns || 0}
            contextMenuItems={contextMenuItems}
            contextMenuClick={handleContextMenuClick}
            height="100%"
          >
            <ColumnsDirective>
              <ColumnDirective type="checkbox" width="50" textAlign="Center" />
              {visibleFields.map(field => {
                const editParams = getEditParams(field);
                const isStatusCol =
                  field.key === 'statusBadge' ||
                  field.key === 'status' ||
                  field.key === 'currentStatus' ||
                  field.key === 'statusHistory' ||
                  field.label.toLowerCase().includes('status');

                return (
                  <ColumnDirective
                    key={field.key}
                    field={field.key}
                    headerText={field.label}
                    width={field.width || (field.key === 'id' || field.key === 'code' ? 110 : 160)}
                    isPrimaryKey={field.key === 'id' || field.key === 'code'}
                    allowSorting={field.allowSorting !== false}
                    allowFiltering={field.allowFiltering !== false}
                    editType={getEditType(field.controlType)}
                    {...(editParams ? { edit: editParams } : {})}
                    format={field.controlType === 'currency' ? 'C2' : field.format}
                    template={isStatusCol ? (props: any) => {
                      const badgeText = props.statusBadge || props.currentStatus || props.statusHistory || props.status || '';
                      if (!badgeText) return null;

                      return (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenStatusHistory) {
                                onOpenStatusHistory(props);
                              }
                            }}
                            title="Click to view & update Status History"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold bg-[#007a4d] hover:bg-[#00623e] text-white cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-xs"
                          >
                            <span className="font-bold text-xs">+</span>
                            <span>{badgeText}</span>
                          </button>
                        </div>
                      );
                    } : undefined}
                  />
                );
              })}
            </ColumnsDirective>

            {aggregateFields.length > 0 && (
              <AggregatesDirective>
                <AggregateDirective>
                  <AggregateColumnsDirective>
                    {aggregateFields.map(agg => (
                      <AggregateColumnDirective
                        key={agg.key}
                        field={agg.key}
                        type={agg.aggregate!}
                        format={agg.controlType === 'currency' ? 'C2' : 'N2'}
                        footerTemplate={(props: any) => (
                          <div className="font-semibold text-[#007a4d] dark:text-emerald-400">
                            {agg.aggregate?.toUpperCase()}: {props[agg.aggregate!]}
                          </div>
                        )}
                      />
                    ))}
                  </AggregateColumnsDirective>
                </AggregateDirective>
              </AggregatesDirective>
            )}

            <Inject
              services={[
                Page,
                Selection,
                Sort,
                Filter,
                Group,
                Reorder,
                Toolbar,
                ExcelExport,
                PdfExport,
                ColumnChooser,
                Edit,
                Aggregate,
                VirtualScroll,
                ContextMenu,
                Resize,
                Freeze
              ]}
            />
          </GridComponent>
        </div>
      )}

      {/* 2. Inline Chart View Render */}
      {activeInlineView === 'chart' && (
        <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-900 p-4 space-y-4 overflow-y-auto">
          {/* Top Control Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-800 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveInlineView('grid')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Grid View
              </button>
              <button
                type="button"
                onClick={() => setActiveInlineView('chart')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#007a4d] rounded-lg shadow-xs cursor-pointer"
              >
                <BarChart2 className="w-3.5 h-3.5" /> Chart View
              </button>
              <button
                type="button"
                onClick={() => setActiveInlineView('gantt')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" /> Gantt View
              </button>

              {/* Data Selection Badge - Solid Key360 Green Theme */}
              <span className="text-[11px] font-bold bg-[#007a4d] text-white px-2.5 py-1 rounded-md shadow-2xs">
                Visualizing {activeChartData.length} records {chartData.length > 0 ? 'selected from DataGrid' : 'from DataGrid'}
              </span>
            </div>

            {/* Chart Parameters Dropdowns */}
            <div className="flex items-center gap-3 flex-wrap text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-zinc-600 dark:text-zinc-400">Chart Type:</span>
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className="px-2.5 py-1 text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md font-semibold text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#007a4d]"
                >
                  <option value="Column">Column Chart</option>
                  <option value="StackingColumn">Stacked Column Chart</option>
                  <option value="StackingColumn100">100% Stacked Column Chart</option>
                  <option value="Bar">Bar Chart</option>
                  <option value="StackingBar">Stacked Bar Chart</option>
                  <option value="StackingBar100">100% Stacked Bar Chart</option>
                  <option value="Line">Line Chart</option>
                  <option value="StackingLine">Stacked Line Chart</option>
                  <option value="StackingLine100">100% Stacked Line Chart</option>
                  <option value="Area">Area Chart</option>
                  <option value="StackingArea">Stacked Area Chart</option>
                  <option value="StackingArea100">100% Stacked Area Chart</option>
                  <option value="Pie">Pie Chart</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-zinc-600 dark:text-zinc-400">X-Axis:</span>
                <select
                  value={chartXField}
                  onChange={(e) => setChartXField(e.target.value)}
                  className="px-2.5 py-1 text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#007a4d]"
                >
                  {visibleFields.map(f => (
                    <option key={f.key} value={f.key}>{f.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-zinc-600 dark:text-zinc-400">Y-Axis:</span>
                <select
                  value={chartYField}
                  onChange={(e) => setChartYField(e.target.value)}
                  className="px-2.5 py-1 text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#007a4d]"
                >
                  {visibleFields.map(f => (
                    <option key={f.key} value={f.key}>{f.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Syncfusion Chart Surface */}
          <div className="flex-1 w-full min-h-[380px] bg-white dark:bg-zinc-900 rounded-xl p-2 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
            {chartType === 'Pie' ? (
              <AccumulationChartComponent
                id="inline-pie-chart"
                legendSettings={{ visible: true, position: 'Right' }}
                tooltip={{ enable: true }}
                height="100%"
                width="100%"
              >
                <ChartInject services={[AccumulationLegend, PieSeries, AccumulationTooltip]} />
                <AccumulationSeriesCollectionDirective>
                  <AccumulationSeriesDirective
                    dataSource={activeChartData}
                    xName={chartXField}
                    yName={chartYField}
                    radius="80%"
                    innerRadius="40%"
                    dataLabel={{ visible: true, name: chartXField, position: 'Outside' }}
                  />
                </AccumulationSeriesCollectionDirective>
              </AccumulationChartComponent>
            ) : (
              <ChartComponent
                id="inline-bar-chart"
                primaryXAxis={{ valueType: 'Category', title: visibleFields.find(f => f.key === chartXField)?.label || 'Category' }}
                primaryYAxis={{ title: visibleFields.find(f => f.key === chartYField)?.label || 'Value' }}
                tooltip={{ enable: true }}
                legendSettings={{ visible: true }}
                height="100%"
                width="100%"
              >
                <ChartInject services={[
                  ColumnSeries, BarSeries, LineSeries, AreaSeries,
                  StackingColumnSeries, StackingBarSeries, StackingLineSeries, StackingAreaSeries, ScatterSeries,
                  Category, ChartTooltip, ChartLegend
                ]} />
                <SeriesCollectionDirective>
                  <SeriesDirective
                    dataSource={activeChartData}
                    xName={chartXField}
                    yName={chartYField}
                    type={chartType as any}
                    fill="#007a4d"
                    name={visibleFields.find(f => f.key === chartYField)?.label || 'Metric'}
                  />
                </SeriesCollectionDirective>
              </ChartComponent>
            )}
          </div>
        </div>
      )}

      {/* 3. Inline Gantt View Render */}
      {activeInlineView === 'gantt' && (
        <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-900 p-4 space-y-4 overflow-y-auto">
          {/* Top Control Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-800 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveInlineView('grid')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Grid View
              </button>
              <button
                type="button"
                onClick={() => setActiveInlineView('chart')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <BarChart2 className="w-3.5 h-3.5" /> Chart View
              </button>
              <button
                type="button"
                onClick={() => setActiveInlineView('gantt')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#007a4d] rounded-lg shadow-xs cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" /> Gantt View
              </button>
            </div>
          </div>

          {/* Interactive Gantt or Empty-State Notice */}
          <div className="flex-1 w-full flex items-center justify-center">
            {hasGanttFields ? (
              <div className="w-full h-full min-h-[400px]">
                <DynamicGantt data={ganttData} config={config.ganttWidget} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3 max-w-md my-auto shadow-2xs">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center shadow-xs">
                  <CalendarOff className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Can't present the Gantt view on this data
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  This module dataset does not contain start and end date tracking fields required to render an interactive Gantt schedule timeline.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveInlineView('grid')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#007a4d] hover:bg-[#00623e] rounded-xl shadow-xs transition-colors cursor-pointer mt-1"
                >
                  Switch back to Grid View
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
