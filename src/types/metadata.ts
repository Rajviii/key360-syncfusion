export type ViewType = 'grid' | 'gantt' | 'kanban' | 'chart' | 'dashboard' | 'pdf' | 'form' | 'schedule' | 'calendar';

export type WidgetType = 'grid' | 'chart' | 'pie' | 'kpi' | 'gantt' | 'kanban' | 'pdf' | 'form' | 'activity' | 'schedule' | 'calendar';

export type PermissionType = 'create' | 'edit' | 'delete' | 'export' | 'approve' | 'reject';

export type FieldControlType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'currency'
  | 'maskedinput'
  | 'password'
  | 'email'
  | 'phone'
  | 'url'
  | 'switch'
  | 'checkbox'
  | 'radio'
  | 'colorpicker'
  | 'rating'
  | 'select'
  | 'multiselect'
  | 'autocomplete'
  | 'tags'
  | 'date'
  | 'datetime'
  | 'fileupload';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface FieldValidation {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  message?: string;
}

export interface FieldSchema {
  key: string;
  label: string;
  controlType: FieldControlType;
  placeholder?: string;
  defaultValue?: any;
  options?: SelectOption[];
  validation?: FieldValidation;
  showInGrid?: boolean;
  showInForm?: boolean;
  frozen?: boolean;
  width?: number | string;
  format?: string;
  allowSorting?: boolean;
  allowFiltering?: boolean;
  groupable?: boolean;
  aggregate?: 'sum' | 'count' | 'average' | 'min' | 'max';
  section?: string;
  readonly?: boolean;
}

export interface FormSectionSchema {
  id: string;
  title: string;
  type?: 'fields' | 'grid';
  defaultExpanded?: boolean;
  nestedGridFields?: FieldSchema[];
  nestedGridData?: any[];
}

export interface GridWidgetConfig {
  virtualScrolling?: boolean;
  allowPaging?: boolean;
  pageSize?: number;
  allowSorting?: boolean;
  allowFiltering?: boolean;
  allowGrouping?: boolean;
  allowColumnChooser?: boolean;
  allowExcelExport?: boolean;
  allowPdfExport?: boolean;
  editMode?: 'Inline' | 'Dialog' | 'Batch';
  frozenColumns?: number;
  ganttWidget?: GanttWidgetConfig;
}

export interface ChartWidgetConfig {
  chartType: 'Column' | 'Line' | 'Pie' | 'Spline' | 'Area' | 'Doughnut';
  xField: string;
  yField: string;
  title?: string;
}

export interface GanttWidgetConfig {
  taskIdField: string;
  taskNameField: string;
  startDateField: string;
  endDateField: string;
  durationField?: string;
  progressField?: string;
  dependencyField?: string;
  childField?: string;
  wbsCodeField?: string;
  assigneeField?: string;
  statusField?: string;
  resourceInfoField?: string;
}

export interface KanbanWidgetConfig {
  keyField: string;
  headerField: string;
  contentField: string;
  categoryField: string;
  columns: { key: string; title: string }[];
}

export interface PdfReviewerWorkflowConfig {
  showLeftCommentsTree?: boolean;
  showRightPropertiesPanel?: boolean;
  groupBy?: 'author' | 'date' | 'status' | 'pageNumber';
  enableVisibilityCheckboxes?: boolean;
  allowedStatuses?: SelectOption[];
  propertiesFields?: FieldSchema[];
}

export interface WidgetConfig {
  id: string;
  title: string;
  type: WidgetType;
  span?: 1 | 2 | 3 | 4 | 6 | 12; // Grid column span in dashboard
  gridConfig?: GridWidgetConfig;
  chartConfig?: ChartWidgetConfig;
  ganttConfig?: GanttWidgetConfig;
  kanbanConfig?: KanbanWidgetConfig;
  pdfConfig?: PdfReviewerWorkflowConfig;
  pdfUrl?: string;
  limit?: number;
}

export interface CustomAction {
  id: string;
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  type: 'pdf-new-revision' | 'pdf-merge-signoff' | 'pdf-export-annotations' | 'custom-api';
  permissionRequired?: PermissionType;
}

export interface PdfAnnotationComment {
  id: string;
  author: string;
  authorRole: string;
  timestamp: string;
  pageNumber: number;
  comment: string;
  status: 'Issued' | 'Pending' | 'Approved' | 'Resolved';
  revisionVersion: string;
  color?: string;
}

export interface ViewConfig {
  id: string;
  name: string;
  type: ViewType;
  icon?: string;
  description?: string;
  widgets: WidgetConfig[];
  customActions?: CustomAction[];
}

export interface ModuleMetadata {
  id: string;
  name: string;
  description: string;
  icon: string;
  provider: 'mock' | 'rest' | 'mcp';
  permissions: PermissionType[];
  views: ViewConfig[];
  fields: FieldSchema[];
  formSections?: FormSectionSchema[];
  mockData?: any[];
  customActions?: CustomAction[];
}
