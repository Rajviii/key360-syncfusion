'use client';

import { timesheetsMetadata } from '@/data/modules/timesheets';
import { ViewSwitcher } from '@/components/metadata/ViewSwitcher';
import { DevPanel } from '@/components/metadata/DevPanel';

export default function TimesheetsPage() {
  return (
    <>
      <ViewSwitcher metadata={timesheetsMetadata} />
      <DevPanel metadata={timesheetsMetadata} />
    </>
  );
}
