'use client';

import React, { useState } from 'react';
import { FieldSchema, FormSectionSchema, PermissionType } from '@/types/metadata';
import { TextBoxComponent, NumericTextBoxComponent, UploaderComponent, MaskedTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DatePickerComponent, DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, MultiSelectComponent, AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, SwitchComponent, RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Filter, Group } from '@syncfusion/ej2-react-grids';
import {
  Send, CheckCircle2, Sparkles, X, RefreshCw, ShieldAlert, AlertTriangle,
  ChevronDown, ChevronUp, Save, ArrowLeft, Table, Plus, FileSpreadsheet, Download, Search, Copy
} from 'lucide-react';
import { DynamicGrid } from './DynamicGrid';

interface DynamicFormProps {
  fields: FieldSchema[];
  formSections?: FormSectionSchema[];
  initialValues?: Record<string, any>;
  permissions?: PermissionType[];
  onSubmit: (formData: Record<string, any>, actionType?: 'save' | 'saveAndNew' | 'saveAndClose') => void;
  onCancel?: () => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  formSections,
  initialValues = {},
  permissions = ['create', 'edit'],
  onSubmit,
  onCancel
}) => {
  const safeInitial = initialValues || {};
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {
      code: safeInitial.code || `000000${Math.floor(15 + Math.random() * 85)}`,
      owner: safeInitial.owner || 'Prajapati, Rajvi',
      originator: safeInitial.originator || 'Prajapati, Rajvi',
      nextResponsiblePerson: safeInitial.nextResponsiblePerson || 'Prajapati, Rajvi',
      recordingType: safeInitial.recordingType || 'Action',
      recordingProjectId: safeInitial.recordingProjectId || '001',
      recordingProjectName: safeInitial.recordingProjectName || 'Key360 Management Platform',
      company: safeInitial.company || 'Key360 Management Platform',
      status: safeInitial.status || 'Issued',
      statusHistoryList: safeInitial.statusHistoryList || [],
      attachmentsList: safeInitial.attachmentsList || [],
      ...safeInitial
    };
    return defaults;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [topNotification, setTopNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Nested Grid search terms
  const [statusSearch, setStatusSearch] = useState('');
  const [attachmentSearch, setAttachmentSearch] = useState('');

  // Accordion open/close state tracking per section
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (formSections) {
      formSections.forEach(sec => {
        initial[sec.id] = sec.defaultExpanded !== undefined ? sec.defaultExpanded : true;
      });
    }
    return initial;
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const formFields = fields.filter(f => f.showInForm !== false && f.key !== 'id');

  const handleChange = (key: string, value: any) => {
    let updated = { ...formData, [key]: value };

    // Dependent auto-fill rules
    if (key === 'recordingProjectId') {
      if (value === '001') updated.recordingProjectName = 'Key360 Management Platform';
      else if (value === '002') updated.recordingProjectName = 'CMMS Infrastructure Suite';
      else if (value === '003') updated.recordingProjectName = 'SHE & Quality Audit System';
    }

    setFormData(updated);
    if (errors[key]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validateForm = (dataToValidate: Record<string, any>): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    formFields.forEach(field => {
      const value = dataToValidate[field.key];
      const isRequired = field.validation?.required || field.key === 'name' || field.key === 'title';

      if (isRequired) {
        if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
          newErrors[field.key] = field.validation?.message || `${field.label} is required.`;
          return;
        }
      }
    });

    return newErrors;
  };

  const handleActionSubmit = (actionType: 'save' | 'saveAndNew' | 'saveAndClose') => {
    setSubmitAttempted(true);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTopNotification({
        type: 'error',
        message: 'Validation Warning: Please fill in all required fields.'
      });
      return;
    }

    onSubmit(formData, actionType);

    if (actionType === 'save') {
      setTopNotification({
        type: 'success',
        message: 'Recording saved successfully.'
      });
    } else if (actionType === 'saveAndNew') {
      setFormData({
        code: `000000${Math.floor(16 + Math.random() * 80)}`,
        owner: 'Prajapati, Rajvi',
        originator: 'Prajapati, Rajvi',
        nextResponsiblePerson: 'Prajapati, Rajvi',
        recordingType: 'Action',
        recordingProjectId: '001',
        recordingProjectName: 'Key360 Management Platform',
        company: 'Key360 Management Platform',
        status: 'Issued',
        statusHistoryList: [],
        attachmentsList: []
      });
      setTopNotification({
        type: 'info',
        message: 'Saved! Cleared form to create a new recording.'
      });
    }
  };

  const handleAddStatusEntry = () => {
    const newEntry = {
      id: `sh-${Date.now()}`,
      status: formData.status || 'Issued',
      nextResponsiblePerson: formData.nextResponsiblePerson || 'Prajapati, Rajvi',
      comment: 'Status updated from Recording detail panel',
      sendMail: true,
      sendAttachments: false,
      sendPrevAttachments: false,
      location: 'India Development',
      statusUser: 'Prajapati, Rajvi',
      statusDate: new Date().toISOString().split('T')[0]
    };

    setFormData(prev => ({
      ...prev,
      statusHistoryList: [newEntry, ...(prev.statusHistoryList || [])]
    }));
  };

  const handleAddAttachmentEntry = () => {
    const newAtt = {
      id: `att-${Date.now()}`,
      fileDescription: 'Supporting Documentation & Audit Logs',
      fileName: `recording_doc_${Date.now().toString().slice(-4)}.pdf`,
      attachment: 'Download',
      dateCreated: new Date().toISOString().split('T')[0],
      createdBy: 'Prajapati, Rajvi'
    };

    setFormData(prev => ({
      ...prev,
      attachmentsList: [newAtt, ...(prev.attachmentsList || [])]
    }));
  };

  const getFormOptionsForField = (field: FieldSchema) => {
    const list: { label: string; value: string }[] = [];
    const seen = new Set<string>();

    if (field.options && field.options.length > 0) {
      field.options.forEach(opt => {
        const label = typeof opt === 'string' ? opt : String(opt.label || opt.value || '');
        const val = typeof opt === 'string' ? opt : String(opt.value || opt.label || '');
        if (val && !seen.has(val)) {
          seen.add(val);
          list.push({ label, value: val });
        }
      });
    }

    if (formData && field.key && formData[field.key]) {
      const strVal = String(formData[field.key]);
      if (strVal && !seen.has(strVal)) {
        seen.add(strVal);
        list.push({ label: strVal, value: strVal });
      }
    }

    return list;
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 shadow-xl transition-all">
      {/* Key360 Form Top Action Bar (Matching Screenshot 2 & 3) */}
      <div className="flex flex-wrap items-center justify-between pb-2.5 border-b border-zinc-200 dark:border-zinc-800 mb-4 gap-2">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {initialValues?.code ? `Edit Recordings (${initialValues.code})` : 'Create Recordings'}
          </h3>
        </div>

        {/* Action Icon Toolbar: Save & New, Save, Save & Close, Cancel */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleActionSubmit('saveAndNew')}
            title="Save & New"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded border border-zinc-300 dark:border-zinc-700 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <Plus className="w-3 h-3 text-emerald-600 dark:text-emerald-400 -ml-1" />
            <span className="hidden sm:inline">Save & New</span>
          </button>

          <button
            type="button"
            onClick={() => handleActionSubmit('save')}
            title="Save"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded border border-zinc-300 dark:border-zinc-700 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            type="button"
            onClick={() => handleActionSubmit('saveAndClose')}
            title="Save & Close"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded border border-emerald-700 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <CheckCircle2 className="w-3 h-3 -ml-0.5" />
            <span>Save & Close</span>
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              title="Close"
              className="p-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Top Notification Banner */}
      {topNotification && (
        <div
          className={`mb-4 p-3 rounded-lg border flex items-center justify-between gap-3 text-xs font-medium ${topNotification.type === 'error'
              ? 'bg-red-50 dark:bg-red-950/80 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
              : topNotification.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
            }`}
        >
          <div className="flex items-center gap-2">
            {topNotification.type === 'error' ? (
              <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            )}
            <p className="font-semibold">{topNotification.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setTopNotification(null)}
            className="p-0.5 hover:bg-black/5 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Accordion Sections matching Key360 Sage Green Styling */}
      {formSections && formSections.length > 0 ? (
        <div className="space-y-3">
          {formSections.map(sec => {
            const isExpanded = expandedSections[sec.id] !== false;
            const sectionFields = formFields.filter(f => f.section === sec.title || f.section === sec.id);

            return (
              <div key={sec.id} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-2xs">
                {/* Rich Key360 Forest Green Executive Accordion Header Banner */}
                <button
                  type="button"
                  onClick={() => toggleSection(sec.id)}
                  className="w-full px-3.5 py-2.5 bg-[#007a4d] hover:bg-[#00623e] flex items-center justify-between transition-colors cursor-pointer text-left select-none"
                >
                  <span className="text-xs font-bold text-white tracking-wide">
                    {sec.title}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-white" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white" />
                  )}
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="p-3 bg-white dark:bg-zinc-900">
                    {sec.type === 'grid' ? (
                      /* Generic DynamicGrid for Nested Form Sections (Status History & Attachments) */
                      <div className="w-full">
                        <DynamicGrid
                          fields={
                            sec.nestedGridFields ||
                            (sec.id === 'sec-status-history'
                              ? [
                                  { key: 'status', label: 'Status', controlType: 'text', width: 120 },
                                  { key: 'nextResponsiblePerson', label: 'Next Responsible Person', controlType: 'text', width: 170 },
                                  { key: 'comment', label: 'Comment', controlType: 'text', width: 220 },
                                  { key: 'sendMail', label: 'Send Mail?', controlType: 'checkbox', width: 100 },
                                  { key: 'sendAttachments', label: 'Send Attachments?', controlType: 'checkbox', width: 140 },
                                  { key: 'sendPrevAttachments', label: 'Send Previous Status Attachm', controlType: 'checkbox', width: 200 },
                                  { key: 'location', label: 'Location', controlType: 'text', width: 140 },
                                  { key: 'statusUser', label: 'Status User', controlType: 'text', width: 140 },
                                  { key: 'statusDate', label: 'Status Date', controlType: 'date', width: 120 }
                                ]
                              : [
                                  { key: 'fileDescription', label: 'File Description', controlType: 'text', width: 200 },
                                  { key: 'fileName', label: 'File Name', controlType: 'text', width: 200 },
                                  { key: 'attachment', label: 'Attachment', controlType: 'text', width: 130 },
                                  { key: 'dateCreated', label: 'Date Created', controlType: 'date', width: 130 },
                                  { key: 'createdBy', label: 'Created By', controlType: 'text', width: 150 }
                                ])
                          }
                          data={
                            sec.id === 'sec-status-history'
                              ? formData.statusHistoryList || []
                              : formData.attachmentsList || []
                          }
                          config={{
                            pageSize: 5,
                            allowPaging: true,
                            allowSorting: true,
                            allowFiltering: true,
                            allowGrouping: true,
                            allowColumnChooser: true,
                            allowExcelExport: true,
                            allowPdfExport: true
                          }}
                          onAddRecord={sec.id === 'sec-status-history' ? handleAddStatusEntry : handleAddAttachmentEntry}
                        />
                      </div>
                    ) : (
                      /* Responsive Form Fields Layout */
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {sectionFields.map(field => {
                          const value = formData[field.key] ?? field.defaultValue ?? '';
                          const options = getFormOptionsForField(field);
                          const isRequired = field.validation?.required || field.key === 'code';
                          const fieldError = errors[field.key];
                          const hasError = Boolean(fieldError);

                          const isFullWidth = field.controlType === 'textarea' || field.key === 'description';

                          return (
                            <div
                              key={field.key}
                              className={`${isFullWidth ? 'md:col-span-2' : ''} ${hasError ? 'bg-red-50/50 p-1.5 rounded border border-red-200' : ''}`}
                            >
                              <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                {field.label} {isRequired && <span className="text-red-500 font-bold ml-0.5">*</span>}
                              </label>

                              {/* Controls */}
                              {field.controlType === 'text' && (
                                <TextBoxComponent
                                  placeholder={field.placeholder || `Enter ${field.label}...`}
                                  value={value}
                                  disabled={field.readonly}
                                  cssClass={hasError ? 'e-error' : ''}
                                  change={(e: any) => handleChange(field.key, e.value)}
                                />
                              )}

                              {field.controlType === 'textarea' && (
                                <TextBoxComponent
                                  multiline={true}
                                  htmlAttributes={{ rows: '3' }}
                                  placeholder={field.placeholder || `Enter ${field.label}...`}
                                  value={value}
                                  disabled={field.readonly}
                                  cssClass={hasError ? 'e-error' : ''}
                                  change={(e: any) => handleChange(field.key, e.value)}
                                />
                              )}

                              {field.controlType === 'checkbox' && (
                                <div className="pt-1">
                                  <CheckBoxComponent
                                    label={field.label}
                                    checked={Boolean(value)}
                                    disabled={field.readonly}
                                    change={(e: any) => handleChange(field.key, e.checked)}
                                  />
                                </div>
                              )}

                              {field.controlType === 'number' && (
                                <NumericTextBoxComponent
                                  format="n2"
                                  placeholder={field.placeholder || `Enter ${field.label}...`}
                                  value={value !== undefined && value !== null ? Number(value) : 0}
                                  disabled={field.readonly}
                                  cssClass={hasError ? 'e-error' : ''}
                                  change={(e: any) => handleChange(field.key, e.value)}
                                />
                              )}

                              {field.controlType === 'currency' && (
                                <NumericTextBoxComponent
                                  format="c2"
                                  currency="ZAR"
                                  placeholder={field.placeholder || `Enter ${field.label}...`}
                                  value={value !== undefined && value !== null ? Number(value) : 0}
                                  disabled={field.readonly}
                                  cssClass={hasError ? 'e-error' : ''}
                                  change={(e: any) => handleChange(field.key, e.value)}
                                />
                              )}

                              {field.controlType === 'select' && (
                                <DropDownListComponent
                                  dataSource={options}
                                  fields={{ text: 'label', value: 'value' }}
                                  placeholder={`Select ${field.label}...`}
                                  allowFiltering={true}
                                  value={value}
                                  disabled={field.readonly}
                                  cssClass={hasError ? 'e-error' : ''}
                                  change={(e: any) => handleChange(field.key, e.value)}
                                />
                              )}

                              {field.controlType === 'date' && (
                                <DatePickerComponent
                                  format="yyyy-MM-dd"
                                  placeholder="Select Date..."
                                  value={value ? new Date(value) : undefined}
                                  disabled={field.readonly}
                                  cssClass={hasError ? 'e-error' : ''}
                                  change={(e: any) => handleChange(field.key, e.value ? e.value.toISOString().split('T')[0] : '')}
                                />
                              )}

                              {field.controlType === 'datetime' && (
                                <DateTimePickerComponent
                                  placeholder="Select Date & Time..."
                                  value={value ? new Date(value) : undefined}
                                  disabled={field.readonly}
                                  cssClass={hasError ? 'e-error' : ''}
                                  change={(e: any) => handleChange(field.key, e.value ? e.value.toISOString() : '')}
                                />
                              )}

                              {hasError && (
                                <p className="text-[10px] text-red-600 dark:text-red-400 font-semibold mt-0.5">
                                  {fieldError}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Fallback form layout */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {formFields.map(field => (
            <div key={field.key}>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">{field.label}</label>
              <TextBoxComponent
                value={formData[field.key] || ''}
                change={(e: any) => handleChange(field.key, e.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
