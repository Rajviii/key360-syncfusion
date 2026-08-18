'use client';

import { recordingsMetadata } from '@/data/modules/recordings';
import { ViewSwitcher } from '@/components/metadata/ViewSwitcher';
import { DevPanel } from '@/components/metadata/DevPanel';

export default function RecordingsPage() {
  return (
    <>
      <ViewSwitcher metadata={recordingsMetadata} />
      <DevPanel metadata={recordingsMetadata} />
    </>
  );
}
