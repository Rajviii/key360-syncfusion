'use client';

import React, { useState } from 'react';
import { ModuleMetadata } from '@/types/metadata';
import { projectsMetadata } from '@/data/modules/projects';
import { ViewSwitcher } from '@/components/metadata/ViewSwitcher';
import { ProviderFactory } from '@/providers/ProviderFactory';
import { Code2, Play, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

export const SchemaPlayground: React.FC = () => {
  const [jsonText, setJsonText] = useState<string>(JSON.stringify(projectsMetadata, null, 2));
  const [metadata, setMetadata] = useState<ModuleMetadata>(projectsMetadata);
  const [parseError, setParseError] = useState<string | null>(null);

  const handleApplyMetadata = () => {
    try {
      const parsed = JSON.parse(jsonText) as ModuleMetadata;
      if (!parsed.id || !parsed.views || !parsed.fields) {
        throw new Error('Schema must contain "id", "views", and "fields" arrays.');
      }
      if (parsed.mockData) {
        ProviderFactory.setMockData(parsed.id, parsed.mockData);
      }
      setMetadata(parsed);
      setParseError(null);
    } catch (err: any) {
      setParseError(err.message || 'Invalid JSON Metadata format');
    }
  };

  const handleReset = () => {
    setJsonText(JSON.stringify(projectsMetadata, null, 2));
    setMetadata(projectsMetadata);
    setParseError(null);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-500" />
            Live Schema Playground
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Modify JSON metadata below to instantly transform fields, controls, views, and layout in real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Schema
          </button>
          <button
            onClick={handleApplyMetadata}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" /> Render Live UI
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive JSON Editor */}
        <div className="lg:col-span-5 bg-zinc-950 rounded-xl border border-zinc-800 p-4 font-mono text-xs shadow-md flex flex-col h-[650px]">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
            <span className="text-zinc-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> JSON Metadata Input
            </span>
            <span className="text-[10px] text-zinc-500">Live Editor</span>
          </div>

          {parseError && (
            <div className="mb-3 p-2.5 bg-red-950/80 border border-red-800 text-red-300 text-[11px] rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              {parseError}
            </div>
          )}

          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full flex-1 bg-transparent text-emerald-400 border-0 outline-none resize-none font-mono text-xs leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Live UI Output */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <ViewSwitcher metadata={metadata} />
          </div>
        </div>
      </div>
    </div>
  );
};
