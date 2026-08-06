import { ModuleMetadata } from '@/types/metadata';

export const timesheetsMockData = [
  { id: 101, employeeName: 'Ariana Grande', project: 'AI ERP Modernization', date: '2026-08-01', hours: 8, activityType: 'Development', billable: true, notes: 'Implemented metadata schema parser and renderers.' },
  { id: 102, employeeName: 'Morne Morkel', project: 'Cloud Migration Phase 2', date: '2026-08-01', hours: 7.5, activityType: 'Architecture', billable: true, notes: 'Reviewed Azure Kubernetes Cluster configurations.' },
  { id: 103, employeeName: 'Rajvi Prajapati', project: 'Syncfusion Dynamic UI POC', date: '2026-08-02', hours: 8, activityType: 'Development', billable: true, notes: 'Created DynamicGrid with Virtual Scrolling & Exports.' },
  { id: 104, employeeName: 'Michael Chang', project: 'Customer Mobile App v3', date: '2026-08-02', hours: 6, activityType: 'Code Review', billable: true, notes: 'Approved PR for payment gateway integration.' },
  { id: 105, employeeName: 'Elena Rostova', project: 'Cybersecurity SOC Upgrade', date: '2026-08-03', hours: 8.5, activityType: 'Security Audit', billable: false, notes: 'Internal compliance audit for SOC2 Type II.' },
  { id: 106, employeeName: 'David Miller', project: 'Data Warehouse Snowflake Sync', date: '2026-08-03', hours: 7, activityType: 'Database Admin', billable: true, notes: 'Optimized SQL queries for ETL pipeline.' }
];

export const timesheetsMetadata: ModuleMetadata = {
  id: 'timesheets',
  name: 'Timesheets',
  description: 'Log and track billable work hours across projects, employees, and activity categories.',
  icon: 'Clock',
  provider: 'mock',
  permissions: ['create', 'edit', 'delete', 'export'],
  mockData: timesheetsMockData,
  fields: [
    { key: 'id', label: 'Timesheet Entry ID', controlType: 'number', showInGrid: true, showInForm: false, frozen: true, width: 100 },
    {
      key: 'employeeName', label: 'Employee Name', controlType: 'autocomplete', options: [
        { label: 'Ariana Grande', value: 'Ariana Grande' },
        { label: 'Morne Morkel', value: 'Morne Morkel' },
        { label: 'Rajvi Prajapati', value: 'Rajvi Prajapati' },
        { label: 'Michael Chang', value: 'Michael Chang' },
        { label: 'Elena Rostova', value: 'Elena Rostova' }
      ], showInGrid: true, showInForm: true, groupable: true
    },
    {
      key: 'project', label: 'Project Name', controlType: 'select', options: [
        { label: 'AI ERP Modernization', value: 'AI ERP Modernization' },
        { label: 'Cloud Migration Phase 2', value: 'Cloud Migration Phase 2' },
        { label: 'Syncfusion Dynamic UI POC', value: 'Syncfusion Dynamic UI POC' },
        { label: 'Customer Mobile App v3', value: 'Customer Mobile App v3' },
        { label: 'Cybersecurity SOC Upgrade', value: 'Cybersecurity SOC Upgrade' }
      ], showInGrid: true, showInForm: true, groupable: true
    },
    { key: 'date', label: 'Work Date', controlType: 'date', showInGrid: true, showInForm: true, format: 'yyyy-MM-dd' },
    { key: 'hours', label: 'Hours Logged', controlType: 'number', showInGrid: true, showInForm: true, aggregate: 'sum', allowSorting: true },
    {
      key: 'activityType', label: 'Activity Type', controlType: 'multiselect', options: [
        { label: 'Development', value: 'Development' },
        { label: 'Architecture', value: 'Architecture' },
        { label: 'Security Audit', value: 'Security Audit' },
        { label: 'Database Admin', value: 'Database Admin' },
        { label: 'Code Review', value: 'Code Review' }
      ], showInGrid: true, showInForm: true
    },
    { key: 'billable', label: 'Billable Status', controlType: 'switch', showInGrid: true, showInForm: true },
    { key: 'notes', label: 'Activity Description', controlType: 'textarea', placeholder: 'Summarize work performed...', showInGrid: true, showInForm: true }
  ],
  views: [
    {
      id: 'v-grid',
      name: 'Timesheets Log',
      type: 'grid',
      icon: 'Table',
      widgets: [
        {
          id: 'w-timesheets-grid',
          title: 'All Timesheet Entries',
          type: 'grid',
          gridConfig: {
            virtualScrolling: true,
            allowPaging: true,
            pageSize: 25,
            allowSorting: true,
            allowFiltering: true,
            allowGrouping: true,
            allowColumnChooser: true,
            allowExcelExport: true,
            allowPdfExport: true
          }
        }
      ]
    },
    {
      id: 'v-chart',
      name: 'Hours Breakdown Chart',
      type: 'chart',
      icon: 'PieChart',
      widgets: [
        {
          id: 'w-hours-chart',
          title: 'Hours Spent per Project',
          type: 'chart',
          chartConfig: { chartType: 'Column', xField: 'project', yField: 'hours', title: 'Hours by Project' }
        }
      ]
    },
    {
      id: 'v-form',
      name: 'Log Hours Form',
      type: 'form',
      icon: 'ClockPlus',
      widgets: [
        {
          id: 'w-timesheet-form',
          title: 'Timesheet Entry Form',
          type: 'form'
        }
      ]
    }
  ]
};
