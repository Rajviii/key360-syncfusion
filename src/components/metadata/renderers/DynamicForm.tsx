'use client';

import React, { useState } from 'react';
import { FieldSchema, PermissionType } from '@/types/metadata';
import { TextBoxComponent, NumericTextBoxComponent, UploaderComponent, MaskedTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DatePickerComponent, DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, MultiSelectComponent, AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, SwitchComponent, RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

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
  const [submitted, setSubmitted] = useState(false);

  const formFields = fields.filter(f => f.showInForm !== false && f.key !== 'id');

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Metadata Dynamic Form</h3>
          <p className="text-xs text-zinc-500">Form controls automatically rendered based on field schemas</p>
        </div>
        {submitted && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" /> Form submitted successfully!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map(field => {
          const value = formData[field.key] ?? field.defaultValue ?? '';

          return (
            <div key={field.key} className={field.controlType === 'textarea' || field.controlType === 'fileupload' ? 'md:col-span-2' : ''}>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                {field.label} {field.validation?.required && <span className="text-red-500">*</span>}
              </label>

              {/* Control Renderer Mapping */}
              {field.controlType === 'text' && (
                <TextBoxComponent
                  placeholder={field.placeholder || `Enter ${field.label}...`}
                  value={value}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'textarea' && (
                <TextBoxComponent
                  multiline={true}
                  placeholder={field.placeholder || `Enter ${field.label}...`}
                  value={value}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {(field.controlType === 'number' || field.controlType === 'currency') && (
                <NumericTextBoxComponent
                  format={field.controlType === 'currency' ? 'c2' : 'n0'}
                  placeholder={field.placeholder || `Enter ${field.label}...`}
                  value={value !== '' ? Number(value) : undefined}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'maskedinput' && (
                <MaskedTextBoxComponent
                  mask="000-000-0000"
                  value={value}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'email' && (
                <TextBoxComponent
                  placeholder="user@example.com"
                  value={value}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'phone' && (
                <TextBoxComponent
                  placeholder="+1 (555) 000-0000"
                  value={value}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'select' && (
                <DropDownListComponent
                  dataSource={(field.options ?? []) as any[]}
                  fields={{ text: 'label', value: 'value' }}
                  placeholder={`Select ${field.label}...`}
                  allowFiltering={true}
                  value={value}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'multiselect' && (
                <MultiSelectComponent
                  dataSource={(field.options ?? []) as any[]}
                  fields={{ text: 'label', value: 'value' }}
                  placeholder={`Select ${field.label}...`}
                  mode="Box"
                  value={Array.isArray(value) ? value : []}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'autocomplete' && (
                <AutoCompleteComponent
                  dataSource={(field.options ?? []) as any[]}
                  fields={{ value: 'label' }}
                  placeholder={`Type to search ${field.label}...`}
                  value={value}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'date' && (
                <DatePickerComponent
                  format="yyyy-MM-dd"
                  placeholder="Select Date..."
                  value={value ? new Date(value) : undefined}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'datetime' && (
                <DateTimePickerComponent
                  placeholder="Select Date & Time..."
                  value={value ? new Date(value) : undefined}
                  change={(e: any) => handleChange(field.key, e.value)}
                />
              )}

              {field.controlType === 'switch' && (
                <div className="pt-2">
                  <SwitchComponent
                    checked={Boolean(value)}
                    change={(e: any) => handleChange(field.key, e.checked)}
                  />
                  <span className="ml-3 text-xs text-zinc-600 dark:text-zinc-400">
                    {value ? 'Active / Enabled' : 'Disabled'}
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
                  dataSource={(Array.isArray(value) ? value : ['React', 'Syncfusion', 'TypeScript', 'Node.js', '.NET Core']).map(v => ({ label: v, value: v }))}
                  fields={{ text: 'label', value: 'value' }}
                  placeholder="Add skill tags..."
                  allowCustomValue={true}
                  mode="Delimiter"
                  value={Array.isArray(value) ? value : []}
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
                      className={`w-7 h-7 text-sm rounded ${(value || 0) >= star * 20
                        ? 'bg-amber-400 text-zinc-950 font-bold'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                        }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs text-zinc-500 ml-2">{value || 0}% rating</span>
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
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
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
          className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" /> Save Record
        </button>
      </div>
    </form>
  );
};
