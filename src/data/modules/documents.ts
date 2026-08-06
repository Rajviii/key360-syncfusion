import { ModuleMetadata } from '@/types/metadata';

export const documentsMockData = [
  {
    id: 'DOC-2026-001',
    documentTitle: 'SSG Structural Engineering & Compliance Plan',
    project: 'AI ERP Modernization',
    author: 'Steven Golding',
    status: 'Under Review',
    revision: 'Rev B',
    dateCreated: '2026-07-28',
    reviewerCount: 3,
    openComments: 4,
    pdfUrl: '/sample.pdf'
  },
  {
    id: 'DOC-2026-002',
    documentTitle: 'Q360 Infrastructure Migration Specs (Rev A)',
    project: 'Cloud Migration Phase 2',
    author: 'Corrie',
    status: 'Issued',
    revision: 'Rev A',
    dateCreated: '2026-08-01',
    reviewerCount: 2,
    openComments: 2,
    pdfUrl: '/sample.pdf'
  },
  {
    id: 'DOC-2026-003',
    documentTitle: 'Syncfusion Dynamic UI PO Architecture (Rev C)',
    project: 'Syncfusion Dynamic UI PO',
    author: 'Rajvi Prajapati',
    status: 'Approved',
    revision: 'Rev C',
    dateCreated: '2026-08-03',
    reviewerCount: 4,
    openComments: 0,
    pdfUrl: '/sample.pdf'
  }
];

export const documentsMetadata: ModuleMetadata = {
  id: 'documents',
  name: 'Document Register & Review',
  description: 'Document register tracking, PDF redlining, multi-user timestamped annotations, revision merging, and server-driven custom actions.',
  icon: 'FileCheck',
  provider: 'mock',
  permissions: ['create', 'edit', 'delete', 'export', 'approve'],
  mockData: documentsMockData,
  customActions: [
    // {
    //   id: 'action-new-revision',
    //   label: 'New document revision with annotation file',
    //   type: 'pdf-new-revision',
    //   variant: 'primary',
    //   permissionRequired: 'edit'
    // },
    // {
    //   id: 'action-merge-signoff',
    //   label: 'Merge Annotations & Sign-Off',
    //   type: 'pdf-merge-signoff',
    //   variant: 'success',
    //   permissionRequired: 'approve'
    // },
    // {
    //   id: 'action-export-redlines',
    //   label: 'Export Redline Audit Log (JSON)',
    //   type: 'pdf-export-annotations',
    //   variant: 'secondary',
    //   permissionRequired: 'export'
    // }
  ],
  fields: [
    { key: 'id', label: 'Doc ID', controlType: 'text', showInGrid: true, showInForm: false, frozen: true, width: 130 },
    { key: 'documentTitle', label: 'Document Title', controlType: 'text', validation: { required: true }, showInGrid: true, showInForm: true, allowSorting: true, allowFiltering: true },
    { key: 'project', label: 'Project Name', controlType: 'text', showInGrid: true, showInForm: true, allowFiltering: true },
    { key: 'author', label: 'Author / Stakeholder', controlType: 'text', showInGrid: true, showInForm: true },
    {
      key: 'status', label: 'Review Status', controlType: 'select', options: [
        { label: 'Under Review', value: 'Under Review' },
        { label: 'Issued', value: 'Issued' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' }
      ], showInGrid: true, showInForm: true, groupable: true
    },
    { key: 'revision', label: 'Revision', controlType: 'text', showInGrid: true, showInForm: true },
    { key: 'dateCreated', label: 'Date Uploaded', controlType: 'date', showInGrid: true, showInForm: true, format: 'yyyy-MM-dd' },
    { key: 'openComments', label: 'Open Comments', controlType: 'number', showInGrid: true, showInForm: false, aggregate: 'sum' }
  ],
  views: [
    {
      id: 'v-pdf-review',
      name: 'PDF Redlining & Review Workbench',
      type: 'pdf',
      icon: 'FileText',
      widgets: [
        {
          id: 'w-pdf-redline',
          title: 'Document Review Inspection & Redlining',
          type: 'pdf',
          pdfUrl: '/sample.pdf',
          pdfConfig: {
            showLeftCommentsTree: true,
            showRightPropertiesPanel: true,
            groupBy: 'author',
            enableVisibilityCheckboxes: true,
            allowedStatuses: [
              { label: 'Issued Comment', value: 'Issued' },
              { label: 'Pending Review', value: 'Pending' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Resolved', value: 'Resolved' }
            ],
            propertiesFields: [
              { key: 'author', label: 'Author / Reviewer', controlType: 'text' },
              { key: 'subject', label: 'Title / Subject', controlType: 'text' },
              { key: 'borderWidth', label: 'Line Width (px)', controlType: 'number' },
              { key: 'strokeColor', label: 'Annotation Color', controlType: 'colorpicker' },
              {
                key: 'status',
                label: 'Comment Status',
                controlType: 'select',
                options: [
                  { label: 'Issued Comment', value: 'Issued' },
                  { label: 'Pending Review', value: 'Pending' },
                  { label: 'Approved', value: 'Approved' },
                  { label: 'Resolved', value: 'Resolved' }
                ]
              },
              { key: 'comment', label: 'Comment Details', controlType: 'textarea' }
            ]
          }
        }
      ]
    },
    {
      id: 'v-grid',
      name: 'Document Register',
      type: 'grid',
      icon: 'Table',
      widgets: [
        {
          id: 'w-doc-grid',
          title: 'All Registered Documents',
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
            frozenColumns: 1
          }
        }
      ]
    },
    {
      id: 'v-form',
      name: 'Upload New Document',
      type: 'form',
      icon: 'FilePlus',
      widgets: [
        {
          id: 'w-doc-form',
          title: 'New Document Register Form',
          type: 'form'
        }
      ]
    }
  ]
};
