'use client';

import { opportunitiesMetadata } from '@/data/modules/opportunities';
import { ViewSwitcher } from '@/components/metadata/ViewSwitcher';
import { DevPanel } from '@/components/metadata/DevPanel';

export default function OpportunitiesPage() {
  return (
    <>
      <ViewSwitcher metadata={opportunitiesMetadata} />
      <DevPanel metadata={opportunitiesMetadata} />
    </>
  );
}
