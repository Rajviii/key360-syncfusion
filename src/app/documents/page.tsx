'use client';

import { documentsMetadata } from '@/data/modules/documents';
import { ViewSwitcher } from '@/components/metadata/ViewSwitcher';
import { DevPanel } from '@/components/metadata/DevPanel';

export default function DocumentsPage() {
  return (
    <>
      <ViewSwitcher metadata={documentsMetadata} />
      <DevPanel metadata={documentsMetadata} />
    </>
  );
}
