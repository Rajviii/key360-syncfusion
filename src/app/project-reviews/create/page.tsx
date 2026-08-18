'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { projectReviewsMetadata } from '@/data/modules/projectReviews';
import { DynamicForm } from '@/components/metadata/renderers/DynamicForm';
import { ArrowLeft } from 'lucide-react';

export default function CreateProjectReviewPage() {
  const router = useRouter();

  const handleSave = (formData: Record<string, any>) => {
    console.log('Created Project Review:', formData);
    router.push('/project-reviews');
  };

  return (
    <div className="w-full space-y-5">
      {/* Top Header & Breadcrumb Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/project-reviews')}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Back to Project Reviews Listing"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              Create Project Review
              <span className="text-xs font-mono font-bold text-white bg-emerald-800 dark:bg-emerald-900 px-2.5 py-1 rounded shadow-2xs">
                New Health Audit
              </span>
            </h2>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              India Development → 01 - OPERATIONS → 001 - CRM & Actions → Project Reviews
            </p>
          </div>
        </div>

        {/* Project Health Status Badges - Standardized Key360 Solid Badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="px-3 py-1 rounded-md bg-[#007a4d] text-white font-bold shadow-2xs">
            Schedule: <span className="font-extrabold">On Track</span>
          </div>
          <div className="px-3 py-1 rounded-md bg-amber-600 text-white font-bold shadow-2xs">
            Cost: <span className="font-extrabold">At Risk</span>
          </div>
          <div className="px-3 py-1 rounded-md bg-[#007a4d] text-white font-bold shadow-2xs">
            Quality: <span className="font-extrabold">Good</span>
          </div>
          <div className="px-3 py-1 rounded-md bg-amber-700 text-white font-bold shadow-2xs">
            Overall: <span className="font-extrabold">At Risk</span>
          </div>
        </div>
      </div>

      {/* Relaxed KPI Executive Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Current Budget</p>
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">R 2.52M</p>
          <span className="text-[10px] text-zinc-500 font-medium">Var: +4.2%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Planned / Actual</p>
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">68% / 61%</p>
          <span className="text-[10px] text-zinc-500 font-medium">Var: -7%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">CPI (Cost Performance)</p>
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">0.94</p>
          <span className="text-[10px] text-zinc-400">Target: 1.0</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">SPI (Schedule Performance)</p>
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">0.90</p>
          <span className="text-[10px] text-zinc-400">Target: 1.0</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Open Risks</p>
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">6 Total</p>
          <span className="text-[10px] text-zinc-500 font-medium">1 Critical</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Technical Queries</p>
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">4 Open</p>
          <span className="text-[10px] text-zinc-400">3 Early Warnings</span>
        </div>
      </div>

      {/* Progress & Financial Visual Cards - Relaxed Neutral Surfaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Budget vs Forecast Pipeline */}
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Financial Pipeline Summary</span>
            <span className="text-xs font-mono text-zinc-500">Cur: R 2,520,000</span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700">
              <p className="text-[10px] text-zinc-500">Original</p>
              <p className="font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">R 2.40M</p>
            </div>
            <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700">
              <p className="text-[10px] text-zinc-500">Current</p>
              <p className="font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">R 2.52M</p>
            </div>
            <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700">
              <p className="text-[10px] text-zinc-500">Committed</p>
              <p className="font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">R 1.85M</p>
            </div>
            <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700">
              <p className="text-[10px] text-zinc-500">Forecast</p>
              <p className="font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">R 2.47M</p>
            </div>
          </div>
        </div>

        {/* Planned vs Actual Progress Bars */}
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Progress Tracking</span>
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Variance: -7%</span>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              <span>Planned Progress</span>
              <span>68%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <div className="h-full bg-emerald-800 rounded-full" style={{ width: '68%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              <span>Actual Progress</span>
              <span>61%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: '61%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Metadata Form with Accordions */}
      <DynamicForm
        fields={projectReviewsMetadata.fields}
        formSections={projectReviewsMetadata.formSections}
        permissions={projectReviewsMetadata.permissions}
        onSubmit={handleSave}
        onCancel={() => router.push('/project-reviews')}
      />
    </div>
  );
}
