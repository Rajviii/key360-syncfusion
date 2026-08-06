'use client';

import React, { useState } from 'react';
import { FieldSchema, PermissionType } from '@/types/metadata';
import { TextBoxComponent, NumericTextBoxComponent, UploaderComponent, MaskedTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DatePickerComponent, DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, MultiSelectComponent, AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, SwitchComponent, RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { Send, CheckCircle2, Sparkles, X, RefreshCw, ShieldAlert, AlertTriangle } from 'lucide-react';

interface DynamicFormProps {
  fields: FieldSchema[];
  initialValues?: Record<string, any>;
  permissions?: PermissionType[];
  onSubmit: (formData: Record<string, any>) => void;
  onCancel?: () => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  initialValues = {},
  permissions = ['create', 'edit'],
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [topNotification, setTopNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const formFields = fields.filter(f => f.showInForm !== false && f.key !== 'id');

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
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

      // 1. Required field check
      if (isRequired) {
        if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
          newErrors[field.key] = field.validation?.message || `${field.label} is required and cannot be empty.`;
          return;
        }
      }

      // If value is provided, validate pattern & bounds
      if (value !== undefined && value !== null && value !== '') {
        // Email validation
        if (field.controlType === 'email' || field.key.toLowerCase().includes('email')) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(String(value))) {
            newErrors[field.key] = 'Please enter a valid email address (e.g. name@enterprise.com).';
          }
        }

        // Phone / Masked input validation
        if (field.controlType === 'phone' || field.controlType === 'maskedinput') {
          const cleanPhone = String(value).replace(/\D/g, '');
          if (cleanPhone.length > 0 && cleanPhone.length < 7) {
            newErrors[field.key] = 'Please enter a valid phone number (min 7 digits).';
          }
        }

        // Min length check
        if (field.validation?.minLength && String(value).length < field.validation.minLength) {
          newErrors[field.key] = `${field.label} must be at least ${field.validation.minLength} characters.`;
        }

        // Numeric range check
        if ((field.controlType === 'number' || field.controlType === 'currency') && typeof value === 'number') {
          if (field.validation?.min !== undefined && value < field.validation.min) {
            newErrors[field.key] = `${field.label} cannot be less than $${field.validation.min}.`;
          }
          if (field.validation?.max !== undefined && value > field.validation.max) {
            newErrors[field.key] = `${field.label} cannot exceed $${field.validation.max}.`;
          }
        }
      }
    });

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTopNotification({
        type: 'error',
        message: `Validation Failed: ${Object.keys(validationErrors).length} required field(s) must be completed before saving.`
      });
      return; // STRICT PREVENTION: Form will not submit if validation fails
    }

    // Clean submission
    setErrors({});
    onSubmit(formData);
    setTopNotification({
      type: 'success',
      message: '✓ Record Saved Successfully! All metadata validation rules passed and project details were saved.'
    });

    setTimeout(() => {
      setTopNotification(null);
    }, 4500);
  };

  // Demo Helper: Auto-fill form with sample enterprise data
  const handleAutoFillDemo = () => {
    const sampleData: Record<string, any> = {};

    formFields.forEach(field => {
      const options = getFormOptionsForField(field);
      const firstOptVal = options.length > 0 ? options[0].value : undefined;

      switch (field.controlType) {
        case 'text':
          if (field.key.toLowerCase().includes('name') || field.key === 'title') {
            sampleData[field.key] = 'Enterprise Microservices Modernization';
          } else {
            sampleData[field.key] = 'Operational Core';
          }
          break;
        case 'textarea':
          sampleData[field.key] = 'Detailed project scope including timesheet audit logging, employee billable rates, and milestone deliverables.';
          break;
        case 'email':
          sampleData[field.key] = 'rajvi.prajapati@key360.com';
          break;
        case 'phone':
        case 'maskedinput':
          sampleData[field.key] = '555-456-7890';
          break;
        case 'number':
        case 'currency':
          if (field.key === 'hourlyRate') sampleData[field.key] = 150;
          else if (field.key === 'budget') sampleData[field.key] = 180000;
          else if (field.key === 'estimatedHours') sampleData[field.key] = 1200;
          else if (field.key === 'loggedHours') sampleData[field.key] = 850;
          else sampleData[field.key] = 90;
          break;
        case 'select':
        case 'radio':
          sampleData[field.key] = firstOptVal || 'In Progress';
          break;
        case 'multiselect':
        case 'autocomplete':
          sampleData[field.key] = 'Rajvi Prajapati (Lead Architecture)';
          break;
        case 'date':
        case 'datetime':
          sampleData[field.key] = new Date().toISOString().split('T')[0];
          break;
        case 'switch':
        case 'checkbox':
          sampleData[field.key] = true;
          break;
        case 'rating':
          sampleData[field.key] = 80;
          break;
        case 'tags':
          sampleData[field.key] = ['Next.js', 'Syncfusion', 'TypeScript', 'TailwindCSS'];
          break;
        default:
          sampleData[field.key] = 'Demo Value';
      }
    });

    setFormData(sampleData);
    setErrors({});
    setSubmitAttempted(false);
    setTopNotification({
      type: 'info',
      message: '✨ Demo data loaded across all project & timesheet fields. Click Save Record to submit.'
    });
  };

  const handleClearForm = () => {
    setFormData({});
    setErrors({});
    setSubmitAttempted(false);
    setTopNotification(null);
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

    if (initialValues && field.key && initialValues[field.key]) {
      const strVal = String(initialValues[field.key]);
      if (strVal && !seen.has(strVal)) {
        seen.add(strVal);
        list.push({ label: strVal, value: strVal });
      }
    }

    return list;
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-md transition-all">
      {/* Top Header & Demo Tools */}
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Metadata Dynamic Form</h3>
            {/* <span className="text-[10px] font-semibold px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">
              Dynamic Validation Active
            </span> */}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Auto-generated form controls with schema validation, employee & timesheet links
          </p>
        </div>

        {/* Demo Fast Fill & Clear Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/80 rounded-lg border border-purple-200 dark:border-purple-800/80 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" /> Auto-Fill Demo Data
          </button>
          <button
            type="button"
            onClick={handleClearForm}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      {/* Top Notification Banner (Error Failure vs Success) */}
      {topNotification && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-medium animate-in fade-in zoom-in-95 duration-200 ${topNotification.type === 'error'
              ? 'bg-red-50 dark:bg-red-950/80 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
              : topNotification.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-blue-50 dark:bg-blue-950/80 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
            }`}
        >
          <div className="flex items-center gap-2.5">
            {topNotification.type === 'error' ? (
              <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
            ) : topNotification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            )}
            <div>
              <p className="font-bold">{topNotification.message}</p>
              {topNotification.type === 'error' && (
                <p className="text-[11px] opacity-90 mt-0.5">
                  Submission was blocked to ensure data integrity. Please review the highlighted red fields.
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTopNotification(null)}
            className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map(field => {
          const value = formData[field.key] ?? field.defaultValue ?? '';
          const options = getFormOptionsForField(field);
          const isRequired = field.validation?.required || field.key === 'name' || field.key === 'title';
          const fieldError = errors[field.key];
          const hasError = Boolean(fieldError);

          return (
            <div
              key={field.key}
              className={`p-3 rounded-xl transition-all ${field.controlType === 'textarea' || field.controlType === 'fileupload' ? 'md:col-span-2' : ''
                } ${hasError ? 'bg-red-50/40 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50' : ''}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  {field.label} {isRequired && <span className="text-red-500 font-bold ml-0.5">*</span>}
                </label>
                {field.validation?.minLength && (
                  <span className="text-[10px] text-zinc-400">Min {field.validation.minLength} chars</span>
                )}
              </div>

              {/* Control Renderer Mapping */}
              {field.controlType === 'text' && (
                <TextBoxComponent
                  placeholder={field.placeholder || `Enter ${field.label}...`}
                  value={value}
                  cssClass={hasError ? 'e-error' : ''}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'textarea' && (
                <div>
                  <TextBoxComponent
                    multiline={true}
                    placeholder={field.placeholder || `Enter detailed ${field.label}...`}
                    value={value}
                    cssClass={hasError ? 'e-error' : ''}
                    change={(e: any) => handleChange(field.key, e.value)}
                  />
                  <div className="flex justify-end mt-1 text-[10px] text-zinc-400">
                    {String(value).length} characters
                  </div>
                </div>
              )}

              {(field.controlType === 'number' || field.controlType === 'currency') && (
                <NumericTextBoxComponent
                  format={field.controlType === 'currency' ? 'c2' : 'n0'}
                  placeholder={field.placeholder || `Enter ${field.label}...`}
                  value={value !== '' ? Number(value) : undefined}
                  cssClass={hasError ? 'e-error' : ''}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'maskedinput' && (
                <MaskedTextBoxComponent
                  mask="000-000-0000"
                  placeholder="000-000-0000"
                  value={value}
                  cssClass={hasError ? 'e-error' : ''}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'email' && (
                <TextBoxComponent
                  placeholder="user@enterprise.com"
                  value={value}
                  cssClass={hasError ? 'e-error' : ''}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'phone' && (
                <TextBoxComponent
                  placeholder="+1 (555) 000-0000"
                  value={value}
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
                  cssClass={hasError ? 'e-error' : ''}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'radio' && (
                <div className="flex flex-wrap gap-4 pt-2">
                  {options.map((opt) => (
                    <RadioButtonComponent
                      key={opt.value}
                      label={opt.label}
                      name={field.key}
                      value={opt.value}
                      checked={String(value) === String(opt.value)}
                      change={() => handleChange(field.key, opt.value)}
                    />
                  ))}
                </div>
              )}

              {field.controlType === 'multiselect' && (
                <MultiSelectComponent
                  dataSource={options}
                  fields={{ text: 'label', value: 'value' }}
                  placeholder={`Select ${field.label}...`}
                  mode="Box"
                  value={Array.isArray(value) ? value : []}
                  cssClass={hasError ? 'e-error' : ''}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'autocomplete' && (
                <AutoCompleteComponent
                  dataSource={options}
                  fields={{ value: 'label' }}
                  placeholder={`Type to search ${field.label}...`}
                  value={value}
                  cssClass={hasError ? 'e-error' : ''}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'date' && (
                <DatePickerComponent
                  format="yyyy-MM-dd"
                  placeholder="Select Date..."
                  value={value ? new Date(value) : undefined}
                  cssClass={hasError ? 'e-error' : ''}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'datetime' && (
                <DateTimePickerComponent
                  placeholder="Select Date & Time..."
                  value={value ? new Date(value) : undefined}
                  cssClass={hasError ? 'e-error' : ''}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'switch' && (
                <div className="pt-2 flex items-center">
                  <SwitchComponent
                    checked={Boolean(value)}
                    change={(e: any) => handleChange(field.key, e.checked)}
                  />
                  <span className="ml-3 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {value ? 'Active / Allowed' : 'Disabled'}
                  </span>
                </div>
              )}

              {field.controlType === 'checkbox' && (
                <div className="pt-2">
                  <CheckBoxComponent
                    label={field.label}
                    checked={Boolean(value)}
                    change={(e: any) => handleChange(field.key, e.checked)}
                  />
                </div>
              )}

              {field.controlType === 'tags' && (
                <MultiSelectComponent
                  dataSource={(Array.isArray(value) ? value : ['Next.js', 'Syncfusion', 'TypeScript', 'TailwindCSS', 'Node.js', '.NET Core']).map(v => ({ label: v, value: v }))}
                  fields={{ text: 'label', value: 'value' }}
                  placeholder="Add skill tags..."
                  allowCustomValue={true}
                  mode="Delimiter"
                  value={Array.isArray(value) ? value : []}
                  cssClass={hasError ? 'e-error' : ''}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'rating' && (
                <div className="flex items-center gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleChange(field.key, star * 20)}
                      className={`w-7 h-7 text-sm rounded transition-transform hover:scale-110 cursor-pointer ${(value || 0) >= star * 20
                          ? 'bg-amber-400 text-zinc-950 font-bold shadow-xs'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                        }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs text-zinc-500 font-medium ml-2">{value || 0}% rating</span>
                </div>
              )}

              {field.controlType === 'fileupload' && (
                <div className="mt-1">
                  <UploaderComponent
                    autoUpload={false}
                    multiple={false}
                    asyncSettings={{
                      saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/uploader/save',
                      removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/uploader/remove'
                    }}
                  />
                </div>
              )}

              {/* Inline Validation Error Message */}
              {hasError && (
                <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold mt-1.5 flex items-center gap-1 animate-in fade-in duration-150">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  {fieldError}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Form Action Controls */}
      <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <span className="text-xs text-zinc-400 font-mono">
          * Indicates required field validation rule
        </span>

        <div className="flex items-center gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" /> Save Record
          </button>
        </div>
      </div>
    </form>
  );
};
