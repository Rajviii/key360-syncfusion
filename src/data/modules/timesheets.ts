import { ModuleMetadata } from '@/types/metadata';

export const timesheetsMockData = [
  {
    id: 101,
    employee: 'Prajapati, Rajvi',
    weekEnding: '2026-08-23',
    comments: 'Completed Syncfusion metadata engine and Opportunity module refactoring.',
    totalHours: 40.0,
    currentStatus: 'Submitted',
    statusBadge: 'Submitted',
    currentStatusComments: 'Submitted for manager weekly review.',
    nextResponsiblePerson: 'Golding, Steven'
  },
  {
    id: 102,
    employee: 'Babariya, Dhruv',
    weekEnding: '2026-08-23',
    comments: 'Backend API endpoint integration and database query optimization.',
    totalHours: 38.5,
    currentStatus: 'Approved',
    statusBadge: 'Approved',
    currentStatusComments: 'Reviewed and approved by Operations Lead.',
    nextResponsiblePerson: 'Meyer, Corrie'
  },
  {
    id: 103,
    employee: 'Golding, Steven',
    weekEnding: '2026-08-23',
    comments: 'Project Review audit and client stakeholder meeting.',
    totalHours: 42.0,
    currentStatus: 'In Progress',
    statusBadge: 'In Progress',
    currentStatusComments: 'Pending final hour allocation check.',
    nextResponsiblePerson: 'Prajapati, Rajvi'
  },
  {
    id: 104,
    employee: 'Meyer, Corrie',
    weekEnding: '2026-08-16',
    comments: 'Site security audit and compliance documentation.',
    totalHours: 40.0,
    currentStatus: 'Approved',
    statusBadge: 'Approved',
    currentStatusComments: 'All billable hours verified.',
    nextResponsiblePerson: 'Golding, Steven'
  },
  {
    id: 105,
    employee: 'Jacobsz, Marthinus',
    weekEnding: '2026-08-16',
    comments: 'Architecture review for dynamic form controls.',
    totalHours: 35.0,
    currentStatus: 'Draft',
    statusBadge: 'Draft',
    currentStatusComments: 'Draft timesheet pending submission.',
    nextResponsiblePerson: 'Prajapati, Rajvi'
  }
];

