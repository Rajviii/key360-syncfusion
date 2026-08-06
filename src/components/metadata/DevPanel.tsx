'use client';

import React, { useState } from 'react';
import { ModuleMetadata } from '@/types/metadata';
import { ProviderFactory } from '@/providers/ProviderFactory';
import { Terminal, Database, Activity, Code, Cpu, Eye, X, Check, Copy } from 'lucide-react';

interface DevPanelProps {
  metadata: ModuleMetadata;
}

export const DevPanel: React.FC<DevPanelProps> = ({ metadata }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [activeProvider, setActiveProvider] = useState<'mock' | 'rest' | 'mcp'>(
    ProviderFactory.getActiveProviderType()
  );
  const [copied, setCopied] = useState(false);

  const handleProviderToggle = (type: 'mock' | 'rest' | 'mcp') => {
    ProviderFactory.setActiveProviderType(type);
    setActiveProvider(type);
    window.location.reload(); // Refresh query client data
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(metadata, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Developer Telemetry Toggle Trigger Button */}
      <div className="fixed bottom-4 right-4 z-[999]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 rounded-full shadow-lg border border-zinc-700/50 cursor-pointer transition-all hover:scale-105"
        >
          <Terminal className="w-4 h-4 text-emerald-400 dark:text-emerald-600 animate-pulse" />
          Dev Panel & Telemetry
        </button>
      </div>

      {/* Dev Panel Drawer */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-[999] w-96 bg-zinc-950 text-zinc-100 rounded-2xl border border-zinc-800 shadow-2xl p-5 font-mono text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-sm text-zinc-100">Metadata Telemetry</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-zinc-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Dynamic Provider Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-zinc-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-amber-400" /> Dynamic API Provider:
            </label>
            <div className="grid grid-cols-3 gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
              {(['mock', 'rest', 'mcp'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => handleProviderToggle(p)}
                  className={`py-1 text-center font-semibold rounded text-[11px] transition-colors cursor-pointer ${
                    activeProvider === p
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {p.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Telemetry Metrics */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 block">Active Module</span>
              <span className="font-bold text-emerald-400">{metadata.name} ({metadata.id})</span>
            </div>
            <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 block">Total Fields</span>
              <span className="font-bold text-blue-400">{metadata.fields.length} schema fields</span>
            </div>
            <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 block">Virtual Scrolling</span>
              <span className="font-bold text-purple-400">Enabled (Syncfusion)</span>
            </div>
            <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 block">TanStack Query</span>
              <span className="font-bold text-amber-400">Cached (Stale: 5m)</span>
            </div>
          </div>

          {/* Inspect Metadata JSON Button */}
          <button
            onClick={() => setShowJsonModal(true)}
            className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-200 flex items-center justify-center gap-2 font-medium cursor-pointer transition-colors"
          >
            <Code className="w-3.5 h-3.5 text-blue-400" /> Inspect Module Metadata JSON
          </button>
        </div>
      )}

      {/* JSON Inspection Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm text-zinc-100 font-mono">
                  Metadata Schema ({metadata.id}.json)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy JSON'}
                </button>
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="text-zinc-400 hover:text-zinc-100 cursor-pointer p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs bg-zinc-900/50 text-emerald-300">
              <pre>{JSON.stringify(metadata, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
