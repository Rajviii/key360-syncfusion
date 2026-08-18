'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { timesheetsMetadata, timesheetsMockData } from '@/data/modules/timesheets';
import { DynamicForm } from '@/components/metadata/renderers/DynamicForm';
import { ArrowLeft, User, Calendar, Clock, CheckCircle2, Sparkles } from 'lucide-react';

export default function EditTimesheetClient({ params: initialParams }: { params?: { id?: string } }) {
  const router = useRouter();
  const params = useParams();
  const recordId = (params?.id || initialParams?.id) ? String(params?.id || initialParams?.id) : '';

  // Find record matching ID
  const initialValues: Record<string, any> = (timesheetsMockData.find(
    r => String(r.id) === recordId
  ) || timesheetsMockData[0]) as Record<string, any>;

  const handleSave = (formData: Record<string, any>) => {
    console.log('Updated Timesheet:', formData);
    router.push('/timesheets');
  };

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      {/* Header Path & Return Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/timesheets')}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Back to Timesheets Listing"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              Edit My Timesheets
              <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                #{initialValues?.id}
              </span>
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              India Development → 01 - OPERATIONS → 001 - CRM & Actions → My Timesheets
            </p>
          </div>
        </div>

        {/* <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <Sparkles className="w-4 h-4" />
          <span>Metadata Engine</span>
        </div> */}
      </div>

      {/* Summary Banner Cards - Executive Gray-Black-White & Key360 Green Palette */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">Employee</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{initialValues?.employee}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">Week Ending</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{initialValues?.weekEnding}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">Total Weekly Hours</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{initialValues?.totalHours}h <span className="text-xs font-normal text-emerald-800 dark:text-emerald-300">(32h Billable)</span></p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">Current Status</p>
            <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-800 text-white">
              {initialValues?.currentStatus || 'Submitted'}
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Metadata Form with Accordions */}
      <DynamicForm
        fields={timesheetsMetadata.fields}
        formSections={timesheetsMetadata.formSections}
        initialValues={initialValues}
        permissions={timesheetsMetadata.permissions}
        onSubmit={handleSave}
        onCancel={() => router.push('/timesheets')}
      />
    </div>
  );
}
