import { ModuleMetadata } from '@/types/metadata';

export const projectsMockData = [
  {
    id: 1,
    wbsId: '1',
    name: 'E-commerce Platform Redesign',
    status: 'In Progress',
    manager: 'Martin Guptill',
    assignee: 'Martin Guptill',
    assigneeRole: 'IT Lead',
    budget: 145000,
    startDate: '2026-01-15',
    endDate: '2026-09-30',
    duration: 180,
    progress: 65,
    department: 'Engineering',
    activeTasks: 14,
    subtasks: [
      {
        id: 11,
        wbsId: '1.1',
        name: 'Project Initiation',
        status: 'Completed',
        manager: 'Rose Fuller',
        assignee: 'Rose Fuller',
        assigneeRole: 'Project Management',
        startDate: '2026-01-15',
        endDate: '2026-02-28',
        duration: 32,
        progress: 100,
        subtasks: [
          {
            id: 111,
            wbsId: '1.1.1',
            name: 'Stakeholder Identification',
            status: 'Completed',
            manager: 'Margaret Buchanan',
            assignee: 'Margaret Buchanan',
            assigneeRole: 'Project Management',
            startDate: '2026-01-15',
            endDate: '2026-01-30',
            duration: 12,
            progress: 100
          },
          {
            id: 112,
            wbsId: '1.1.2',
            name: 'Project Charter Creation',
            status: 'Open',
            manager: 'Ariana Grande',
            assignee: 'Ariana Grande',
            assigneeRole: 'Cloud Engineer',
            startDate: '2026-01-30',
            endDate: '2026-02-15',
            duration: 12,
            progress: 100,
            predecessor: '111FS'
          },
          {
            id: 113,
            wbsId: '1.1.3',
            name: 'Kickoff Meeting',
            status: 'Completed',
            manager: 'Martin Guptill',
            assignee: 'Martin Guptill',
            assigneeRole: 'IT Lead',
            startDate: '2026-02-16',
            endDate: '2026-02-28',
            duration: 10,
            progress: 100,
            predecessor: '112FS'
          }
        ]
      },
      {
        id: 12,
        wbsId: '1.2',
        name: 'Requirements Gathering',
        status: 'In Progress',
        manager: 'Margaret Buchanan',
        assignee: 'Margaret Buchanan',
        assigneeRole: 'Business Analysis',
        startDate: '2026-03-01',
        endDate: '2026-04-30',
        duration: 44,
        progress: 75,
        predecessor: '11FS',
        subtasks: [
          {
            id: 121,
            wbsId: '1.2.1',
            name: 'User Interviews & Surveys',
            status: 'Completed',
            manager: 'Margaret Buchanan',
            assignee: 'Margaret Buchanan',
            assigneeRole: 'Business Analysis',
            startDate: '2026-03-01',
            endDate: '2026-03-20',
            duration: 15,
            progress: 100
          },
          {
            id: 122,
            wbsId: '1.2.2',
            name: 'Competitor Analysis',
            status: 'In Progress',
            manager: 'Fuller King',
            assignee: 'Fuller King',
            assigneeRole: 'Business Analysis',
            startDate: '2026-03-21',
            endDate: '2026-04-10',
            duration: 15,
            progress: 60,
            predecessor: '121FS'
          },
          {
            id: 123,
            wbsId: '1.2.3',
            name: 'Requirements Documentation',
            status: 'Open',
            manager: 'Margaret Buchanan',
            assignee: 'Margaret Buchanan',
            assigneeRole: 'Business Analysis',
            startDate: '2026-04-11',
            endDate: '2026-04-30',
            duration: 14,
            progress: 0,
            predecessor: '122FS'
          }
        ]
      },
      {
        id: 13,
        wbsId: '1.3',
        name: 'Design Phase',
        status: 'In Progress',
        manager: 'Davolio Fuller',
        assignee: 'Davolio Fuller',
        assigneeRole: 'UX/UI Design',
        startDate: '2026-05-01',
        endDate: '2026-06-30',
        duration: 44,
        progress: 45,
        predecessor: '12FS',
        subtasks: [
          {
            id: 131,
            wbsId: '1.3.1',
            name: 'Information Architecture',
            status: 'Completed',
            manager: 'Van Jack',
            assignee: 'Van Jack',
            assigneeRole: 'UX/UI Design',
            startDate: '2026-05-01',
            endDate: '2026-05-18',
            duration: 13,
            progress: 100
          },
          {
            id: 132,
            wbsId: '1.3.2',
            name: 'Wireframing & Prototypes',
            status: 'In Progress',
            manager: 'Margaret Buchanan',
            assignee: 'Margaret Buchanan',
            assigneeRole: 'UX/UI Design',
            startDate: '2026-05-19',
            endDate: '2026-06-10',
            duration: 16,
            progress: 50,
            predecessor: '131FS'
          },
          {
            id: 133,
            wbsId: '1.3.3',
            name: 'Visual Design System',
            status: 'Open',
            manager: 'Jack Davolio',
            assignee: 'Jack Davolio',
            assigneeRole: 'UX/UI Design',
            startDate: '2026-06-11',
            endDate: '2026-06-30',
            duration: 14,
            progress: 0,
            predecessor: '132FS'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    wbsId: '2',
    name: 'AI ERP Modernization',
    status: 'In Progress',
    manager: 'Morne Morkel',
    assignee: 'Morne Morkel',
    assigneeRole: 'Principal Architect',
    budget: 145000,
    startDate: '2026-01-15',
    endDate: '2026-09-30',
    duration: 180,
    progress: 65,
    department: 'Engineering',
    activeTasks: 14,
    subtasks: [
      {
        id: 21,
        wbsId: '2.1',
        name: 'Backend Microservices Refactoring',
        status: 'In Progress',
        manager: 'Morne Morkel',
        assignee: 'Morne Morkel',
        assigneeRole: 'Principal Architect',
        startDate: '2026-01-15',
        endDate: '2026-05-15',
        duration: 86,
        progress: 80,
        subtasks: [
          {
            id: 211,
            wbsId: '2.1.1',
            name: 'API Schema Definitions',
            status: 'Completed',
            manager: 'Morne Morkel',
            assignee: 'Morne Morkel',
            assigneeRole: 'Principal Architect',
            startDate: '2026-01-15',
            endDate: '2026-02-28',
            duration: 32,
            progress: 100
          },
          {
            id: 212,
            wbsId: '2.1.2',
            name: 'Database Migration to Postgres',
            status: 'In Progress',
            manager: 'David Miller',
            assignee: 'David Miller',
            assigneeRole: 'DB Admin',
            startDate: '2026-03-01',
            endDate: '2026-05-15',
            duration: 54,
            progress: 65,
            predecessor: '211FS'
          }
        ]
      },
      {
        id: 22,
        wbsId: '2.2',
        name: 'Syncfusion Dynamic UI Engine',
        status: 'In Progress',
        manager: 'Rajvi Prajapati',
        assignee: 'Rajvi Prajapati',
        assigneeRole: 'Frontend Architecture Lead',
        startDate: '2026-05-16',
        endDate: '2026-09-30',
        duration: 98,
        progress: 90,
        predecessor: '21FS',
        subtasks: [
          {
            id: 221,
            wbsId: '2.2.1',
            name: 'Dynamic Form & Grid Renderers',
            status: 'Completed',
            manager: 'Rajvi Prajapati',
            assignee: 'Rajvi Prajapati',
            assigneeRole: 'Frontend Architecture Lead',
            startDate: '2026-05-16',
            endDate: '2026-07-15',
            duration: 43,
            progress: 100
          },
          {
            id: 222,
            wbsId: '2.2.2',
            name: 'Enterprise Gantt & Kanban Viewers',
            status: 'In Progress',
            manager: 'Rajvi Prajapati',
            assignee: 'Rajvi Prajapati',
            assigneeRole: 'Frontend Architecture Lead',
            startDate: '2026-07-16',
            endDate: '2026-09-30',
            duration: 55,
            progress: 80,
            predecessor: '221FS'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    wbsId: '3',
    name: 'Cloud Migration Phase 2',
    status: 'In Progress',
    manager: 'Ariana Grande',
    assignee: 'Ariana Grande',
    assigneeRole: 'Senior Cloud Engineer',
    budget: 98000,
    startDate: '2026-02-01',
    endDate: '2026-07-15',
    duration: 115,
    progress: 80,
    department: 'DevOps',
    activeTasks: 8,
    subtasks: [
      {
        id: 31,
        wbsId: '3.1',
        name: 'Kubernetes Cluster Provisioning',
        status: 'Completed',
        manager: 'Ariana Grande',
        assignee: 'Ariana Grande',
        assigneeRole: 'Senior Cloud Engineer',
        startDate: '2026-02-01',
        endDate: '2026-04-15',
        duration: 53,
        progress: 100
      },
      {
        id: 32,
        wbsId: '3.2',
        name: 'CI/CD Pipeline Automation',
        status: 'In Progress',
        manager: 'Ariana Grande',
        assignee: 'Ariana Grande',
        assigneeRole: 'Senior Cloud Engineer',
        startDate: '2026-04-16',
        endDate: '2026-07-15',
        duration: 62,
        progress: 60,
        predecessor: '31FS'
      }
    ]
  }
];

export const projectsMetadata: ModuleMetadata = {
  id: 'projects',
  name: 'Project Hub',
  description: 'Enterprise project portfolio management, Gantt timelines, kanban task workflows, and KPI dashboards.',
  icon: 'FolderKanban',
  provider: 'mock',
  permissions: ['create', 'edit', 'delete', 'export', 'approve'],
  mockData: projectsMockData,
  fields: [
    { key: 'id', label: 'Project ID', controlType: 'number', showInGrid: true, showInForm: false, frozen: true, width: 90, allowSorting: true },
    { key: 'name', label: 'Project Name', controlType: 'text', placeholder: 'e.g. AI ERP Modernization', validation: { required: true, minLength: 3 }, showInGrid: true, showInForm: true, allowSorting: true, allowFiltering: true },
    {
      key: 'status', label: 'Status', controlType: 'select', options: [
        { label: 'Planning', value: 'Planning' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' },
        { label: 'On Hold', value: 'On Hold' }
      ], showInGrid: true, showInForm: true, groupable: true
    },
    {
      key: 'manager', label: 'Project Manager', controlType: 'autocomplete', placeholder: 'Select Manager...', options: [
        { label: 'Morne Morkel', value: 'Morne Morkel' },
        { label: 'Ariana Grande', value: 'Ariana Grande' },
        { label: 'Michael Chang', value: 'Michael Chang' },
        { label: 'Elena Rostova', value: 'Elena Rostova' },
        { label: 'David Miller', value: 'David Miller' },
        { label: 'Rajvi Prajapati', value: 'Rajvi Prajapati' }
      ], showInGrid: true, showInForm: true
    },
    {
      key: 'department', label: 'Department', controlType: 'select', options: [
        { label: 'Engineering', value: 'Engineering' },
        { label: 'DevOps', value: 'DevOps' },
        { label: 'Product', value: 'Product' },
        { label: 'Security', value: 'Security' },
        { label: 'Analytics', value: 'Analytics' },
        { label: 'HR', value: 'HR' }
      ], showInGrid: true, showInForm: true, groupable: true
    },
    { key: 'budget', label: 'Budget ($)', controlType: 'currency', showInGrid: true, showInForm: true, format: 'C2', aggregate: 'sum', allowSorting: true },
    { key: 'progress', label: 'Progress (%)', controlType: 'rating', showInGrid: true, showInForm: true, aggregate: 'average' },
    { key: 'startDate', label: 'Start Date', controlType: 'date', showInGrid: true, showInForm: true, format: 'yyyy-MM-dd' },
    { key: 'endDate', label: 'Target Completion', controlType: 'date', showInGrid: true, showInForm: true, format: 'yyyy-MM-dd' }
  ],
  views: [
    {
      id: 'v-dashboard',
      name: 'Executive Dashboard',
      type: 'dashboard',
      icon: 'LayoutDashboard',
      description: 'KPI summary metrics and portfolio charts',
      widgets: [
        { id: 'w-kpi-1', title: 'Total Budget Managed', type: 'kpi', span: 4 },
        { id: 'w-kpi-2', title: 'Active Projects', type: 'kpi', span: 4 },
        { id: 'w-kpi-3', title: 'Avg Completion Rate', type: 'kpi', span: 4 },
        {
          id: 'w-chart-status',
          title: 'Projects by Status',
          type: 'chart',
          span: 6,
          chartConfig: { chartType: 'Column', xField: 'status', yField: 'budget', title: 'Budget Allocation by Status' }
        },
        {
          id: 'w-chart-dept',
          title: 'Department Progress',
          type: 'chart',
          span: 6,
          chartConfig: { chartType: 'Pie', xField: 'department', yField: 'progress', title: 'Average Progress by Department' }
        },
        {
          id: 'w-grid-summary',
          title: 'High Budget Projects',
          type: 'grid',
          span: 12,
          limit: 5,
          gridConfig: { allowPaging: true, pageSize: 5 }
        }
      ]
    },
    {
      id: 'v-grid',
      name: 'Main DataGrid',
      type: 'grid',
      icon: 'Table',
      widgets: [
        {
          id: 'w-main-grid',
          title: 'All Projects',
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
            allowPdfExport: true,
            editMode: 'Dialog',
            frozenColumns: 1
          }
        }
      ]
    },
    {
      id: 'v-gantt',
      name: 'Gantt Timeline',
      type: 'gantt',
      icon: 'GitBranch',
      widgets: [
        {
          id: 'w-gantt-main',
          title: 'Project Timeline Schedule',
          type: 'gantt',
          ganttConfig: {
            taskIdField: 'id',
            taskNameField: 'name',
            startDateField: 'startDate',
            endDateField: 'endDate',
            durationField: 'duration',
            progressField: 'progress',
            dependencyField: 'predecessor',
            childField: 'subtasks',
            wbsCodeField: 'wbsId',
            assigneeField: 'assignee',
            statusField: 'status'
          }
        }
      ]
    },
    {
      id: 'v-kanban',
      name: 'Kanban Workflow',
      type: 'kanban',
      icon: 'Kanban',
      widgets: [
        {
          id: 'w-kanban-main',
          title: 'Status Board',
          type: 'kanban',
          kanbanConfig: {
            keyField: 'id',
            headerField: 'name',
            contentField: 'manager',
            categoryField: 'status',
            columns: [
              { key: 'Planning', title: 'Planning' },
              { key: 'In Progress', title: 'In Progress' },
              { key: 'On Hold', title: 'On Hold' },
              { key: 'Completed', title: 'Completed' }
            ]
          }
        }
      ]
    },
    {
      id: 'v-form',
      name: 'Add / Edit Project',
      type: 'form',
      icon: 'FilePlus',
      widgets: [
        {
          id: 'w-project-form',
          title: 'Project Details Form',
          type: 'form'
        }
      ]
    }
  ]
};
