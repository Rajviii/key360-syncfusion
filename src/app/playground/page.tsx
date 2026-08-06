'use client';

import { SchemaPlayground } from '@/components/playground/SchemaPlayground';
import { DevPanel } from '@/components/metadata/DevPanel';
import { projectsMetadata } from '@/data/modules/projects';

export default function PlaygroundPage() {
  return (
    <>
      <SchemaPlayground />
      <DevPanel metadata={projectsMetadata} />
    </>
  );
}
