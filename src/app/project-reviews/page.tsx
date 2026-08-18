'use client';

import { projectReviewsMetadata } from '@/data/modules/projectReviews';
import { ViewSwitcher } from '@/components/metadata/ViewSwitcher';
import { DevPanel } from '@/components/metadata/DevPanel';

export default function ProjectReviewsPage() {
  return (
    <>
      <ViewSwitcher metadata={projectReviewsMetadata} />
      <DevPanel metadata={projectReviewsMetadata} />
    </>
  );
}
