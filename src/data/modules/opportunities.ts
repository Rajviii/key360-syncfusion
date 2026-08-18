import { ModuleMetadata } from '@/types/metadata';

export const opportunitiesMockData = [
  {
    id: '1',
    code: 'OP0000059',
    opportunityCode: 'OP-2026-059',
    tenderCode: 'TND-8841',
    referenceNumber: 'REF-9921',
    projectIdeaName: 'Opportunity 8 - E-commerce Platform Redesign',
    description: 'Enterprise online portal expansion for sub-Saharan logistics division.',
    estimatedValue: 145000,
    estimatedManHours: 320,

    contract: 'Standard Enterprise SLA',
    clientName: 'ABC Corporation',
    clientCode: 'CL-001',
    entity: 'Global Infrastructure Ltd',
    clientTelNumber: '+27 11 492 1000',
    clientContactPerson: 'John Smith',
    clientEmailAddress: 'john.smith@abccorp.com',

    probabilityPercent: 75,
    weightedValue: 108750,

    targetStartDate: '2026-09-01',
    targetCompletionDate: '2026-12-15',
    nextDueDate: '2026-09-04',

    proposedBaseDate: '2026-08-18',

    createUser: 'Prajapati, Rajvi',
    createDate: '2026-08-18 10:39 AM',
    nextResponsiblePerson: 'User1, Demo',

    currentStatusComment: 'Archived',
    statusBadge: 'A8 - Archived',
    statusColor: 'amber'
  },
  {
    id: '2',
    code: 'OP0000057',
    opportunityCode: 'OP-2026-057',
    tenderCode: 'TND-8839',
    referenceNumber: 'REF-9918',
    projectIdeaName: 'Opportunity 9 - AI Mining Analytics Engine',
    description: 'Real-time telemetry and predictive maintenance platform.',
    estimatedValue: 890000,
    estimatedManHours: 1200,

    contract: 'Framework Agreement 2026',
    clientName: 'Rio Tinto Mining',
    clientCode: 'CL-004',
    entity: 'Rio Tinto Global',
    clientTelNumber: '+61 3 9283 3333',
    clientContactPerson: 'David Miller',
    clientEmailAddress: 'd.miller@riotinto.com',

    probabilityPercent: 90,
    weightedValue: 801000,

    targetStartDate: '2026-10-01',
    targetCompletionDate: '2027-04-30',
    nextDueDate: '2026-09-16',

    proposedBaseDate: '2026-08-18',

    createUser: 'Prajapati, Rajvi',
    createDate: '2026-08-18 09:15 AM',
    nextResponsiblePerson: 'User1, Demo',

    currentStatusComment: 'Meeting Completed - Proposal',
    statusBadge: 'A3 - Meeting Completed',
    statusColor: 'blue'
  },
  {
    id: '3',
    code: 'OP0000056',
    opportunityCode: 'OP-2026-056',
    tenderCode: 'TND-8830',
    referenceNumber: 'REF-9910',
    projectIdeaName: 'Opportunity 6 - Substation Telemetry System',
    description: 'SCADA integration and high-voltage grid telemetry.',
    estimatedValue: 450000,
    estimatedManHours: 650,

    contract: 'Consulting Retainer',
    clientName: 'Eskom Energy',
    clientCode: 'CL-007',
    entity: 'Eskom Holdings',
    clientTelNumber: '+27 11 800 8111',
    clientContactPerson: 'Thabo Mbeki',
    clientEmailAddress: 't.mbeki@eskom.co.za',

    probabilityPercent: 60,
    weightedValue: 270000,

    targetStartDate: '2026-11-01',
    targetCompletionDate: '2027-03-31',
    nextDueDate: '2026-09-20',

    proposedBaseDate: '2026-08-18',

    createUser: 'Prajapati, Rajvi',
    createDate: '2026-08-17 14:20 PM',
    nextResponsiblePerson: 'User1, Demo',

    currentStatusComment: 'Meeting Completed - Proposal',
    statusBadge: 'A3 - Meeting Completed',
    statusColor: 'blue'
  },
  {
    id: '4',
    code: 'OP0000055',
    opportunityCode: 'OP-2026-055',
    tenderCode: 'TND-8822',
    referenceNumber: 'REF-9902',
    projectIdeaName: 'Opportunity 7 - Supply Chain Tracker',
    description: 'Multi-modal freight logistics and consignment portal.',
    estimatedValue: 210000,
    estimatedManHours: 400,

    contract: 'Turnkey Implementation',
    clientName: 'TransNet Freight',
    clientCode: 'CL-002',
    entity: 'TransNet Freight Rail',
    clientTelNumber: '+27 11 308 3000',
    clientContactPerson: 'Sipho Zulu',
    clientEmailAddress: 'sipho.zulu@transnet.net',

    probabilityPercent: 0,
    weightedValue: 0,

    targetStartDate: '2026-08-01',
    targetCompletionDate: '2026-10-31',
    nextDueDate: '2026-09-05',

    proposedBaseDate: '2026-08-18',

    createUser: 'Prajapati, Rajvi',
    createDate: '2026-08-15 11:00 AM',
    nextResponsiblePerson: 'User1, Demo',

    currentStatusComment: 'Proposal Lost. please archive',
    statusBadge: 'A6 - Proposal Lost',
    statusColor: 'red'
  },
  {
    id: '5',
    code: 'OP0000054',
    opportunityCode: 'OP-2026-054',
    tenderCode: 'TND-8815',
    referenceNumber: 'REF-9890',
    projectIdeaName: 'Opportunity 5 - HR & Timesheets Engine',
    description: 'Enterprise timesheets, attendance, and payroll engine.',
    estimatedValue: 680000,
    estimatedManHours: 850,

    contract: 'SaaS Multi-Year License',
    clientName: 'Deloitte Africa',
    clientCode: 'CL-009',
    entity: 'Deloitte & Touche',
    clientTelNumber: '+27 11 517 3000',
    clientContactPerson: 'Rachel Green',
    clientEmailAddress: 'rgreen@deloitte.co.za',

    probabilityPercent: 40,
    weightedValue: 272000,

    targetStartDate: '2026-10-15',
    targetCompletionDate: '2027-02-28',
    nextDueDate: '2026-09-04',

    proposedBaseDate: '2026-08-18',

    createUser: 'Prajapati, Rajvi',
    createDate: '2026-08-14 16:45 PM',
    nextResponsiblePerson: 'User1, Demo',

    currentStatusComment: 'New Opportunity Registered',
    statusBadge: 'A1 - New Lead',
    statusColor: 'emerald'
  },
  {
    id: '6',
    code: 'OP0000052',
    opportunityCode: 'OP-2026-052',
    tenderCode: 'TND-8800',
    referenceNumber: 'REF-9875',
    projectIdeaName: 'Opportunity 3 - Document Redlining Hub',
    description: 'PDF annotation, multi-user review, and electronic sign-off.',
    estimatedValue: 340000,
    estimatedManHours: 450,

    contract: 'Professional Services',
    clientName: 'Anglo American',
    clientCode: 'CL-012',
    entity: 'Anglo Platinum',
    clientTelNumber: '+27 11 373 6111',
    clientContactPerson: 'Mark Cutifani',
    clientEmailAddress: 'mcutifani@angloamerican.com',

    probabilityPercent: 85,
    weightedValue: 289000,

    targetStartDate: '2026-09-15',
    targetCompletionDate: '2026-12-31',
    nextDueDate: '2026-09-15',

    proposedBaseDate: '2026-08-18',

    createUser: 'Prajapati, Rajvi',
    createDate: '2026-08-10 08:30 AM',
    nextResponsiblePerson: 'User2, Demo',

    currentStatusComment: 'Project Approval and PO Received',
    statusBadge: 'A7 - Project Kick-off',
    statusColor: 'green'
  }
];

