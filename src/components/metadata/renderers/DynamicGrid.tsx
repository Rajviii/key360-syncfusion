'use client';

import React, { useRef, useState } from 'react';
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
  Freeze,
  IEditCell
} from '@syncfusion/ej2-react-grids';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject as ChartInject,
  ColumnSeries,
  LineSeries,
  AreaSeries,
  BarSeries,
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
import { FieldSchema, GridWidgetConfig, PermissionType } from '@/types/metadata';
import { Download, FileSpreadsheet, Plus, Trash2, Edit3, Search, BarChart2, X, PieChart, LineChart, Activity } from 'lucide-react';

interface DynamicGridProps {
  fields: FieldSchema[];
  data: any[];
  config?: GridWidgetConfig;
  permissions?: PermissionType[];
  onAddRecord?: () => void;
  onEditRecord?: (row: any) => void;
  onDeleteRecord?: (id: any) => void;
}

export const DynamicGrid: React.FC<DynamicGridProps> = ({
  fields,
  data,
  config = {},
  permissions = ['create', 'edit', 'delete', 'export'],
  onAddRecord,
  onEditRecord,
  onDeleteRecord
}) => {
  const gridRef = useRef<GridComponent>(null);

  // Chart Integration Modal States
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [chartType, setChartType] = useState<string>('Column');
  const [chartXField, setChartXField] = useState<string>('');
  const [chartYField, setChartYField] = useState<string>('');
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);

  const handleRowSelection = () => {
    if (gridRef.current) {
      const selected = gridRef.current.getSelectedRecords();
      setSelectedCount(selected.length);
    }
  };

  const visibleFields = fields.filter(f => f.showInGrid !== false);
  const numericFields = fields.filter(f => f.showInGrid !== false && (f.controlType === 'number' || f.controlType === 'currency' || f.controlType === 'rating'));
  const categoryFields = fields.filter(f => f.showInGrid !== false && (f.controlType === 'text' || f.controlType === 'select' || f.controlType === 'autocomplete'));

  const canExport = permissions.includes('export');
  const canCreate = permissions.includes('create');
  const canEdit = permissions.includes('edit');
  const canDelete = permissions.includes('delete');

  const toolbarItems: any[] = [];
  if (canCreate) toolbarItems.push('Add');
  if (canEdit) toolbarItems.push('Edit');
  if (canDelete) toolbarItems.push('Delete');
  if (canEdit || canCreate) {
    toolbarItems.push('Update');
    toolbarItems.push('Cancel');
  }
  toolbarItems.push('Search');
  if (config.allowColumnChooser !== false) toolbarItems.push('ColumnChooser');
  if (canExport && config.allowExcelExport !== false) toolbarItems.push('ExcelExport');
  if (canExport && config.allowPdfExport !== false) toolbarItems.push('PdfExport');
  toolbarItems.push({
    text: 'Visualize Chart',
    tooltipText: 'Integrate & Visualize Chart from Grid Data',
    prefixIcon: 'e-icons e-chart',
    id: 'grid_toolbar_chart'
  });

  // Context Menu Items matching user design
  const contextMenuItems: any[] = [
    'AutoFit',
    'AutoFitAll',
    'SortAscending',
    'SortDescending',
    'Copy',
    'PdfExport',
    'ExcelExport',
    {
      text: 'Chart',
      target: '.e-content',
      id: 'grid_chart_menu',
      iconCss: 'e-icons e-chart',
      items: [
        {
          text: 'Line Chart',
          id: 'chart_line_group',
          items: [
            { text: 'Line', id: 'chart_Line' },
            { text: 'Stacked Line', id: 'chart_StackedLine' },
            { text: '100% Stacked Line', id: 'chart_100StackedLine' }
          ]
        },
        {
          text: 'Area Chart',
          id: 'chart_area_group',
          items: [
            { text: 'Area', id: 'chart_Area' },
            { text: 'Stacked Area', id: 'chart_StackedArea' }
          ]
        },
        {
          text: 'Column Chart',
          id: 'chart_column_group',
          items: [
            { text: 'Column', id: 'chart_Column' },
            { text: 'Stacked Column', id: 'chart_StackedColumn' }
          ]
        },
        {
          text: 'Bar Chart',
          id: 'chart_bar_group',
          items: [
            { text: 'Bar', id: 'chart_Bar' },
            { text: 'Stacked Bar', id: 'chart_StackedBar' }
          ]
        },
        { text: 'Scatter Chart', id: 'chart_Scatter' },
        {
          text: 'Pie Chart',
          id: 'chart_pie_group',
          items: [
            { text: 'Pie', id: 'chart_Pie' },
            { text: 'Doughnut', id: 'chart_Doughnut' }
          ]
        }
      ]
    }
  ];

  const openChartModal = (selectedType: string = 'Column') => {
    const selectedRecords = gridRef.current ? gridRef.current.getSelectedRecords() : [];
    const recordsToChart = selectedRecords.length > 0 ? selectedRecords : data;

    const defaultX = categoryFields[0] || visibleFields[0];
    const defaultY = numericFields[0] || visibleFields[1] || visibleFields[0];

    setChartXField(defaultX?.key || 'name');
    setChartYField(defaultY?.key || 'budget');
    setChartData(recordsToChart);
    setChartType(selectedType);
    setIsChartModalOpen(true);
  };

  const handleContextMenuClick = (args: any) => {
    if (args.item.id && args.item.id.startsWith('chart_')) {
      const selectedType = args.item.id.replace('chart_', '');
      if (['line_group', 'area_group', 'column_group', 'bar_group', 'pie_group'].includes(selectedType)) {
        return;
      }
      openChartModal(selectedType);
    }
  };

  const handleToolbarClick = (args: any) => {
    if (!gridRef.current) return;
    if (args.item.id.includes('excelexport')) {
      gridRef.current.excelExport();
    } else if (args.item.id.includes('pdfexport')) {
      gridRef.current.pdfExport();
    } else if (args.item.id.includes('grid_toolbar_chart')) {
      openChartModal('Column');
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

  // const getEditParams = (field: FieldSchema): any => {
  //   console.log("field", field);
  //   if (field.options && field.options.length > 0) {
  //     return {
  //       params: {
  //         dataSource: field.options,
  //         fields: { text: 'label', value: 'value' }
  //       }
  //     };
  //   }
  //   return undefined;
  // };

  const getEditParams = (field: FieldSchema) => ({
    dataSource: field.options ?? [],
    fields: {
      text: "label",
      value: "value",
    },
  });

  const aggregateFields = visibleFields.filter(f => f.aggregate);

  const getSeriesType = (type: string) => {
    switch (type) {
      case 'Line':
      case 'StackedLine':
      case '100%StackedLine':
        return 'Line';
      case 'Area':
      case 'StackedArea':
        return 'Area';
      case 'Bar':
      case 'StackedBar':
        return 'Bar';
      case 'Scatter':
        return 'Scatter';
      default:
        return 'Column';
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-1.5 shadow-xs flex flex-col h-[calc(100vh-170px)] min-h-[580px]">
      {/* Syncfusion DataGrid Component */}
      <div className="overflow-hidden rounded-lg flex-1 h-full w-full">
        <GridComponent
          ref={gridRef}
          dataSource={data}
          selectionSettings={{ type: 'Multiple', mode: 'Row', checkboxOnly: false, persistSelection: true }}
          rowSelected={handleRowSelection}
          rowDeselected={handleRowSelection}
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
          allowReordering={true}
          allowResizing={true}
          showColumnChooser={config.allowColumnChooser !== false}
          allowExcelExport={config.allowExcelExport !== false}
          allowPdfExport={config.allowPdfExport !== false}
          enableVirtualization={config.virtualScrolling !== false}
          frozenColumns={config.frozenColumns || 0}
          toolbar={toolbarItems}
          toolbarClick={handleToolbarClick}
          contextMenuItems={contextMenuItems}
          contextMenuClick={handleContextMenuClick}
          height="100%"
        >
          <ColumnsDirective>
            <ColumnDirective type="checkbox" width="50" textAlign="Center" />
            {visibleFields.map(field => {
              const editParams = getEditParams(field);
              return (
                <ColumnDirective
                  key={field.key}
                  field={field.key}
                  headerText={field.label}
                  width={field.width || (field.key === 'id' ? 90 : 160)}
                  isPrimaryKey={field.key === 'id'}
                  allowSorting={field.allowSorting !== false}
                  allowFiltering={field.allowFiltering !== false}
                  editType={getEditType(field.controlType)}
                  {...(editParams ? { edit: editParams } : {})}
                  format={field.controlType === 'currency' ? 'C2' : field.format}
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
                        <div className="font-semibold text-blue-600 dark:text-blue-400">
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

      {/* Integrated Syncfusion Chart Modal Overlay */}
      {isChartModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-xl">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Integrated Grid Chart ({chartType})
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Visualizing {chartData.length} records selected from DataGrid
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsChartModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Controls Bar */}
            <div className="px-6 py-3 bg-zinc-100/60 dark:bg-zinc-800/30 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Chart Type Selector */}
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Type:</label>
                  <select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                    className="text-xs font-medium bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1 outline-none cursor-pointer"
                  >
                    <option value="Column">Column Chart</option>
                    <option value="Line">Line Chart</option>
                    <option value="StackedLine">Stacked Line</option>
                    <option value="100%StackedLine">100% Stacked Line</option>
                    <option value="Area">Area Chart</option>
                    <option value="Bar">Bar Chart</option>
                    <option value="Scatter">Scatter Chart</option>
                    <option value="Pie">Pie Chart</option>
                    <option value="Doughnut">Doughnut Chart</option>
                  </select>
                </div>

                {/* X-Axis Selector */}
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">X-Axis:</label>
                  <select
                    value={chartXField}
                    onChange={(e) => setChartXField(e.target.value)}
                    className="text-xs font-medium bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1 outline-none cursor-pointer"
                  >
                    {visibleFields.map(f => (
                      <option key={f.key} value={f.key}>{f.label}</option>
                    ))}
                  </select>
                </div>

                {/* Y-Axis Selector */}
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Y-Axis:</label>
                  <select
                    value={chartYField}
                    onChange={(e) => setChartYField(e.target.value)}
                    className="text-xs font-medium bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1 outline-none cursor-pointer"
                  >
                    {visibleFields.map(f => (
                      <option key={f.key} value={f.key}>{f.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <span className="text-xs px-2.5 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full font-medium">
                Live Dynamic Syncfusion Chart
              </span>
            </div>

            {/* Syncfusion Chart View Area */}
            <div className="p-6">
              {chartType === 'Pie' || chartType === 'Doughnut' ? (
                <AccumulationChartComponent
                  id="grid-modal-pie-chart"
                  tooltip={{ enable: true }}
                  legendSettings={{ visible: true, position: 'Bottom' }}
                  height="360px"
                >
                  <ChartInject services={[AccumulationLegend, PieSeries, AccumulationTooltip]} />
                  <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective
                      dataSource={chartData}
                      xName={chartXField}
                      yName={chartYField}
                      innerRadius={chartType === 'Doughnut' ? '40%' : '0%'}
                      dataLabel={{ visible: true, position: 'Outside' }}
                    />
                  </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
              ) : (
                <ChartComponent
                  id="grid-modal-chart"
                  primaryXAxis={{ valueType: 'Category', title: fields.find(f => f.key === chartXField)?.label || chartXField }}
                  primaryYAxis={{ title: fields.find(f => f.key === chartYField)?.label || chartYField }}
                  tooltip={{ enable: true }}
                  legendSettings={{ visible: true }}
                  height="360px"
                >
                  <ChartInject services={[ColumnSeries, LineSeries, AreaSeries, BarSeries, ScatterSeries, Category, ChartTooltip, ChartLegend]} />
                  <SeriesCollectionDirective>
                    <SeriesDirective
                      dataSource={chartData}
                      xName={chartXField}
                      yName={chartYField}
                      type={getSeriesType(chartType)}
                      name={fields.find(f => f.key === chartYField)?.label || chartYField}
                      marker={{ visible: true }}
                    />
                  </SeriesCollectionDirective>
                </ChartComponent>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
