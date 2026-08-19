'use client';

import React, { useState, useEffect } from 'react';
import { TextBoxComponent, NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { X, Save, CheckCircle2, Plus, ChevronUp, ChevronDown, Clock, Sparkles } from 'lucide-react';
import { DynamicGrid } from './renderers/DynamicGrid';
import { FieldSchema } from '@/types/metadata';

export interface ActivityRecord {
  id?: string;
  activity: string;
  assignmentName: string;
  deliverable: string;
  billable: boolean;
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sat: number;
  sun: number;
  weekTotal: number;
  employee?: string;
  weekEnding?: string;
  project?: string;
  taskActivity?: string;
  date?: string;
  hours?: number;
  comments?: string;
  status?: string;
}

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialActivity?: ActivityRecord | null;
  defaultEmployee?: string;
  defaultWeekEnding?: string;
  onSaveActivity: (activity: ActivityRecord, actionType: 'save' | 'saveAndClose' | 'saveAndNew') => void;
}

export const CreateActivityModal: React.FC<CreateActivityModalProps> = ({
  isOpen,
  onClose,
  initialActivity,
  defaultEmployee = 'Prajapati, Rajvi',
  defaultWeekEnding = '2026-08-23',
  onSaveActivity
}) => {
  if (!isOpen) return null;

  // Form State
  const [employee, setEmployee] = useState<string>(initialActivity?.employee || defaultEmployee || 'Prajapati, Rajvi');
  const [weekEnding, setWeekEnding] = useState<string>(initialActivity?.weekEnding || defaultWeekEnding || '2026-08-23');
  const [activity, setActivity] = useState<string>(initialActivity?.activity || initialActivity?.taskActivity || '');
  const [deliverable, setDeliverable] = useState<string>(initialActivity?.deliverable || '');
  const [billable, setBillable] = useState<boolean>(initialActivity?.billable !== undefined ? initialActivity.billable : true);
  const [assignmentName, setAssignmentName] = useState<string>(initialActivity?.assignmentName || initialActivity?.project || '');

  // Daily Hours State
  const [mon, setMon] = useState<number>(initialActivity?.mon || 0);
  const [tue, setTue] = useState<number>(initialActivity?.tue || 0);
  const [wed, setWed] = useState<number>(initialActivity?.wed || 0);
  const [thu, setThu] = useState<number>(initialActivity?.thu || 0);
  const [fri, setFri] = useState<number>(initialActivity?.fri || 0);
  const [sat, setSat] = useState<number>(initialActivity?.sat || 0);
  const [sun, setSun] = useState<number>(initialActivity?.sun || 0);

  // Status History & Attachments Lists
  const [statusHistoryList, setStatusHistoryList] = useState<any[]>([
    {
      id: 'sh-act-1',
      date: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      comment: 'Activity created and weekly hours logged.',
      nextResponsiblePerson: 'Golding, Steven'
    }
  ]);

  const [attachmentsList, setAttachmentsList] = useState<any[]>([
    {
      id: 'att-act-1',
      fileName: 'Timesheet_Activity_Breakdown.pdf',
      fileDescription: 'Supporting activity logs and resource allocation sheet',
      attachment: 'Download'
    }
  ]);

  // Accordion Expand/Collapse States (matching website executive accordions)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categorisation: false,
    timesheetDetail: true,
    activityDetail: true,
    statusHistory: true,
    attachments: true
  });

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  // Sync state when initialActivity changes
  useEffect(() => {
    if (initialActivity) {
      setEmployee(initialActivity.employee || defaultEmployee);
      setWeekEnding(initialActivity.weekEnding || defaultWeekEnding);
      setActivity(initialActivity.activity || initialActivity.taskActivity || '');
      setDeliverable(initialActivity.deliverable || '');
      setBillable(initialActivity.billable !== undefined ? initialActivity.billable : true);
      setAssignmentName(initialActivity.assignmentName || initialActivity.project || '');
      setMon(initialActivity.mon || 0);
      setTue(initialActivity.tue || 0);
      setWed(initialActivity.wed || 0);
      setThu(initialActivity.thu || 0);
      setFri(initialActivity.fri || 0);
      setSat(initialActivity.sat || 0);
      setSun(initialActivity.sun || 0);
    }
  }, [initialActivity, defaultEmployee, defaultWeekEnding]);

  // Recalculate Week Total
  const weekTotal = Number((mon + tue + wed + thu + fri + sat + sun).toFixed(2));

  // Dropdown Options matching Key360 System
  const employeeOptions = [
    { label: 'Prajapati, Rajvi', value: 'Prajapati, Rajvi' },
    { label: 'Babariya, Dhruv', value: 'Babariya, Dhruv' },
    { label: 'Golding, Steven', value: 'Golding, Steven' },
    { label: 'Meyer, Corrie', value: 'Meyer, Corrie' },
    { label: 'Jacobsz, Marthinus', value: 'Jacobsz, Marthinus' }
  ];

  const deliverableOptions = [
    { label: 'Software Architecture Design', value: 'Software Architecture Design' },
    { label: 'Backend API & Query Optimization', value: 'Backend API & Query Optimization' },
    { label: 'Quality Assurance & Testing', value: 'Quality Assurance & Testing' },
    { label: 'Client Stakeholder Demo', value: 'Client Stakeholder Demo' },
    { label: 'Database Migration & Schema Sync', value: 'Database Migration & Schema Sync' },
    { label: 'UI Metadata Engine Refactoring', value: 'UI Metadata Engine Refactoring' }
  ];

  const assignmentOptions = [
    { label: 'AI ERP Modernization', value: 'AI ERP Modernization' },
    { label: 'Syncfusion Dynamic UI POC', value: 'Syncfusion Dynamic UI POC' },
    { label: 'Cloud Migration Phase 2', value: 'Cloud Migration Phase 2' },
    { label: 'Key360 Management Platform', value: 'Key360 Management Platform' },
    { label: 'CMMS Infrastructure Suite', value: 'CMMS Infrastructure Suite' }
  ];

  const handleAddStatusEntry = () => {
    const newStatus = {
      id: `sh-act-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'In Progress',
      comment: 'Status updated from Activity detail panel',
      nextResponsiblePerson: 'Prajapati, Rajvi'
    };
    setStatusHistoryList(prev => [newStatus, ...prev]);
  };

  const handleAddAttachmentEntry = () => {
    const newAtt = {
      id: `att-act-${Date.now()}`,
      fileName: `Activity_Log_${Date.now().toString().slice(-4)}.pdf`,
      fileDescription: 'Uploaded supporting documentation',
      attachment: 'Download'
    };
    setAttachmentsList(prev => [newAtt, ...prev]);
  };

  const handleSubmit = (actionType: 'save' | 'saveAndClose' | 'saveAndNew') => {
    const record: ActivityRecord = {
      id: initialActivity?.id || `act-${Date.now()}`,
      activity: activity || 'General Timesheet Activity',
      assignmentName: assignmentName || 'Key360 Management Platform',
      deliverable: deliverable || 'Software Architecture Design',
      billable: billable,
      mon: Number(mon) || 0,
      tue: Number(tue) || 0,
      wed: Number(wed) || 0,
      thu: Number(thu) || 0,
      fri: Number(fri) || 0,
      sat: Number(sat) || 0,
      sun: Number(sun) || 0,
      weekTotal: weekTotal,
      employee: employee,
      weekEnding: weekEnding,
      // Compatibility fields for nested grid
      project: assignmentName || 'Key360 Management Platform',
      taskActivity: activity || 'General Timesheet Activity',
      date: weekEnding,
      hours: weekTotal,
      comments: activity,
      status: 'Submitted'
    };

    onSaveActivity(record, actionType);

    if (actionType === 'saveAndNew') {
      // Clear form for next entry
      setActivity('');
      setDeliverable('');
      setBillable(true);
      setAssignmentName('');
      setMon(0);
      setTue(0);
      setWed(0);
      setThu(0);
      setFri(0);
      setSat(0);
      setSun(0);
    } else if (actionType === 'saveAndClose') {
      onClose();
    }
  };

  // Field schemas for Status History grid in modal (matching user screenshot)
  const statusGridFields: FieldSchema[] = [
    { key: 'date', label: 'Date', controlType: 'date', width: 140 },
    { key: 'status', label: 'Status', controlType: 'text', width: 140 },
    { key: 'comment', label: 'Comment', controlType: 'text', width: 280 },
    { key: 'nextResponsiblePerson', label: 'Next Responsible Person', controlType: 'text', width: 200 }
  ];

  // Field schemas for Attachments grid in modal (matching user screenshot)
  const attachmentsGridFields: FieldSchema[] = [
    { key: 'fileName', label: 'File Name', controlType: 'text', width: 220 },
    { key: 'fileDescription', label: 'File Description', controlType: 'text', width: 300 },
    { key: 'attachment', label: 'Attachment', controlType: 'text', width: 140 }
  ];

  return (
    <div className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-6xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-5 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {initialActivity?.id ? 'Edit Timesheet Activities' : 'Create Timesheet Activities'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Icon Toolbar */}
        <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSubmit('save')}
            title="Save"
            className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors cursor-pointer text-emerald-700 dark:text-emerald-400 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center gap-1 text-xs font-medium"
          >
            <Save className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit('saveAndClose')}
            title="Save & Close"
            className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors cursor-pointer text-emerald-700 dark:text-emerald-400 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center gap-1 text-xs font-medium"
          >
            <Save className="w-4 h-4 text-emerald-600" />
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 -ml-1" />
            <span className="hidden sm:inline">Save & Close</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit('saveAndNew')}
            title="Save & New"
            className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors cursor-pointer text-emerald-700 dark:text-emerald-400 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center gap-1 text-xs font-medium"
          >
            <Save className="w-4 h-4 text-emerald-600" />
            {/* <Plus className="w-3.5 h-3.5 text-emerald-600 -ml-1" /> */}
            <span className="hidden sm:inline">Save & New</span>
          </button>

          <div className="ml-auto text-xs font-bold text-[#007a4d] flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <Clock className="w-3.5 h-3.5" />
            <span>Total: {weekTotal.toFixed(2)} hrs</span>
          </div>
        </div>

        {/* Scrollable Form Body with Accordions matching Executive Website Forest Green #007a4d */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Accordion 1: Categorisation */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection('categorisation')}
              className="w-full px-3.5 py-2.5 bg-[#007a4d] hover:bg-[#00623e] flex items-center justify-between text-xs font-bold text-white tracking-wide transition-colors cursor-pointer text-left select-none"
            >
              <span>Categorisation</span>
              {expandedSections.categorisation ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
            </button>
            {expandedSections.categorisation && (
              <div className="p-4 bg-white dark:bg-zinc-900 text-xs text-zinc-500">
                Categorisation details and tag classifications.
              </div>
            )}
          </div>

          {/* Accordion 2: Timesheet Detail */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection('timesheetDetail')}
              className="w-full px-3.5 py-2.5 bg-[#007a4d] hover:bg-[#00623e] flex items-center justify-between text-xs font-bold text-white tracking-wide transition-colors cursor-pointer text-left select-none"
            >
              <span>Timesheet Detail</span>
              {expandedSections.timesheetDetail ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
            </button>
            {expandedSections.timesheetDetail && (
              <div className="p-4 bg-white dark:bg-zinc-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Employee Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Employee
                  </label>
                  <DropDownListComponent
                    dataSource={employeeOptions}
                    fields={{ text: 'label', value: 'value' }}
                    value={employee}
                    placeholder="Please select an Employee"
                    change={(e: any) => setEmployee(e.value)}
                  />
                </div>

                {/* Week Ending DatePicker */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Week Ending
                  </label>
                  <DatePickerComponent
                    format="yyyy-MM-dd"
                    value={weekEnding ? new Date(weekEnding) : undefined}
                    change={(e: any) => setWeekEnding(e.value ? e.value.toISOString().split('T')[0] : '')}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Accordion 3: Activity Detail */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection('activityDetail')}
              className="w-full px-3.5 py-2.5 bg-[#007a4d] hover:bg-[#00623e] flex items-center justify-between text-xs font-bold text-white tracking-wide transition-colors cursor-pointer text-left select-none"
            >
              <span>Activity Detail</span>
              {expandedSections.activityDetail ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
            </button>
            {expandedSections.activityDetail && (
              <div className="p-4 bg-white dark:bg-zinc-900 space-y-4">
                {/* Top Row: Activity, Deliverable, Billable */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  {/* Activity Input */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Activity
                    </label>
                    <TextBoxComponent
                      multiline={true}
                      htmlAttributes={{ rows: '3' }}
                      value={activity}
                      placeholder="Enter activity description..."
                      change={(e: any) => setActivity(e.value)}
                    />
                  </div>

                  {/* Deliverable Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Deliverable
                    </label>
                    <DropDownListComponent
                      dataSource={deliverableOptions}
                      fields={{ text: 'label', value: 'value' }}
                      value={deliverable}
                      placeholder="Please select a Deliverable"
                      change={(e: any) => setDeliverable(e.value)}
                    />
                  </div>

                  {/* Billable Checkbox */}
                  <div className="pt-6">
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Billable
                    </label>
                    <CheckBoxComponent
                      label=""
                      checked={billable}
                      change={(e: any) => setBillable(e.checked)}
                      cssClass="e-primary"
                    />
                  </div>
                </div>

                {/* Middle Row: Daily Hours Inputs (Mon, Tue, Wed, Thu, Fri, Sat, Sun) */}
                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                    Daily Hours Allocation
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Mon</label>
                      <NumericTextBoxComponent
                        format="n2"
                        step={0.5}
                        value={mon}
                        change={(e: any) => setMon(Number(e.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Tue</label>
                      <NumericTextBoxComponent
                        format="n2"
                        step={0.5}
                        value={tue}
                        change={(e: any) => setTue(Number(e.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Wed</label>
                      <NumericTextBoxComponent
                        format="n2"
                        step={0.5}
                        value={wed}
                        change={(e: any) => setWed(Number(e.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Thu</label>
                      <NumericTextBoxComponent
                        format="n2"
                        step={0.5}
                        value={thu}
                        change={(e: any) => setThu(Number(e.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Fri</label>
                      <NumericTextBoxComponent
                        format="n2"
                        step={0.5}
                        value={fri}
                        change={(e: any) => setFri(Number(e.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Sat</label>
                      <NumericTextBoxComponent
                        format="n2"
                        step={0.5}
                        value={sat}
                        change={(e: any) => setSat(Number(e.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Sun</label>
                      <NumericTextBoxComponent
                        format="n2"
                        step={0.5}
                        value={sun}
                        change={(e: any) => setSun(Number(e.value) || 0)}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Assignment Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Assignment Name
                    </label>
                    <DropDownListComponent
                      dataSource={assignmentOptions}
                      fields={{ text: 'label', value: 'value' }}
                      value={assignmentName}
                      placeholder="Please select an Assignment Name"
                      change={(e: any) => setAssignmentName(e.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 4: Status History (Interactive DataGrid matching user screenshot) */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection('statusHistory')}
              className="w-full px-3.5 py-2.5 bg-[#007a4d] hover:bg-[#00623e] flex items-center justify-between text-xs font-bold text-white tracking-wide transition-colors cursor-pointer text-left select-none"
            >
              <span>Status History</span>
              {expandedSections.statusHistory ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
            </button>
            {expandedSections.statusHistory && (
              <div className="p-3 bg-white dark:bg-zinc-900">
                <DynamicGrid
                  fields={statusGridFields}
                  data={statusHistoryList}
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
                  onAddRecord={handleAddStatusEntry}
                />
              </div>
            )}
          </div>

          {/* Accordion 5: Attachments (Interactive DataGrid matching user screenshot) */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection('attachments')}
              className="w-full px-3.5 py-2.5 bg-[#007a4d] hover:bg-[#00623e] flex items-center justify-between text-xs font-bold text-white tracking-wide transition-colors cursor-pointer text-left select-none"
            >
              <span>Attachments</span>
              {expandedSections.attachments ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
            </button>
            {expandedSections.attachments && (
              <div className="p-3 bg-white dark:bg-zinc-900">
                <DynamicGrid
                  fields={attachmentsGridFields}
                  data={attachmentsList}
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
                  onAddRecord={handleAddAttachmentEntry}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
