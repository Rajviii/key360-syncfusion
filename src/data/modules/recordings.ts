import { ModuleMetadata } from '@/types/metadata';

export const recordingsMockData = [
  {
    id: '00000014',
    code: '00000014',
    description: 'Decision 6',
    dueDate: '2020-07-14',
    nextDueDate: '2020-07-14',
    nextResponsiblePerson: 'User2, Demo',
    status: 'Issued',
    statusHistory: 'Issued',
    urgent: false,
    recordingType: 'Decision',
    owner: 'Prajapati, Rajvi',
    recordingProjectId: '001',
    recordingProjectName: 'Key360 Platform Operations',
    originator: 'Prajapati, Rajvi',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-001',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [
      { id: 'sh-14-1', status: 'Issued', nextResponsiblePerson: 'User2, Demo', comment: 'Initial decision recorded for architecture review', sendMail: true, sendAttachments: true, sendPrevAttachments: false, location: 'India Development', statusUser: 'Prajapati, Rajvi', statusDate: '2020-07-14' }
    ],
    attachmentsList: [
      { id: 'att-14-1', fileDescription: 'Architecture Approval Brief', fileName: 'arch_decision_6.pdf', attachment: 'Download', dateCreated: '2020-07-14', createdBy: 'Prajapati, Rajvi' }
    ]
  },
  {
    id: '00000013',
    code: '00000013',
    description: 'Decision 5',
    dueDate: '2020-08-04',
    nextDueDate: '2020-08-04',
    nextResponsiblePerson: 'User3, Demo',
    status: 'Issued',
    statusHistory: 'Issued',
    urgent: true,
    recordingType: 'Decision',
    owner: 'Prajapati, Rajvi',
    recordingProjectId: '001',
    recordingProjectName: 'Key360 Platform Operations',
    originator: 'Prajapati, Rajvi',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-001',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [
      { id: 'sh-13-1', status: 'Issued', nextResponsiblePerson: 'User3, Demo', comment: 'Urgent gate clearance requirement', sendMail: true, sendAttachments: false, sendPrevAttachments: false, location: 'India Development', statusUser: 'Prajapati, Rajvi', statusDate: '2020-08-04' }
    ],
    attachmentsList: []
  },
  {
    id: '00000012',
    code: '00000012',
    description: 'Decision 4',
    dueDate: '2020-06-10',
    nextDueDate: '2020-06-10',
    nextResponsiblePerson: 'User2, Demo',
    status: 'Accepted',
    statusHistory: 'Accepted',
    urgent: false,
    recordingType: 'Decision',
    owner: 'Prajapati, Rajvi',
    recordingProjectId: '002',
    recordingProjectName: 'CMMS Infrastructure Suite',
    originator: 'Prajapati, Rajvi',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-002',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [
      { id: 'sh-12-1', status: 'Accepted', nextResponsiblePerson: 'User2, Demo', comment: 'Accepted by technical committee', sendMail: true, sendAttachments: true, sendPrevAttachments: true, location: 'South Africa Ops', statusUser: 'User2, Demo', statusDate: '2020-06-10' }
    ],
    attachmentsList: [
      { id: 'att-12-1', fileDescription: 'Technical Specs', fileName: 'specs_v4.docx', attachment: 'Download', dateCreated: '2020-06-10', createdBy: 'User2, Demo' }
    ]
  },
  {
    id: '00000011',
    code: '00000011',
    description: 'Decision 3',
    dueDate: '2020-05-13',
    nextDueDate: '2020-05-13',
    nextResponsiblePerson: 'User1, Demo',
    status: 'Closed',
    statusHistory: 'Closed',
    urgent: false,
    recordingType: 'Decision',
    owner: 'Prajapati, Rajvi',
    recordingProjectId: '001',
    recordingProjectName: 'Key360 Platform Operations',
    originator: 'Prajapati, Rajvi',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-001',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [
      { id: 'sh-11-1', status: 'Closed', nextResponsiblePerson: 'User1, Demo', comment: 'Final closure completed', sendMail: false, sendAttachments: false, sendPrevAttachments: false, location: 'India Development', statusUser: 'User1, Demo', statusDate: '2020-05-13' }
    ],
    attachmentsList: []
  },
  {
    id: '00000010',
    code: '00000010',
    description: 'Decision 2',
    dueDate: '2020-05-13',
    nextDueDate: '2020-05-13',
    nextResponsiblePerson: 'User1, Demo',
    status: 'Closed',
    statusHistory: 'Closed',
    urgent: false,
    recordingType: 'Decision',
    owner: 'Prajapati, Rajvi',
    recordingProjectId: '001',
    recordingProjectName: 'Key360 Platform Operations',
    originator: 'Prajapati, Rajvi',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-001',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [
      { id: 'sh-10-1', status: 'Closed', nextResponsiblePerson: 'User1, Demo', comment: 'Closed after audit check', sendMail: false, sendAttachments: false, sendPrevAttachments: false, location: 'India Development', statusUser: 'User1, Demo', statusDate: '2020-05-13' }
    ],
    attachmentsList: []
  },
  {
    id: '00000009',
    code: '00000009',
    description: 'Action 7',
    dueDate: '2020-06-03',
    nextDueDate: '2020-06-03',
    nextResponsiblePerson: 'User3, Demo',
    status: 'Issued',
    statusHistory: 'Issued',
    urgent: true,
    recordingType: 'Action',
    owner: 'Prajapati, Rajvi',
    recordingProjectId: '001',
    recordingProjectName: 'Key360 Platform Operations',
    originator: 'Prajapati, Rajvi',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-001',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [],
    attachmentsList: []
  },
  {
    id: '00000008',
    code: '00000008',
    description: 'Action 6',
    dueDate: '2020-08-03',
    nextDueDate: '2020-08-03',
    nextResponsiblePerson: 'User2, Demo',
    status: 'Issued',
    statusHistory: 'Issued',
    urgent: false,
    recordingType: 'Action',
    owner: 'Prajapati, Rajvi',
    recordingProjectId: '001',
    recordingProjectName: 'Key360 Platform Operations',
    originator: 'Prajapati, Rajvi',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-001',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [],
    attachmentsList: []
  },
  {
    id: '00000007',
    code: '00000007',
    description: 'Action 5',
    dueDate: '2020-06-01',
    nextDueDate: '2020-06-01',
    nextResponsiblePerson: 'User1, Demo',
    status: 'Issued',
    statusHistory: 'Issued',
    urgent: false,
    recordingType: 'Action',
    owner: 'Prajapati, Rajvi',
    recordingProjectId: '001',
    recordingProjectName: 'Key360 Platform Operations',
    originator: 'Prajapati, Rajvi',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-001',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [],
    attachmentsList: []
  },
  {
    id: '00000006',
    code: '00000006',
    description: 'Action 4',
    dueDate: '2020-05-19',
    nextDueDate: '2020-05-19',
    nextResponsiblePerson: 'User2, Demo',
    status: 'Closed',
    statusHistory: 'Closed',
    urgent: false,
    recordingType: 'Action',
    owner: 'Prajapati, Rajvi',
    recordingProjectId: '001',
    recordingProjectName: 'Key360 Platform Operations',
    originator: 'Prajapati, Rajvi',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-001',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [],
    attachmentsList: []
  },
  {
    id: '00000005',
    code: '00000005',
    description: 'Action 1',
    dueDate: '2020-04-07',
    nextDueDate: '2020-04-07',
    nextResponsiblePerson: 'User1, Demo',
    status: 'In Progress',
    statusHistory: 'In Progress',
    urgent: true,
    recordingType: 'Action',
    owner: 'Prajapati, Rajvi',
    recordingProjectId: '001',
    recordingProjectName: 'Key360 Platform Operations',
    originator: 'Prajapati, Rajvi',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-001',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [],
    attachmentsList: []
  },
  {
    id: '00000004',
    code: '00000004',
    description: 'Action 3',
    dueDate: '2020-04-07',
    nextDueDate: '2020-04-07',
    nextResponsiblePerson: 'User2, Demo',
    status: 'Closed',
    statusHistory: 'Closed',
    urgent: false,
    recordingType: 'Action',
    owner: 'Prajapati, Rajvi',
    recordingProjectId: '001',
    recordingProjectName: 'Key360 Platform Operations',
    originator: 'Prajapati, Rajvi',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-001',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [],
    attachmentsList: []
  },
  {
    id: '00000003',
    code: '00000003',
    description: 'Decision 1',
    dueDate: '2020-05-20',
    nextDueDate: '2020-05-20',
    nextResponsiblePerson: 'User4, Moira',
    status: 'Closed',
    statusHistory: 'Closed',
    urgent: false,
    recordingType: 'Decision',
    owner: 'User4, Moira',
    recordingProjectId: '001',
    recordingProjectName: 'Key360 Platform Operations',
    originator: 'User4, Moira',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-001',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [],
    attachmentsList: []
  },
  {
    id: '00000002',
    code: '00000002',
    description: 'Action 2',
    dueDate: '2020-07-13',
    nextDueDate: '2020-07-13',
    nextResponsiblePerson: 'User2, Demo',
    status: 'Closed',
    statusHistory: 'Closed',
    urgent: false,
    recordingType: 'Action',
    owner: 'Prajapati, Rajvi',
    recordingProjectId: '001',
    recordingProjectName: 'Key360 Platform Operations',
    originator: 'Prajapati, Rajvi',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-001',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [],
    attachmentsList: []
  },
  {
    id: '00000001',
    code: '00000001',
    description: 'Project Alignment',
    dueDate: '2020-04-01',
    nextDueDate: '2020-04-01',
    nextResponsiblePerson: 'User4, Moira',
    status: 'Project Decision',
    statusHistory: 'Project Decision',
    urgent: false,
    recordingType: 'Decision',
    owner: 'User4, Moira',
    recordingProjectId: '001',
    recordingProjectName: 'Key360 Platform Operations',
    originator: 'User4, Moira',
    company: 'Key360 Management Platform',
    contractRegister: 'CR-2026-001',
    categorisation: '001 - CRM & Actions',
    statusHistoryList: [],
    attachmentsList: []
  }
];

