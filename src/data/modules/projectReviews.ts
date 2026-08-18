import { ModuleMetadata } from '@/types/metadata';

export const projectReviewsMockData = [
  {
    id: 'PR-2026-001',
    projectReviewId: 'PR-2026-001',
    reviewProjectId: 'PRJ-001',
    projectName: 'Substation Telemetry & High-Voltage Upgrade',
    updateReference: 'Q3 Status Update - Rev A',
    reportDate: '2026-08-18',
    reviewDate: '2026-08-18',
    projectManager: 'Prajapati, Rajvi',
    originator: 'Prajapati, Rajvi',
    lastUpdateDate: '2026-08-18 11:30 AM',
    lastUpdateUser: 'Prajapati, Rajvi',
    projectSponsor: 'Eskom Energy',
    businessOwner: 'Transmission Div',
    constructionManager: 'Golding, Steven',
    scope: 'SCADA integration and high-voltage grid telemetry automation across 4 substations.',

    // Executive Summary
    executiveSummaryComments: 'Overall project execution remains sound despite supply chain pressure.',
    highlights: 'Phase 1 substation wiring completed 3 days ahead of baseline. Safety audit score 100%.',
    issuesImpacts: 'Long-lead transformer delivery delayed by 2 weeks due to port backlog.',
    remedialActions: 'Expedited air freight for secondary control panels to maintain critical path.',

    // Cost Summary
    originalBudget: 2400000,
    scopeChange: 120000,
    pendingScopeChange: 45000,
    currentBudget: 2520000,
    committed: 1850000,
    percentCommitted: 73.4,
    uncommitted: 670000,
    ftc: 620000,
    ftcPreviousReview: 650000,
    ffc: 2470000,
    budgetVariance: 120000,
    costSummaryComments: 'Budget variance well within acceptable reserve threshold.',

    // Progress Update
    startDateBL: '2026-01-15',
    startDate: '2026-01-15',
    finishDateBL: '2026-11-30',
    finishDate: '2026-12-15',
    percentCompletePlanned: 68,
    plannedPercentComplete: 68,
    percentCompleteActual: 61,
    actualPercentComplete: 61,
    plannedPercentGained: 5,
    actualPercentGained: 4,
    progressVariance: -7.0,
    scheduleVariance: -7.0,
    progressUpdateComments: 'Substation #2 wiring in progress.',

    // Earned Value
    bcwp: 1537200,
    bcws: 1713600,
    targetPerformanceIndex: 1.05,
    totalCpi: 0.94,
    totalSpi: 0.90,
    cv: -98000,
    sv: -176400,
    cvPercent: -6.3,
    svPercent: -10.2,
    evComments: 'CPI and SPI metrics recovering following panel arrival.',

    // Site Instructions & Technical Queries
    siCount: 8,
    siCountApproved: 6,
    siValue: 180000,
    siValueApproved: 145000,
    siComments: 'All high-priority site instructions approved.',
    tqCount: 4,
    tqCountClosed: 3,
    tqComments: '1 TQ open regarding cable tray clearance.',
    ewCount: 3,
    ewCountClosed: 2,
    ewComments: 'Port backlog warning resolved.',
    riskCount: 6,
    riskCountClosed: 5,
    riskComments: '1 high-risk transformer delivery monitored daily.',
    ceCount: 12,
    ceCountApproved: 8,
    ceValue: 450000,
    ceValueApproved: 320000,
    ceComments: 'Compensation events reviewed in monthly commercial meeting.',

    // Invoicing
    invoicedToDate: 1400000,
    currentMonthInvoiceValue: 280000,
    forecastNextInvoice: 320000,
    remainingCurrentBudget: 1120000,
    projectInvoicingComments: 'Client milestone billing on schedule.',

    // General & SHE
    she: 0,
    sheComment: 'Zero lost time injuries logged.',
    cashflowPercent: 72,
    cashflowComment: 'Cashflow aligns with Q3 forecast.',
    schedulePercent: 93,
    scheduleComment: 'On schedule for Q4 commissioning.',
    forecast1824Percent: 88,
    forecast1824Comment: 'Long-term forecast stable.',
    projectApprovalsPercent: 95,
    projectApprovalsComment: 'All stage approvals granted.',
    changesOfScopePercent: 4,
    changesOfScopeComment: 'Scope changes within contingency.',
    quality: 0,
    qualityComment: 'Quality inspections passed 100%.',
    businessCaseDeliveryPercent: 90,
    businessCaseComment: 'Benefits delivery tracking on target.',
    reduceCapitalSpentPercent: 2,
    reduceCapitalSpentComment: 'Capital optimization underway.',

    // SHE Metrics
    ltifrLast12Months: 0.00,
    ltifrCurrentYear: 0.00,
    sheNrOfEmp: 45,
    sheHoursMonth: 7200,
    sheHoursCy: 54000,
    sheHoursPtd: 120000,
    sheVflMtd: 12,
    shePtoMtd: 8,
    sheVflPtd: 145,
    shePtoPtd: 98,
    sheHph: 0,
    sheHpi: 0,
    sheFac: 0,
    sheMtc: 0,
    sheLtis: 0,

    currentStatus: 'A3 - Under Review',
    statusBadge: 'A3 - Under Review',
    scheduleStatus: 'On Track',
    costStatus: 'At Risk',
    qualityStatus: 'Good',
    overallStatus: 'At Risk'
  }
];

