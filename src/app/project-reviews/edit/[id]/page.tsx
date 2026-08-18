import React from 'react';
import EditProjectReviewClient from './EditProjectReviewClient';
import { projectReviewsMockData } from '@/data/modules/projectReviews';

export function generateStaticParams() {
  const params: { id: string }[] = [];
  projectReviewsMockData.forEach(r => {
    params.push({ id: String(r.id) });
    params.push({ id: String(r.projectReviewId) });
  });

  for (let i = 1; i <= 20; i++) {
    params.push({ id: String(i) });
  }

  return params;
}

export default function Page({ params }: { params: { id: string } }) {
  return <EditProjectReviewClient params={params} />;
}