export const recordingsMetadata: ModuleMetadata = {
  id: 'recordings',
  name: 'Recordings',
  description: 'Enterprise workflow actions, decisions, and status recordings module',
  icon: 'Film',
  provider: 'mock',
  permissions: ['create', 'edit', 'delete', 'export'],
  mockData: recordingsMockData,
  fields: [
    { key: 'code', label: 'Code', controlType: 'text', showInGrid: true, showInForm: true, frozen: true, width: 140, allowSorting: true, readonly: true, section: 'Recording Details' },
    { key: 'description', label: 'Description', controlType: 'textarea', showInGrid: true, showInForm: true, width: 280, allowSorting: true, allowFiltering: true, section: 'Recording Details' },
    { key: 'dueDate', label: 'Due Date', controlType: 'date', showInGrid: true, showInForm: true, width: 130, allowSorting: true, section: 'Recording Details' },
    { key: 'nextResponsiblePerson', label: 'Next Responsible Person', controlType: 'select', showInGrid: true, showInForm: true, width: 200, allowSorting: true, allowFiltering: true, section: 'Recording Details', options: [
      { label: 'Prajapati, Rajvi', value: 'Prajapati, Rajvi' },
      { label: 'User1, Demo', value: 'User1, Demo' },
      { label: 'User2, Demo', value: 'User2, Demo' },
      { label: 'User3, Demo', value: 'User3, Demo' },
      { label: 'User4, Moira', value: 'User4, Moira' }
    ]},
    { key: 'statusHistory', label: 'Status History', controlType: 'text', showInGrid: true, showInForm: false, width: 180, allowSorting: true, section: 'Recording Status' },
    
    // Additional form & grid fields
    { key: 'categorisation', label: 'Categorisation', controlType: 'text', showInGrid: false, showInForm: true, defaultValue: '001 - CRM & Actions', section: 'Categorisation' },
    { key: 'urgent', label: 'Urgent', controlType: 'checkbox', showInGrid: false, showInForm: true, section: 'Recording Details' },
    { key: 'recordingType', label: 'Recording Type', controlType: 'select', showInGrid: false, showInForm: true, section: 'Recording Details', options: [
      { label: 'Action', value: 'Action' },
      { label: 'Decision', value: 'Decision' },
      { label: 'Incident', value: 'Incident' },
      { label: 'Meeting', value: 'Meeting' },
      { label: 'Risk', value: 'Risk' }
    ]},
    { key: 'owner', label: 'Owner', controlType: 'select', showInGrid: false, showInForm: true, section: 'Recording Details', options: [
      { label: 'Prajapati, Rajvi', value: 'Prajapati, Rajvi' },
      { label: 'User1, Demo', value: 'User1, Demo' },
      { label: 'User2, Demo', value: 'User2, Demo' },
      { label: 'User3, Demo', value: 'User3, Demo' },
      { label: 'User4, Moira', value: 'User4, Moira' }
    ]},
    { key: 'nextDueDate', label: 'Next Due Date', controlType: 'date', showInGrid: false, showInForm: true, section: 'Recording Details' },
    { key: 'recordingProjectId', label: 'Recording Project ID', controlType: 'select', showInGrid: false, showInForm: true, section: 'Recording Details', options: [
      { label: '001', value: '001' },
      { label: '002', value: '002' },
      { label: '003', value: '003' }
    ]},
    { key: 'recordingProjectName', label: 'Recording Project Name', controlType: 'text', showInGrid: false, showInForm: true, readonly: true, defaultValue: 'Key360 Management Platform', section: 'Recording Details' },
    { key: 'originator', label: 'Originator', controlType: 'select', showInGrid: false, showInForm: true, section: 'Recording Details', options: [
      { label: 'Prajapati, Rajvi', value: 'Prajapati, Rajvi' },
      { label: 'User1, Demo', value: 'User1, Demo' },
      { label: 'User2, Demo', value: 'User2, Demo' }
    ]},
    { key: 'company', label: 'Company', controlType: 'text', showInGrid: false, showInForm: true, readonly: true, defaultValue: 'Key360 Management Platform', section: 'Recording Details' },
    { key: 'contractRegister', label: 'Contract Register', controlType: 'select', showInGrid: false, showInForm: true, section: 'Recording Details', options: [
      { label: 'Please select a Contract Register', value: '' },
      { label: 'CR-2026-001 - Platform Core Contract', value: 'CR-2026-001' },
      { label: 'CR-2026-002 - Operations Service Agreement', value: 'CR-2026-002' }
    ]},
    { key: 'status', label: 'Status', controlType: 'select', showInGrid: false, showInForm: true, section: 'Recording Status', options: [
      { label: 'Issued', value: 'Issued' },
      { label: 'Accepted', value: 'Accepted' },
      { label: 'Closed', value: 'Closed' },
      { label: 'In Progress', value: 'In Progress' },
      { label: 'Project Decision', value: 'Project Decision' }
    ]}
  ],
  formSections: [
    {
      id: 'sec-categorisation',
      title: 'Categorisation',
      type: 'fields',
      defaultExpanded: false
    },
    {
      id: 'sec-details',
      title: 'Recording Details',
      type: 'fields',
      defaultExpanded: true
    },
    {
      id: 'sec-status',
      title: 'Recording Status',
      type: 'fields',
      defaultExpanded: true
    },
    {
      id: 'sec-status-history',
      title: 'Status History',
      type: 'grid',
      defaultExpanded: false,
      nestedGridFields: [
        { key: 'status', label: 'Status', controlType: 'text', width: 110 },
        { key: 'nextResponsiblePerson', label: 'Next Responsible Person', controlType: 'text', width: 170 },
        { key: 'comment', label: 'Comment', controlType: 'text', width: 220 },
        { key: 'sendMail', label: 'Send Mail?', controlType: 'checkbox', width: 100 },
        { key: 'sendAttachments', label: 'Send Attachments?', controlType: 'checkbox', width: 140 },
        { key: 'sendPrevAttachments', label: 'Send Previous Status Attachments', controlType: 'checkbox', width: 200 },
        { key: 'location', label: 'Location', controlType: 'text', width: 140 },
        { key: 'statusUser', label: 'Status User', controlType: 'text', width: 140 },
        { key: 'statusDate', label: 'Status Date', controlType: 'date', width: 120 }
      ]
    },
    {
      id: 'sec-attachments',
      title: 'Attachments',
      type: 'grid',
      defaultExpanded: false,
      nestedGridFields: [
        { key: 'fileDescription', label: 'File Description', controlType: 'text', width: 200 },
        { key: 'fileName', label: 'File Name', controlType: 'text', width: 200 },
        { key: 'attachment', label: 'Attachment', controlType: 'text', width: 130 },
        { key: 'dateCreated', label: 'Date Created', controlType: 'date', width: 130 },
        { key: 'createdBy', label: 'Created By', controlType: 'text', width: 150 }
      ]
    }
  ],
  views: [
    {
      id: 'recordings-grid',
      name: 'All Recordings',
      type: 'grid',
      icon: 'Film',
      description: 'Main recordings workflow grid',
      widgets: [
        {
          id: 'grid-widget-recordings',
          title: 'Recordings Master Register',
          type: 'grid',
          gridConfig: {
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
    }
  ]
};