export const projectReviewsMetadata: ModuleMetadata = {
  id: 'project-reviews',
  name: 'Project Reviews',
  description: 'Project health workspace, KPI dashboard, cost summaries, progress update, earned value metrics, and status approval workflows.',
  icon: 'ClipboardCheck',
  provider: 'mock',
  permissions: ['create', 'edit', 'delete', 'export', 'approve'],
  mockData: projectReviewsMockData,
  fields: [
    // Project Detail
    { key: 'projectReviewId', label: 'Project Review ID', controlType: 'text', section: 'projectDetail', showInGrid: true, showInForm: true, readonly: true },
    { key: 'reviewProjectId', label: 'Review Project ID', controlType: 'text', section: 'projectDetail', showInGrid: false, showInForm: true },
    { key: 'projectName', label: 'Project Name', controlType: 'text', section: 'projectDetail', showInGrid: true, showInForm: true },
    { key: 'updateReference', label: 'Update Reference', controlType: 'text', section: 'projectDetail', showInGrid: true, showInForm: true },
    { key: 'reportDate', label: 'Report Date', controlType: 'date', section: 'projectDetail', showInGrid: true, showInForm: true },
    {
      key: 'projectManager', label: 'Project Manager', controlType: 'select', section: 'projectDetail', showInGrid: true, showInForm: true, options: [
        { label: 'Prajapati, Rajvi', value: 'Prajapati, Rajvi' },
        { label: 'Golding, Steven', value: 'Golding, Steven' },
        { label: 'Babariya, Dhruv', value: 'Babariya, Dhruv' },
        { label: 'Meyer, Corrie', value: 'Meyer, Corrie' }
      ]
    },
    { key: 'lastUpdateDate', label: 'Last Update Date', controlType: 'datetime', section: 'projectDetail', showInGrid: true, showInForm: true, readonly: true },
    { key: 'lastUpdateUser', label: 'Last Update User', controlType: 'text', section: 'projectDetail', showInGrid: false, showInForm: true, readonly: true },
    { key: 'originator', label: 'Originator', controlType: 'text', section: 'projectDetail', showInGrid: false, showInForm: true },
    { key: 'scope', label: 'Scope', controlType: 'textarea', section: 'projectDetail', showInGrid: false, showInForm: true },
    { key: 'projectSponsor', label: 'Project Sponsor', controlType: 'text', section: 'projectDetail', showInGrid: true, showInForm: true },
    { key: 'businessOwner', label: 'Business Owner', controlType: 'text', section: 'projectDetail', showInGrid: false, showInForm: true },
    { key: 'constructionManager', label: 'Construction Manager', controlType: 'text', section: 'projectDetail', showInGrid: false, showInForm: true },

    // Executive Summary
    { key: 'executiveSummaryComments', label: 'Executive Summary Comments', controlType: 'textarea', section: 'executiveSummary', showInGrid: true, showInForm: true },
    { key: 'highlights', label: 'Highlights', controlType: 'textarea', section: 'executiveSummary', showInGrid: true, showInForm: true },
    { key: 'issuesImpacts', label: 'Issues Impacts', controlType: 'textarea', section: 'executiveSummary', showInGrid: true, showInForm: true },
    { key: 'remedialActions', label: 'Remedial Actions', controlType: 'textarea', section: 'executiveSummary', showInGrid: true, showInForm: true },

    // Project Cost Summary
    { key: 'originalBudget', label: 'Original Budget', controlType: 'currency', section: 'projectCostSummary', showInForm: true },
    { key: 'scopeChange', label: 'Scope Change', controlType: 'currency', section: 'projectCostSummary', showInForm: true },
    { key: 'pendingScopeChange', label: 'Pending Scope Change', controlType: 'currency', section: 'projectCostSummary', showInForm: true },
    { key: 'currentBudget', label: 'Current Budget', controlType: 'currency', section: 'projectCostSummary', showInForm: true },
    { key: 'committed', label: 'Committed', controlType: 'currency', section: 'projectCostSummary', showInForm: true },
    { key: 'percentCommitted', label: '% Committed', controlType: 'number', section: 'projectCostSummary', showInForm: true },
    { key: 'uncommitted', label: 'Uncommitted', controlType: 'currency', section: 'projectCostSummary', showInForm: true },
    { key: 'ftc', label: 'FTC', controlType: 'currency', section: 'projectCostSummary', showInForm: true },
    { key: 'ftcPreviousReview', label: 'FTC Previous Review', controlType: 'currency', section: 'projectCostSummary', showInForm: true },
    { key: 'ffc', label: 'FFC', controlType: 'currency', section: 'projectCostSummary', showInForm: true },
    { key: 'budgetVariance', label: 'Budget Variance', controlType: 'currency', section: 'projectCostSummary', showInGrid: true, showInForm: true },
    { key: 'costSummaryComments', label: 'Cost Summary Comments', controlType: 'textarea', section: 'projectCostSummary', showInForm: true },

    // Progress Update
    { key: 'startDateBL', label: 'Start Date BL', controlType: 'date', section: 'progressUpdate', showInForm: true },
    { key: 'startDate', label: 'Start Date', controlType: 'date', section: 'progressUpdate', showInForm: true },
    { key: 'finishDateBL', label: 'Finish Date BL', controlType: 'date', section: 'progressUpdate', showInForm: true },
    { key: 'finishDate', label: 'Finish Date', controlType: 'date', section: 'progressUpdate', showInForm: true },
    { key: 'percentCompletePlanned', label: '% Complete Planned', controlType: 'number', section: 'progressUpdate', showInGrid: true, showInForm: true },
    { key: 'percentCompleteActual', label: '% Complete Actual', controlType: 'number', section: 'progressUpdate', showInGrid: true, showInForm: true },
    { key: 'plannedPercentGained', label: 'Planned % Gained', controlType: 'number', section: 'progressUpdate', showInForm: true },
    { key: 'actualPercentGained', label: 'Actual % Gained', controlType: 'number', section: 'progressUpdate', showInForm: true },
    { key: 'progressVariance', label: 'Progress Variance', controlType: 'number', section: 'progressUpdate', showInGrid: true, showInForm: true },
    { key: 'progressUpdateComments', label: 'Progress Update Comments', controlType: 'textarea', section: 'progressUpdate', showInForm: true },

    // Earned Value
    { key: 'bcwp', label: 'BCWP', controlType: 'currency', section: 'earnedValue', showInForm: true },
    { key: 'bcws', label: 'BCWS', controlType: 'currency', section: 'earnedValue', showInForm: true },
    { key: 'targetPerformanceIndex', label: 'Target Performance Index', controlType: 'number', section: 'earnedValue', showInForm: true },
    { key: 'totalCpi', label: 'Total CPI', controlType: 'number', section: 'earnedValue', showInForm: true },
    { key: 'totalSpi', label: 'Total SPI', controlType: 'number', section: 'earnedValue', showInForm: true },
    { key: 'cv', label: 'CV', controlType: 'currency', section: 'earnedValue', showInForm: true },
    { key: 'sv', label: 'SV', controlType: 'currency', section: 'earnedValue', showInForm: true },
    { key: 'cvPercent', label: 'CV %', controlType: 'number', section: 'earnedValue', showInForm: true },
    { key: 'svPercent', label: 'SV %', controlType: 'number', section: 'earnedValue', showInForm: true },
    { key: 'evComments', label: 'EV Comments', controlType: 'textarea', section: 'earnedValue', showInForm: true },

    // Site Instructions
    { key: 'siCount', label: 'SI Count', controlType: 'number', section: 'siteInstructions', showInForm: true },
    { key: 'siCountApproved', label: 'SI Count Approved', controlType: 'number', section: 'siteInstructions', showInForm: true },
    { key: 'siValue', label: 'SI Value', controlType: 'currency', section: 'siteInstructions', showInForm: true },
    { key: 'siValueApproved', label: 'SI Value Approved', controlType: 'currency', section: 'siteInstructions', showInForm: true },
    { key: 'siComments', label: 'SI Comments', controlType: 'textarea', section: 'siteInstructions', showInForm: true },

    // Technical Queries
    { key: 'tqCount', label: 'TQ Count', controlType: 'number', section: 'technicalQueries', showInForm: true },
    { key: 'tqCountClosed', label: 'TQ Count Closed', controlType: 'number', section: 'technicalQueries', showInForm: true },
    { key: 'tqComments', label: 'TQ Comments', controlType: 'textarea', section: 'technicalQueries', showInForm: true },

    // Early Warnings
    { key: 'ewCount', label: 'EW Count', controlType: 'number', section: 'earlyWarnings', showInForm: true },
    { key: 'ewCountClosed', label: 'EW Count Closed', controlType: 'number', section: 'earlyWarnings', showInForm: true },
    { key: 'ewComments', label: 'EW Comments', controlType: 'textarea', section: 'earlyWarnings', showInForm: true },

    // Risk
    { key: 'riskCount', label: 'Risk Count', controlType: 'number', section: 'risk', showInGrid: true, showInForm: true },
    { key: 'riskCountClosed', label: 'Risk Count Closed', controlType: 'number', section: 'risk', showInForm: true },
    { key: 'riskComments', label: 'Risk Comments', controlType: 'textarea', section: 'risk', showInForm: true },

    // Compensation Events
    { key: 'ceCount', label: 'CE Count', controlType: 'number', section: 'compensationEvents', showInForm: true },
    { key: 'ceCountApproved', label: 'CE Count Approved', controlType: 'number', section: 'compensationEvents', showInForm: true },
    { key: 'ceValue', label: 'CE Value', controlType: 'currency', section: 'compensationEvents', showInForm: true },
    { key: 'ceValueApproved', label: 'CE Value Approved', controlType: 'currency', section: 'compensationEvents', showInForm: true },
    { key: 'ceComments', label: 'CE Comments', controlType: 'textarea', section: 'compensationEvents', showInForm: true },

    // Project Invoicing
    { key: 'invoicedToDate', label: 'Invoiced To Date', controlType: 'currency', section: 'projectInvoicing', showInForm: true },
    { key: 'currentMonthInvoiceValue', label: 'Current Month Invoice Value', controlType: 'currency', section: 'projectInvoicing', showInForm: true },
    { key: 'forecastNextInvoice', label: 'Forecast Next Invoice', controlType: 'currency', section: 'projectInvoicing', showInForm: true },
    { key: 'remainingCurrentBudget', label: 'Remaining Current Budget', controlType: 'currency', section: 'projectInvoicing', showInForm: true },
    { key: 'projectInvoicingComments', label: 'Project Invoicing Comments', controlType: 'textarea', section: 'projectInvoicing', showInForm: true },

    // General
    { key: 'she', label: 'SHE', controlType: 'number', section: 'general', showInForm: true },
    { key: 'sheComment', label: 'SHE Comment', controlType: 'textarea', section: 'general', showInForm: true },
    { key: 'cashflowPercent', label: 'Cashflow %', controlType: 'number', section: 'general', showInForm: true },
    { key: 'cashflowComment', label: 'Cashflow Comment', controlType: 'textarea', section: 'general', showInForm: true },
    { key: 'schedulePercent', label: 'Schedule %', controlType: 'number', section: 'general', showInForm: true },
    { key: 'scheduleComment', label: 'Schedule Comment', controlType: 'textarea', section: 'general', showInForm: true },
    { key: 'forecast1824Percent', label: '18-24 Month Forecast %', controlType: 'number', section: 'general', showInForm: true },
    { key: 'forecast1824Comment', label: '18-24 Month Forecast Comment', controlType: 'textarea', section: 'general', showInForm: true },
    { key: 'projectApprovalsPercent', label: 'Project Approvals %', controlType: 'number', section: 'general', showInForm: true },
    { key: 'projectApprovalsComment', label: 'Project Approvals Comment', controlType: 'textarea', section: 'general', showInForm: true },
    { key: 'changesOfScopePercent', label: 'Changes of Scope %', controlType: 'number', section: 'general', showInForm: true },
    { key: 'changesOfScopeComment', label: 'Changes of Scope Comment', controlType: 'textarea', section: 'general', showInForm: true },
    { key: 'quality', label: 'Quality', controlType: 'number', section: 'general', showInForm: true },
    { key: 'qualityComment', label: 'Quality Comment', controlType: 'textarea', section: 'general', showInForm: true },
    { key: 'businessCaseDeliveryPercent', label: 'Project / Business Case Benefits Delivery %', controlType: 'number', section: 'general', showInForm: true },
    { key: 'businessCaseComment', label: 'Project / Business Case Comment', controlType: 'textarea', section: 'general', showInForm: true },
    { key: 'reduceCapitalSpentPercent', label: 'Reduce Capital Spent by 5%', controlType: 'number', section: 'general', showInForm: true },
    { key: 'reduceCapitalSpentComment', label: 'Reduce Capital Spent Comment', controlType: 'textarea', section: 'general', showInForm: true },

    // SHE Metrics
    { key: 'ltifrLast12Months', label: 'LTIFR Last 12 Months', controlType: 'number', section: 'she', showInForm: true },
    { key: 'ltifrCurrentYear', label: 'LTIFR Current Year', controlType: 'number', section: 'she', showInForm: true },
    { key: 'sheNrOfEmp', label: 'SHE Nr Of Emp', controlType: 'number', section: 'she', showInForm: true },
    { key: 'sheHoursMonth', label: 'SHE Hours Month', controlType: 'number', section: 'she', showInForm: true },
    { key: 'sheHoursCy', label: 'SHE Hours CY', controlType: 'number', section: 'she', showInForm: true },
    { key: 'sheHoursPtd', label: 'SHE Hours PTD', controlType: 'number', section: 'she', showInForm: true },
    { key: 'sheVflMtd', label: "SHE VFL's MTD", controlType: 'number', section: 'she', showInForm: true },
    { key: 'shePtoMtd', label: 'SHE PTO MTD', controlType: 'number', section: 'she', showInForm: true },
    { key: 'sheVflPtd', label: "SHE VFL's PTD", controlType: 'number', section: 'she', showInForm: true },
    { key: 'shePtoPtd', label: 'SHE PTO PTD', controlType: 'number', section: 'she', showInForm: true },
    { key: 'sheHph', label: 'SHE HPH', controlType: 'number', section: 'she', showInForm: true },
    { key: 'sheHpi', label: 'SHE HPI', controlType: 'number', section: 'she', showInForm: true },
    { key: 'sheFac', label: 'SHE FAC', controlType: 'number', section: 'she', showInForm: true },
    { key: 'sheMtc', label: 'SHE MTC', controlType: 'number', section: 'she', showInForm: true },
    { key: 'sheLtis', label: "SHE LTI's", controlType: 'number', section: 'she', showInForm: true },

    { key: 'statusBadge', label: 'Status History', controlType: 'text', section: 'projectDetail', showInGrid: true, showInForm: true }
  ],

  formSections: [
    { id: 'categorisation', title: 'Categorisation', type: 'fields', defaultExpanded: false },
    { id: 'projectDetail', title: 'Project Detail', type: 'fields', defaultExpanded: true },
    { id: 'executiveSummary', title: 'Executive Summary', type: 'fields', defaultExpanded: true },
    { id: 'projectCostSummary', title: 'Project Cost Summary', type: 'fields', defaultExpanded: true },
    { id: 'progressUpdate', title: 'Progress Update', type: 'fields', defaultExpanded: true },
    { id: 'earnedValue', title: 'Earned Value', type: 'fields', defaultExpanded: false },
    { id: 'siteInstructions', title: 'Site Instructions', type: 'fields', defaultExpanded: false },
    { id: 'technicalQueries', title: 'Technical Queries', type: 'fields', defaultExpanded: false },
    { id: 'earlyWarnings', title: 'Early Warnings', type: 'fields', defaultExpanded: false },
    { id: 'risk', title: 'Risk', type: 'fields', defaultExpanded: false },
    { id: 'compensationEvents', title: 'Compensation Events', type: 'fields', defaultExpanded: false },
    { id: 'projectInvoicing', title: 'Project Invoicing', type: 'fields', defaultExpanded: false },
    { id: 'general', title: 'General', type: 'fields', defaultExpanded: false },
    { id: 'she', title: 'SHE', type: 'fields', defaultExpanded: false },
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
        { id: 'sh-p1', user: 'Prajapati, Rajvi', date: '2026-08-18 09:15 AM', status: 'A3 - Under Review', comment: 'Submitted project review #001 for executive committee review.', nextResponsiblePerson: 'Golding, Steven' },
        { id: 'sh-p2', user: 'Golding, Steven', date: '2026-08-18 10:45 AM', status: 'A7 - Approved', comment: 'Approved budget variance adjustment for long-lead items.', nextResponsiblePerson: 'Prajapati, Rajvi' }
      ]
    },
    {
      id: 'recordings',
      title: 'Recordings',
      type: 'grid',
      defaultExpanded: false,
      nestedGridFields: [
        { key: 'code', label: 'Code', controlType: 'text', width: 120 },
        { key: 'description', label: 'Description', controlType: 'text', width: 220 },
        { key: 'owner', label: 'Owner', controlType: 'text', width: 140 },
        { key: 'nextDueDate', label: 'Next Due Date', controlType: 'date', width: 120 },
        { key: 'dueDate', label: 'Due Date', controlType: 'date', width: 120 },
        { key: 'originator', label: 'Originator', controlType: 'text', width: 140 },
        { key: 'company', label: 'Company', controlType: 'text', width: 150 },
        { key: 'status', label: 'Status', controlType: 'text', width: 120 }
      ],
      nestedGridData: [
        { id: 'rec-1', code: 'REC-2026-088', description: 'Transformer Delivery Air Freight Clearance', owner: 'Prajapati, Rajvi', nextDueDate: '2026-08-25', dueDate: '2026-08-25', originator: 'Golding, Steven', company: 'Eskom Energy', status: 'In Progress' }
      ]
    }
  ],

  views: [
    {
      id: 'v-grid',
      name: 'Project Review Listing',
      type: 'grid',
      icon: 'Table',
      widgets: [
        {
          id: 'w-project-reviews-grid',
          title: 'Project Gate & Health Reviews',
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
    }
  ]
};
