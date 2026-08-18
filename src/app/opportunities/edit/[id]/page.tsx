import React from 'react';
import EditOpportunityClient from './EditOpportunityClient';
import { opportunitiesMockData } from '@/data/modules/opportunities';

export function generateStaticParams() {
  const params: { id: string }[] = [];
  opportunitiesMockData.forEach(r => {
    params.push({ id: String(r.id) });
    params.push({ id: String(r.code) });
  });

  // Common fallbacks
  for (let i = 1; i <= 20; i++) {
    params.push({ id: String(i) });
  }

  return params;
}

export default function Page({ params }: { params: { id: string } }) {
  return <EditOpportunityClient params={params} />;
}
