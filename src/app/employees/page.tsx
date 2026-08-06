'use client';

import { employeesMetadata } from '@/data/modules/employees';
import { ViewSwitcher } from '@/components/metadata/ViewSwitcher';
import { DevPanel } from '@/components/metadata/DevPanel';

export default function EmployeesPage() {
  return (
    <>
      <ViewSwitcher metadata={employeesMetadata} />
      <DevPanel metadata={employeesMetadata} />
    </>
  );
}
