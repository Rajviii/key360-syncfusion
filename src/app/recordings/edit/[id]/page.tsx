import React from 'react';
import EditRecordingClient from './EditRecordingClient';
import { recordingsMockData } from '@/data/modules/recordings';

export function generateStaticParams() {
  const params: { id: string }[] = [];
  recordingsMockData.forEach(r => {
    params.push({ id: String(r.id) });
    params.push({ id: String(r.code) });
  });

  // Common fallbacks
  for (let i = 1; i <= 20; i++) {
    params.push({ id: `000000${i.toString().padStart(2, '0')}` });
  }

  return params;
}

export default function Page({ params }: { params: { id: string } }) {
  return <EditRecordingClient params={params} />;
}
