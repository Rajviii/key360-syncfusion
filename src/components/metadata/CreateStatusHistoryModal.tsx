'use client';

import React, { useState } from 'react';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { X, Save, CheckCircle2, ChevronUp, ChevronDown, Paperclip, Clock } from 'lucide-react';

interface CreateStatusHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: any;
  onSaveStatus: (updatedRecord: any, newStatus: any) => void;
}

export const CreateStatusHistoryModal: React.FC<CreateStatusHistoryModalProps> = ({
  isOpen,
  onClose,
  record,
  onSaveStatus
}) => {
  if (!isOpen || !record) return null;

  const [status, setStatus] = useState<string>(record.statusBadge || record.status || 'A1 - New Lead');
  const [nextResponsiblePerson, setNextResponsiblePerson] = useState<string>(record.nextResponsiblePerson || 'Prajapati, Rajvi');
  const [nextDueDate, setNextDueDate] = useState<string>(record.nextDueDate || '2026-09-04');
  const [comment, setComment] = useState<string>('');
  const [sendEmail, setSendEmail] = useState<boolean>(true);
  const [sendAttachments, setSendAttachments] = useState<boolean>(false);
  const [sendPrevAttachments, setSendPrevAttachments] = useState<boolean>(false);
  const [statusUser, setStatusUser] = useState<string>('Prajapati, Rajvi');

  const [statusDetailsExpanded, setStatusDetailsExpanded] = useState<boolean>(true);
  const [attachmentsExpanded, setAttachmentsExpanded] = useState<boolean>(true);

  const statusOptions = [
    { label: 'A1 - New Lead', value: 'A1 - New Lead' },
    { label: 'A3 - Meeting Completed', value: 'A3 - Meeting Completed' },
    { label: 'A6 - Proposal Lost', value: 'A6 - Proposal Lost' },
    { label: 'A7 - Project Kick-off', value: 'A7 - Project Kick-off' },
    { label: 'A8 - Archived', value: 'A8 - Archived' }
  ];

  const userOptions = [
    { label: 'Prajapati, Rajvi', value: 'Prajapati, Rajvi' },
    { label: 'User1, Demo', value: 'User1, Demo' },
    { label: 'User2, Demo', value: 'User2, Demo' },
    { label: 'Martin Guptill', value: 'Martin Guptill' }
  ];

  const mockAttachments = [
    { id: '1', fileName: 'Proposal_Approval_Letter.pdf', attachment: '[Download PDF]', comment: 'Official approval letter from client', dateCreated: '2026-08-18 10:40 AM', createdBy: 'Prajapati, Rajvi' }
  ];

  const handleSave = () => {
    const updatedRecord = {
      ...record,
      statusBadge: status,
      status: status,
      currentStatusComment: comment || record.currentStatusComment,
      nextResponsiblePerson: nextResponsiblePerson,
      nextDueDate: nextDueDate
    };

    onSaveStatus(updatedRecord, {
      status,
      nextResponsiblePerson,
      nextDueDate,
      comment,
      statusUser,
      date: new Date().toLocaleString()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-5xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center shadow-xs">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                Create Status History
                <span className="text-xs font-mono font-normal text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  {record.code || record.opportunityCode || record.id}
                </span>
              </h3>
              <p className="text-[11px] text-zinc-500 font-medium">Define new status stage, responsible user, and comments</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" /> Save
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Save & Close
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Section 1: Status Details */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
            <button
              type="button"
              onClick={() => setStatusDetailsExpanded(!statusDetailsExpanded)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between text-left cursor-pointer border-b border-zinc-200 dark:border-zinc-800/60"
            >
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Status Details</span>
              {statusDetailsExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </button>

            {statusDetailsExpanded && (
              <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Status Field */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                    Status <span className="text-red-500 font-bold">*</span>
                  </label>
                  <DropDownListComponent
                    dataSource={statusOptions}
                    fields={{ text: 'label', value: 'value' }}
                    value={status}
                    change={(e: any) => setStatus(e.value)}
                    placeholder="Please select a Status"
                  />
                </div>

                {/* Next Responsible Person */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                    Next Responsible Person <span className="text-red-500 font-bold">*</span>
                  </label>
                  <DropDownListComponent
                    dataSource={userOptions}
                    fields={{ text: 'label', value: 'value' }}
                    value={nextResponsiblePerson}
                    change={(e: any) => setNextResponsiblePerson(e.value)}
                  />
                </div>

                {/* Next Due Date */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                    Next Due Date
                  </label>
                  <DatePickerComponent
                    format="yyyy-MM-dd"
                    value={nextDueDate ? new Date(nextDueDate) : undefined}
                    change={(e: any) => setNextDueDate(e.value ? e.value.toISOString().split('T')[0] : '')}
                  />
                </div>

                {/* Comment (Full width) */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                    Comment
                  </label>
                  <TextBoxComponent
                    multiline={true}
                    htmlAttributes={{ rows: '3' }}
                    value={comment}
                    placeholder="Enter status transition details or client remarks..."
                    change={(e: any) => setComment(e.value)}
                  />
                </div>

                {/* Checkboxes column */}
                <div className="space-y-3 pt-2">
                  <CheckBoxComponent
                    label="Send Email?"
                    checked={sendEmail}
                    change={(e: any) => setSendEmail(e.checked)}
                  />
                  <CheckBoxComponent
                    label="Send Attachments?"
                    checked={sendAttachments}
                    change={(e: any) => setSendAttachments(e.checked)}
                  />
                  <CheckBoxComponent
                    label="Send Previous Status Attachments?"
                    checked={sendPrevAttachments}
                    change={(e: any) => setSendPrevAttachments(e.checked)}
                  />
                </div>

                {/* Status User */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                    Status User <span className="text-red-500 font-bold">*</span>
                  </label>
                  <DropDownListComponent
                    dataSource={userOptions}
                    fields={{ text: 'label', value: 'value' }}
                    value={statusUser}
                    change={(e: any) => setStatusUser(e.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Attachments Grid */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
            <button
              type="button"
              onClick={() => setAttachmentsExpanded(!attachmentsExpanded)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between text-left cursor-pointer border-b border-zinc-200 dark:border-zinc-800/60"
            >
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Attachments</span>
              </div>
              {attachmentsExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </button>

            {attachmentsExpanded && (
              <div className="p-4">
                <GridComponent
                  dataSource={mockAttachments}
                  allowPaging={true}
                  pageSettings={{ pageSize: 5 }}
                  gridLines="Both"
                >
                  <ColumnsDirective>
                    <ColumnDirective field="fileName" headerText="File Name" width="200" />
                    <ColumnDirective field="attachment" headerText="Attachment" width="140" />
                    <ColumnDirective field="comment" headerText="Comment" width="220" />
                    <ColumnDirective field="dateCreated" headerText="Date Created" width="160" />
                    <ColumnDirective field="createdBy" headerText="Created By" width="140" />
                  </ColumnsDirective>
                </GridComponent>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
