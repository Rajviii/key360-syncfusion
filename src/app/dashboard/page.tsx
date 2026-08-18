'use client';

import React from 'react';
import { projectsMetadata } from '@/data/modules/projects';
import { ViewSwitcher } from '@/components/metadata/ViewSwitcher';
import { DevPanel } from '@/components/metadata/DevPanel';

export default function DashboardPage() {
  return (
    <>
      <ViewSwitcher metadata={projectsMetadata} />
      <DevPanel metadata={projectsMetadata} />
    </>
  );
}
