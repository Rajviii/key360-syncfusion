'use client';

import { projectsMetadata } from '@/data/modules/projects';
import { ViewSwitcher } from '@/components/metadata/ViewSwitcher';
import { DevPanel } from '@/components/metadata/DevPanel';

export default function GanttPage() {
  // Pass projects metadata with Gantt as default view
  const ganttFirstMetadata = {
    ...projectsMetadata,
    id: 'gantt',
    name: 'Gantt Schedule',
    description: 'Interactive WBS Gantt schedule, task dependencies, and project timeline',
    views: [
      projectsMetadata.views.find(v => v.id === 'v-gantt') || projectsMetadata.views[0],
      ...projectsMetadata.views.filter(v => v.id !== 'v-gantt')
    ]
  };

  return (
    <>
      <ViewSwitcher metadata={ganttFirstMetadata} />
      <DevPanel metadata={ganttFirstMetadata} />
    </>
  );
}
