'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { projectReviewsMetadata, projectReviewsMockData } from '@/data/modules/projectReviews';
import { DynamicForm } from '@/components/metadata/renderers/DynamicForm';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function EditProjectReviewClient({ params: initialParams }: { params?: { id?: string } }) {
  const router = useRouter();
  const params = useParams();
  const recordId = (params?.id || initialParams?.id) ? String(params?.id || initialParams?.id) : '';

  // Find record matching ID
  const initialValues = projectReviewsMockData.find(
    r => String(r.id) === recordId || String(r.projectReviewId).toLowerCase() === recordId.toLowerCase()
  ) || projectReviewsMockData[0];

  const handleSave = (formData: Record<string, any>) => {
    console.log('Updated Project Review:', formData);
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
              Project Review – {initialValues?.projectName}
              <span className="text-xs font-mono font-bold text-white bg-emerald-800 dark:bg-emerald-900 px-2.5 py-1 rounded shadow-2xs">
                {initialValues?.projectReviewId}
              </span>
            </h2>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              Manager: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{initialValues?.projectManager}</span> | Review Date: {initialValues?.reportDate || initialValues?.reviewDate || '2026-08-18'} | Report #: 001
            </p>
          </div>
        </div>

        {/* Project Health Status Badges - Standardized Key360 Solid Badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="px-3 py-1 rounded-md bg-[#007a4d] text-white font-bold shadow-2xs">
            Schedule: <span className="font-extrabold">{initialValues?.scheduleStatus || 'On Track'}</span>
          </div>
          <div className="px-3 py-1 rounded-md bg-amber-600 text-white font-bold shadow-2xs">
            Cost: <span className="font-extrabold">{initialValues?.costStatus || 'At Risk'}</span>
          </div>
          <div className="px-3 py-1 rounded-md bg-[#007a4d] text-white font-bold shadow-2xs">
            Quality: <span className="font-extrabold">{initialValues?.qualityStatus || 'Good'}</span>
          </div>
          <div className="px-3 py-1 rounded-md bg-amber-700 text-white font-bold shadow-2xs">
            Overall: <span className="font-extrabold">{initialValues?.overallStatus || 'At Risk'}</span>
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
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{initialValues?.plannedPercentComplete ?? initialValues?.percentCompletePlanned ?? 68}% / {initialValues?.actualPercentComplete ?? initialValues?.percentCompleteActual ?? 61}%</p>
          <span className="text-[10px] text-zinc-500 font-medium">Var: {initialValues?.scheduleVariance ?? initialValues?.progressVariance ?? -7}%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">CPI (Cost Index)</p>
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{initialValues?.totalCpi ?? 0.98}</p>
          <span className="text-[10px] text-zinc-400">Target: 1.0</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">SPI (Schedule Index)</p>
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{initialValues?.totalSpi ?? 0.94}</p>
          <span className="text-[10px] text-zinc-400">Target: 1.0</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Open Risks</p>
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{initialValues?.riskCount ?? 4} Total</p>
          <span className="text-[10px] text-zinc-500 font-medium">1 Critical</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Technical Queries</p>
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{initialValues?.tqCount ?? 2} Open</p>
          <span className="text-[10px] text-zinc-400">{initialValues?.ewCount ?? initialValues?.earlyWarningsCount ?? 3} Early Warnings</span>
        </div>
      </div>

      {/* Progress & Financial Visual Cards - Relaxed Neutral Surfaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Budget vs Forecast Pipeline */}
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Financial Pipeline Summary</span>
            <span className="text-xs font-mono text-zinc-500">Cur: R {initialValues?.currentBudget?.toLocaleString() ?? '2,520,000'}</span>
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
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Variance: {initialValues?.scheduleVariance ?? initialValues?.progressVariance ?? -7}%</span>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              <span>Planned Progress</span>
              <span>{initialValues?.plannedPercentComplete ?? initialValues?.percentCompletePlanned ?? 68}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <div className="h-full bg-emerald-800 rounded-full" style={{ width: `${initialValues?.plannedPercentComplete ?? initialValues?.percentCompletePlanned ?? 68}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              <span>Actual Progress</span>
              <span>{initialValues?.actualPercentComplete ?? initialValues?.percentCompleteActual ?? 61}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${initialValues?.actualPercentComplete ?? initialValues?.percentCompleteActual ?? 61}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Metadata Form with Accordions */}
      <DynamicForm
        fields={projectReviewsMetadata.fields}
        formSections={projectReviewsMetadata.formSections}
        initialValues={initialValues}
        permissions={projectReviewsMetadata.permissions}
        onSubmit={handleSave}
        onCancel={() => router.push('/project-reviews')}
      />
    </div>
  );
}
