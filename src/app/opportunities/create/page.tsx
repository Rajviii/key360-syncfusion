'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { opportunitiesMetadata } from '@/data/modules/opportunities';
import { DynamicForm } from '@/components/metadata/renderers/DynamicForm';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function CreateOpportunityPage() {
  const router = useRouter();

  const handleSave = (formData: Record<string, any>) => {
    console.log('Created Opportunity:', formData);
    router.push('/opportunities');
  };

  return (
    <div className="w-full space-y-4">
      {/* Header Path & Return Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/opportunities')}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Back to Opportunities Grid"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              Create Opportunity
              <span className="text-xs font-mono font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/50">
                New Record
              </span>
            </h2>
            <p className="text-xs text-zinc-500">Path: Opportunities / create</p>
          </div>
        </div>

        {/* <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <Sparkles className="w-4 h-4" />
          <span></span>
        </div> */}
      </div>

      {/* Dynamic Metadata Form with Accordions */}
      <DynamicForm
        fields={opportunitiesMetadata.fields}
        formSections={opportunitiesMetadata.formSections}
        permissions={opportunitiesMetadata.permissions}
        onSubmit={handleSave}
        onCancel={() => router.push('/opportunities')}
      />
    </div>
  );
}
