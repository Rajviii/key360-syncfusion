'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { recordingsMetadata, recordingsMockData } from '@/data/modules/recordings';
import { DynamicForm } from '@/components/metadata/renderers/DynamicForm';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

export default function EditRecordingClient({ params: initialParams }: { params?: { id?: string } }) {
  const router = useRouter();
  const params = useParams();
  const recordId = (params?.id || initialParams?.id) ? String(params?.id || initialParams?.id) : '';

  // Find record matching ID or code
  const initialValues = recordingsMockData.find(
    r => String(r.id) === recordId || String(r.code).toLowerCase() === recordId.toLowerCase()
  ) || recordingsMockData[0];

  const handleSave = (formData: Record<string, any>, actionType?: 'save' | 'saveAndNew' | 'saveAndClose') => {
    console.log('Updated Recording:', formData);
    // Update record in mock data store
    const existsIndex = recordingsMockData.findIndex(
      r => String(r.id) === recordId || String(r.code).toLowerCase() === recordId.toLowerCase()
    );
    if (existsIndex >= 0) {
      recordingsMockData[existsIndex] = { ...recordingsMockData[existsIndex], ...formData };
    }

    if (actionType === 'saveAndClose' || !actionType) {
      router.push('/recordings');
    }
  };

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      {/* Header Path & Return Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/recordings')}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Back to Recordings Master Register"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              Edit Recordings
              <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {initialValues?.code || recordId}
              </span>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active
              </span>
            </h2>
            <p className="text-xs text-zinc-500 font-mono">Path: India Development / 01 - OPERATIONS / 001 - CRM & Actions / Recordings / edit / {recordId}</p>
          </div>
        </div>

        {/* <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <Sparkles className="w-4 h-4" />
          <span></span>
        </div> */}
      </div>

      {/* Dynamic Metadata Form with Accordions & Pre-populated Values */}
      <DynamicForm
        fields={recordingsMetadata.fields}
        formSections={recordingsMetadata.formSections}
        initialValues={initialValues}
        permissions={recordingsMetadata.permissions}
        onSubmit={handleSave}
        onCancel={() => router.push('/recordings')}
      />
    </div>
  );
}
