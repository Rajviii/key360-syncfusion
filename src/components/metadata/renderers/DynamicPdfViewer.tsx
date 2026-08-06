'use client';

import React, { useState, useRef } from 'react';
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
import { CustomAction, PdfReviewerWorkflowConfig, FieldSchema } from '@/types/metadata';
import {
  FileText,
  Download,
  CheckCircle2,
  PenTool,
  Plus,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  FileCheck2,
  X,
  Share2,
  ChevronDown,
  ChevronRight,
  CheckSquare,
  Square,
  Sliders,
  Layers,
  User,
  Filter
} from 'lucide-react';

export interface CommentNode {
  id: string;
  annotationId?: string;
  author: string;
  authorRole?: string;
  subject: string;
  timestamp: string;
  pageNumber: number;
  comment: string;
  status: 'Issued' | 'Pending' | 'Approved' | 'Resolved' | string;
  revisionVersion?: string;
  color?: string;
  borderWidth?: number;
  visible: boolean;
}

interface DynamicPdfViewerProps {
  pdfUrl?: string;
  title?: string;
  config?: PdfReviewerWorkflowConfig;
  customActions?: CustomAction[];
}

export const DynamicPdfViewer: React.FC<DynamicPdfViewerProps> = ({
  pdfUrl = '/sample.pdf',
  title = 'SSG Structural Engineering & Compliance Plan',
  config,
  customActions = []
}) => {
  const viewerRef = useRef<PdfViewerComponent | null>(null);

  // Metadata Configuration (Fallback defaults if config is omitted)
  const showLeftTree = config?.showLeftCommentsTree ?? true;
  const showRightProperties = config?.showRightPropertiesPanel ?? true;
  const groupBy = config?.groupBy ?? 'author';
  const enableCheckboxes = config?.enableVisibilityCheckboxes ?? true;

  const allowedStatuses = config?.allowedStatuses || [
    { label: 'Issued Comment', value: 'Issued' },
    { label: 'Pending Review', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Resolved', value: 'Resolved' }
  ];

  // UI Panel Toggle States
  const [leftPaneOpen, setLeftPaneOpen] = useState(true);
  const [rightPaneOpen, setRightPaneOpen] = useState(true);
  const [useNativeViewer, setUseNativeViewer] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Cobus Pretorius (25 Sep 2019)': true,
    'Steven Golding (04 Aug 2026)': true,
    'Corrie (04 Aug 2026)': true,
    'Rajvi Prajapati (04 Aug 2026)': true
  });

  // Modal Action States
  const [activeModal, setActiveModal] = useState<'revision' | 'signoff' | 'export' | null>(null);
  const [isSignedOff, setIsSignedOff] = useState(false);

  // Redline Annotations & Comments State
  const [comments, setComments] = useState<CommentNode[]>([
    // {
    //   id: 'cmt-001',
    //   annotationId: 'ann-001',
    //   author: 'Cobus Pretorius',
    //   authorRole: 'Engineering Manager',
    //   subject: '001. Stamp Approved',
    //   timestamp: '2019-09-25 08:45',
    //   pageNumber: 1,
    //   comment: 'STATUS A SENET - Approved - Work May Proceed with contracted obligations.',
    //   status: 'Approved',
    //   color: '#ef4444',
    //   borderWidth: 2,
    //   visible: true
    // },
    // {
    //   id: 'cmt-002',
    //   annotationId: 'ann-002',
    //   author: 'Cobus Pretorius',
    //   authorRole: 'Engineering Manager',
    //   subject: '002. Take note of change on drawing',
    //   timestamp: '2019-09-25 08:45',
    //   pageNumber: 1,
    //   comment: 'Cobus take note of the change on the process plant layout.',
    //   status: 'Issued',
    //   color: '#ef4444',
    //   borderWidth: 1,
    //   visible: true
    // },
    // {
    //   id: 'cmt-101',
    //   annotationId: 'ann-101',
    //   author: 'Steven Golding',
    //   authorRole: 'SSG Stakeholder',
    //   subject: '001. Structural Load Safety Margin',
    //   timestamp: '2026-08-04 14:15',
    //   pageNumber: 1,
    //   comment: 'Please verify structural load calculation on section B-2 before final sign-off. Safety margin >= 1.5.',
    //   status: 'Issued',
    //   color: '#ef4444',
    //   borderWidth: 2,
    //   visible: true
    // },
    // {
    //   id: 'cmt-102',
    //   annotationId: 'ann-102',
    //   author: 'Corrie',
    //   authorRole: 'Lead Architect',
    //   subject: '002. PDF4Net Annotation Layer',
    //   timestamp: '2026-08-04 14:45',
    //   pageNumber: 1,
    //   comment: 'PDF4Net legacy annotation layers mapped successfully to Syncfusion React PDF Viewer engine. Checked and verified.',
    //   status: 'Approved',
    //   color: '#10b981',
    //   borderWidth: 1,
    //   visible: true
    // },
    // {
    //   id: 'cmt-103',
    //   annotationId: 'ann-103',
    //   author: 'Rajvi Prajapati',
    //   authorRole: 'Lead UI/UX Architect',
    //   subject: '003. Metadata Action Engine',
    //   timestamp: '2026-08-04 15:20',
    //   pageNumber: 1,
    //   comment: 'Dynamic server-driven custom action buttons integrated with metadata schema. Ready for stakeholder review.',
    //   status: 'Resolved',
    //   color: '#3b82f6',
    //   borderWidth: 2,
    //   visible: true
    // }
  ]);

  // Selected Comment & Properties Form State
  const [selectedCommentId, setSelectedCommentId] = useState<string>('cmt-101');
  const selectedComment = comments.find(c => c.id === selectedCommentId) || comments[0];

  const [propAuthor, setPropAuthor] = useState(selectedComment?.author || '');
  const [propSubject, setPropSubject] = useState(selectedComment?.subject || '');
  const [propColor, setPropColor] = useState(selectedComment?.color || '#ef4444');
  const [propBorderWidth, setPropBorderWidth] = useState(selectedComment?.borderWidth || 1);
  const [propStatus, setPropStatus] = useState(selectedComment?.status || 'Issued');
  const [propCommentText, setPropCommentText] = useState(selectedComment?.comment || '');

  // Update properties inspector fields when selection changes & navigate to page
  const handleSelectComment = (comment: CommentNode) => {
    setSelectedCommentId(comment.id);
    setPropAuthor(comment.author);
    setPropSubject(comment.subject);
    setPropColor(comment.color || '#ef4444');
    setPropBorderWidth(comment.borderWidth || 1);
    setPropStatus(comment.status);
    setPropCommentText(comment.comment);

    // Defensively navigate PDF Viewer to the target page number
    if (viewerRef.current && typeof comment.pageNumber === 'number') {
      try {
        const viewer = viewerRef.current as any;
        if (viewer.navigationModule && typeof viewer.navigationModule.goToPage === 'function') {
          viewer.navigationModule.goToPage(comment.pageNumber);
        } else if (typeof viewer.goToPage === 'function') {
          viewer.goToPage(comment.pageNumber);
        }
      } catch (err) {
        console.log('PDF Page navigation executed:', err);
      }
    }
  };

  // Apply property modifications from the Inspector panel back to state
  const handleApplyProperties = () => {
    if (!selectedCommentId) return;
    setComments(prev =>
      prev.map(c => {
        if (c.id === selectedCommentId) {
          return {
            ...c,
            author: propAuthor,
            subject: propSubject,
            color: propColor,
            borderWidth: propBorderWidth,
            status: propStatus,
            comment: propCommentText
          };
        }
        return c;
      })
    );
  };

  // Toggle comment annotation layer visibility
  const handleToggleVisibility = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setComments(prev =>
      prev.map(c => (c.id === id ? { ...c, visible: !c.visible } : c))
    );
  };

  // Safe listener when user draws/adds a NEW redline comment on ANY page in Syncfusion PDF Viewer
  const handleAnnotationAdd = (args: any) => {
    if (!args) return;
    const pageNum = typeof args.pageIndex === 'number' ? args.pageIndex + 1 : 1;
    const annId = args.annotationId || `ann-${Date.now()}`;
    const annType = args.annotationType || 'Redline';

    const newComment: CommentNode = {
      id: `cmt-${Date.now()}`,
      annotationId: annId,
      author: args.annotationSettings?.author || 'Current Reviewer',
      authorRole: 'Reviewer',
      subject: `${annType} on Pg ${pageNum}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      pageNumber: pageNum,
      comment: args.textMarkupContent || `${annType} added on page ${pageNum}`,
      status: 'Issued',
      color: args.annotationSettings?.strokeColor || '#ef4444',
      borderWidth: args.annotationSettings?.borderWidth || 2,
      visible: true
    };

    setComments(prev => [newComment, ...prev]);
    setSelectedCommentId(newComment.id);
  };

  // Safe listener for Syncfusion Annotation Select Event
  const handleAnnotationSelect = (args: any) => {
    if (!args) return;
    const annId = args.annotationId || (args.annotation && args.annotation.id);
    if (annId) {
      const matched = comments.find(c => c.annotationId === annId || c.id === annId);
      if (matched) {
        handleSelectComment(matched);
      }
    }
  };

  // Group Comments Dynamically by Author or Status or Page
  const groupComments = () => {
    const groups: Record<string, CommentNode[]> = {};
    comments.forEach(c => {
      let key = c.author;
      if (groupBy === 'status') key = `Status: ${c.status}`;
      else if (groupBy === 'pageNumber') key = `Page ${c.pageNumber}`;
      else key = `${c.author} (${c.timestamp.split(' ')[0]})`;

      if (!groups[key]) groups[key] = [];
      groups[key].push(c);
    });
    return groups;
  };

  const grouped = groupComments();

  const toggleGroupExpand = (groupKey: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const getAbsolutePdfUrl = (url?: string) => {
    const target = url && !url.includes('cdn.syncfusion.com') ? url : '/sample.pdf';
    if (typeof window !== 'undefined' && target.startsWith('/')) {
      return `${window.location.origin}${target}`;
    }
    return target;
  };

  const resolvedUrl = getAbsolutePdfUrl(pdfUrl);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Issued':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 rounded border border-red-200 dark:border-red-800">
            <AlertCircle className="w-3 h-3" /> Issued
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded border border-amber-200 dark:border-amber-800">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="w-3 h-3" /> Approved
          </span>
        );
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-800">
            <CheckCircle2 className="w-3 h-3" /> Resolved
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-zinc-900 text-zinc-100 rounded-xl border border-zinc-800 p-3 shadow-xl space-y-3 font-sans">
      {/* Top Document Header & Server-Driven Metadata Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-2.5 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-950/80 text-red-400 rounded-lg border border-red-800 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-zinc-100 tracking-tight">
                Document Review: {title}
              </h4>
              {/* <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                Rev B (PDF4Net + Syncfusion)
              </span> */}
            </div>
          </div>
        </div>

        {/* Dynamic Action Buttons from Metadata Schema */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <button
            onClick={() => setLeftPaneOpen(!leftPaneOpen)}
            className={`px-2.5 py-1 text-xs font-medium rounded border transition-colors cursor-pointer flex items-center gap-1 ${leftPaneOpen
              ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
              : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Comments Tree
          </button>
          <button
            onClick={() => setRightPaneOpen(!rightPaneOpen)}
            className={`px-2.5 py-1 text-xs font-medium rounded border transition-colors cursor-pointer flex items-center gap-1 ${rightPaneOpen
              ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
              : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Properties Inspector
          </button>

          {customActions && customActions.length > 0 && (
            customActions.map(action => (
              <button
                key={action.id}
                onClick={() => setActiveModal(action.type as any)}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors cursor-pointer"
              >
                {action.type === 'pdf-new-revision' && <Plus className="w-3.5 h-3.5" />}
                {action.type === 'pdf-merge-signoff' && <FileCheck2 className="w-3.5 h-3.5" />}
                {action.type === 'pdf-export-annotations' && <Share2 className="w-3.5 h-3.5" />}
                {action.label}
              </button>
            ))
            // ) : (
            //   // <button
            //   //   onClick={() => setActiveModal('revision')}
            //   //   className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer"
            //   // >
            //   //   <Plus className="w-3.5 h-3.5" /> New Revision
            //   // </button>
            // )}
          )}

          <a
            href={resolvedUrl}
            download="document.pdf"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded border border-zinc-700 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Download
          </a>
        </div>
      </div>

      {/* Main 3-Pane Desktop Workbench Layout */}
      <div className="flex flex-col lg:flex-row h-[720px] gap-2.5 overflow-hidden">
        {/* LEFT PANE: Hierarchical Comments Tree View with Checkboxes */}
        {showLeftTree && leftPaneOpen && (
          <div className="w-full lg:w-72 flex flex-col bg-zinc-950 rounded-lg border border-zinc-800 shrink-0 overflow-hidden">
            <div className="p-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-200 tracking-wide uppercase">
                Comments ({comments.length})
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                Group: {groupBy}
              </span>
            </div>

            {/* Tree View list */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2 text-xs">
              {Object.entries(grouped).map(([groupKey, groupItems]) => {
                const isExpanded = expandedGroups[groupKey] !== false;
                return (
                  <div key={groupKey} className="space-y-1">
                    {/* Group Header */}
                    <button
                      onClick={() => toggleGroupExpand(groupKey)}
                      className="w-full flex items-center gap-1.5 px-2 py-1 bg-zinc-900/90 hover:bg-zinc-800 rounded text-left font-semibold text-zinc-300 text-[11px] transition-colors cursor-pointer"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                      )}
                      <span className="truncate">{groupKey}</span>
                      <span className="ml-auto text-[10px] px-1.5 py-0.2 bg-zinc-800 text-zinc-400 rounded-full font-mono">
                        {groupItems.length}
                      </span>
                    </button>

                    {/* Group Items */}
                    {isExpanded && (
                      <div className="pl-2 space-y-1 border-l border-zinc-800/80 ml-2">
                        {groupItems.map(item => {
                          const isSelected = item.id === selectedCommentId;
                          return (
                            <div
                              key={item.id}
                              onClick={() => handleSelectComment(item)}
                              className={`flex items-start gap-1.5 p-1.5 rounded transition-all cursor-pointer ${isSelected
                                ? 'bg-blue-950/80 border border-blue-600 text-white font-medium'
                                : 'bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800/60 text-zinc-300'
                                }`}
                            >
                              {/* Checkbox for annotation layer visibility */}
                              {enableCheckboxes && (
                                <button
                                  type="button"
                                  onClick={e => handleToggleVisibility(item.id, e)}
                                  className="mt-0.5 text-zinc-400 hover:text-blue-400 cursor-pointer shrink-0"
                                  title={item.visible ? 'Hide annotation layer' : 'Show annotation layer'}
                                >
                                  {item.visible ? (
                                    <CheckSquare className="w-3.5 h-3.5 text-blue-400" />
                                  ) : (
                                    <Square className="w-3.5 h-3.5 text-zinc-600" />
                                  )}
                                </button>
                              )}

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[11px] font-semibold truncate">
                                    {item.subject}
                                  </span>
                                </div>
                                <p className="text-[10px] text-zinc-400 truncate mt-0.5 font-normal">
                                  {item.comment}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CENTER PANE: Document Viewer Canvas */}
        <div className="flex-1 flex flex-col bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden min-w-0">
          <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-800 text-xs">
            <div className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-zinc-200">Document Viewer</span>
            </div>
            <button
              onClick={() => setUseNativeViewer(!useNativeViewer)}
              className="text-[11px] text-blue-400 hover:underline cursor-pointer font-medium"
            >
              {useNativeViewer ? 'Switch to Syncfusion PDF Suite' : 'Embedded Object Mode'}
            </button>
          </div>

          {!useNativeViewer ? (
            <div className="w-full flex-1 h-full">
              <PdfViewerComponent
                id="syncfusion_pdf_viewer"
                ref={viewerRef}
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
                annotationSelect={handleAnnotationSelect}
                annotationAdd={handleAnnotationAdd}
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

        {/* RIGHT PANE: Properties Inspector Panel */}
        {showRightProperties && rightPaneOpen && (
          <div className="w-full lg:w-72 flex flex-col bg-zinc-950 rounded-lg border border-zinc-800 shrink-0 overflow-hidden">
            <div className="p-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-200 tracking-wide uppercase">
                Properties
              </span>
              <Sliders className="w-3.5 h-3.5 text-zinc-400" />
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3.5 text-xs">
              {/* Reviewer / Author */}
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Author / Reviewer
                </label>
                <input
                  type="text"
                  value={propAuthor}
                  onChange={e => setPropAuthor(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-200 outline-none focus:border-blue-500 text-xs"
                />
              </div>

              {/* Title / Subject */}
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Title / Name
                </label>
                <input
                  type="text"
                  value={propSubject}
                  onChange={e => setPropSubject(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-200 outline-none focus:border-blue-500 text-xs font-mono"
                />
              </div>

              {/* Line Width & Color Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Line Width
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={propBorderWidth}
                    onChange={e => setPropBorderWidth(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-200 outline-none focus:border-blue-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Color Palette
                  </label>
                  <div className="flex items-center gap-1.5 pt-1">
                    {['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#18181b'].map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setPropColor(c)}
                        className={`w-5 h-5 rounded-full border cursor-pointer ${propColor === c ? 'border-white ring-2 ring-blue-500' : 'border-zinc-700'
                          }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Comment Status (Configurable Dropdown) */}
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Comment Status
                </label>
                <select
                  value={propStatus}
                  onChange={e => setPropStatus(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-zinc-200 outline-none cursor-pointer text-xs font-medium"
                >
                  {allowedStatuses.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Comment Details Text Area */}
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Comment Text
                </label>
                <textarea
                  rows={4}
                  value={propCommentText}
                  onChange={e => setPropCommentText(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-zinc-200 outline-none focus:border-blue-500 text-xs leading-relaxed"
                />
              </div>

              {/* Apply Property Changes Button */}
              <button
                type="button"
                onClick={handleApplyProperties}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-xs transition-colors cursor-pointer"
              >
                Apply Property Changes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Custom Action Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-md p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h3 className="text-sm font-bold text-zinc-100">
                Action: {activeModal}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-zinc-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-400">
              Executing metadata-driven server action for PDF workflow sign-off and revision management.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-800 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveModal(null);
                  alert(`Server Action ${activeModal} completed successfully!`);
                }}
                className="px-3 py-1.5 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded cursor-pointer font-semibold"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
