'use client';

import React from 'react';
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective
} from '@syncfusion/ej2-react-kanban';
import { KanbanWidgetConfig } from '@/types/metadata';

interface DynamicKanbanProps {
  data: any[];
  config?: KanbanWidgetConfig;
}

export const DynamicKanban: React.FC<DynamicKanbanProps> = ({ data, config }) => {
  const keyField = config?.keyField || 'id';
  const headerField = config?.headerField || 'name';
  const contentField = config?.contentField || 'manager';
  const categoryField = config?.categoryField || 'status';
  const columns = config?.columns || [
    { key: 'Planning', title: 'Planning' },
    { key: 'In Progress', title: 'In Progress' },
    { key: 'On Hold', title: 'On Hold' },
    { key: 'Completed', title: 'Completed' }
  ];

  const cardSettings = {
    headerField: headerField,
    contentField: contentField
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Workflow Board</h4>
        <span className="text-xs px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full font-medium border border-zinc-200 dark:border-zinc-700">
          Drag & Drop Cards
        </span>
      </div>
      <KanbanComponent
        id="kanban-board"
        keyField={categoryField}
        dataSource={data}
        cardSettings={cardSettings}
        height="450px"
      >
        <ColumnsDirective>
          {columns.map(col => (
            <ColumnDirective
              key={col.key}
              headerText={col.title}
              keyField={col.key}
            />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
};