export const timesheetsMetadata: ModuleMetadata = {
  id: 'timesheets',
  name: 'My Timesheets',
  description: 'Log and track weekly employee billable hours, activities breakdown, and status history approval workflow.',
  icon: 'Clock',
  provider: 'mock',
  permissions: ['create', 'edit', 'delete', 'export', 'approve'],
  mockData: timesheetsMockData,
  fields: [
    {
      key: 'employee',
      label: 'Employee',
      controlType: 'select',
      section: 'timesheetDetail',
      showInGrid: true,
      showInForm: true,
      options: [
        { label: 'Prajapati, Rajvi', value: 'Prajapati, Rajvi' },
        { label: 'Golding, Steven', value: 'Golding, Steven' },
        { label: 'Babariya, Dhruv', value: 'Babariya, Dhruv' },
        { label: 'Meyer, Corrie', value: 'Meyer, Corrie' },
        { label: 'Jacobsz, Marthinus', value: 'Jacobsz, Marthinus' }
      ]
    },
    {
      key: 'weekEnding',
      label: 'Week Ending',
      controlType: 'date',
      section: 'timesheetDetail',
      showInGrid: true,
      showInForm: true,
      format: 'yyyy-MM-dd'
    },
    {
      key: 'comments',
      label: 'Comments',
      controlType: 'textarea',
      section: 'timesheetDetail',
      showInGrid: true,
      showInForm: true
    },
    {
      key: 'totalHours',
      label: 'Total Hours',
      controlType: 'number',
      section: 'timesheetDetail',
      showInGrid: true,
      showInForm: true,
      aggregate: 'sum'
    },
    {
      key: 'currentStatus',
      label: 'Current Status',
      controlType: 'select',
      section: 'timesheetDetail',
      showInGrid: true,
      showInForm: true,
      options: [
        { label: 'Draft', value: 'Draft' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Submitted', value: 'Submitted' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' }
      ]
    },
    {
      key: 'currentStatusComments',
      label: 'Current Status Comments',
      controlType: 'textarea',
      section: 'timesheetDetail',
      showInGrid: true,
      showInForm: true
    },
    {
      key: 'nextResponsiblePerson',
      label: 'Next Responsible Person',
      controlType: 'select',
      section: 'timesheetDetail',
      showInGrid: true,
      showInForm: true,
      options: [
        { label: 'Golding, Steven', value: 'Golding, Steven' },
        { label: 'Meyer, Corrie', value: 'Meyer, Corrie' },
        { label: 'Prajapati, Rajvi', value: 'Prajapati, Rajvi' },
        { label: 'Babariya, Dhruv', value: 'Babariya, Dhruv' }
      ]
    }
  ],

  formSections: [
    {
      id: 'categorisation',
      title: 'Categorisation',
      type: 'fields',
      defaultExpanded: false
    },
    {
      id: 'timesheetDetail',
      title: 'Timesheet Detail',
      type: 'fields',
      defaultExpanded: true
    },
    {
      id: 'activities',
      title: 'Activities',
      type: 'grid',
      defaultExpanded: true,
      nestedGridFields: [
        { key: 'project', label: 'Project', controlType: 'text', width: 180 },
        { key: 'taskActivity', label: 'Task / Activity', controlType: 'text', width: 200 },
        { key: 'date', label: 'Date', controlType: 'date', width: 120 },
        { key: 'hours', label: 'Hours', controlType: 'number', width: 90 },
        { key: 'comments', label: 'Comments', controlType: 'text', width: 220 },
        { key: 'employee', label: 'Employee', controlType: 'text', width: 140 },
        { key: 'status', label: 'Status', controlType: 'text', width: 120 }
      ],
      nestedGridData: [
        { id: 'act-1', project: 'Syncfusion Dynamic UI POC', taskActivity: 'DynamicGrid & Form Engine', date: '2026-08-18', hours: 8.0, comments: 'Developed metadata-driven dynamic accordions and nested grids', employee: 'Prajapati, Rajvi', status: 'Completed' },
        { id: 'act-2', project: 'Syncfusion Dynamic UI POC', taskActivity: 'Status History Modal', date: '2026-08-19', hours: 8.0, comments: 'Built status transition popup with searchable dropdowns', employee: 'Prajapati, Rajvi', status: 'Completed' },
        { id: 'act-3', project: 'AI ERP Modernization', taskActivity: 'Timesheet Module Refactoring', date: '2026-08-20', hours: 8.0, comments: 'Refactored timesheet metadata and summary cards', employee: 'Prajapati, Rajvi', status: 'In Progress' },
        { id: 'act-4', project: 'AI ERP Modernization', taskActivity: 'Unit & Integration Testing', date: '2026-08-21', hours: 8.0, comments: 'Executed tsc build checks and route validation', employee: 'Prajapati, Rajvi', status: 'Planned' },
        { id: 'act-5', project: 'Cloud Migration Phase 2', taskActivity: 'Sprint Review & Demo', date: '2026-08-22', hours: 8.0, comments: 'Demonstrated modern WAPP layout to stakeholders', employee: 'Prajapati, Rajvi', status: 'Planned' }
      ]
    },
    {
      id: 'statusHistory',
      title: 'Status History',
      type: 'grid',
      defaultExpanded: true,
      nestedGridFields: [
        { key: 'user', label: 'User', controlType: 'text', width: 140 },
        { key: 'date', label: 'Date', controlType: 'datetime', width: 160 },
        { key: 'status', label: 'Status', controlType: 'text', width: 130 },
        { key: 'comment', label: 'Comment', controlType: 'text', width: 240 },
        { key: 'nextResponsiblePerson', label: 'Next Responsible Person', controlType: 'text', width: 180 }
      ],
      nestedGridData: [
        { id: 'sh-1', user: 'Prajapati, Rajvi', date: '2026-08-18 09:30 AM', status: 'Submitted', comment: 'Submitted weekly timesheet for approval.', nextResponsiblePerson: 'Golding, Steven' },
        { id: 'sh-2', user: 'Golding, Steven', date: '2026-08-18 10:15 AM', status: 'In Progress', comment: 'Reviewed activities breakdown. Looks good.', nextResponsiblePerson: 'Meyer, Corrie' }
      ]
    }
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
          title: 'My Timesheets',
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
          title: 'Hours Spent per Week',
          type: 'chart',
          chartConfig: { chartType: 'Column', xField: 'employee', yField: 'totalHours', title: 'Total Hours by Employee' }
        }
      ]
    },
    {
      id: 'v-form',
      name: 'Create My Timesheets',
      type: 'form',
      icon: 'ClockPlus',
      widgets: [
        {
          id: 'w-timesheet-form',
          title: 'Create My Timesheets Form',
          type: 'form'
        }
      ]
    }
  ]
};
