'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { recordingsMetadata, recordingsMockData } from '@/data/modules/recordings';
import { DynamicForm } from '@/components/metadata/renderers/DynamicForm';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function CreateRecordingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const copyFromId = searchParams.get('copyFrom');

  let initialValues: any = null;
  if (copyFromId) {
    const sourceRecord = recordingsMockData.find(
      r => String(r.id) === copyFromId || String(r.code).toLowerCase() === copyFromId.toLowerCase()
    );
    if (sourceRecord) {
      initialValues = {
        ...sourceRecord,
        id: `000000${Math.floor(15 + Math.random() * 85)}`,
        code: `000000${Math.floor(15 + Math.random() * 85)}`,
        description: `Copy of ${sourceRecord.description || sourceRecord.code}`
      };
    }
  }

  const handleSave = (formData: Record<string, any>, actionType?: 'save' | 'saveAndNew' | 'saveAndClose') => {
    console.log('Saved Recording:', formData);
    // Push new record into mock data store if needed
    const existsIndex = recordingsMockData.findIndex(r => r.code === formData.code || r.id === formData.id);
    if (existsIndex >= 0) {
      recordingsMockData[existsIndex] = { ...recordingsMockData[existsIndex], ...formData };
    } else {
      recordingsMockData.unshift(formData as any);
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
              Create Recordings
              <span className="text-xs font-mono font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/50">
                New Record
              </span>
            </h2>
            <p className="text-xs text-zinc-500 font-mono">Path: India Development / 01 - OPERATIONS / 001 - CRM & Actions / Recordings / create</p>
          </div>
        </div>

        {/* <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <Sparkles className="w-4 h-4" />
          <span></span>
        </div> */}
      </div>

      {/* Dynamic Metadata Form with Accordions */}
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
