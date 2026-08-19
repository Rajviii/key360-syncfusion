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
    nextResponsiblePerson: 'Golding, Steven',
    activitiesList: [
      {
        id: 'act-101-1',
        activity: 'Dynamic UI Metadata & Form Engine Implementation',
        assignmentName: 'Syncfusion Dynamic UI POC',
        deliverable: 'Software Architecture Design',
        billable: true,
        mon: 8.00,
        tue: 8.00,
        wed: 8.00,
        thu: 8.00,
        fri: 8.00,
        sat: 0.00,
        sun: 0.00,
        weekTotal: 40.00
      }
    ]
  },
  {
    id: 102,
    employee: 'Babariya, Dhruv',
    weekEnding: '2026-09-27',
    comments: 'Performance improvements implemented',
    totalHours: 42.01,
    currentStatus: 'Approved',
    statusBadge: 'Approved',
    currentStatusComments: 'Reviewed and approved by Operations Lead.',
    nextResponsiblePerson: 'Meyer, Corrie',
    activitiesList: [
      {
        id: 'act-102-1',
        activity: 'Performance improvements implemented',
        assignmentName: 'AI ERP Modernization',
        deliverable: 'Backend Query Optimization',
        billable: true,
        mon: 6.00,
        tue: 9.01,
        wed: 8.00,
        thu: 5.00,
        fri: 6.00,
        sat: 3.00,
        sun: 5.00,
        weekTotal: 42.01
      }
    ]
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
    nextResponsiblePerson: 'Prajapati, Rajvi',
    activitiesList: [
      {
        id: 'act-103-1',
        activity: 'Project Review audit and stakeholder alignment',
        assignmentName: 'Cloud Migration Phase 2',
        deliverable: 'Client Stakeholder Demo',
        billable: true,
        mon: 8.50,
        tue: 8.50,
        wed: 9.00,
        thu: 8.00,
        fri: 8.00,
        sat: 0.00,
        sun: 0.00,
        weekTotal: 42.00
      }
    ]
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
    nextResponsiblePerson: 'Golding, Steven',
    activitiesList: []
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
    nextResponsiblePerson: 'Prajapati, Rajvi',
    activitiesList: []
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
        { key: 'activity', label: 'Activity', controlType: 'text', width: 220 },
        { key: 'assignmentName', label: 'Assignment Name', controlType: 'text', width: 180 },
        { key: 'deliverable', label: 'Deliverable', controlType: 'text', width: 180 },
        { key: 'billable', label: 'Billable', controlType: 'checkbox', width: 90 },
        { key: 'mon', label: 'Mon', controlType: 'number', width: 80, format: 'N2' },
        { key: 'tue', label: 'Tue', controlType: 'number', width: 80, format: 'N2' },
        { key: 'wed', label: 'Wed', controlType: 'number', width: 80, format: 'N2' },
        { key: 'thu', label: 'Thu', controlType: 'number', width: 80, format: 'N2' },
        { key: 'fri', label: 'Fri', controlType: 'number', width: 80, format: 'N2' },
        { key: 'sat', label: 'Sat', controlType: 'number', width: 80, format: 'N2' },
        { key: 'sun', label: 'Sun', controlType: 'number', width: 80, format: 'N2' },
        { key: 'weekTotal', label: 'Week Total', controlType: 'number', width: 110, format: 'N2', aggregate: 'sum' }
      ],
      nestedGridData: [
        { id: 'act-102-1', activity: 'Performance improvements implemented', assignmentName: 'AI ERP Modernization', deliverable: 'Backend Query Optimization', billable: true, mon: 6.00, tue: 9.01, wed: 8.00, thu: 5.00, fri: 6.00, sat: 3.00, sun: 5.00, weekTotal: 42.01 }
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
