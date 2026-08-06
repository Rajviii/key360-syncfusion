'use client';

import React, { useState } from 'react';
import {
  PdfViewerComponent,
  Toolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  TextSearch,
  Annotation,
  FormFields,
  FormDesigner,
  PageOrganizer,
  Inject
} from '@syncfusion/ej2-react-pdfviewer';
import { CustomAction, PdfAnnotationComment } from '@/types/metadata';
import {
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  Edit3,
  MessageSquare,
  PenTool,
  Layers,
  Sparkles,
  UserCheck,
  Plus,
  Send,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  FileCheck2,
  X,
  Share2
} from 'lucide-react';

interface DynamicPdfViewerProps {
  pdfUrl?: string;
  title?: string;
  customActions?: CustomAction[];
}

export const DynamicPdfViewer: React.FC<DynamicPdfViewerProps> = ({
  pdfUrl = '/sample.pdf',
  title = 'SSG Structural Engineering & Compliance Plan (Rev B)',
  customActions = []
}) => {
  const [useNativeViewer, setUseNativeViewer] = useState(false);
  const [activeTab, setActiveTab] = useState<'viewer' | 'comments'>('comments');
  const [selectedReviewerFilter, setSelectedReviewerFilter] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');

  // Modal Action States
  const [activeModal, setActiveModal] = useState<'revision' | 'signoff' | 'export' | null>(null);
  const [isSignedOff, setIsSignedOff] = useState(false);

  // New Comment Form State
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('Steven Golding');
  const [newCommentRole, setNewCommentRole] = useState('SSG Stakeholder');
  const [newCommentStatus, setNewCommentStatus] = useState<'Issued' | 'Pending' | 'Approved' | 'Resolved'>('Issued');

  // Initial Multi-User Redline & Comment Audit Log (Steven Golding & Corrie stakeholder requirement)
  const [comments, setComments] = useState<PdfAnnotationComment[]>([
    {
      id: 'cmt-101',
      author: 'Steven Golding',
      authorRole: 'SSG Stakeholder',
      timestamp: '2026-08-04 14:15',
      pageNumber: 1,
      comment: 'Please verify structural load calculation on section B-2 before final sign-off. Ensure safety margin is >= 1.5.',
      status: 'Issued',
      revisionVersion: 'Rev B',
      color: '#ef4444'
    },
    {
      id: 'cmt-102',
      author: 'Corrie',
      authorRole: 'Lead Architect',
      timestamp: '2026-08-04 14:45',
      pageNumber: 1,
      comment: 'PDF4Net legacy annotation layers mapped successfully to Syncfusion React PDF Viewer engine. Checked and verified.',
      status: 'Approved',
      revisionVersion: 'Rev B',
      color: '#10b981'
    },
    {
      id: 'cmt-103',
      author: 'Rajvi Prajapati',
      authorRole: 'Lead UI/UX Architect',
      timestamp: '2026-08-04 15:20',
      pageNumber: 1,
      comment: 'Dynamic server-driven custom action buttons integrated with metadata schema. Ready for stakeholder review.',
      status: 'Resolved',
      revisionVersion: 'Rev B',
      color: '#3b82f6'
    },
    {
      id: 'cmt-104',
      author: 'Steven Golding',
      authorRole: 'SSG Stakeholder',
      timestamp: '2026-08-04 16:00',
      pageNumber: 1,
      comment: 'E-signature placeholder positioned on Page 1 footer. Ready for final annotation merging & sign-off.',
      status: 'Pending',
      revisionVersion: 'Rev B',
      color: '#f59e0b'
    }
  ]);

  const getAbsolutePdfUrl = (url?: string) => {
    const target = (url && !url.includes('cdn.syncfusion.com')) ? url : '/sample.pdf';
    if (typeof window !== 'undefined' && target.startsWith('/')) {
      return `${window.location.origin}${target}`;
    }
    return target;
  };

  const resolvedUrl = getAbsolutePdfUrl(pdfUrl);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newCmt: PdfAnnotationComment = {
      id: `cmt-${Date.now()}`,
      author: newCommentAuthor,
      authorRole: newCommentRole,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      pageNumber: 1,
      comment: newCommentText.trim(),
      status: newCommentStatus,
      revisionVersion: 'Rev B',
      color: newCommentAuthor.includes('Golding') ? '#ef4444' : '#3b82f6'
    };

    setComments(prev => [newCmt, ...prev]);
    setNewCommentText('');
  };

  const handleStatusChange = (id: string, newStatus: 'Issued' | 'Pending' | 'Approved' | 'Resolved') => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const filteredComments = comments.filter(c => {
    const matchesAuthor = selectedReviewerFilter === 'All' || c.author === selectedReviewerFilter;
    const matchesStatus = selectedStatusFilter === 'All' || c.status === selectedStatusFilter;
    return matchesAuthor && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Issued':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 rounded-md border border-red-200 dark:border-red-800"><AlertCircle className="w-3 h-3" /> Issued</span>;
      case 'Pending':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-md border border-amber-200 dark:border-amber-800"><Clock className="w-3 h-3" /> Pending</span>;
      case 'Approved':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-md border border-emerald-200 dark:border-emerald-800"><CheckCircle className="w-3 h-3" /> Approved</span>;
      case 'Resolved':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-md border border-blue-200 dark:border-blue-800"><CheckCircle2 className="w-3 h-3" /> Resolved</span>;
      default:
        return null;
    }
  };

  const getActionButtonStyle = (variant?: string) => {
    switch (variant) {
      case 'success':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs';
      case 'secondary':
        return 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700';
      case 'warning':
        return 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white shadow-xs';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs';
    }
  };

  const handleCustomActionClick = (action: CustomAction) => {
    if (action.type === 'pdf-new-revision') {
      setActiveModal('revision');
    } else if (action.type === 'pdf-merge-signoff') {
      setActiveModal('signoff');
    } else if (action.type === 'pdf-export-annotations') {
      setActiveModal('export');
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-xs space-y-4">
      {/* Document Header & Server-Driven Custom Actions Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-50 dark:bg-red-950/80 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{title}</h4>
              {isSignedOff ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-md border border-emerald-300 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Sign-Off Completed & Revision Saved
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-md border border-amber-300 dark:border-amber-800">
                  <Clock className="w-3.5 h-3.5" /> Multi-User Review Active (Rev B)
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Priority Stakeholder: <span className="font-semibold text-zinc-700 dark:text-zinc-300">Steven Golding</span> • PDF4Net Migration Layer • Syncfusion Redlining Workbench
            </p>
          </div>
        </div>

        {/* Server-Driven Custom Action Buttons (Metadata Engine) */}
        <div className="flex items-center gap-2 flex-wrap">
          {customActions && customActions.length > 0 ? (
            customActions.map(action => (
              <button
                key={action.id}
                onClick={() => handleCustomActionClick(action)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${getActionButtonStyle(action.variant)}`}
              >
                {action.type === 'pdf-new-revision' && <Plus className="w-3.5 h-3.5" />}
                {action.type === 'pdf-merge-signoff' && <FileCheck2 className="w-3.5 h-3.5" />}
                {action.type === 'pdf-export-annotations' && <Share2 className="w-3.5 h-3.5" />}
                {action.label}
              </button>
            ))
          ) : (
            <>
              <button
                onClick={() => setActiveModal('revision')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> New document revision with annotation file
              </button>
              <button
                onClick={() => setActiveModal('signoff')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5" /> Merge Annotations & Sign-Off
              </button>
            </>
          )}

          <a
            href={resolvedUrl}
            download="document.pdf"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Download
          </a>
        </div>
      </div>

      {/* Main Redlining & PDF Viewer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Side: Syncfusion PDF Redlining Workbench */}
        <div className="lg:col-span-8 flex flex-col h-[720px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
          <div className="flex items-center justify-between px-3 py-2 bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-700 text-xs">
            <div className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Syncfusion PDF Workbench</span>
              <span className="text-[11px] text-zinc-500">(Comments, Shapes, Highlighters, Ink & Signatures)</span>
            </div>
            <button
              onClick={() => setUseNativeViewer(!useNativeViewer)}
              className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              {useNativeViewer ? 'Switch to Syncfusion PDF Suite' : 'Embedded Object Mode'}
            </button>
          </div>

          {!useNativeViewer ? (
            <div className="w-full flex-1 h-full">
              <PdfViewerComponent
                id="syncfusion_pdf_viewer"
                documentPath={resolvedUrl}
                resourceUrl="https://cdn.syncfusion.com/ej2/28.2.3/dist/ej2-pdfviewer-lib"
                style={{ height: '675px', width: '100%' }}
                enableToolbar={true}
                enableNavigation={true}
                enableBookmark={true}
                enableThumbnail={true}
                enablePrint={true}
                enableDownload={true}
                enableTextSelection={true}
                enableTextSearch={true}
                enableAnnotation={true}
                enableFormFields={true}
                enableFormDesigner={true}
                enablePageOrganizer={true}
              >
                <Inject
                  services={[
                    Toolbar,
                    Magnification,
                    Navigation,
                    LinkAnnotation,
                    BookmarkView,
                    ThumbnailView,
                    Print,
                    TextSelection,
                    TextSearch,
                    Annotation,
                    FormFields,
                    FormDesigner,
                    PageOrganizer
                  ]}
                />
              </PdfViewerComponent>
            </div>
          ) : (
            <div className="w-full flex-1 h-full bg-zinc-900 flex flex-col items-center justify-center">
              <object data={resolvedUrl} type="application/pdf" className="w-full h-full rounded">
                <iframe src={resolvedUrl} title={title} className="w-full h-full rounded border-0" />
              </object>
            </div>
          )}
        </div>

        {/* Right Side: Multi-User Positioned Timestamped Comments & Redline Layer Manager */}
        <div className="lg:col-span-4 flex flex-col h-[720px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs">
          {/* Header & Filter Controls */}
          <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Multi-User Redline Comments ({filteredComments.length})
                </h5>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full">
                Rev B Layers
              </span>
            </div>

            {/* Filter Controls Bar */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[10px] font-semibold text-zinc-500 mb-1">Reviewer Filter:</label>
                <select
                  value={selectedReviewerFilter}
                  onChange={(e) => setSelectedReviewerFilter(e.target.value)}
                  className="w-full text-[11px] font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2 py-1 outline-none cursor-pointer"
                >
                  <option value="All">All Reviewers</option>
                  <option value="Steven Golding">Steven Golding</option>
                  <option value="Corrie">Corrie</option>
                  <option value="Rajvi Prajapati">Rajvi Prajapati</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-zinc-500 mb-1">Status Filter:</label>
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="w-full text-[11px] font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2 py-1 outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Issued">Issued</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>

          {/* Timestamped Comment Audit Trail List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {filteredComments.map(cmt => (
              <div
                key={cmt.id}
                className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700/80 space-y-2 transition-all hover:border-zinc-300 dark:hover:border-zinc-600"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cmt.color || '#3b82f6' }} />
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{cmt.author}</span>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400">({cmt.authorRole})</span>
                  </div>
                  {getStatusBadge(cmt.status)}
                </div>

                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                  {cmt.comment}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-zinc-200/60 dark:border-zinc-700/60 text-[10px] text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">Pg {cmt.pageNumber}</span>
                    <span>•</span>
                    <span>{cmt.timestamp}</span>
                  </div>

                  {/* Status Selector */}
                  <select
                    value={cmt.status}
                    onChange={(e) => handleStatusChange(cmt.id, e.target.value as any)}
                    className="text-[10px] font-semibold bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded px-1.5 py-0.5 cursor-pointer outline-none"
                  >
                    <option value="Issued">Issued</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Redline Comment Form */}
          <form onSubmit={handleAddComment} className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-800/40 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
              <span>Add Positioned Redline Comment</span>
              <div className="flex items-center gap-1.5">
                <span>As:</span>
                <select
                  value={newCommentAuthor}
                  onChange={(e) => {
                    setNewCommentAuthor(e.target.value);
                    setNewCommentRole(e.target.value.includes('Golding') ? 'SSG Stakeholder' : e.target.value.includes('Corrie') ? 'Lead Architect' : 'Lead UI/UX');
                  }}
                  className="text-[10px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded px-1 py-0.5 outline-none cursor-pointer"
                >
                  <option value="Steven Golding">Steven Golding</option>
                  <option value="Corrie">Corrie</option>
                  <option value="Rajvi Prajapati">Rajvi Prajapati</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Type timestamped comment / redline instructions..."
                className="flex-1 text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 shrink-0"
              >
                <Send className="w-3.5 h-3.5" /> Post
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Interactive Custom Action Modals */}
      {activeModal === 'revision' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Create New Document Revision</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Executing Server-Driven Custom Action: <span className="font-mono text-blue-600 dark:text-blue-400">pdf-new-revision</span>. This creates Rev C and attaches current redline layers.
            </p>
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800/70 rounded-xl text-xs space-y-1">
              <div><span className="font-semibold">Target Document:</span> {title}</div>
              <div><span className="font-semibold">Current Revision:</span> Rev B → <span className="text-blue-600 font-bold">Rev C</span></div>
              <div><span className="font-semibold">Active Redlines:</span> {comments.length} multi-user comments attached</div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-lg cursor-pointer">
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveModal(null);
                  alert('New document revision (Rev C) created with attached annotation file!');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
              >
                Create Revision C
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'signoff' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Merge Annotations & Sign-Off</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Executing Server-Driven Custom Action: <span className="font-mono text-emerald-600 dark:text-emerald-400">pdf-merge-signoff</span>. Merges all reviewer redlines into a final signed-off PDF.
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs space-y-1.5 text-emerald-800 dark:text-emerald-200">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Ready for Final E-Signature Sign-Off
              </div>
              <div>Stakeholder Sign-Off: Steven Golding & Corrie</div>
              <div>Flattened Annotations: {comments.length} comments merged into PDF graphics layer</div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-lg cursor-pointer">
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsSignedOff(true);
                  setActiveModal(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" /> Confirm Sign-Off & Save
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'export' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Export Redline Audit Log (JSON)</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-zinc-950 text-zinc-100 p-3 rounded-xl font-mono text-[11px] max-h-48 overflow-y-auto">
              <pre>{JSON.stringify({ documentId: 'DOC-2026-001', revision: 'Rev B', commentsCount: comments.length, redlines: comments }, null, 2)}</pre>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
