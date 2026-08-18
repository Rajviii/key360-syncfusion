import React from 'react';
import EditTimesheetClient from './EditTimesheetClient';
import { timesheetsMockData } from '@/data/modules/timesheets';

export function generateStaticParams() {
  const params: { id: string }[] = [];
  timesheetsMockData.forEach(r => {
    params.push({ id: String(r.id) });
  });

  for (let i = 1; i <= 20; i++) {
    params.push({ id: String(i) });
  }

  return params;
}

export default function Page({ params }: { params: { id: string } }) {
  return <EditTimesheetClient params={params} />;
}
