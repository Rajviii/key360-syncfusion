'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { timesheetsMetadata } from '@/data/modules/timesheets';
import { DynamicForm } from '@/components/metadata/renderers/DynamicForm';
import { ArrowLeft, Clock, Sparkles, Calendar, User, CheckCircle2, FileText } from 'lucide-react';

export default function CreateTimesheetPage() {
  const router = useRouter();

  const handleSave = (formData: Record<string, any>) => {
    console.log('Created Timesheet:', formData);
    router.push('/timesheets');
  };

  return (
    <div className="w-full space-y-5">
      {/* Top Path Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/timesheets')}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Back to Timesheets Log"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#007a4d] text-white">
                NEW
              </span>
              <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Log New Timesheet Entry
              </h1>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Record weekly resource allocation, billable hours, and task status history
            </p>
          </div>
        </div>

        {/* <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#007a4d]">
          <Sparkles className="w-4 h-4" />
          <span>Syncfusion Metadata Form</span>
        </div> */}
      </div>

      {/* Quick Info Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#007a4d] text-white flex items-center justify-center font-bold shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Employee</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Rajvi Prajapati</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#007a4d] text-white flex items-center justify-center font-bold shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Week Ending</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">2026-08-21</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#007a4d] text-white flex items-center justify-center font-bold shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Total Hours</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">40.0 hrs</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#007a4d] text-white flex items-center justify-center font-bold shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Status</p>
            <p className="text-sm font-bold text-[#007a4d]">Draft</p>
          </div>
        </div>
      </div>

      {/* Dynamic Metadata Form with Accordions (Categorisation, Timesheet Detail, Activities, Status History) */}
      <DynamicForm
        fields={timesheetsMetadata.fields}
        formSections={timesheetsMetadata.formSections}
        permissions={timesheetsMetadata.permissions}
        onSubmit={handleSave}
        onCancel={() => router.push('/timesheets')}
      />
    </div>
  );
}
