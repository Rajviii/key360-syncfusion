import { ModuleMetadata } from '@/types/metadata';

export const leavesMockData = [
  { id: 301, employeeName: 'Morne Morkel', leaveType: 'Annual Paid Leave', startDate: '2026-08-10', endDate: '2026-08-14', totalDays: 5, status: 'Approved', reason: 'Family vacation', approvedBy: 'Michael Chang' },
  { id: 302, employeeName: 'Ariana Grande', leaveType: 'Sick Leave', startDate: '2026-08-03', endDate: '2026-08-04', totalDays: 2, status: 'Approved', reason: 'Flu recovery', approvedBy: 'Michael Chang' },
  { id: 303, employeeName: 'David Miller', leaveType: 'Maternity/Paternity', startDate: '2026-09-01', endDate: '2026-09-28', totalDays: 20, status: 'Pending', reason: 'Paternity leave for newborn', approvedBy: 'Pending Review' },
  { id: 304, employeeName: 'Michael Chang', leaveType: 'Personal Unpaid Leave', startDate: '2026-08-20', endDate: '2026-08-21', totalDays: 2, status: 'Pending', reason: 'Personal errands', approvedBy: 'Pending Review' },
  { id: 305, employeeName: 'Elena Rostova', leaveType: 'Annual Paid Leave', startDate: '2026-07-01', endDate: '2026-07-05', totalDays: 5, status: 'Rejected', reason: 'Critical SOC2 audit week overlap', approvedBy: 'Board Committee' }
];

export const leavesMetadata: ModuleMetadata = {
  id: 'leaves',
  name: 'Leave Management',
  description: 'Manage employee leave requests, approval workflows, PTO balances, and status kanban boards.',
  icon: 'CalendarDays',
  provider: 'mock',
  permissions: ['create', 'edit', 'delete', 'export', 'approve', 'reject'],
  mockData: leavesMockData,
  fields: [
    { key: 'id', label: 'Req ID', controlType: 'number', showInGrid: true, showInForm: false, frozen: true, width: 90 },
    {
      key: 'employeeName', label: 'Employee Name', controlType: 'autocomplete', options: [
        { label: 'Morne Morkel', value: 'Morne Morkel' },
        { label: 'Ariana Grande', value: 'Ariana Grande' },
        { label: 'David Miller', value: 'David Miller' },
        { label: 'Michael Chang', value: 'Michael Chang' },
        { label: 'Elena Rostova', value: 'Elena Rostova' }
      ], showInGrid: true, showInForm: true, groupable: true
    },
    {
      key: 'leaveType', label: 'Leave Type', controlType: 'select', options: [
        { label: 'Annual Paid Leave', value: 'Annual Paid Leave' },
        { label: 'Sick Leave', value: 'Sick Leave' },
        { label: 'Maternity/Paternity', value: 'Maternity/Paternity' },
        { label: 'Personal Unpaid Leave', value: 'Personal Unpaid Leave' }
      ], showInGrid: true, showInForm: true, groupable: true
    },
    { key: 'startDate', label: 'Start Date', controlType: 'date', showInGrid: true, showInForm: true, format: 'yyyy-MM-dd' },
    { key: 'endDate', label: 'End Date', controlType: 'date', showInGrid: true, showInForm: true, format: 'yyyy-MM-dd' },
    { key: 'totalDays', label: 'Total Days', controlType: 'number', showInGrid: true, showInForm: true, aggregate: 'sum' },
    {
      key: 'status', label: 'Approval Status', controlType: 'select', options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' }
      ], showInGrid: true, showInForm: true, groupable: true
    },
    { key: 'reason', label: 'Reason for Leave', controlType: 'textarea', showInGrid: true, showInForm: true }
  ],
  views: [
    {
      id: 'v-schedule',
      name: 'Leave Event Calendar',
      type: 'schedule',
      icon: 'CalendarDays',
      widgets: [
        {
          id: 'w-leaves-schedule',
          title: 'Leave Event Calendar & Planner',
          type: 'schedule'
        }
      ]
    },
    {
      id: 'v-kanban',
      name: 'Approval Workflow Kanban',
      type: 'kanban',
      icon: 'Kanban',
      widgets: [
        {
          id: 'w-leaves-kanban',
          title: 'Leave Status Workflow',
          type: 'kanban',
          kanbanConfig: {
            keyField: 'id',
            headerField: 'employeeName',
            contentField: 'leaveType',
            categoryField: 'status',
            columns: [
              { key: 'Pending', title: 'Pending Review' },
              { key: 'Approved', title: 'Approved' },
              { key: 'Rejected', title: 'Rejected' }
            ]
          }
        }
      ]
    },
    {
      id: 'v-grid',
      name: 'Leave Requests DataGrid',
      type: 'grid',
      icon: 'Table',
      widgets: [
        {
          id: 'w-leaves-grid',
          title: 'All Leave Requests',
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
      id: 'v-form',
      name: 'Apply for Leave',
      type: 'form',
      icon: 'CalendarPlus',
      widgets: [
        {
          id: 'w-leave-form',
          title: 'Leave Application Form',
          type: 'form'
        }
      ]
    }
  ]
};