export const opportunitiesMetadata: ModuleMetadata = {
  id: 'opportunities',
  name: 'Opportunity Management',
  description: 'Enterprise opportunity pipeline, client contracts, status history, and metadata-driven forms.',
  icon: 'TrendingUp',
  provider: 'mock',
  permissions: ['create', 'edit', 'delete', 'export', 'approve'],
  fields: [
    // Grid & Form fields
    { key: 'code', label: 'Code', controlType: 'text', section: 'opportunityDetails', showInGrid: true, showInForm: true, frozen: true, width: 120, allowSorting: true, readonly: true },
    { key: 'opportunityCode', label: 'Opportunity Code', controlType: 'text', section: 'opportunityDetails', showInGrid: true, showInForm: true, width: 150, allowSorting: true, allowFiltering: true },
    { key: 'tenderCode', label: 'Tender Code', controlType: 'text', section: 'opportunityDetails', showInGrid: false, showInForm: true, width: 130 },
    { key: 'referenceNumber', label: 'Reference Number', controlType: 'text', section: 'opportunityDetails', showInGrid: false, showInForm: true, width: 140 },
    { key: 'projectIdeaName', label: 'Project Idea Name', controlType: 'text', section: 'opportunityDetails', showInGrid: true, showInForm: true, width: 260, allowSorting: true, allowFiltering: true },
    { key: 'description', label: 'Description', controlType: 'textarea', section: 'opportunityDetails', showInGrid: true, showInForm: true, width: 240 },
    { key: 'estimatedValue', label: 'Estimated Value', controlType: 'currency', section: 'opportunityDetails', showInGrid: false, showInForm: true, width: 140, format: 'C0' },
    { key: 'estimatedManHours', label: 'Estimated Man-Hours', controlType: 'number', section: 'opportunityDetails', showInGrid: false, showInForm: true, width: 140 },

    // Client Details Section
    { key: 'contract', label: 'Contract', controlType: 'select', section: 'clientDetails', showInGrid: false, showInForm: true, options: [
      { label: 'Standard Enterprise SLA', value: 'Standard Enterprise SLA' },
      { label: 'Framework Agreement 2026', value: 'Framework Agreement 2026' },
      { label: 'Consulting Retainer', value: 'Consulting Retainer' },
      { label: 'Turnkey Implementation', value: 'Turnkey Implementation' }
    ]},
    { key: 'clientName', label: 'Client Name', controlType: 'text', section: 'clientDetails', showInGrid: true, showInForm: true, width: 180, allowSorting: true, allowFiltering: true },
    { key: 'clientCode', label: 'Client Code', controlType: 'text', section: 'clientDetails', showInGrid: false, showInForm: true, width: 120, readonly: true },
    { key: 'entity', label: 'Entity', controlType: 'select', section: 'clientDetails', showInGrid: false, showInForm: true, options: [
      { label: 'Global Infrastructure Ltd', value: 'Global Infrastructure Ltd' },
      { label: 'Rio Tinto Global', value: 'Rio Tinto Global' },
      { label: 'Eskom Holdings', value: 'Eskom Holdings' },
      { label: 'Deloitte & Touche', value: 'Deloitte & Touche' }
    ]},
    { key: 'clientTelNumber', label: 'Client Tel Number', controlType: 'phone', section: 'clientDetails', showInGrid: false, showInForm: true },
    { key: 'clientContactPerson', label: 'Client Contact Person', controlType: 'text', section: 'clientDetails', showInGrid: false, showInForm: true },
    { key: 'clientEmailAddress', label: 'Client Email Address', controlType: 'email', section: 'clientDetails', showInGrid: false, showInForm: true },

    // Opportunity Probability Section
    { key: 'probabilityPercent', label: 'Probability (%)', controlType: 'number', section: 'probability', showInGrid: false, showInForm: true },
    { key: 'weightedValue', label: 'Weighted Value ($)', controlType: 'currency', section: 'probability', showInGrid: false, showInForm: true, format: 'C0', readonly: true },

    // Opportunity Dates Section
    { key: 'targetStartDate', label: 'Target Start Date', controlType: 'date', section: 'dates', showInGrid: false, showInForm: true },
    { key: 'targetCompletionDate', label: 'Target Completion Date', controlType: 'date', section: 'dates', showInGrid: false, showInForm: true },
    { key: 'nextDueDate', label: 'Next Due Date', controlType: 'date', section: 'dates', showInGrid: true, showInForm: true, width: 130, allowSorting: true },

    // Proposal Details Section
    { key: 'proposedBaseDate', label: 'Proposed Base Date', controlType: 'date', section: 'proposal', showInGrid: false, showInForm: true },

    // Change Control Section
    { key: 'createUser', label: 'Create User', controlType: 'text', section: 'changeControl', showInGrid: false, showInForm: true, readonly: true },
    { key: 'createDate', label: 'Create Date', controlType: 'datetime', section: 'changeControl', showInGrid: false, showInForm: true, readonly: true },
    { key: 'nextResponsiblePerson', label: 'Next Responsible Person', controlType: 'text', section: 'changeControl', showInGrid: true, showInForm: true, width: 170, allowSorting: true, allowFiltering: true },
    { key: 'currentStatusComment', label: 'Current Status Comment', controlType: 'textarea', section: 'changeControl', showInGrid: true, showInForm: false, width: 220 },
    { key: 'statusBadge', label: 'Status History', controlType: 'text', section: 'changeControl', showInGrid: true, showInForm: false, width: 180, allowSorting: true }
  ],
  formSections: [
    { id: 'categorisation', title: 'Categorisation', type: 'fields', defaultExpanded: false },
    { id: 'opportunityDetails', title: 'Opportunity Detail', type: 'fields', defaultExpanded: true },
    { id: 'clientDetails', title: 'Client Details', type: 'fields', defaultExpanded: true },
    { id: 'probability', title: 'Opportunity Probability', type: 'fields', defaultExpanded: false },
    { id: 'dates', title: 'Opportunity Dates', type: 'fields', defaultExpanded: false },
    { id: 'proposal', title: 'Proposal Details', type: 'fields', defaultExpanded: true },
    {
      id: 'recordings',
      title: 'Recordings',
      type: 'grid',
      defaultExpanded: false,
      nestedGridFields: [
        { key: 'code', label: 'Code', controlType: 'text', showInGrid: true, width: 100 },
        { key: 'description', label: 'Description', controlType: 'text', showInGrid: true, width: 200 },
        { key: 'owner', label: 'Owner', controlType: 'text', showInGrid: true, width: 130 },
        { key: 'nextDueDate', label: 'Next Due Date', controlType: 'date', showInGrid: true, width: 120 },
        { key: 'dueDate', label: 'Due Date', controlType: 'date', showInGrid: true, width: 120 },
        { key: 'originator', label: 'Originator', controlType: 'text', showInGrid: true, width: 130 },
        { key: 'latestComment', label: 'Latest Comment', controlType: 'text', showInGrid: true, width: 200 },
        { key: 'status', label: 'Status History', controlType: 'text', showInGrid: true, width: 140 }
      ],
      nestedGridData: [
        { code: 'REC-01', description: 'Initial Discovery & Client Scope Video', owner: 'Prajapati, Rajvi', nextDueDate: '2026-09-01', dueDate: '2026-09-01', originator: 'User1, Demo', latestComment: 'Client approved scope demo', status: 'A3 - Completed' }
      ]
    },
    { id: 'changeControl', title: 'Change Control', type: 'fields', defaultExpanded: true },
    {
      id: 'statusHistory',
      title: 'Status History',
      type: 'grid',
      defaultExpanded: false,
      nestedGridFields: [
        { key: 'status', label: 'Status', controlType: 'text', showInGrid: true, width: 160 },
        { key: 'nextResponsiblePerson', label: 'Next Responsible Person', controlType: 'text', showInGrid: true, width: 160 },
        { key: 'comment', label: 'Comment', controlType: 'text', showInGrid: true, width: 250 },
        { key: 'sendMail', label: 'Send Mail?', controlType: 'checkbox', showInGrid: true, width: 100 },
        { key: 'sendAttachments', label: 'Send Attachments?', controlType: 'checkbox', showInGrid: true, width: 120 },
        { key: 'statusDate', label: 'Status Date', controlType: 'datetime', showInGrid: true, width: 160 }
      ],
      nestedGridData: [
        { status: 'A1 - New Lead', nextResponsiblePerson: 'User1, Demo', comment: 'Opportunity created from marketing lead', sendMail: true, sendAttachments: false, statusDate: '2026-08-14 11:00 AM' },
        { status: 'A3 - Meeting Completed', nextResponsiblePerson: 'User1, Demo', comment: 'Proposal presented to executive board', sendMail: true, sendAttachments: true, statusDate: '2026-08-16 15:30 PM' }
      ]
    },
    {
      id: 'attachments',
      title: 'Attachments',
      type: 'grid',
      defaultExpanded: false,
      nestedGridFields: [
        { key: 'comment', label: 'Comment', controlType: 'text', showInGrid: true, width: 200 },
        { key: 'fileName', label: 'File Name', controlType: 'text', showInGrid: true, width: 200 },
        { key: 'attachment', label: 'Attachment', controlType: 'text', showInGrid: true, width: 150 },
        { key: 'dateCreated', label: 'Date Created', controlType: 'datetime', showInGrid: true, width: 150 },
        { key: 'createdBy', label: 'Created By', controlType: 'text', showInGrid: true, width: 130 }
      ],
      nestedGridData: [
        { comment: 'Signed Proposal Specification', fileName: 'Proposal_v2_Signed.pdf', attachment: '[Download PDF]', dateCreated: '2026-08-16 16:00 PM', createdBy: 'Prajapati, Rajvi' }
      ]
    }
  ],
  views: [
    {
      id: 'opp-grid',
      name: 'All Opportunities',
      type: 'grid',
      icon: 'Table',
      description: 'Generic metadata grid for sales pipeline & opportunities',
      widgets: [
        {
          id: 'grid-widget-opp',
          title: 'CRM Opportunity Management',
          type: 'grid',
          gridConfig: {
            virtualScrolling: true,
            allowPaging: true,
            pageSize: 15,
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
      id: 'opp-form',
      name: 'Add / Edit Opportunity',
      type: 'form',
      icon: 'FilePlus',
      widgets: [
        {
          id: 'w-opp-form',
          title: 'Opportunity Master Form',
          type: 'form'
        }
      ]
    }
  ]
};
