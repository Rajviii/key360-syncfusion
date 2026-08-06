'use client';

import { leavesMetadata } from '@/data/modules/leaves';
import { ViewSwitcher } from '@/components/metadata/ViewSwitcher';
import { DevPanel } from '@/components/metadata/DevPanel';

export default function LeavesPage() {
  return (
    <>
      <ViewSwitcher metadata={leavesMetadata} />
      <DevPanel metadata={leavesMetadata} />
    </>
  );
}
