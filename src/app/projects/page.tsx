'use client';

import { projectsMetadata } from '@/data/modules/projects';
import { ViewSwitcher } from '@/components/metadata/ViewSwitcher';
import { DevPanel } from '@/components/metadata/DevPanel';

export default function ProjectsPage() {
  return (
    <>
      <ViewSwitcher metadata={projectsMetadata} />
      <DevPanel metadata={projectsMetadata} />
    </>
  );
}
